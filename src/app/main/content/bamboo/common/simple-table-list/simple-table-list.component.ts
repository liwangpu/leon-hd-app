import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IListTableColumn, IListableRecordMenuItem, IListableRecordMenu } from '../paginator-common-tpls/paginator-common-tpls.component';
import { Ilistable } from '../../../../toolkit/models/ilistable';
import { MatTable, Sort } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { CustomDataSource } from '../paginator-common-tpls/paging-content/table-list-content/table-list-content.component';
import { DatePipe } from '@angular/common';
import { IListableService } from '../../../../toolkit/server/webapi/ilistableService';
import { IQueryFilter } from '../../../../toolkit/common/interfaces/iqueryFilter';
import { IPageChangeParam } from '../paginator-common-tpls/paging-bar/paging-bar.component';
import { IQuery } from '../../../../toolkit/server/webapi/api.service';

@Component({
  selector: 'app-common-simple-table-list',
  templateUrl: './simple-table-list.component.html',
  styleUrls: ['./simple-table-list.component.scss']
})
export class SimpleTableListComponent implements OnInit {


  private _seqnoColumn = { columnDef: 'seqno', header: 'glossary.SeqNO', width: 50, cell: (data: Ilistable) => `${data.seqno}` };
  private _buttonColumn = { columnDef: 'button', header: 'glossary.Manage', width: 50, cell: (data: Ilistable) => `${data.seqno}` };
  selectColumn: IListTableColumn<Ilistable> = { columnDef: 'select', header: '', width: 55, cell: (data: Ilistable) => '' };
  columns: Array<IListTableColumn<Ilistable>> = [
    this._seqnoColumn
  ];
  selectedItem: Array<string> = [];
  allSelected = false;
  @ViewChild('paginatorTable') paginatorTable: MatTable<Ilistable>;
  @Input() launch: SimpleTableListBase;
  @Input() excDefaultQuery = false;
  destroy$: Subject<boolean> = new Subject();
  dataSource = new CustomDataSource();
  get displayedColumns() {
    let arr = this.columns.map(c => c._columnDef ? c._columnDef : c.columnDef);
    return arr;
  }

  constructor() {

  }//constructor

  gotoDetail() {

  }//gotoDetail

  ngOnInit() {
    if (!this.launch)
      return;

    this.columns = [this._seqnoColumn, ...this.launch.columnDefs]
    this.launch.apiSrv.queryData$.takeUntil(this.destroy$).subscribe(datas => {
      for (let idx = 0, len = datas.length; idx < len; idx++) {
        let item = datas[idx];
        (item as Ilistable).seqno = idx + 1;
      }
      this.dataSource._dataSubject.next(datas as Array<Ilistable>);
    });
    if (this.excDefaultQuery)
      this.launch.refreshData();
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy


  sortData(sort: Sort) {
    // this.mdSrv.sortData = { orderBy: sort.active, desc: sort.direction === 'desc' };
  }//sortData

  generateCellWidth() {
    return {
      flex: '0 0 80px'
    };
  }//
}


export abstract class SimpleTableListBase {
  private _advanceQueryFilters: Array<IQueryFilter> = [];
  private _pageParam: IPageChangeParam = { pageIndex: 1, pageSize: 999, length: 0 };//当前分页信息
  private _keyword: string;//搜索关键字
  private _query: IQuery = {};
  abstract apiSrv: IListableService<Ilistable>;
  afterDataChange$ = new Subject<void>();
  destroy$ = new Subject<boolean>();
  columnDefs: Array<IListTableColumn<Ilistable>> = [
    { columnDef: 'icon', header: 'glossary.Icon', width: 0, cell: (data: Ilistable) => data.icon ? data.icon : '' }
    , { columnDef: 'name', header: 'glossary.Name', width: 180, cell: (data: Ilistable) => data.name ? data.name : '' }
    , { columnDef: 'description', header: 'glossary.Description', width: 0, cell: (data: Ilistable) => data.description ? data.description : '' }
    , { columnDef: 'createdTime', header: 'glossary.CreatedTime', width: 85, cell: (data: Ilistable) => this.datePipeTr.transform(data.createdTime, 'yyyy-MM-dd') }
  ];
  itemManageMenu: IListableRecordMenu;
  constructor(protected datePipeTr: DatePipe) {
    this.afterDataChange$.takeUntil(this.destroy$).subscribe(_ => this.refreshData());
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