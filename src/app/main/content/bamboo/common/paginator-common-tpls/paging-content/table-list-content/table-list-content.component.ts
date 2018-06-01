import { Component, OnInit, Input, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { ListDisplayModeEnum, IListTableColumn } from '../../paginator-common-tpls.component';
import { PaginatorCommonMdService } from '../../paginator-common-md.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { IPageChangeParam } from '../../paging-bar/paging-bar.component';
import { Ilistable } from '../../../../../../toolkit/models/ilistable';
import { Router } from '@angular/router';
import { Sort, MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { DessertService } from '../../../../../services/dessert.service';

@Component({
  selector: 'app-commom-paging-table-list-content',
  templateUrl: './table-list-content.component.html',
  styleUrls: ['./table-list-content.component.scss']
})
export class TableListContentComponent implements OnInit {

  _selectMode = false;//自己缓存一下上次页面模式
  selectColumn: IListTableColumn<Ilistable> = { columnDef: 'select', header: '', width: 55, cell: (data: Ilistable) => '' };
  columns: Array<IListTableColumn<Ilistable>> = [
    { columnDef: 'seqno', header: 'glossary.SeqNO', width: 50, cell: (data: Ilistable) => `${data.seqno}` }
    , { columnDef: 'button', header: 'glossary.SeqNO', width: 50, cell: (data: Ilistable) => `${data.seqno}` }
  ];
  selectedItem: Array<string> = [];
  allSelected = false;
  @ViewChild('paginatorTable') paginatorTable: MatTable<Ilistable>;
  destroy$: Subject<boolean> = new Subject();
  dataSource = new CustomDataSource();
  get displayedColumns() {
    let arr = this.columns.map(c => c.columnDef);
    // if (this.mdSrv.itemManageMenu)
    //   arr.push('button');
    return arr;
  }

  constructor(public mdSrv: PaginatorCommonMdService, public router: Router) {

    //订阅全选|反选事件
    this.mdSrv.allSelect$.takeUntil(this.destroy$).subscribe(select => {
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
    this.mdSrv.selectMode$.takeUntil(this.destroy$).subscribe(selectMode => {
      if (!this._selectMode && selectMode) {
        this.columns.unshift(this.selectColumn);
      }
      if (!selectMode && this._selectMode)
        this.columns.shift();

      this._selectMode = selectMode;
      this.allSelected = !selectMode;
    });//
    //表格列改变事件
    this.mdSrv.afterPaginatorColumnChange$.takeUntil(this.destroy$).subscribe(cols => {
      this.columns = [...this.columns, ...this.mdSrv.columnDefs];
    });//
  }//constructor

  ngOnInit() {
    this.mdSrv.displayMode = ListDisplayModeEnum.List;
    if (this.mdSrv.selectMode && !this.columns.some(x => x.columnDef == 'select')) {
      this.columns.unshift(this.selectColumn);
    }
    this.mdSrv.afterPaginatorTableContentInit$.next();

    //订阅选中项事件,因为有可能列表界面会删除选中项,删除后content如果不订阅,就会出现之前删除的项id又被拼接上来
    this.mdSrv.itemSelected$.takeUntil(this.destroy$).subscribe(arr => {
      this.selectedItem = arr;
    });//

    this.dataSource._dataSubject.next(this.mdSrv.cacheData);
    this.mdSrv.afterDataRefresh$.takeUntil(this.destroy$).subscribe(() => {
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
  }//
}

class CustomDataSource extends DataSource<any> {

  _dataSubject = new BehaviorSubject<Array<{ seqno: number }>>([]);

  connect(): Observable<Array<{ seqno: number }>> {
    return this._dataSubject.map(rdata => {
      return rdata;
    });
  }

  disconnect() { }
}
