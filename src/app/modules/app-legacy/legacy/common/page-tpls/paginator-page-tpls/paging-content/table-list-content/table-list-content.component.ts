import { Component, OnInit, ViewChild } from '@angular/core';
import { Ilistable } from '../../../../../models/ilistable';
import { IListTableColumn, CustomDataSource, ListDisplayModeEnum } from '../../paginator-refers';
import { MatTable, Sort } from '@angular/material';
import { Subject } from 'rxjs';
import { PaginatorCommonMdService } from '../../paginator-common-md.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-commom-paging-table-list-content',
  templateUrl: './table-list-content.component.html',
  styleUrls: ['./table-list-content.component.scss']
})
export class TableListContentComponent implements OnInit {

  private _seqnoColumn = { columnDef: 'seqno', header: 'glossary.SeqNO', width: 50, cell: (data: Ilistable) => `${data.seqno}` };
  private _buttonColumn = { columnDef: 'button', header: 'glossary.Manage', width: 50, cell: (data: Ilistable) => `${data.seqno}` };
  _selectMode = false;//自己缓存一下上次页面模式
  selectColumn: IListTableColumn<Ilistable> = { columnDef: 'select', header: '', width: 55, cell: (data: Ilistable) => '' };
  columns: Array<IListTableColumn<Ilistable>> = [
    this._seqnoColumn
  ];
  selectedItem: Array<string> = [];
  allSelected = false;
  @ViewChild('paginatorTable') paginatorTable: MatTable<Ilistable>;
  destroy$ = new Subject<boolean>();
  dataSource = new CustomDataSource();
  displayedColumns = [];
  constructor(public mdSrv: PaginatorCommonMdService, public router: Router) {

    //订阅全选|反选事件
    this.mdSrv.allSelect$.pipe(takeUntil(this.destroy$)).subscribe(select => {
      this.allSelected = select;
      if (select) {
        this.selectedItem = this.mdSrv.cacheData.map(x => x.id);
        this.mdSrv.selectedItems = this.selectedItem;
      }
      else {
        this.selectedItem = [];
        this.mdSrv.selectedItems = [];

        if (!select) {
          for (let idx = this.mdSrv.cacheData.length - 1; idx >= 0; idx--) {
            let curItem = this.mdSrv.cacheData[idx];
            curItem.select = false;
          }//for
          this.dataSource._dataSubject.next(this.mdSrv.cacheData);
        }//if

      }

    });//
    //订阅查看|选择模式
    this.mdSrv.selectMode$.pipe(takeUntil(this.destroy$)).subscribe(selectMode => {
      if (!this._selectMode && selectMode) {
        this.columns.unshift(this.selectColumn);
        this.displayedColumns.unshift('select');
      }
      if (!selectMode && this._selectMode)
      {
        this.columns.shift();
        this.displayedColumns.shift();
      }

      this._selectMode = selectMode;
      this.allSelected = !selectMode;
    });//

  }//constructor

  ngOnInit() {
    //表格列改变事件
    this.mdSrv.afterPaginatorColumnChange$.pipe(takeUntil(this.destroy$)).subscribe(cols => {
      if (this.mdSrv.itemManageMenu)
        this.columns = [this._seqnoColumn, ...this.mdSrv.columnDefs, this._buttonColumn];
      else
        this.columns = this.mdSrv.columnDefs;
      this.displayedColumns = this.columns.filter(x => !x.hide).map(c => c._columnDef ? c._columnDef : c.columnDef);
    });//

    //表格隐藏列显示事件
    this.mdSrv.showHideColumn$.pipe(takeUntil(this.destroy$)).subscribe(cols => {
      for (let idx = this.columns.length - 1; idx >= 0; idx--) {
        for (let scol of cols) {
          let curColumn = this.columns[idx];
          if (curColumn.columnDef == scol || curColumn._columnDef == scol) {
            this.columns[idx].hide = false;
          }
        }
      }
      this.displayedColumns = this.columns.filter(x => !x.hide).map(c => c._columnDef ? c._columnDef : c.columnDef);
    });

    // this.mdSrv.displayMode = ListDisplayModeEnum.List;
    if (this.mdSrv.selectMode && !this.columns.some(x => x.columnDef == 'select')) {
      this.columns.unshift(this.selectColumn);
    }


    //订阅选中项事件,因为有可能列表界面会删除选中项,删除后content如果不订阅,就会出现之前删除的项id又被拼接上来
    this.mdSrv.itemSelected$.pipe(takeUntil(this.destroy$)).subscribe(arr => {
      this.selectedItem = arr;
    });//

    this.dataSource._dataSubject.next(this.mdSrv.cacheData);
    this.mdSrv.afterDataRefresh$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dataSource._dataSubject.next(this.mdSrv.cacheData);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  rowSelect(id: any) {
    if (this.mdSrv.selectMode)
      return;
    this.router.navigate([this.mdSrv.createdUrl, id]);
  }//rowSelect

  gotoDetail(id: string) {
    if (this.mdSrv.selectMode) return;
    this.router.navigate([this.mdSrv.createdUrl, id]);
  }//

  onCheckBoxSelect(checked: boolean, id: string) {
    if (!this.mdSrv.selectMode) return;
    let exist = this.selectedItem.some(x => x == id);
    if (checked) {
      if (!exist)
        this.selectedItem.push(id);
    }
    else {
      if (exist) {
        for (let idx = this.selectedItem.length - 1; idx >= 0; idx--) {
          if (this.selectedItem[idx] == id) {
            this.selectedItem[idx] = undefined;
          }
        }//for
      }//if
    }
    this.mdSrv.selectedItems = this.selectedItem;
  }//onCheckBoxSelect

  sortData(sort: Sort) {
    this.mdSrv.sortData = { orderBy: sort.active, desc: sort.direction === 'desc' };
  }//sortData

  generateCellWidth() {
    return {
      flex: '0 0 80px'
    };
  }//generateCellWidth
}
