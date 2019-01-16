import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Organization } from '../../models/organization';
import { Observable,of } from 'rxjs';
import { Account } from "../../models/account";
@Injectable({ providedIn: 'root' })
export class OrganService extends ApiService<Organization> {
    constructor(protected http: HttpClient, protected config: ConfigService) {
        super(http, config);
        this.uriPart = 'organ';
    }

    /**
     * 根据id获取组织信息
     * @param id 
     */
    getById(id: string | number): Observable<Organization> {
        if (!id)
            return of(new Organization());
        return super.getEntity(id);
    }

    getOwner(id: string | number): Observable<Account> {
        if (!id)
            return of(new Account());
        return this.http.get<Account>(`${this.uri}/owner?organId=${id}`, { headers: this.header });
    }

    /**
     * 创建组织信息
     * @param entity 
     */
    create(entity: Organization): Observable<Organization> {
        return super.createEntity(entity);
    }

    /**
     * 更新组织信息
     * @param entity 
     */
    update(entity: Organization): Observable<Organization> {
        return super.updateEntity(entity);
    }

    /**
     * 查询组织信息
     * @param query 
     */
    query(query?: IQuery): Observable<Paging<Organization>> {
        return super.queryEntities(query);
    }


}