import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';
import { IEntitybase } from "../../models/ientitybase";
@Injectable()
export class AuthService extends ApiService<IEntitybase> {

    icon: string;
    account: string;
    nickName: string;
    token: string;
    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'token';
    }

    /**
     * 用户登录
     * @param account 账户名称
     * @param pwd 账户密码
     */
    login(account: string, pwd: string): Observable<Object> {
        this.account = account;
        this.token = '';
        let md5pwd = Md5.hashStr(pwd).toString();
        return this.http.post(this.uri, { account: account, password: md5pwd }, { headers: this.header }).map(rdata => {
            this.token = rdata["token"];
            return rdata;
        });
    }

    /**
     * 注销
     */
    logout() {
        this.token = "";
    }

    /**
     * 用户是否登录
     */
    isLogined(): boolean {
        return this.token && this.token.length > 0;
    }

    /**
     * 获取导航信息
     */
    loadNavigationData() {
        return this.http.get(`${this.config.serverBase}/account/navigation`);
    }

    /**
     * 获取用户个人信息
     */
    getProfile(): Observable<any> {
        return this.http.get(`${this.config.serverBase}/account/profile`).map(rdata => {
            this.nickName = rdata['nickName'];
            this.icon = rdata['icon'];
            return rdata;
        });
    }


}