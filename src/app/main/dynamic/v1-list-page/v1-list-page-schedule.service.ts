import { Injectable } from '@angular/core';
import { UIListBSModelField, Paging, IQueryFilter, IQuery } from '../../../share/models/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { IEntity } from '../../../share/models/ientity';
import { IPageChangeParam } from '../list-refers/list-refers';
import { ResourceService } from '../../../share/services/webapis/resource.service';
import { takeUntil, skip } from '../../../../../node_modules/rxjs/operators';

@Injectable()
export class V1ListPageScheduleService {
  constructor(protected resourceSrv: ResourceService) {

  }//constructor
  /***********************private**********************/

  private _pageParam: IPageChangeParam = { length: 0, previousPageIndex: 0, pageIndex: 0, pageSize: 0 };//分页参数
  private _keyword: string;//搜索关键字
  private _advanceQueryFilters: Array<IQueryFilter> = [];//高级查询过滤条件
  private _query: IQuery = {};//基本查询过滤条件
  /***********************subject**********************/
  columnDefs$ = new BehaviorSubject<Array<UIListBSModelField>>([]);//分页列表列定义
  datas$ = new BehaviorSubject<Paging<IEntity>>({
    data: [],
    page: 1,
    size: 0,
    total: 0
  });//分页数据查询改变事件
  pageChange$ = new Subject<IPageChangeParam>();
  displayModel$ = new BehaviorSubject<string>(undefined);//列表展示模式改变事件
  pageSizeOptions$ = new BehaviorSubject<Array<number>>([0]);
  /***********************property**********************/

  /**
   * 分页参数
   */
  set pageParam(vl: IPageChangeParam) {
    this._pageParam = vl;
    this.pageChange$.next(vl);
    this.query();
  }
  get pageParam() {
    return this._pageParam;
  }
  /**
   * 搜索关键词
   */
  set keyword(vl: string) {
    this._pageParam.pageIndex = 0;
    this._pageParam.length = 0;
    this._pageParam.pageIndex = 0;
    this._keyword = vl;
    this.query();
  }

  /***********************method**********************/
  query() {
    //修正paginator index从0开始
    let t_pageIndex = this.pageParam.pageIndex + 1;
    this.resourceSrv.query({ pageSize: this.pageParam.pageSize, page: t_pageIndex, search: (this._keyword ? this._keyword : ''), orderBy: this._query.orderBy, desc: this._query.desc }, this._advanceQueryFilters).subscribe(res => {
      // console.log('query datas', res);
      // this.cacheData = [];
      // this._pageParam.length = res.total;

      // let tindex = this._pageParam.pageIndex;
      // //校正index为1
      // if (tindex <= 0)
      //   tindex = 1;

      // if (res.data && res.data.length)
      //   for (let i = 0, len = res.data.length; i < len; i++) {
      //     let data = res.data[i];
      //     data.seqno = i + 1 + (tindex - 1) * this._pageParam.pageSize;
      //     this.cacheData.push(data);
      //   }//for
      // this.afterDataRefresh$.next();
      this.datas$.next(res);
    });
  }//query
}
