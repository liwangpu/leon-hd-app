import { Injectable } from '@angular/core';
import { AppCache } from '../models/app-cache';
import { LocalStoreService } from './local-store.service';
import { Moment } from '../objects/moment';

const c_token = 'dmz_app_token';
const c_token_expires = 'dmz_app_token_expires';
const c_last_login_account = 'dmz_app_last_login_account';
const c_last_lang = 'dmz_app_last_lang';
const c_account_role = 'dmz_app_account_role';
const c_account_name = 'dmz_app_account_name';
const c_account_id = 'dmz_app_account_id';
const c_organization_id = 'dmz_app_organization_id';
@Injectable()
export class AppCacheService {

  /**
   * 之所以采用静态示例,是因为在Angular Interceptor中
   * 无法注入服务,所以类似Api请求的token信息需要保存在原始的对象上才能进入
   * 因此采用静态对象保存基础数据
   */
  private static _instance: AppCache;
  constructor(private localStoreSrv: LocalStoreService) {
    //手动获取一次,触发实例化
    AppCacheService.getInstance();
  }//constructor


  set token(vl: string) {
    AppCacheService.getInstance().token = vl;
    this.localStoreSrv.setItem(c_token, vl);
  }

  get token(): string {
    return AppCacheService.getInstance().token;
  }

  set tokenExpires(vl: string) {
    AppCacheService.getInstance().expires = vl;
    this.localStoreSrv.setItem(c_token_expires, vl);
  }

  get tokenExpires(): string {
    return AppCacheService.getInstance().expires;
  }

  set lastLoginAccount(vl: string) {
    this.localStoreSrv.setItem(c_last_login_account, vl);
  }

  get lastLoginAccount(): string {
    return this.localStoreSrv.getItem(c_last_login_account);
  }

  set lastLang(vl: string) {
    AppCacheService.getInstance().lastLang = vl;
    this.localStoreSrv.setItem(c_last_lang, vl);
  }

  get lastLang(): string {
    return AppCacheService.getInstance().lastLang;
  }

  set nickName(vl: string) {
    AppCacheService.getInstance().nickName = vl;
    this.localStoreSrv.setItem(c_account_name, vl);
  }

  get nickName(): string {
    return AppCacheService.getInstance().nickName;
  }

  set userId(vl: string) {
    AppCacheService.getInstance().userId = vl;
    this.localStoreSrv.setItem(c_account_id, vl);
  }

  get userId(): string {
    return AppCacheService.getInstance().userId;
  }

  set organId(vl: string) {
    AppCacheService.getInstance().organId = vl;
    this.localStoreSrv.setItem(c_organization_id, vl);
  }

  get organId(): string {
    return AppCacheService.getInstance().organId;
  }

  set icon(vl: string) {
    AppCacheService.getInstance().icon = vl;
  }

  get icon(): string {
    return AppCacheService.getInstance().icon;
  }

  set role(vl: string) {
    AppCacheService.getInstance().role = vl;
    this.localStoreSrv.setItem(c_account_role, vl);
  }

  get role(): string {
    return AppCacheService.getInstance().role;
  }




  /**
  * 获取AppCache实例
  */
  static getInstance(): AppCache {
    if (!this._instance)
      this._instance = new AppCache();
    return this._instance;
  }//getInstance

  /**
   * 从cache将缓存还原至实例
   */
  reload() {
    let tokenExpires = this.localStoreSrv.getItem(c_token_expires);
    //判断token是否过期
    if (!tokenExpires || Moment.toDate(tokenExpires) <= new Date())
      return;
    AppCacheService.getInstance().expires = tokenExpires;

    let token = this.localStoreSrv.getItem(c_token);
    AppCacheService.getInstance().token = token;

    let role = this.localStoreSrv.getItem(c_account_role);
    AppCacheService.getInstance().role = role;

    let userId = this.localStoreSrv.getItem(c_account_id);
    AppCacheService.getInstance().userId = userId;

    let organId = this.localStoreSrv.getItem(c_organization_id);
    AppCacheService.getInstance().organId = organId;

    let lastLang = this.localStoreSrv.getItem(c_last_lang);
    AppCacheService.getInstance().lastLang = lastLang;

    let nickName = this.localStoreSrv.getItem(c_account_name);
    AppCacheService.getInstance().nickName = nickName;
  }//reload

  /**
   * 清除重要缓存信息
   */
  clear() {
    this.token = '';
    this.tokenExpires = '1970-01-01 00:00:00';
  }//clear
}
