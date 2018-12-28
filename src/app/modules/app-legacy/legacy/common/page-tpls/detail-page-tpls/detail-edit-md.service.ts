import { Injectable } from '@angular/core';
import { Ilistable } from '../../../models/ilistable';
import { IListableService } from '../../../services/webapis/ilistableService';
import { Subject } from 'rxjs';

@Injectable()
export class DetailEditMdService {

  //////////////////////////////////////////////////////////////////////////////////
  private _readyDataOnly = true;
  private _currentData: Ilistable;
  apiSrv: IListableService<Ilistable>;
  //////////////////////////////////////////////////////////////////////////////////
  afterDataRefresh$ = new Subject<void>();//实体数据更新后事件
  afterPersistented$ = new Subject<void>();//数据持久化后事件
  readDataOnly$ = new Subject<boolean>();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
  afterIConChange$ = new Subject<string>();
  constructor() {

  }//constructor

  set currentData(vl: Ilistable) {
    this._currentData = vl;
    this.afterDataRefresh$.next();
    if (vl.id)
      this.afterPersistented$.next();
  }
  get currentData() {
    return this._currentData;
  }

  /**
 * 列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
 */
  set readDataOnly(vl: boolean) {
    this._readyDataOnly = vl;
    this.readDataOnly$.next(vl);
  }
  get readDataOnly() {
    return this._readyDataOnly;
  }

}
