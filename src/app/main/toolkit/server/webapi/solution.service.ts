import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Solution } from '../../models/solution';
import { Observable } from 'rxjs/Observable';
import { IListableService } from "./ilistableService";
@Injectable()
export class SolutionService extends ApiService<Solution> implements IListableService<Solution> {

    constructor(protected http: HttpClient, protected config: ConfigService) {
        super(http, config);
        this.uriPart = 'solution';
    }

    /**
     * 根据id获取方案信息
     * @param id 
     */
    getById(id: string | number): Observable<Solution> {
        if (!id) {
            return Observable.of(new Solution());
        }
        return super.getEntity(id);
    }

    /**
     * 创建方案信息
     * @param entity 
     */
    create(entity: Solution): Observable<Solution> {
        return super.createEntity(entity);
    }

    /**
     * 更新方案信息
     * @param entity 
     */
    update(entity: Solution): Observable<Solution> {
        return super.updateEntity(entity);
    }

    /**
     * 查询方案信息
     * @param query 
     */
    query(query: IQuery): Observable<Paging<Solution>> {
        return super.queryEntities(query);
    }
}