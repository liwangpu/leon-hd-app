import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { FileAsset } from '../../models/fileasset';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileAssetService extends ApiService<FileAsset> {

    constructor(protected http: HttpClient, protected config: ConfigService) {
        super(http, config);
        this.uriPart = 'files';
    }

    /**
     * 根据id获取文件信息
     * @param id 
     */
    getById(id: string | number): Observable<FileAsset> {
        if (!id) {
            return Observable.of(new FileAsset());
        }
        return super.getEntity(id);
    }

    /**
     * 创建文件信息
     * @param entity 
     */
    create(entity: FileAsset): Observable<FileAsset> {
        return super.createEntity(entity);
    }

    /**
     * 更新文件信息
     * @param entity 
     */
    update(entity: FileAsset): Observable<FileAsset> {
        return super.updateEntity(entity);
    }

    /**
     * 查询文件信息
     * @param query 
     */
    query(query: IQuery): Observable<Paging<FileAsset>> {
        return super.queryEntities(query);
    }
}
