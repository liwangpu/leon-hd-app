import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, concat } from 'rxjs';
import { tap, takeUntil } from "rxjs/operators";
import { NavRouterService, AppCacheService } from 'scaffold-app-core';
import { TokenService, AccountService } from 'micro-app-basic';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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

  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


}
