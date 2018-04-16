import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { ApiService, Paging } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../models/Account';
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

    getProfile(): Observable<any> {
        return this.http.get(`${this.uri}/account/profile`);
    }

    /**
     * 查询用户组织信息
     * @param search 
     * @param order 
     * @param page 
     * @param pageSize 
     * @param orderBy 
     * @param desc 
     * @param plus 
     */
    query(search: string, order: string, page: number, pageSize: number, orderBy: string, desc: boolean, plus?: object): Observable<Paging<Account>> {
        return super.queryEntities(search, order, page, pageSize, orderBy, desc, plus);
    }
}