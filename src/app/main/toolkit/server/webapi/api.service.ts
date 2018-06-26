
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IEntitybase } from '../../models/ientitybase';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';
import { QueryOperateEnums } from '../../enums/enums';
import { EntityBase } from '../../models/entitybase';
import { tap } from 'rxjs/operators';
/**
 * webapi serve基类
 */
export class ApiService<T extends IEntitybase> implements Resolve<Observable<T>> {
    queryData$ = new BehaviorSubject<Array<T>>([]);
    editData$ = new BehaviorSubject<IEntitybase>(new EntityBase());
    header: HttpHeaders;//默认为application/json的Content-Type Header
    private uriBase: string;//webapi基路径 例如:localhost:4200
    protected uriPart: string;//webapi实体路径 例如products
    /**
     * 完整的webapi请求路径
     */
    public get uri(): string {
        return `${this.uriBase}/${this.uriPart}`;
    }
    constructor(private httpClient: HttpClient, private configService: ConfigService) {
        this.uriBase = this.configService.serverBase;

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
        return this.getEntity<T>(id).pipe(tap(data => {
            this.editData$.next(data ? data : new EntityBase());
        })) as Observable<T>;
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
        if (id) {
            return this.httpClient.get<T>(`${this.uri}/${id}`, { headers: this.header }).pipe(tap(x => {
                this.editData$.next(x as any);
            }));
        }
        return Observable.of<T>({} as T).pipe(tap(x => {
            this.editData$.next(x as any);
        }));
    }

    /**
     * 创建实体信息
     * @param entity 
     */
    protected createEntity<T>(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header }).pipe(tap(x => {
            this.editData$.next(x as any);
        }));
    }

    /**
     * 更新实体信息
     * @param entity 
     */
    protected updateEntity<T extends IEntitybase>(entity: T): Observable<T> {
        if (entity.id)
            return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header }).pipe(tap(x => {
                this.editData$.next(x);
            }));
        return this.createEntity(entity);
    }

    /**
     * 查询实体信息
     * @param query 
     * @param advanceQueryFilters 
     */
    protected queryEntities<T>(query?: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<T>> {
        if (!query)
            query = {};
        var params = new HttpParams();
        if (query.search)
            params = params.append('search', `${query.search}`);
        if (query.orderBy)
            params = params.append('orderBy', `${query.orderBy}`);
        if (query.desc)
            params = params.append('desc', `${query.desc}`);

        let queryPart = conjunctFilter(advanceQueryFilters);

        params = params.append('page', `${query.page ? query.page : 1}`);
        params = params.append('pageSize', `${query.pageSize ? query.pageSize : 10}`);
        return this.httpClient.request<Paging<T>>('get', `${this.uri}?${queryPart}`, { headers: this.header, params: params }).pipe(tap(res => {
            this.queryData$.next(res && res.data ? (res.data as any) : []);
        }));
    }

    /**
     * 批量删除实体信息
     * @param idsArr 
     */
    public batchDelete(idsArr: Array<string>) {
        let idsStr = idsArr && idsArr.length > 0 ? idsArr.join(',') : '';
        return this.httpClient.delete(`${this.uri}/BatchDelete?ids=${idsStr}`, { responseType: 'text' })
    }//batchDelete

    public exportData(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>) {
        var params = new HttpParams();
        if (query.search)
            params = params.append('search', `${query.search}`);
        if (query.orderBy)
            params = params.append('orderBy', `${query.orderBy}`);
        if (query.desc)
            params = params.append('desc', `${query.desc}`);

        let queryPart = conjunctFilter(advanceQueryFilters);

        params = params.append('page', `${query.page ? query.page : 1}`);
        params = params.append('pageSize', `${query.pageSize ? query.pageSize : 10}`);
        return this.httpClient.request('get', `${this.uri}/export?${queryPart}`, { headers: this.header, params: params, responseType: 'blob' });
    }//exportData
}
//TODO:转为q查询方式
function conjunctFilter(advanceQueryFilters?: Array<IQueryFilter>): string {
    let queryPart = '';
    if (advanceQueryFilters && advanceQueryFilters.length) {
        for (let item of advanceQueryFilters) {
            let operateStr = '';
            switch (item.operate) {
                case QueryOperateEnums.equal:
                    operateStr = '=';
                    break;
                default:
                    operateStr = '=';
                    break;
            }
            queryPart += `${item.field}${operateStr}${item.value}&`;
        }
    }
    return queryPart;
}//conjunctFilter



/**
 * 查询分页信息
 */
export class Paging<E> {
    data: Array<E>;
    page: number;
    size: number;
    total: number;
}

/**
 * 查询参数
 */
export interface IQuery {
    search?: string;
    // order?: string;
    page?: number | string;
    pageSize?: number | string;
    orderBy?: string;
    desc?: boolean;
    plus?: object
}