import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { AccountService } from '@geek/micro-app-basic';
import { NavRouterService } from './nav-router.service';
import { Account } from '@geek/micro-app-basic';
@Injectable()
export class ProfileResolverService {

  private _profile: Account;
  profile$ = new BehaviorSubject<Account>(new Account());
  constructor(protected profileSrv: AccountService, protected navRoute: NavRouterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> {
    if (this._profile)
      return of(this._profile);
    return this.profileSrv.requestProfile().pipe(tap(profile => {
      this._profile = profile;
      this.profile$.next(profile);
    })).pipe(catchError(err => {
      if (err.status == 401)
        this.navRoute.goto('login');
      return of(err);
    }));
  }//resolve

  clearProfile() {
    this._profile = null;
  }//clearProfile
}
