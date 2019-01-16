import { Injectable } from '@angular/core';
import { IListableService } from '../../../services/webapis/ilistableService';
import { Ilistable } from '../../../models/ilistable';
import { IQueryFilter } from '../../interfaces/iqueryFilter';
import { IQuery } from '../../../services/webapis/api.service';
import { IListTableColumn, IListableRecordMenu, ListDisplayModeEnum, IPageChangeParam } from './paginator-refers';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { saveAs } from 'file-saver/FileSaver';
import { NavigationService } from '../../../services/common/navigation.service';
import { AppProgressService } from 'scaffold-app-core';

@Injectable()
export class PaginatorCommonMdService {
  //兼容legacy
  pagedModel: Array<string> = [];
  //////////////////////////////////////////////////////////////////////////////////
  apiSvr: IListableService<Ilistable>;//api 服务
  //////////////////////////////////////////////////////////////////////////////////
  // private _manualPaging = false;//手动分页,因为有时候需要先跳转第一页,然后查询数据,而跳转第一页又会造成查询数据,用这个变量指定跳转分页不查询数据
  private _pageModel = "table";
  private _readyDataOnly = true;
  private _selectMode = false;
  private _allSelect = false;
  private _keyword: string;//搜索关键字
  private _pageParam: IPageChangeParam = { pageIndex: 0, pageSize: 50, length: 0 };//当前分页信息
  private _advanceQueryFilters: Array<IQueryFilter> = [];
  private _selectedItems: Array<string> = [];//已选择的项id
  private _query: IQuery = {};
  private _columnDefs: Array<IListTableColumn<Ilistable>> = [];
  cacheData: Array<Ilistable> = [];
  createdUrl: string;
  createdAction: { icon?: string, title?: string, onClick: Function };
  defaultPageSizeOption = [];//默认分页按钮参数
  itemManageMenu: IListableRecordMenu;
  advanceMenuItems = [];
  enableDisplayModes = [1, 2];//页面可用的展示模式
  //////////////////////////////////////////////////////////////////////////////////
  //(注意,各个页面应该只订阅,发布由属性来控制)
  itemSelected$ = new Subject<Array<string>>();//有任何项被选择
  readDataOnly$ = new Subject<boolean>();//列表界面模式 true=>查看模式(没有新增,不能编辑和删除,管理数据等)
  selectMode$: Subject<boolean> = new Subject();//选择模式|查看模式 true=>选择模式(列表界面不显示checkbox)
  allSelect$: Subject<boolean> = new Subject();//全选|反选
  pageChange$: Subject<IPageChangeParam> = new Subject();//分页页面跳转
  queryData$: Subject<void> = new Subject();//查询数据信息,自动根据当前的关键字等条件查询
  displayMode$: Subject<string> = new Subject();//列表项显示模式
  afterDataRefresh$: Subject<void> = new Subject();//当数据刷新后触发事件
  afterPaginatorColumnChange$ = new BehaviorSubject<Array<IListTableColumn<Ilistable>>>([]);//分页表格column改变后事件
  showHideColumn$ = new BehaviorSubject<Array<string>>([]);//展示隐藏列
  afterPaginatorTableContentInit$: Subject<void> = new Subject();//列表页面初始化完成后事件
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
  set displayMode(vl: string) {
    // this.dessertSrv.cacheListPageLastDisplayMode(this.router.snapshot.url, vl);
    this._pageModel = vl;
    this.displayMode$.next(vl);
  }
  get displayMode(): string {
    return this._pageModel;
    // return this.dessertSrv.getListPageLastDisplayMode(this.router.snapshot.url);
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

  constructor(protected dessertSrv: NavigationService, public router: ActivatedRoute, protected progressSrv: AppProgressService) {

    //订阅查询数据
    this.queryData$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.query();
    });//
  }//constructor

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  advanceQuery(filter: IQueryFilter | Array<IQueryFilter>) {
    if (Array.isArray(filter))
      this._advanceQueryFilters = filter;
    else
      this._advanceQueryFilters = [filter];
    this._pageParam.pageIndex = 0;
    this._pageParam.length = 0;
    this.pageParam = { length: 0, pageIndex: 0, pageSize: this._pageParam.pageSize };
  }//advanceQuery

  query() {
    //显示进度条
    this.progressSrv.showProgress = true;

    this.selectedItems = [];
    this.cacheData = [];
    //修正paginator index从0开始
    let t_pageIndex = this.pageParam.pageIndex + 1;
    this.apiSvr.query({ pageSize: this.pageParam.pageSize, page: t_pageIndex, search: (this._keyword ? this._keyword : ''), orderBy: this._query.orderBy, desc: this._query.desc }, this._advanceQueryFilters).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.cacheData = [];
      this._pageParam.length = res.total;

      let tindex = this._pageParam.pageIndex;
      //校正index为1
      if (tindex <= 0)
        tindex = 1;

      if (res.data && res.data.length)
        for (let i = 0, len = res.data.length; i < len; i++) {
          let data = res.data[i];
          data.seqno = i + 1 + (tindex - 1) * this._pageParam.pageSize;
          this.cacheData.push(data);
        }//for
      this.afterDataRefresh$.next();
      //关闭进度条
      this.progressSrv.showProgress = false;
    });
  }//query

  exportData() {
    this.apiSvr.exportData({ pageSize: this.pageParam.pageSize, page: this.pageParam.pageIndex, search: (this._keyword ? this._keyword : ''), orderBy: this._query.orderBy, desc: this._query.desc }, this._advanceQueryFilters).pipe(takeUntil(this.destroy$)).subscribe((fs) => {
      if (fs.size > 0)
        saveAs(fs, 'Export Result.csv');
    }, err => {
      console.error(err);
    });
  }//exportData
}
