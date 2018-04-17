import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { StaticMesh } from '../../models/staticmesh';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaticmeshService extends ApiService<StaticMesh> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'staticMesh';
    }

    /**
       * 根据id获取模型信息
       * @param id 
       */
    getById(id: string | number): Observable<StaticMesh> {
        if (!id) {
            return Observable.of(new StaticMesh());
        }
        return super.getEntity(id);
    }

    /**
     * 创建模型信息
     * @param StaticMesh 
     */
    create(entity: StaticMesh): Observable<StaticMesh> {
        return super.createEntity(entity);
    }

    /**
     * 更新模型信息
     * @param entity 
     */
    update(entity: StaticMesh): Observable<StaticMesh> {
        return super.updateEntity(entity);
    }

    /**
     * 查询模型信息
     * @param query 
     */
    query(query: IQuery): Observable<Paging<StaticMesh>> {
        return super.queryEntities(query);
    }
}
