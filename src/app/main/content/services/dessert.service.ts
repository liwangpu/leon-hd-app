import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from "../../toolkit/config/config.service";
import { LocalStoreService } from "./localstore.service";
import { Memory } from "../../toolkit/memory/memory";
import { NavigationData } from '../../toolkit/models/navigation-data';
import { UrlSegment } from '@angular/router';
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
const LASTLOGIN_ACCOUNT = 'LastLogin_Account';
const LASTLOGIN_ACCOUNT_PWD = 'LastLogin_Account_Password';

/**
 * 该服务为应用提供缓存数据
 * 与cache类紧密相关,存数据除了存local或者indexeddb,
 * 还存储一份到cache类,取值默认先取cache缓存
 */
@Injectable()
export class DessertService {
    //nickName
    get nickName() {
        let chvl = Memory.getInstance().nickName;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(NICKNAME);
        return vl;
    }
    set nickName(vl: string) {
        Memory.getInstance().nickName = vl;
        this.lcStoreSrv.setItem(NICKNAME, vl)
    }
    //icon即avatar
    get icon() {
        let chvl = Memory.getInstance().icon;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(AVATAR);
        return vl;
    }
    set icon(vl: string) {
        Memory.getInstance().icon = vl;
        this.lcStoreSrv.setItem(AVATAR, vl)
    }
    //organId
    get organId() {
        let chvl = Memory.getInstance().organId;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(ORGANID);
        return vl;
    }
    set organId(vl: string) {
        Memory.getInstance().organId = vl;
        this.lcStoreSrv.setItem(ORGANID, vl)
    }
    //organId
    get departmentId() {
        let chvl = Memory.getInstance().departmentId;
        if (chvl)
            return chvl;
        let vl = this.lcStoreSrv.getItem(DEPARTMENTID);
        return vl;
    }
    set departmentId(vl: string) {
        Memory.getInstance().departmentId = vl;
        this.lcStoreSrv.setItem(DEPARTMENTID, vl)
    }
    //loginStyle
    get loginStyle() {
        let tmp = Memory.getInstance().loginStyle;
        if (tmp)
            return tmp;
        let vl = parseInt(this.lcStoreSrv.getItem(LOGIN_STYLE));
        if (!vl)
            return this.configSrv.loginStyle;
        return vl;
    };
    set loginStyle(vl: number) {
        if (this.configSrv.loginStyle < 1 || this.configSrv.loginStyle > 2) {
            let tmp = Memory.getInstance().loginStyle;
            Memory.getInstance().loginStyle = 2;
            this.lcStoreSrv.setItem(LOGIN_STYLE, 2);
        }
        else {
            Memory.getInstance().loginStyle = vl;
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
        return tmp === '1' ? true : false;
    }
    set rememberLogin(vl: boolean) {
        this.lcStoreSrv.setItem(REMEMBER_LOGIN, (vl ? '1' : '0'));
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
        let tmp = Memory.getInstance().token;
        if (tmp)
            return tmp;
        return this.lcStoreSrv.getItem(TOKEN);
    }
    set token(vl: string) {
        Memory.getInstance().token = vl;
        this.lcStoreSrv.setItem(TOKEN, vl)
    }
    //isTokenValid
    get isTokenValid() {
        //待完善
        if (this.token)
            return true;
        return false;
    }

    //LastLoginAccount
    set LastLoginAccount(vl: string) {
        this.lcStoreSrv.setItem(LASTLOGIN_ACCOUNT, vl);
    }
    get LastLoginAccount() {
        return this.lcStoreSrv.getItem(LASTLOGIN_ACCOUNT);
    }
    //LastLoginAccountPwd
    set LastLoginAccountPwd(vl: string) {
        this.lcStoreSrv.setItem(LASTLOGIN_ACCOUNT_PWD, vl);
    }
    get LastLoginAccountPwd() {
        return this.lcStoreSrv.getItem(LASTLOGIN_ACCOUNT_PWD);
    }//

    constructor(private translate: TranslateService, private configSrv: ConfigService, private lcStoreSrv: LocalStoreService) {

    }

    reload() {
        // this.translate.use(this.language);

    }

    clear() {
        // this.rememberLogin = false;
        this.navi = '';
        this.token = '';
    }

    private _editPermission: Array<string> = [];


    /**
     * 根据当前请求路径判断用户是否有权限进行编辑
     * @param url 
     */
    hasDataEditPermission(urlSeg: Array<UrlSegment>): boolean {
        if (!this._editPermission || this._editPermission.length <= 0) {
            for (let item of Memory.getInstance().navigationDatas) {
                this.parsePermission(item);
            }
        }

        let arr = urlSeg.map(x => x.path);
        let currentUrl = arr.join('/');

        return this._editPermission.some(x => x.indexOf(currentUrl) > 0 ? true : false);
    }//hasDataEditPermission

    private parsePermission(obj: NavigationData) {
        if (obj.url && obj.editOp)
            this._editPermission.push(obj.url);
        if (!obj.children) return;

        if (obj.children.length === 0) {
            obj.children = undefined;
        }
        else {
            for (let child of obj.children) {
                this.parsePermission(child);
            }
        }
    }//clearChildren

    /**
     * 用于从localstore/indexeddb还原数据到cache类
     */
    restoreCache() {
        Memory.getInstance().token = this.token;
        Memory.getInstance().nickName = this.nickName;
        Memory.getInstance().icon = this.icon;
        Memory.getInstance().organId = this.organId;
        Memory.getInstance().departmentId = this.departmentId;
    }
}