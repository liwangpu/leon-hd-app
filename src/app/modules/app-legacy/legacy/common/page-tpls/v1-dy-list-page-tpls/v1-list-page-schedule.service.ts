import { Injectable } from '@angular/core';
import { ResourceService } from '../../../services/webapis/resource.service';
import { IPageChangeParam } from './v1-dy-refers';
import { IQueryFilter, IQuery, UIListBSModelField, Paging } from '../../../models/common';
import { IEntity } from '../../../models/ientity';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class V1ListPageScheduleService {
  constructor(protected resourceSrv: ResourceService) {
    //订阅选择模式事件,为了在取消选择时候清空所选项
    this.selectMode$.subscribe(mode => {
      if (!mode && this._selectModeCount > 0) {
        this.cancelAllSelect();
      }
    });
  }//constructor
  /***********************private**********************/

  private _selectModeCount = 0;//为了效率,添加一个选择模式计数器,在默认不选择模式不进行反选清空
  private _selectIds: Array<string> = [];
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
  selectMode$ = new BehaviorSubject<boolean>(false);
  pageChange$ = new Subject<IPageChangeParam>();
  displayModel$ = new BehaviorSubject<string>(undefined);//列表展示模式改变事件
  pageSizeOptions$ = new BehaviorSubject<Array<number>>([0]);
  /***********************property**********************/

  /**
   * 选择模式,默认不选择
   */
  set selectMode(vl: boolean) {
    this._selectModeCount++;
    this.selectMode$.next(vl);
  }
  get selectMode() {
    return this.selectMode$.getValue();
  }
  /**
   * 分页参数
   */
  set pageParam(vl: IPageChangeParam) {
    //页面改变,清空之前的选项,否则选中项弄得太复杂
    this.cancelAllSelect();
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

  /**
   * 添加选择项
   */
  addSelectedId(id: string) {
    let bExist = this._selectIds.some(x => x == id);
    if (bExist) return;
    this._selectIds.push(id);
    let result = this.datas$.getValue();
    let datas = result.data;
    for (let idx = datas.length - 1; idx >= 0; idx--) {
      let curItem = datas[idx];
      if (curItem.id == id) {
        curItem['select'] = true;
        break;
      }
    }
    result.data = datas;
    this.datas$.next(result);
  }//addSelectedId

  /**
   * 移除选择项
   * @param id 
   */
  removeSelectedId(id: string) {
    let bExist = this._selectIds.some(x => x == id);
    if (!bExist) return;
    this._selectIds = this._selectIds.filter(x => x != id);
    let result = this.datas$.getValue();
    let datas = result.data;
    for (let idx = datas.length - 1; idx >= 0; idx--) {
      let curItem = datas[idx];
      if (curItem.id == id) {
        curItem['select'] = false;
        break;
      }
    }
    result.data = datas;
    this.datas$.next(result);
  }//removeSelectedId

  /**
   * 全选
   */
  allSelect() {
    let result = this.datas$.getValue();
    let datas = result.data;
    this._selectIds = datas.map(x => x.id);
    datas = datas.map(x => {
      x['select'] = true;
      return x;
    });
    result.data = datas;
    this.datas$.next(result);
  }//allSelect

  /**
   * 反选
   */
  cancelAllSelect() {
    let result = this.datas$.getValue();
    let datas = result.data;
    this._selectIds = [];
    datas = datas.map(x => {
      x['select'] = false;
      return x;
    });
    result.data = datas;
    this.datas$.next(result);
  }//cancelAllSelect

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
