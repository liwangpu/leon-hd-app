import { Injectable } from '@angular/core';
import { FuseNavigationService } from '../../../core/components/navigation/navigation.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { AuthService as apiAuthService } from '../../shared/server/webapi/auth.service';
import { AccountService } from "../../shared/server/webapi/account.service";
@Injectable()
export class AuthService {
    icon: string;
    account: string;
    nickName: string;
    token: string;

    constructor(private config: ConfigService, private navi: FuseNavigationService, private router: Router, private authApiSrv: apiAuthService, private accountSrv: AccountService) {
        this.icon = localStorage.getItem("icon");
        this.account = localStorage.getItem("account");
        this.nickName = localStorage.getItem("nickName");
        this.token = localStorage.getItem("token");
    }

    /**
     * 登录
     * @param account 
     * @param pwd 
     */
    login(account: string, pwd: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.account = account;
            localStorage.setItem("account", this.account);
            this.token = '';
            this.authApiSrv.login(this.account, pwd).subscribe(data => {
                this.token = data['token'];
                if (this.token && this.token.length > 0) {
                    if (this.config.rememberLogin) {
                        localStorage.setItem("token", this.token);
                    }
                    this.accountSrv.getProfile().subscribe(data => {
                        this.nickName = data['nickName']; this.icon = data['icon'];
                        localStorage.setItem("icon", this.icon);
                        localStorage.setItem("nickName", this.nickName);
                        this.loadNavigationData();
                        resolve('');
                    }, error => {
                        this.loadNavigationData();
                        resolve('');
                    });
                }
                else {
                    console.log('token failed. ', this.token);
                    resolve(data.toString());
                }

            }, error => {
                console.log('error: ', error);
                resolve('request failed');
            });

        });
    }//login

    /**
     * 注销账户
     */
    logout() {
        this.token = "";
        localStorage.setItem("token", "");
        this.navi.setNavigationModel({});

        if (this.config.loginStyle == 1) {
            this.router.navigateByUrl('/pages/auth/login');
        }
        else {
            this.router.navigateByUrl('/pages/auth/login-2');
        }
    }//logout

    isLogined(): boolean {
        return this.token && this.token.length > 0;
    }

    /**
     * 加载用户导航设置
     */
    loadNavigationData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.authApiSrv.loadNavigationData().subscribe(rdata => {
                this.navi.setNavigationModel(rdata);
                resolve(rdata);
            }, reject);

        });
    }//loadNavigationData
}