import { Injectable } from '@angular/core';
import { ApiService, Paging } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
// import { FAsset } from '../../models/fasset';
import { FAsset } from '../../models/fasset';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FassetService extends ApiService<FAsset> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'files';
    }

    /**
     * 根据id获取文件信息
     * @param id 
     */
    getById(id: string | number): Observable<FAsset> {
        if (!id) {
            return Observable.of(new FAsset());
        }
        return super.getEntity(id);
    }

    /**
     * 创建文件信息
     * @param entity 
     */
    create(entity: FAsset): Observable<FAsset> {
        return super.createEntity(entity);
    }

    /**
     * 更新文件信息
     * @param entity 
     */
    update(entity: FAsset): Observable<FAsset> {
        return super.updateEntity(entity);
    }

    /**
     * 查询文件信息
     * @param search 
     * @param page 
     * @param pageSize 
     * @param orderBy 
     * @param desc 
     * @param plus 
     */
    query(search: string, order: string, page: number, pageSize: number, orderBy: string, desc: boolean, plus?: object): Observable<Paging<FAsset>> {
        return super.queryEntities(search, order, page, pageSize, orderBy, desc, plus);
    }
}
