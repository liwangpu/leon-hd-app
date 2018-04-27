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

}
