import { Injectable } from '@angular/core';
import { Memory } from "../../objects/memory";
import { LocalstoreService } from './localstore.service';
import { Moment } from '../../objects/moment';



const c_token = 'dmz_app_token';
const c_token_expires = 'dmz_app_token_expires';
const c_last_login_account = 'dmz_app_last_login_account';

@Injectable({ providedIn: 'root' })
export class AppCacheService {

  constructor(private localStoreSrv: LocalstoreService) { }

  set token(vl: string) {
    Memory.getInstance().token = vl;
    this.localStoreSrv.setItem(c_token, vl);
  }

  get token(): string {
    return Memory.getInstance().token;
  }

  set tokenExpires(vl: string) {
    Memory.getInstance().expires = vl;
    this.localStoreSrv.setItem(c_token_expires, vl);
  }

  get tokenExpires(): string {
    return Memory.getInstance().expires;
  }

  set lastLoginAccount(vl: string) {
    this.localStoreSrv.setItem(c_last_login_account, vl);
  }

  get lastLoginAccount(): string {
    return this.localStoreSrv.getItem(c_last_login_account);
  }

  set nickName(vl: string) {
    Memory.getInstance().nickName = vl;
  }

  get nickName(): string {
    return Memory.getInstance().nickName;
  }

  set userId(vl: string) {
    Memory.getInstance().userId = vl;
  }

  get userId(): string {
    return Memory.getInstance().userId;
  }

  set organId(vl: string) {
    Memory.getInstance().organId = vl;
  }

  get organId(): string {
    return Memory.getInstance().organId;
  }

  set icon(vl: string) {
    Memory.getInstance().icon = vl;
  }

  get icon(): string {
    return Memory.getInstance().icon;
  }

  set role(vl: string) {
    Memory.getInstance().role = vl;
  }

  get role(): string {
    return Memory.getInstance().role;
  }






  /**
   * 从cache将缓存还原至Memory
   */
  reload() {
    let tokenExpires = this.localStoreSrv.getItem(c_token_expires);
    //判断token是否过期
    if (!tokenExpires || Moment.toDate(tokenExpires) <= new Date())
      return;
    Memory.getInstance().expires = tokenExpires;

    let token = this.localStoreSrv.getItem(c_token);
    Memory.getInstance().token = token;


  }//reload


  clear() {
    this.token = '';
    this.tokenExpires = '1970-01-01 00:00:00';
  }//clear

}
