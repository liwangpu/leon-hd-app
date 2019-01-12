import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppCacheService } from './app-cache.service';
import { NavRouterService } from './nav-router.service';

@Injectable()
export class RouteGuardService {

  constructor(private appCacheSrv: AppCacheService, private navRouteSrv: NavRouterService) {
  }//constructor

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    /*
    *注意:ActivatedRouteSnapshot需要引入,不然state.url没有参数,比如登录后需要跳转app/model/products,
    *没有引入ActivatedRouteSnapshot的话,只有app
    */
    let logined = this.appCacheSrv.token ? true : false;
    if (!logined) {
      let params = {
        queryParams: {
          return: state.url
        }
      };
      this.navRouteSrv.goto('/login', params);
      return false;
    }
    return true;
  }//canActivate
}
