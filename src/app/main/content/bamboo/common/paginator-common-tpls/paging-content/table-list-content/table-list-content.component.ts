import { Component, OnInit, Input, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { ListDisplayModeEnum } from '../../paginator-common-tpls.component';
import { PaginatorCommonMdService } from '../../paginator-common-md.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { IPageChangeParam } from '../../paging-bar/paging-bar.component';
import { Ilistable } from '../../../../../../toolkit/models/ilistable';
import { Router } from '@angular/router';
import { Sort, MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-commom-paging-table-list-content',
  templateUrl: './table-list-content.component.html',
  styleUrls: ['./table-list-content.component.scss']
})
export class TableListContentComponent implements OnInit {

  selectedItem: Array<string> = [];
  allSelected = false;
  destroy$: Subject<boolean> = new Subject();
  dataStore = new CustomDataSource();

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
      }
    });//
    //订阅查看|选择模式
    this.mdSrv.selectMode$.takeUntil(this.destroy$).subscribe(selectMode => {
      this.allSelected = !selectMode;
    });//
  }//constructor

  ngOnInit() {

    // this.displayedColumns = this.mdSrv.columnDefs.map(x => x.columnDef);
    // console.log('table ', this.tableListCt);
    // this.tableListCt.addRowDef()

    //订阅选中项事件,因为有可能列表界面会删除选中项,删除后content如果不订阅,就会出现之前删除的项id又被拼接上来
    this.mdSrv.itemSelected$.takeUntil(this.destroy$).subscribe(arr => {
      this.selectedItem = arr;
    });//
    this.mdSrv.paginatorTable.dataSource = this.dataStore;
    this.dataStore._dataSubject.next(this.mdSrv.cacheData);
    this.mdSrv.afterDataRefresh$.takeUntil(this.destroy$).subscribe(() => {
      this.dataStore._dataSubject.next(this.mdSrv.cacheData);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  rowSelect(id: any) {
    // console.log('onCheckBoxSelect', row);
    if (this.mdSrv.selectMode)
      return;
    this.router.navigate([this.mdSrv.createdUrl, id]);
  }//rowSelect

  onCheckBoxSelect(checked: boolean, id: string) {
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
}

class CustomDataSource extends DataSource<any> {

  _dataSubject = new BehaviorSubject<Array<Ilistable>>([]);

  connect(): Observable<Ilistable[]> {
    return this._dataSubject.map(rdata => {
      return rdata;
    });
  }

  disconnect() { }
}

// export class CustomDataSource extends DataSource<any> {

//   _dataSubject = new BehaviorSubject<Array<Element>>([]);

//   connect(): Observable<Array<Element>> {
//     return this._dataSubject.map(rdata => {
//       return rdata;
//     });
//   }

//   disconnect() { }
// }

// class Element {
//   position: number;
//   name: string;
//   weight: number;
//   symbol: string;
// }

// const data: Element[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   // { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   // { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   // { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   // { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   // { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   // { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   // { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   // { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   // { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   // { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];