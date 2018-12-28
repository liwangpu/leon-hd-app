import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { ICommonTableColumndef } from '../../../interfaces/i-common-table-columndef';
import { ITableListRowMenu } from '../../../interfaces/i-table-list-row-menu';
import { Subscription, Subject } from 'rxjs';
import { PagingDataSource } from '../../../models/paging-datasource';
import { ObservableMedia } from '@angular/flex-layout';
import { Sort } from '@angular/material';

@Component({
  selector: 'page-plate-common-table-list',
  templateUrl: './common-table-list.component.html',
  styleUrls: ['./common-table-list.component.scss']
})
export class CommonTableListComponent implements OnInit, OnDestroy {

  private _rowMiniWidth = 0;
  private _colMiniWidth = 100;
  private _seqnoColWidth = 84;
  private _iconColWidth = 84;
  private _selectColWidth = 55;
  private _buttonsColWidth = 55;
  private _select = false;
  private _alreadyRedistributed = false;
  private _displayedColumns: Array<string> = [];
  private _columnDefs: Array<ICommonTableColumndef> = [];
  private _columnDefsBackup: Array<ICommonTableColumndef> = [];//备份一份列信息,用于记录原始列宽度信息


  @Output() sortData = new EventEmitter<{ field: string, direction: string }>();
  @Output() rowClick = new EventEmitter<{ data: any, id: string }>();
  @Output() selectItemChange = new EventEmitter<{ id: string, checked: boolean }>();
  @Input() set columnDefs(value: Array<ICommonTableColumndef>) {
    this._columnDefs = value && value.length > 0 ? value : [];
    if (this._columnDefsBackup.length <= 0)
      this._columnDefsBackup = this._columnDefs;
  }
  get columnDefs() {
    return this._columnDefs;
  }
  @Input() rowMenus: Array<ITableListRowMenu> = [];
  @Input() set select(value: boolean) {
    this._select = value ? true : false;
    //(1)添加|取消select展示列
    if (value) {
      let existSelect = this.displayedColumns.some(x => x.toLocaleLowerCase() == "select");
      if (!existSelect)
        this._displayedColumns.unshift('select');
    }
    else {
      let existSelect = this.displayedColumns.some(x => x.toLocaleLowerCase() == "select");
      if (existSelect)
        this._displayedColumns.shift();
    }
  }
  get select() {
    return this._select;
  }
  @Input() set selectAll(value: boolean) {

  }
  @Input() set datas(value: Array<any>) {
    this.dataSource._dataSubject.next(value);
  }
  @Input() set displayedColumns(value: Array<string>) {
    if (value && value.length > 0) {
      //排除undefine|null错误
      value = value.filter(x => x);
      //过滤固有列
      let disArr = [];
      for (let item of value) {
        let col = item.toLocaleLowerCase().trim();
        if (!(col == 'seqno' || col == 'select' || col == 'buttons'))
          disArr.push(item);
      }
      let existButtons = disArr.some(x => x == 'buttons');
      if (!existButtons && this.rowMenus && this.rowMenus.length > 0)
        disArr.push('buttons');
      disArr.unshift('seqno');
      this._displayedColumns = disArr;
    } else {
      this._displayedColumns = [];
    }
  }
  get displayedColumns(): Array<string> {
    return this._displayedColumns;
  }
  get rowMiniWidth(): number {
    return this._rowMiniWidth;
  }
  @ViewChild('containerCt') containerCt: ElementRef;
  watcherView: Subscription;
  _selectedIds: Array<string> = [];//不要直接使用,通过selectedIds赋值
  dataSource = new PagingDataSource();
  destroy$ = new Subject<boolean>();
  constructor(protected media: ObservableMedia) {

  }//constructor

  private _calcuColumnsMinimumWidth(): number {
    let minimunWidth = 0;
    if (this.displayedColumns.some(x => x == 'seqno'))
      minimunWidth += this._seqnoColWidth;
    if (this.displayedColumns.some(x => x == 'icon'))
      minimunWidth += this._iconColWidth;
    if (this.displayedColumns.some(x => x == 'select'))
      minimunWidth += this._selectColWidth;
    if (this.displayedColumns.some(x => x == 'buttons'))
      minimunWidth += this._buttonsColWidth;

    if (this.displayedColumns && this.displayedColumns.length > 0 && this.columnDefs && this.columnDefs.length > 0) {
      for (let defItem of this.columnDefs) {
        let existCol = this.displayedColumns.some(x => x == defItem.id);
        if (existCol)
          minimunWidth += defItem.width ? defItem.width : 0;
      }
    }
    return minimunWidth;
  }

  private _redistributeColumnWidth(remainSpace: number) {
    if (remainSpace <= 0 && !this._alreadyRedistributed) return;

    if (remainSpace && remainSpace > 0) {
      //位置盈余,自动扩充列大小
      let phr = this.displayedColumns.filter(x => !(x == 'seqno' || x == 'icon' || x == 'select' || x == 'buttons')).length;
      let plusRemain = remainSpace / phr;
      let defsArr = [];
      for (let col of this.columnDefs) {
        if (!(col.id == 'seqno' || col.id == 'select' || col.id == 'buttons')) {
          col.width = col.width ? col.width : 0;
          col.width += plusRemain;
        }
        defsArr.push(col);
      }

      this._columnDefs = defsArr;
      this._alreadyRedistributed = true;
    }
    else {
      //位置紧缩,恢复原定义
    }
  }

  ngOnInit() {
    this._rowMiniWidth = this._calcuColumnsMinimumWidth();
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    // this.watcherView.unsubscribe();
  }//ngOnDestroy

  onSortData(sort: Sort) {
    this.sortData.next({
      field: sort.active
      , direction: sort.direction
    });
  }//sortData

  onCheckBoxSelect(id: string, checked: boolean) {
    this.selectItemChange.next({ id: id, checked: checked });
  }//onCheckBoxSelect

  onRowClick(data: any, id: string) {
    //当前为选择模式
    if (this.select) {
      let selectVal = data.select ? true : false;
      //取反,其实是获取期望的选择值
      this.onCheckBoxSelect(id, !selectVal);
    }
    else {
      this.rowClick.next({ data: data, id: id });
    }
  }//onRowClick

  clearSelected() {
    this._selectedIds = [];
  }//clearSelected

}
