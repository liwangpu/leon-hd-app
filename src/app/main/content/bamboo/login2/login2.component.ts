import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { Router } from '@angular/router';
import { AuthService } from "../../../toolkit/server/webapi/auth.service";
import { FuseNavigationService } from "../../../../core/components/navigation/navigation.service";
import { DessertService } from "../../services/dessert.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-login2',
    templateUrl: './login2.component.html',
    styleUrls: ['./login2.component.scss'],
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
    loginResult: string;
    rememberLogin: boolean = true;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private navi: FuseNavigationService,
        private dessertSrv: DessertService,
        private tranSrv: TranslateService
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            account: {},
            password: {}
        };
    }

    ngOnInit() {
        this.rememberLogin = this.dessertSrv.rememberLogin;
        this.loginForm = this.formBuilder.group({
            account: [this.dessertSrv.LastLoginAccount, [Validators.required]],
            password: [this.dessertSrv.LastLoginAccountPwd, Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }//ngOnInit

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    login() {

        let loginAsync = () => {
            return new Promise((resolve, reject) => {
                let acc = this.loginForm.value.account;
                let pwd = this.loginForm.value.password;
                this.auth.login(acc, pwd).subscribe(rdata => {
                    this.dessertSrv.token = rdata['token'];
                    if (this.rememberLogin)
                        this.dessertSrv.LastLoginAccountPwd = pwd;
                    else
                        this.dessertSrv.LastLoginAccountPwd = '';
                    this.dessertSrv.LastLoginAccount = acc;
                    this.dessertSrv.rememberLogin = this.rememberLogin;
                    resolve();
                }, err => {
                    reject({ k: err });
                });
            });
        };//loginAsync

        let getProfileAsync = () => {
            return new Promise((resolve, reject) => {
                this.auth.getProfile().subscribe(data => {
                    this.dessertSrv.nickName = (data as any).name;
                    this.dessertSrv.icon = data['avatar'];
                    this.dessertSrv.organId = data['organizationId'];
                    this.dessertSrv.userId = (data as any).id;
                    resolve();
                }, err => {
                    reject({ k: 'message.OperationError', v: { value: err } });
                });
            });
        };//getProfileAsync

        let getNaviDataAsync = () => {
            return new Promise((resolve, reject) => {
                this.auth.loadNavigationData().subscribe((rdata) => {
                    this.navi.setNavigationModel(rdata);
                    this.dessertSrv.navi = rdata;
                    resolve();
                }, err => {
                    reject({ k: 'message.OperationError', v: { value: err } });
                });
            });
        };//getNaviDataAsync

        let tranAsync = (msgObj: { k: string, v: string }) => {
            return new Promise((resolve, reject) => {
                if (msgObj && msgObj.k)
                    this.tranSrv.get(msgObj.k, msgObj.v).subscribe(msg => {
                        resolve(msg);
                    });
                else {
                    resolve();
                }
            });
        };//tranAsync

        loginAsync().then(getProfileAsync).then(getNaviDataAsync).then(tranAsync).then(() => {
            if (sessionStorage.getItem('redirectUrl'))
                this.router.navigateByUrl(sessionStorage.getItem('redirectUrl'));
            else
                this.router.navigateByUrl("");
        }).catch(tranAsync).then(msg => {
            this.loginResult = msg as string;
            setTimeout(() => {
                this.loginResult = '';
            }, 2000);
        });
    }//login
}
