import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportService } from './viewport.service';
import { AppCacheService } from './app-cache.service';

@Injectable({ providedIn: 'root' })
export class RouteguardService {

  constructor(private router: Router, private viewPortSrv: ViewportService, private appCacheSrv: AppCacheService) {
  }//constructor

  canActivate(): Promise<boolean> | boolean {
    let logined = this.appCacheSrv.token ? true : false;
    if (!logined) {
      this.viewPortSrv.outletMaximize$.next(true);
      this.router.navigate(['/login']);
      return false;
    }
    this.viewPortSrv.outletMaximize$.next(false);
    return true;
  }//canActivate

  // canActivate(state: RouterStateSnapshot): Promise<boolean> | boolean {
  //   // let url: string = state.url;
  //   // console.log('state',state, url);
  //   // if (url.toLowerCase().indexOf('login') > -1) {
  //   //   this.viewPortSrv.outletMaximize$.next(true);
  //   //   return true;
  //   // }

  //   // let isLogined = Memory.getInstance().token ? true : false;
  //   // this.viewPortSrv.outletMaximize$.next(!isLogined);
  //   // if (!isLogined) {
  //   //   this.router.navigate(['/login']);
  //   // }
  //   // this.router.navigate(['/login']);
  //   this.viewPortSrv.outletMaximize$.next(false);
  //   return true;
  // }//canActivate
}
