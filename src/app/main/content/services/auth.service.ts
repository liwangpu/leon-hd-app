// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FuseNavigationService } from '../../../core/components/navigation/navigation.service'
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { ConfigService } from './config.service';
// import { Md5 } from 'ts-md5/dist/md5';

// @Injectable()
// export class AuthService
// {
//     icon: string;
//     account: string;
//     nickName: string;
//     token: string;
//     // http请求的头
//     authOpt: any;

//     constructor(
//         private config: ConfigService,
//         private http: HttpClient,
//         private navi : FuseNavigationService,
//         private router: Router
//     )
//     {
//         this.icon = localStorage.getItem("icon");
//         this.account = localStorage.getItem("account");
//         this.nickName = localStorage.getItem("nickName");
//         this.token = localStorage.getItem("token");
//         this.authOpt = {
//             headers: new HttpHeaders({
//                 'Content-Type': 'application/json',
//                 'Authorization': 'bearer ' + this.token
//             })
//         }
//     }

//     login(account: string, pwd: string): Promise<string>
//     {
//         return new Promise((resolve, reject) => {

//         const opt = {
//             headers: new HttpHeaders({
//                 'Content-Type': 'application/json'
//             })
//         }

//         this.account = account;
//         localStorage.setItem("account", this.account);

//         let md5pwd = Md5.hashStr(pwd).toString();
//         this.account = account;
//         this.token = '';
//         this.http.post(this.config.serverBase + '/token', { account: this.account, password: md5pwd }, opt)
//             .subscribe(data => {
//                 this.token = data['token'];
//                 if(this.token && this.token.length > 0)
//                 {
//                     console.log('token got!');
//                     if(this.config.rememberLogin)
//                     {
//                         localStorage.setItem("token", this.token);
//                     }
//                     this.authOpt = {
//                         headers: new HttpHeaders({
//                             'Content-Type': 'application/json',
//                             'Authorization': 'bearer ' + this.token
//                         })
//                     }
//                     this.http.get(this.config.serverBase + '/account/profile', this.authOpt).subscribe(data => {
//                         this.nickName = data['nickName']; this.icon = data['icon'];                        
//                         localStorage.setItem("icon", this.icon);
//                         localStorage.setItem("nickName", this.nickName);
//                         this.loadNavigationData();
//                         resolve('');
//                     }, error => { 
//                         this.loadNavigationData();
//                         resolve('');});

//                 }
//                 else
//                 {
//                     console.log('token failed. ', this.token);
//                     resolve(data.toString());
//                 }
//             }, 
//             error => { 
//                 console.log('error: ', error);            
//                 resolve('request failed');
//             });
        
//         });
//     }

//     logout()
//     {
//         this.token = "";
//         localStorage.setItem("token", "");
//         this.navi.setNavigationModel({});

//         if(this.config.loginStyle == 1)
//         {
//             this.router.navigateByUrl('/pages/auth/login');
//         }
//         else
//         {
//             this.router.navigateByUrl('/pages/auth/login-2');
//         }
//     }

//     isLogined() : boolean
//     {
//         return this.token && this.token.length > 0;
//     }

//     loadNavigationData(): Promise<any>
//     {
//         return new Promise((resolve, reject) => {
//             this.http.get(this.config.serverBase + '/account/navigation', this.authOpt)
//                 .subscribe((response: any) => {
//                     this.navi.setNavigationModel(response);
//                     resolve(response);
//                 }, reject);
//         });
//     }
// }