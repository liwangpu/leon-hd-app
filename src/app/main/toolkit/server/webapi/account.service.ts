import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ApiService, IQuery, Paging } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../models/account';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class AccountService extends ApiService<Account> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'account';
    }

    getNavigation() {
        let durl = `${this.uri}/navigation`;
        return this.http.get(durl, { headers: this.header })
    }

    /**
     * 注册用户
     * @param entity 
     */
    regist(entity: Account): Observable<Account> {
        return this.http.post<Account>(`${this.uri}`, entity, { headers: this.header });
    }//registAccount

    /**
     * 根据Id获取用户信息
     * @param id 
     */
    getById(id: string | number): Observable<Account> {
        if (!id) {
            return Observable.of(new Account());
        }
        return super.getEntity(id);
    }

    /**
     * 更新用户
     * @param entity 
     */
    update(entity: Account): Observable<Account> {
        if (!entity.id)
            return this.regist(entity);
        return this.http.put<Account>(`${this.uri}`, entity, { headers: this.header });
    }//update

    /**
     * 查询账户信息
     * @param query 
     */
    query(query: IQuery): Observable<Paging<Account>> {
        return super.queryEntities(query);
    }
}