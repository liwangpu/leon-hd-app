import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const SERVER_BASE = 'http://localhost:1882';
const LOGIN_STYLE = 2;
const IS_MAINTAINING = false;
const MAINTAINING_ENDDATE = '';
const rememberLogin = true;
const LANGUAGE = 'en';

@Injectable()
export class ConfigService {

    get serverBase() {
        return SERVER_BASE;
    }

    get loginStyle() {
        return LOGIN_STYLE;
    }

    get isMaintaining() {
        return IS_MAINTAINING;
    }

    get maintainingEndDate() {
        return MAINTAINING_ENDDATE;
    }

    get language() {
        return LANGUAGE;
    }
    // public loginStyle = 2;
    // public isMaintaining = false;
    // public maintainingEndDate = '';
    // public serverBase = '';
    // public rememberLogin = true;
    // public language = 'en';

    // constructor(private translate: TranslateService)
    // {
    //     // this.reload();
    // }

    // check()
    // {
    //     if(this.loginStyle < 1 || this.loginStyle > 2)
    //     {
    //         this.loginStyle = 2;
    //     }
    //     if(!this.serverBase || this.serverBase.indexOf('http') < 0)
    //     {
    //         this.serverBase = 'http://localhost:1882';
    //     }
    // }

    // reload()
    // {
    //     this.loginStyle = parseInt(localStorage.getItem("loginStyle"));
    //     this.serverBase = localStorage.getItem("serverBase");
    //     this.rememberLogin = Boolean(parseInt(localStorage.getItem("rememberLogin")));
    //     this.language = localStorage.getItem("language");

    //     this.check();
    //     this.translate.use(this.language);
    // }

    // save()
    // {
    //     localStorage.setItem("loginStyle", this.loginStyle.toString());
    //     localStorage.setItem("serverBase", this.serverBase);
    //     localStorage.setItem("rememberLogin", this.rememberLogin ? "1" : "0");
    //     localStorage.setItem("language", this.language);
    // }
}