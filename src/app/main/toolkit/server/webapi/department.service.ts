import { Injectable } from '@angular/core';
import { Department } from "../../models/department";
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class DepartmentService extends ApiService<Department>  {

    constructor(protected http: HttpClient, protected config: ConfigService) {
        super(http, config);
        this.uriPart = 'department';
    }

    /**
     * 根据Id获取部门信息
     */
    getByOrgan(organId?: string): Observable<Array<Department>> {
        if (!organId)
            organId = '';
        return this.http.get<Array<Department>>(`${this.uri}/byOrgan?organId=${organId}`).pipe(tap(datas => {
            this.queryData$.next(datas);
        }));
    }

    /**
     * 根据id获取部门信息
     * @param id 
     */
    getById(id: string | number): Observable<Department> {
        if (!id) {
            return Observable.of(new Department());
        }
        return super.getEntity(id);
    }

    /**
     * 创建部门信息
     * @param Department 
     */
    create(Department: Department): Observable<Department> {
        return super.createEntity(Department);
    }

    /**
     * 更新部门信息
     * @param Department 
     */
    update(Department: Department): Observable<Department> {
        return super.updateEntity(Department);
    }

    /**
     * 查询部门信息
     * @param query 
     */
    query(query?: IQuery): Observable<Paging<Department>> {
        return super.queryEntities(query);
    }
}