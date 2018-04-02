import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ConfigService } from '../../../services/config.service';

@Component({
    selector   : 'fuse-login-2',
    templateUrl: './login-2.component.html',
    styleUrls  : ['./login-2.component.scss'],
    animations : fuseAnimations
})
export class FuseLogin2Component implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    loginResult: string;
    rememberLogin: boolean;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private config: ConfigService
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            account   : {},
            password: {}
        };
        this.rememberLogin = this.config.rememberLogin;
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            account   : ['', [Validators.required]],
            password: ['', Validators.required],
            rememberLogin: [this.rememberLogin]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
        this.config.rememberLogin = this.rememberLogin;
        this.config.save();
    }

    login()
    {
        this.loginResult = '';
        this.auth.login(this.loginForm.value.account, this.loginForm.value.password).then(err =>{
            this.loginResult = err;
            console.log('login result: ', err);
            if(!err || err.length == 0)
            {
                if (sessionStorage.getItem('redirectUrl') !== null) 
                {
                    this.router.navigateByUrl(sessionStorage.getItem('redirectUrl'));
                    return true;
                }
                else
                {
                    this.router.navigateByUrl("");
                }
            }
        });
    }
}
