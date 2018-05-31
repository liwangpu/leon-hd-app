import { Injectable } from '@angular/core';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Subject } from 'rxjs';

@Injectable()
export class DetailEditScheduleService {
  //////////////////////////////////////////////////////////////////////////////////
  private _readyDataOnly = true;
  private _currentData: Ilistable;
  apiSrv: IListableService<Ilistable>;
  //////////////////////////////////////////////////////////////////////////////////
  afterDataRefresh$: Subject<void> = new Subject();//实体数据更新后事件
  afterPersistented$: Subject<void> = new Subject();//数据持久化后事件
  readDataOnly$: Subject<boolean> = new Subject();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
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
