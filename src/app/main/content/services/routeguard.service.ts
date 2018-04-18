import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../../toolkit/server/webapi/auth.service";
import { ConfigService } from "../../toolkit/server/config.service";
import { FuseNavigationService } from '../../../core/components/navigation/navigation.service'


@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService,
        private config: ConfigService,
        private navi: FuseNavigationService,
        private http: HttpClient
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        this.config.reload();

        //检查导航设置，没有的话就从服务器获取一下，解决从local storage的token直接进入后没有获取导航菜单的问题。导航菜单不方便存在local storage
        let naviData = this.navi.getNavigationModel();
        if (this.auth.isLogined() && (naviData == null || naviData.length == 0)) {
            this.auth.loadNavigationData();
        }

        // if (this.config.maintainingEndDate && this.config.maintainingEndDate.length > 6) {
        //     this.router.navigateByUrl('/pages/coming-soon');
        //     return false;
        // }
        // if (this.config.isMaintaining == true) {
        //     this.router.navigateByUrl('/pages/maintenance');
        //     return false;
        // }
        console.log("routeguard. request " + state.url + " user: " + this.auth.account + " islogined: " + this.auth.isLogined());
        if (this.auth.isLogined()) {
            console.log("logined, route allowed");
            return true;
        }
        console.log("not logined, redirect to login page");
        let url: string = state.url;
        if (url && url.indexOf('/auth/login') < 0) {
            sessionStorage.setItem('redirectUrl', url);
        }
        // if (this.config.loginStyle == 1) {
        //     this.router.navigateByUrl('/pages/auth/login');
        // }
        // else {
            this.router.navigateByUrl('/app/login2');
        // }
        return false;
    }
}