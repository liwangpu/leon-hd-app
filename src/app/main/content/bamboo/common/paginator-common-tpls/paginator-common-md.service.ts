import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPageChangeParam } from './paging-bar/paging-bar.component';

@Injectable()
export class PaginatorCommonMdService {

  readDataOnly$: Subject<boolean> = new Subject();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
  selectMode$: Subject<boolean> = new Subject();//选择模式|查看模式 true=>选择模式(列表界面不显示checkbox)
  allSelect$: Subject<boolean> = new Subject();//全选|反选
  pageChange$: Subject<IPageChangeParam> = new Subject();//分页页面跳转
  constructor() { }

}
