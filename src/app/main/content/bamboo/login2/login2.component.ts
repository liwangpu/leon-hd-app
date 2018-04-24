import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { Router } from '@angular/router';
import { AuthService } from "../../../toolkit/server/webapi/auth.service";
import { ConfigService } from "../../../toolkit/config/config.service";
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
    rememberLogin: boolean;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private config: ConfigService,
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
        this.rememberLogin = dessertSrv.rememberLogin;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            account: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberLogin: [this.rememberLogin]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

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
        // this.config.rememberLogin = this.rememberLogin;
        this.dessertSrv.rememberLogin = this.rememberLogin;
    }

    login() {

        let loginAsync = () => {
            return new Promise((resolve, reject) => {
                this.auth.login(this.loginForm.value.account, this.loginForm.value.password).subscribe(rdata => {
                    this.dessertSrv.token = rdata['token'];
                    resolve();
                }, err => {
                    reject({ k: err });
                });
            });
        };//loginAsync

        let getProfileAsync = () => {
            return new Promise((resolve, reject) => {
                this.auth.getProfile().subscribe(data => {
                    this.dessertSrv.nickName = data['nickname'];
                    this.dessertSrv.icon = data['avatar'];
                    this.dessertSrv.organId = data['organizationId'];
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

        // loginAsync().then(getProfileAsync).then(getNaviDataAsync).then(() => {
        //     if (sessionStorage.getItem('redirectUrl'))
        //         this.router.navigateByUrl(sessionStorage.getItem('redirectUrl'));
        //     else
        //         this.router.navigateByUrl("");
        // }).catch(err => {
        //     this.loginResult = '账户或密码有误';
        //     setTimeout(() => {
        //         this.loginResult = '';
        //     }, 2000);
        // });
    }//login
}
