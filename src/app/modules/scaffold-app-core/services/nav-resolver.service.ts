import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppCacheService } from './app-cache.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Navigation, UserNavService } from 'micro-app-basic';
import { NavRouterService } from './nav-router.service';

@Injectable()
export class NavResolverService {

  private _navs: Array<Navigation>;
  navs$ = new BehaviorSubject<Array<Navigation>>([]);
  constructor(protected cacheSrc: AppCacheService, protected navSrv: UserNavService, protected navRoute: NavRouterService) { }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Navigation>> {
    let role = this.cacheSrc.role;
    if (this._navs)
      return of(this._navs);
    return this.navSrv.getUserNav().pipe(tap(navs => {
      this._navs = navs;
      this.navs$.next(navs);
    })).pipe(catchError(err => {
      if (err.status == 401)
        this.navRoute.goto('login');
      return of(err);
    }));
  }//resolve

  clearNavs() {
    this._navs = null;
  }//clearProfile
}
