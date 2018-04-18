import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from "../../toolkit/config/config.service";
import { LocalStoreService } from "./localstore.service";

const LOGIN_STYLE = "LoginStyle";
const SERVER_BASE = 'ServerBase';
const REMEMBER_LOGIN = 'RememberLogin';
const LANGUAGE = 'Language';
const IS_MAINTAINING = 'IsMainaining';
const NAVI = 'Navi';
const TOKEN = 'Token';
@Injectable()
export class DessertService {
    //loginStyle
    get loginStyle() {
        let vl = parseInt(this.lcStoreSrv.getItem(LOGIN_STYLE));
        if (!vl)
            return this.configSrv.loginStyle;
        return vl;
    };
    set loginStyle(vl: number) {
        if (this.configSrv.loginStyle < 1 || this.configSrv.loginStyle > 2)
            this.lcStoreSrv.setItem(LOGIN_STYLE, 2)
        else
            this.lcStoreSrv.setItem(LOGIN_STYLE, vl)
    };
    //isMaintaining
    get isMaintaining() {
        let vl = Boolean(this.lcStoreSrv.getItem(IS_MAINTAINING));
        if (!vl)
            return false;
        return vl;
    }
    set isMaintaining(vl: boolean) {
        this.lcStoreSrv.setItem(IS_MAINTAINING, vl)
    };
    //maintainingEndDate
    get maintainingEndDate() {
        return new Date();
    }
    set maintainingEndDate(vl: Date) {

    }
    //serverBase
    get serverBase() {
        return this.configSrv.serverBase;
    }
    //rememberLogin
    get rememberLogin() {
        let tmp = this.lcStoreSrv.getItem(REMEMBER_LOGIN);
        return tmp ? true : false;
    }
    set rememberLogin(vl: boolean) {
        this.lcStoreSrv.setItem(REMEMBER_LOGIN, vl ? 'true' : '')
    };
    //language
    get language() {
        let vl = this.lcStoreSrv.getItem(LANGUAGE);
        if (vl)
            return vl;
        return 'en';
    }
    set language(vl: string) {
        this.lcStoreSrv.setItem(LANGUAGE, vl)
    };
    //navi
    get navi() {
        return this.lcStoreSrv.getItem(NAVI);
    }
    set navi(vl: any) {
        this.lcStoreSrv.setItem(NAVI, vl)
    }
    //token
    get token() {
        return this.lcStoreSrv.getItem(TOKEN);
    }
    set token(vl: string) {
        this.lcStoreSrv.setItem(TOKEN, vl)
    }
    //isTokenValid
    get isTokenValid() {
        //待完善
        if (this.token)
            return true;
        return false;
    }

    constructor(private translate: TranslateService, private configSrv: ConfigService, private lcStoreSrv: LocalStoreService) {

    }

    reload() {
        this.translate.use(this.language);
    }

    clear() {
        this.rememberLogin = false;
        this.navi = '';
        this.token = '';
    }
}