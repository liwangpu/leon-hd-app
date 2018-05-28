import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPageChangeParam } from './paging-bar/paging-bar.component';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';

@Injectable()
export class PaginatorCommonMdService {

  defaultPageParam = { pageIndex: 1, pageSize: 500, length: 0 };
  readDataOnly$: Subject<boolean> = new Subject();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
  selectMode$: Subject<boolean> = new Subject();//选择模式|查看模式 true=>选择模式(列表界面不显示checkbox)
  allSelect$: Subject<boolean> = new Subject();//全选|反选
  pageChange$: Subject<IPageChangeParam> = new Subject();//分页页面跳转
  queryData$: Subject<void> = new Subject();//查询数据信息,自动根据当前的关键字等条件查询
  apiSvr: IListableService<Ilistable>;//api 服务
  keyword: string;//搜索关键字
  pageParam: IPageChangeParam = this.defaultPageParam;//当前分页信息
  constructor() {

  }//constructor

  gotoFirstPage() {
    this.pageChange$.next(this.defaultPageParam);
  }//

}
