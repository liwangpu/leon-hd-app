import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Material } from '../../models/material';
import { Observable } from 'rxjs/Observable';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class MaterialService extends ApiService<Material> {

    constructor(protected http: HttpClient, protected config: ConfigService) {
        super(http, config);
        this.uriPart = 'Material';
    }

    /**
     * 根据id获取材质信息
     * @param id 
     */
    getById(id: string | number): Observable<Material> {
        if (!id) {
            return Observable.of(new Material());
        }
        return super.getEntity(id);
    }

    /**
     * 创建材质信息
     * @param entity 
     */
    create(entity: Material): Observable<Material> {
        return super.createEntity(entity);
    }

    /**
     * 更新材质信息
     * @param entity 
     */
    update(entity: Material): Observable<Material> {
        return super.updateEntity(entity);
    }

    /**
     * 查询材质信息
     * @param query 
     * @param advanceQueryFilters 
     */
    query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<Material>> {
        return super.queryEntities(query, advanceQueryFilters);
    }

    /**
    * 批量修改材质分类
    * @param ids 
    * @param categoryId 
    */
    bulkChangeCategory(ids: string, categoryId: string) {
        return this.http.request('PUT', this.uri + '/BulkChangeCategory', { headers: this.header, body: { ids: ids, categoryId: categoryId }, responseType: 'text' });
    }//bulkChangeCategory
}
