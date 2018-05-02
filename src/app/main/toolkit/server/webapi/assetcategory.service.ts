import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { IEntitybase } from '../../models/ientitybase';
import { AssetCategory } from "../../models/assetcategory";
import { Observable } from 'rxjs/Observable';
/**
 * asset category serve基类
 */
export class AssetCategoryService<T extends AssetCategory> {

    private uriBase: string;//webapi基路径 例如:localhost:4200
    protected header: HttpHeaders;//默认为application/json的Content-Type Header
    protected uriPart: string;//webapi实体路径 例如products
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
    }//constructor

    /**
     * 获取所有分类
     * @param type 
     */
    protected getByType(type: string) {
        if (type) {
            return this.httpClient.get<T>(`${this.uri}/?type=${type}`, { headers: this.header });
        }
        return Observable.of<T>({} as T);
    }//getByType

    /**
     * 创建分类
     * @param entity 
     */
    protected createType<T>(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header });
    }//createType

    /**
     * 更新分类
     * @param entity 
     */
    protected updateType<T extends AssetCategory>(entity: T): Observable<T> {
        if (entity.id)
            return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header });
        return this.createType(entity);
    }//updateType

    /**
     * 删除分类
     * @param type 
     * @param id 
     */
    protected deleteType(type: string, id: string) {
        // return this.httpClient.delete<void>(`${this.uri}?type=${type}&id=${id}`);
        return this.httpClient.request('DELETE', `${this.uri}?type=${type}&id=${id}`, {
            responseType: 'text'
        });
    }//deleteType

    /**
     * 移动分类
     * @param type 
     * @param id 
     * @param targetId 
     */
    private arrow(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.uri}/DisplayIndex?type=${entity.type}&id=${entity.id}&index=${entity.displayIndex}`, { headers: this.header });
    }//move

    /**
     * 上移分类
     * @param entity 
     */
    protected arrowUp(entity: T): Observable<T> {
        entity.displayIndex--;
        return this.arrow(entity);
    }//moveUp

    /**
     * 下移分类
     * @param entity 
     */
    protected arrowDown(entity: T): Observable<T> {
        entity.displayIndex++;
        return this.arrow(entity);
    }//moveDown
}
