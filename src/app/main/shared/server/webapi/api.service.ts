import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EntityBase } from '../../models/entityBase';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
/**
 * webapi serve基类
 */
export class ApiService<T extends EntityBase> implements Resolve<Observable<T>> {
    private uriBase: string;//webapi基路径 例如:localhost:4200
    protected uriPart: string;//webapi实体路径 例如products
    protected header: HttpHeaders;//默认为application/json的Content-Type Header
    /**
     * 完整的webapi请求路径
     */
    public get uri(): string {
        return `${this.uriBase}/${this.uriPart}`;
    }
    constructor(private httpClient: HttpClient, private configService: ConfigService) {
        this.uriBase = configService.serverBase;

        this.header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    /**
     * resolve
     * @param route 
     * @param state 
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Observable<Observable<T>> | Promise<Observable<T>> {
        let id = route.paramMap.get('id');
        return this.getEntity<T>(id);
    }

    /**
     * 根据id删除实体
     * @param id 
     */
    delete(id: string | number): Observable<HttpResponse<string>> {
        return this.httpClient.delete(`${this.uri}/${id}`, { observe: 'response', responseType: 'text' });
    }

    /**
     * 根据id获取实体信息
     * @param id 
     */
    protected getEntity<T>(id: number | string): Observable<T> {
        if (id)
            return this.httpClient.get<T>(`${this.uri}/${id}`, { headers: this.header }).pipe(
                // retry(3),
                catchError(this.handleError)
            );
        return Observable.of<T>({} as T);
    }

    /**
     * 创建实体信息
     * @param entity 
     */
    protected createEntity<T>(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header }).pipe(
            // retry(3),
            catchError(this.handleError)
        );
    }

    /**
     * 更新实体信息
     * @param entity 
     */
    protected updateEntity<T extends EntityBase>(entity: T): Observable<T> {
        if (entity.id)
            return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header }).pipe(
                // retry(3),
                catchError(this.handleError)
            );
        return this.createEntity(entity);
    }

    /**
     * 查询实体信息
     * @param search 
     * @param page 
     * @param pageSize 
     * @param orderBy 
     * @param desc 
     * @param plus 
     */
    protected queryEntities<T>(search: string, order: string, page: number | string, pageSize: number | string, orderBy: string, desc: boolean, plus?: object): Observable<Paging<T>> {
        var params = new HttpParams();
        if (search)
            params = params.append('search', `${search}`);
        if (order)
            params = params.append('order', `${order}`);
        if (page)
            params = params.append('page', `${page}`);
        if (pageSize)
            params = params.append('pageSize', `${pageSize}`);
        if (orderBy)
            params = params.append('orderBy', `${orderBy}`);
        if (desc)
            params = params.append('desc', `${desc}`);
        return this.httpClient.request<Paging<T>>('get', this.uri, { headers: this.header, params: params }).pipe(
            // retry(3),
            catchError(this.handleError)
        );
    }

    protected 

    /**
     * 异常控制
     * @param error 
     */
    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}

/**
 * 查询分页信息
 */
export class Paging<E> {
    data: Array<E>;
    page: number;
    size: number;
    total: number;
}