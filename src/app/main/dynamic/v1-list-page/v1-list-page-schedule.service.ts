import { Injectable } from '@angular/core';
import { UIListBSModelField, Paging } from '../../../share/models/common';
import { BehaviorSubject } from '../../../../../node_modules/rxjs';
import { IEntity } from '../../../share/models/ientity';

@Injectable()
export class V1ListPageScheduleService {

  columnDefs: Array<UIListBSModelField>;
  datas$ = new BehaviorSubject<Paging<IEntity>>({
    data: [],
    page: 1,
    size: 0,
    total: 0
  });//分页数据查询改变事件
  displayModel$ = new BehaviorSubject<string>(undefined);//列表展示模式改变事件
  constructor() { }
}
