import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from "../../toolkit/config/config.service";
import { LocalStoreService } from "./localstore.service";
import { AppCache } from "../../toolkit/cache/appcache";
const LOGIN_STYLE = "LoginStyle";
const SERVER_BASE = 'ServerBase';
const REMEMBER_LOGIN = 'RememberLogin';
const LANGUAGE = 'Language';
const IS_MAINTAINING = 'IsMainaining';
const NAVI = 'Navi';
const TOKEN = 'Token';
const AVATAR = 'User_Avatar';
const NICKNAME = 'NICK_NAME';
const ORGANID = 'Organ_Id';
const DEPARTMENTID = 'Department_Id';

/**
 * 该服务为应用提供缓存数据
 * 与cache类紧密相关,存数据除了存local或者indexeddb,
 * 还存储一份到cache类,取值默认先取cache缓存
 */
@Injectable()
export class DessertService {
    //nickName
    get nickName() {
        let chvl = AppCache.getInstance().nickName;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(NICKNAME);
        return vl;
    }
    set nickName(vl: string) {
        AppCache.getInstance().nickName = vl;
        this.lcStoreSrv.setItem(NICKNAME, vl)
    }
    //icon即avatar
    get icon() {
        let chvl = AppCache.getInstance().icon;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(AVATAR);
        return vl;
    }
    set icon(vl: string) {
        AppCache.getInstance().icon = vl;
        this.lcStoreSrv.setItem(AVATAR, vl)
    }
    //organId
    get organId() {
        let chvl = AppCache.getInstance().organId;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(ORGANID);
        return vl;
    }
    set organId(vl: string) {
        AppCache.getInstance().organId = vl;
        this.lcStoreSrv.setItem(ORGANID, vl)
    }
    //organId
    get departmentId() {
        let chvl = AppCache.getInstance().departmentId;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(DEPARTMENTID);
        return vl;
    }
    set departmentId(vl: string) {
        AppCache.getInstance().departmentId = vl;
        this.lcStoreSrv.setItem(DEPARTMENTID, vl)
    }
    //loginStyle
    get loginStyle() {
        let tmp = AppCache.getInstance().loginStyle;
        if (tmp)
            return tmp;
        let vl = parseInt(this.lcStoreSrv.getItem(LOGIN_STYLE));
        if (!vl)
            return this.configSrv.loginStyle;
        return vl;
    };
    set loginStyle(vl: number) {
        if (this.configSrv.loginStyle < 1 || this.configSrv.loginStyle > 2) {
            AppCache.getInstance().loginStyle = 2;
            this.lcStoreSrv.setItem(LOGIN_STYLE, 2);
        }
        else {
            AppCache.getInstance().loginStyle = vl;
            this.lcStoreSrv.setItem(LOGIN_STYLE, vl);
        }
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
        let tmp = AppCache.getInstance().token;
        if (tmp)
            return tmp;
        return this.lcStoreSrv.getItem(TOKEN);
    }
    set token(vl: string) {
        AppCache.getInstance().token = vl;
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
        // this.translate.use(this.language);

    }

    clear() {
        this.rememberLogin = false;
        this.navi = '';
        this.token = '';
    }

    /**
     * 用于从localstore/indexeddb还原数据到cache类
     */
    restoreCache() {
        AppCache.getInstance().token = this.token;
        AppCache.getInstance().nickName = this.nickName;
        AppCache.getInstance().icon = this.icon;
        AppCache.getInstance().organId = this.organId;
        AppCache.getInstance().departmentId = this.departmentId;
    }
}