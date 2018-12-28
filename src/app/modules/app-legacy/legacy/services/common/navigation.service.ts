import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UrlSegment } from '@angular/router';
import { AccountService } from '../webapis/account.service';
import { NavLink } from '../../models/nav-link';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  navigate$ = new BehaviorSubject<string>('');
  constructor(private accountSrv: AccountService) { }

  _editPermission: Array<string> = [];

  /**
  * 根据当前请求路径判断用户是否有权限进行编辑
  * @param url 
  */
  hasDataEditPermission(url: Array<UrlSegment> | string): boolean {
    if (!this._editPermission || this._editPermission.length <= 0) {
      this._editPermission = [];
      for (let item of this.accountSrv.navigations$.getValue()) {
        this.parsePermission(item);
      }
    }


    let currentUrl = '';
    if (typeof url === 'object') {
      currentUrl = this.joinUrlSegment(url);
    }
    else {
      currentUrl = url;
    }

    return this._editPermission.some(x => x.indexOf(currentUrl) > 0 ? true : false);
  }//hasDataEditPermission


  private parsePermission(obj: NavLink) {
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
  * 简单缓存一下列表页面上次的显示模式
  */
  private _listPageLastDisplayMode: [string, number] = ['', 1];

  private joinUrlSegment(urlSeg: Array<UrlSegment>): string {
    let arr = urlSeg.map(x => x.path);
    return arr.join('/');
  }//joinUrlSegment

  cacheListPageLastDisplayMode(urlSeg: Array<UrlSegment>, vl: number) {
    let currentUrl = this.joinUrlSegment(urlSeg);
    this._listPageLastDisplayMode = [currentUrl, vl];
  }//cacheListPageLastDisplayMode

  getListPageLastDisplayMode(urlSeg: Array<UrlSegment>): number {
    let currentUrl = this.joinUrlSegment(urlSeg);
    if (currentUrl !== this._listPageLastDisplayMode[0])
      return 1;
    else
      return this._listPageLastDisplayMode[1];
  }//getListPageLastDisplayMode

  /**
  * 判断是否最近访问的页面
  */
  isLatestVisitPage(urlSeg: Array<UrlSegment>): boolean {
    let currentUrl = this.joinUrlSegment(urlSeg);
    if (currentUrl === this._listPageLastDisplayMode[0])
      return true;
    return false;
  }//isLatestVisitPage
}
