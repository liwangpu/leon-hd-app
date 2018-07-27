import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TokenService } from "../../share/services/webapis/token.service";
import { AppCacheService } from "../../share/services/common/app-cache.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberLogin: boolean = true;
  loginMsg = '';
  loginError = false;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private tokenSrv: TokenService, private appCacheSrv: AppCacheService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
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

  login() {
    let acc = this.loginForm.value.username;
    let pwd = this.loginForm.value.password;
    let source$ = this.tokenSrv.requestToken(acc, pwd);
    source$.subscribe(() => {
      if (!this.rememberLogin) {
        acc = '';
        pwd = '';
      }

      let lastLoginAccount = { username: acc, password: pwd };
      this.appCacheSrv.lastLoginAccount = JSON.stringify(lastLoginAccount);
      this.loginError = false;
      this.router.navigateByUrl('');
    }, () => {
      this.loginError = true;
    });
  }//login

}
