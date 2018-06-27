import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ApiService, IQuery, Paging } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../models/account';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class AccountService extends ApiService<Account> {

    constructor(protected http: HttpClient, protected config: ConfigService) {
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
     * 修改密码
     * @param oldPassword 
     * @param newPassword 
     */
    changePassword(oldPassword: string, newPassword: string) {
        let data = {
            oldPassword: Md5.hashStr(oldPassword).toString(),
            newPassword: Md5.hashStr(newPassword).toString()
        };
        return this.http.put(`${this.uri}/changePassword`, data, { headers: this.header, responseType: 'text' });
    }//changePassword

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
    query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<Account>> {
        return super.queryEntities(query, advanceQueryFilters);
    }
}