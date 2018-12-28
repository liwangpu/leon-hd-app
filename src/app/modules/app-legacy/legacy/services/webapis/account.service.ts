import { Injectable } from '@angular/core';
import { AppCacheService } from '../common/app-cache.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NavLink } from '../../models/nav-link';
import { tap } from 'rxjs/operators';
import { Account } from '../../models/account';
import { IQuery, IQueryFilter, Paging } from '../../models/common';
import { WebapiService } from './webapi.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Md5 } from 'ts-md5';

@Injectable({ providedIn: 'root' })
export class AccountService extends WebapiService<Account> implements Resolve<Observable<Account>>{

    editData$ = new BehaviorSubject<Account>(new Account());
    profile$ = new BehaviorSubject<AccountProfile>(new AccountProfile());
    navigations$ = new BehaviorSubject<Array<NavLink>>([]);
    constructor(protected http: HttpClient, protected appCacheSrv: AppCacheService) {
        super(http);
        this.uriPart = 'account';
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> | Observable<Observable<Account>> | Promise<Observable<Account>> {
        let id = route.paramMap.get('id');
        return this.getEntity<Account>(id).pipe(tap(data => {
            this.editData$.next(data ? data : new Account());
        })) as Observable<Account>;
    }

    /**
     * 获取用户导航信息
     */
    getNavigation() {
        let durl = `${this.uri}/navigation`;
        return this.http.get(durl, { headers: this.header }).pipe(tap(data => {
            // console.log('dddddd ', data['model']);
            this.navigations$.next(data['model']);
        }));
    }//getNavigation

    /**
     * 获取用户个人信息
     */
    getProfile(): Observable<AccountProfile> {
        return this.http.get<AccountProfile>(`${this.uri}/profile`).pipe(tap(rdata => {
            this.profile$.next(rdata);
        }));
    }//getProfile


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
            return of(new Account());
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
        return this.http.put<Account>(`${this.uri}`, entity, { headers: this.header }).pipe(tap(x => {
            this.editData$.next(x);
        }));
    }//update

    /**
     * 查询账户信息
     * @param query 
     */
    query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<Account>> {
        return super.queryEntities(query, advanceQueryFilters);
    }

    //规整完后删除
    editPermission(data: any) { }

}

export class AccountProfile {
    id: string;
    name: string;
    mail: string;
    phone: string;
    avatar: string;
    location: string;
    brief: string;
    organizationId: string;
    organization: string;
    departmentId: string;
    role: string;
}
