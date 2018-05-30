import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IPageChangeParam } from './paging-bar/paging-bar.component';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { ListDisplayModeEnum, IListTableColumn } from './paginator-common-tpls.component';
import { IQuery } from '../../../../toolkit/server/webapi/api.service';
import { MatTable } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';

@Injectable()
export class PaginatorCommonMdService implements OnDestroy {
  //////////////////////////////////////////////////////////////////////////////////
  apiSvr: IListableService<Ilistable>;//api 服务
  //////////////////////////////////////////////////////////////////////////////////
  // private _manualPaging = false;//手动分页,因为有时候需要先跳转第一页,然后查询数据,而跳转第一页又会造成查询数据,用这个变量指定跳转分页不查询数据
  private _readyDataOnly = true;
  private _selectMode = false;
  private _allSelect = false;
  private _keyword: string;//搜索关键字
  private _pageParam: IPageChangeParam = { pageIndex: 1, pageSize: 500, length: 0 };//当前分页信息
  private _selectedItems: Array<string> = [];//已选择的项id
  private _displayMode: ListDisplayModeEnum = ListDisplayModeEnum.List;
  private _query: IQuery = {};
  private _columnDefs: Array<IListTableColumn<Ilistable>> = [];
  cacheData: Array<Ilistable> = [];
  createdUrl: string;
  defaultPageSizeOption = [];//默认分页按钮参数

  advanceMenuItems = [];
  //////////////////////////////////////////////////////////////////////////////////
  //(注意,各个页面应该只订阅,发布由属性来控制)
  itemSelected$: Subject<Array<string>> = new Subject();//有任何项被选择
  readDataOnly$: Subject<boolean> = new Subject();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
  selectMode$: Subject<boolean> = new Subject();//选择模式|查看模式 true=>选择模式(列表界面不显示checkbox)
  allSelect$: Subject<boolean> = new Subject();//全选|反选
  pageChange$: Subject<IPageChangeParam> = new Subject();//分页页面跳转
  queryData$: Subject<void> = new Subject();//查询数据信息,自动根据当前的关键字等条件查询
  displayMode$: Subject<ListDisplayModeEnum> = new Subject();//列表项显示模式
  afterDataRefresh$: Subject<void> = new Subject();//当数据刷新后触发事件
  afterPaginatorColumnChange$: Subject<Array<IListTableColumn<Ilistable>>> = new Subject();//分页表格column改变后事件
  afterPaginatorTableContentInit$:Subject<void>=new Subject();//列表页面初始化完成后事件
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
    if (vl && vl.length > 0)
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
  /**
   * 设置过滤查询
   */
  set sortData(option: IQuery) {
    if (option) {
      this._query.orderBy = option.orderBy;
      this._query.desc = option.desc;
      this.query();
    }
  }//
  /**
   * 改变分页表格显示列
   */
  set columnDefs(vl: Array<IListTableColumn<Ilistable>>) {
    this._columnDefs = vl;
    this.afterPaginatorColumnChange$.next(vl);
  }
  get columnDefs() {
    return this._columnDefs;
  }

  constructor() {

    //订阅查询数据
    this.queryData$.takeUntil(this.destroy$).subscribe(() => {
      this.query();
    });//
  }//constructor

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  private query() {
    this.cacheData = [];
    this.apiSvr.query({ pageSize: this.pageParam.pageSize, page: this.pageParam.pageIndex, search: (this._keyword ? this._keyword : ''), orderBy: this._query.orderBy, desc: this._query.desc }).takeUntil(this.destroy$).subscribe(res => {
      this.cacheData = [];
      this._pageParam.length = res.total;
      //校正index为1
      if (this._pageParam.pageIndex <= 0)
        this._pageParam.pageIndex = 1;

      if (res.data && res.data.length)
        for (let i = 0, len = res.data.length; i < len; i++) {
          let data = res.data[i];
          data.seqno = i + 1 + (this._pageParam.pageIndex - 1) * this._pageParam.pageSize;
          this.cacheData.push(data);
        }//for
      this.afterDataRefresh$.next();
    });
  }//query

}
