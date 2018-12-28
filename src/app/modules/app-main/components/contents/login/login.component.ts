import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, concat } from 'rxjs';
import { tap, takeUntil } from "rxjs/operators";
import { NavRouterService, AppCacheService } from '@geek/scaffold-app-core';
import { AccountService, TokenService, Account } from '@geek/micro-app-basic';

@Component({
  selector: 'app-main-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  rememberLogin: boolean = true;
  loginMsg = '';
  loginError = false;
  returnUrl: string;
  loginForm: FormGroup;
  destroy$ = new Subject<boolean>();
  constructor(protected route: ActivatedRoute, protected formBuilder: FormBuilder, protected navRouteSrv: NavRouterService, protected tokenSrv: TokenService, protected appCacheSrv: AppCacheService, protected profileSrv: AccountService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => this.returnUrl = params['return']);

    let lastLoginAccountStr = this.appCacheSrv.lastLoginAccount;
    if (lastLoginAccountStr) {
      let lastLoginAccount = JSON.parse(lastLoginAccountStr);
      this.loginForm.patchValue(lastLoginAccount);
    }
    this.loginForm.valueChanges.subscribe(vl => {
      this.loginMsg = undefined;
      this.loginError = false;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  login() {
    let acc = this.loginForm.value.username;
    let pwd = this.loginForm.value.password;

    let token$ = this.tokenSrv.requestToken(acc, pwd).pipe(tap(res => {
      this.appCacheSrv.token = res.token;
      this.appCacheSrv.tokenExpires = res.expires;
      if (!this.rememberLogin) {
        acc = '';
        pwd = '';
      }
      let lastLoginAccount = { username: acc, password: pwd };
      this.appCacheSrv.lastLoginAccount = JSON.stringify(lastLoginAccount);
    }));

    let profile$ = this.profileSrv.requestProfile().pipe(tap(profile => {
      this.appCacheSrv.nickName = profile.name;
      this.appCacheSrv.userId = profile.id;
      this.appCacheSrv.organId = profile.organizationId;
      this.appCacheSrv.icon = profile.icon;
    }));

    concat(token$, profile$).subscribe(x => {
    }, error => {
      this.loginError = true;
    }, () => {
      if (this.returnUrl)
        this.navRouteSrv.goto(this.returnUrl);
      else
        this.navRouteSrv.goto('/');
    });
  }//login
}
