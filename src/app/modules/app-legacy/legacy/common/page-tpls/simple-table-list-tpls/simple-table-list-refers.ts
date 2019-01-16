import { IQueryFilter } from "../../interfaces/iqueryFilter";
import { IPageChangeParam, IListTableColumn, IListableRecordMenu } from "../paginator-page-tpls/paginator-refers";
import { IQuery } from "../../../services/webapis/api.service";
import { IListableService } from "../../../services/webapis/ilistableService";
import { Ilistable } from "../../../models/ilistable";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { takeUntil } from "rxjs/operators";

export abstract class SimpleTableListBase {
  private _advanceQueryFilters: Array<IQueryFilter> = [];
  private _pageParam: IPageChangeParam = { pageIndex: 1, pageSize: 999, length: 0 };//当前分页信息
  private _keyword: string;//搜索关键字
  private _query: IQuery = {};
  abstract apiSrv: IListableService<Ilistable>;
  excDefaultQuery = true;//执行默认搜索
  afterDataChange$ = new Subject<void>();
  destroy$ = new Subject<boolean>();
  columnDefs: Array<IListTableColumn<Ilistable>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Ilistable) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Ilistable) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Ilistable) => data.description ? data.description : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 110, cell: (data: Ilistable) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  itemManageMenu: IListableRecordMenu;
  constructor(protected datePipeTr: DatePipe) {
    this.afterDataChange$.pipe(takeUntil(this.destroy$)).subscribe(_ => this.refreshData());
  }//constructor


  /**
   * 页面跳转
   */
  set pageParam(vl: IPageChangeParam) {
    this._pageParam = vl;
    this.refreshData();
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
    this.refreshData();
  }
  /**
   * 设置过滤查询
   */
  set sortData(option: IQuery) {
    if (option) {
      this._query.orderBy = option.orderBy;
      this._query.desc = option.desc;
      this.refreshData();
    }
  }

  advanceQuery(filter: IQueryFilter | Array<IQueryFilter>) {
    if (Array.isArray(filter))
      this._advanceQueryFilters = filter;
    else
      this._advanceQueryFilters = [filter];
    this.refreshData();
  }//advanceQuery

  refreshData() {
    this.apiSrv.query({ pageSize: this.pageParam.pageSize, page: this.pageParam.pageIndex, search: (this._keyword ? this._keyword : ''), orderBy: this._query.orderBy, desc: this._query.desc }, this._advanceQueryFilters).subscribe();
  }//refreshData

}