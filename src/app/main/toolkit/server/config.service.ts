import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ConfigService
{
    public loginStyle = 2;
    public isMaintaining = false;
    public maintainingEndDate = '';
    public serverBase = '';
    public rememberLogin = true;
    public language = 'en';

    constructor(private translate: TranslateService)
    {
        this.reload();
    }

    check()
    {
        if(this.loginStyle < 1 || this.loginStyle > 2)
        {
            this.loginStyle = 2;
        }
        if(!this.serverBase || this.serverBase.indexOf('http') < 0)
        {
            this.serverBase = 'http://localhost:1882';
        }
    }

    reload()
    {
        this.loginStyle = parseInt(localStorage.getItem("loginStyle"));
        this.serverBase = localStorage.getItem("serverBase");
        this.rememberLogin = Boolean(parseInt(localStorage.getItem("rememberLogin")));
        this.language = localStorage.getItem("language");
        this.check();

        this.translate.use(this.language);
    }

    save()
    {
        localStorage.setItem("loginStyle", this.loginStyle.toString());
        localStorage.setItem("serverBase", this.serverBase);
        localStorage.setItem("rememberLogin", this.rememberLogin ? "1" : "0");
        localStorage.setItem("language", this.language);
    }
}