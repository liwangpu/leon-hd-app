import { Injectable } from '@angular/core';
import { ApiService, Paging } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Material } from '../../models/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MaterialService extends ApiService<Material> {

    constructor(private http: HttpClient, private config: ConfigService) {
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
     * @param search 
     * @param page 
     * @param pageSize 
     * @param orderBy 
     * @param desc 
     * @param plus 
     */
    query(search: string, order: string, page: number, pageSize: number, orderBy: string, desc: boolean, plus?: object): Observable<Paging<Material>> {
        return super.queryEntities(search, order, page, pageSize, orderBy, desc, plus);
    }
}
