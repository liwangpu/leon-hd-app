import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Ilistable } from '../../../models/ilistable';
import { IListTableColumn, CustomDataSource } from '../paginator-page-tpls/paginator-refers';
import { SimpleTableListBase } from './simple-table-list-refers';
import { MatTable, Sort } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-simple-table-list-tpls',
  templateUrl: './simple-table-list-tpls.component.html',
  styleUrls: ['./simple-table-list-tpls.component.scss']
})
export class SimpleTableListTplsComponent implements OnInit {


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
    this.launch.apiSrv.queryData$.pipe(takeUntil(this.destroy$)).subscribe(datas => {
      for (let idx = 0, len = datas.length; idx < len; idx++) {
        let item = datas[idx];
        (item as Ilistable).seqno = idx + 1;
      }
      this.dataSource._dataSubject.next(datas as Array<Ilistable>);
    });
    if (this.launch.excDefaultQuery)
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
