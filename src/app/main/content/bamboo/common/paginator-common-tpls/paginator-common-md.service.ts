import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IPageChangeParam } from './paging-bar/paging-bar.component';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { ListDisplayModeEnum } from './paginator-common-tpls.component';

@Injectable()
export class PaginatorCommonMdService implements OnDestroy {
  //////////////////////////////////////////////////////////////////////////////////
  apiSvr: IListableService<Ilistable>;//api 服务
  //////////////////////////////////////////////////////////////////////////////////
  // private _manualPaging = false;//手动分页,因为有时候需要先跳转第一页,然后查询数据,而跳转第一页又会造成查询数据,用这个变量指定跳转分页不查询数据
  private _readyDataOnly = false;
  private _selectMode = false;
  private _allSelect = false;
  private _keyword: string;//搜索关键字
  private _pageParam: IPageChangeParam = { pageIndex: 1, pageSize: 500, length: 0 };//当前分页信息
  private _selectedItems: Array<string> = [];//已选择的项id
  private _displayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;
  cacheData: Array<Ilistable> = [];
  createdUrl: string;
  defaultPageSizeOption = [25, 100, 500];//默认分页按钮参数
  displayColumns = ['seqno', 'icon', 'name', 'description', 'createdTime'];
  //////////////////////////////////////////////////////////////////////////////////
  //(注意,各个页面应该只订阅,发布由属性来控制)
  itemSelected$: Subject<Array<string>> = new Subject();//有任何项被选择
  readDataOnly$: Subject<boolean> = new Subject();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
  selectMode$: Subject<boolean> = new Subject();//选择模式|查看模式 true=>选择模式(列表界面不显示checkbox)
  allSelect$: Subject<boolean> = new Subject();//全选|反选
  pageChange$: Subject<IPageChangeParam> = new Subject();//分页页面跳转
  queryData$: Subject<void> = new Subject();//查询数据信息,自动根据当前的关键字等条件查询
  displayMode$: Subject<ListDisplayModeEnum> = new Subject();//列表项显示模式
  destroy$: Subject<boolean> = new Subject();
  //////////////////////////////////////////////////////////////////////////////////
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
  /**
   * 选择模式|查看模式 true=>选择模式(列表界面不显示checkbox)
   */
  set selectMode(vl: boolean) {
    this._selectMode = vl;
    this.selectMode$.next(vl);
    if (vl) {
      this.displayColumns.unshift('select');
    }
    else {
      this.displayColumns.shift();
    }

    if (!vl)
      this.allSelect = false;

  }
  get selectMode() {
    return this._selectMode;
  }
  /**
   * 全选|反选
   */
  set allSelect(vl: boolean) {
    this._allSelect = vl;
    this.allSelect$.next(vl);
  }
  get allSelect() {
    return this._allSelect;
  }
  /**
   * 页面跳转
   */
  set pageParam(vl: IPageChangeParam) {
    this._pageParam = vl;
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
    this._keyword = vl;
    this.query();
  }
  /**
   * 列表选中项
   */
  set selectedItems(vl: Array<string>) {
    if (vl && vl.length)
      this._selectedItems = vl.filter(x => x);
    else
      this._selectedItems = [];
    this.itemSelected$.next(this._selectedItems);
  }
  get selectedItems() {
    return this._selectedItems;
  }
  /**
   * 设置分页项显示模式
   */
  set displayMode(vl: ListDisplayModeEnum) {
    if (vl != this._displayMode) {
      this._displayMode = vl;
      this.displayMode$.next(vl);
    }
  }
  get displayMode() {
    return this._displayMode;
  }

  constructor() {
    //订阅查询数据
    this.queryData$.takeUntil(this.destroy$).subscribe(() => {
      this.query();
    });//
    //订阅页面跳转
    // this.pageChange$.takeUntil(this.destroy$).subscribe((param) => {
    //   console.log('page change param', param);
    // });//
  }//constructor

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


  private query() {
    this.apiSvr.query({ pageSize: this.pageParam.pageSize, page: this.pageParam.pageIndex, search: (this._keyword ? this._keyword : '') }).takeUntil(this.destroy$).subscribe(res => {
      this.cacheData = [];
      this._pageParam.length = res.total;
      //校正index为1
      if (this._pageParam.pageIndex <= 0)
        this._pageParam.pageIndex = 1;
      if (res.total <= 0)
        return;
      for (let i = 0, len = res.data.length; i < len; i++) {
        let data = res.data[i];
        data.seqno = i + 1 + (this._pageParam.pageIndex - 1) * this._pageParam.pageSize;
        this.cacheData.push(data);
      }//for
    });
  }//query

}
