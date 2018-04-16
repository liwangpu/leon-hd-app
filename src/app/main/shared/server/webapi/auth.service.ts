import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';
@Injectable()
export class AuthService extends ApiService<{ id: string, name: string }> {

    account: string;
    logined: boolean;
    // set token(value) {
    //     localStorage.setItem('token', value);
    // }
    // get token() {
    //     return localStorage.getItem('token');
    // }
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
        let md5pwd = Md5.hashStr(pwd).toString();
        const res = this.http.post(this.uri, { account: account, password: md5pwd }, { headers: this.header });
        res.subscribe(rdata => {
            // this.token = rdata["token"];
            this.logined = true;
        })
        return res;
    }

    loadNavigationData() {
        return this.http.get(`${this.config.serverBase}/account/navigation`);
    }

}