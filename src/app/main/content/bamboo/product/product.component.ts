import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { IListableService } from '../../../toolkit/server/webapi/ilistableService'
import { Product } from "../../../toolkit/models/product";
import { Paging, IQuery } from "../../../toolkit/server/webapi/api.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { ProductService } from "../../../toolkit/server/webapi/product.service";
import { fuseAnimations } from '../../../../core/animations';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: fuseAnimations
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  items: Array<Product> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  columnsToDisplay = ['select', 'Name', 'age'];
  dataSource: PaginatorStore<Product> | null;
  selection = new SelectionModel<{ name: string, age: number }>(true, []);
  constructor(private productSrv: ProductService) {
    // this.items.push({ id: '1', name: 'age' });
  }

  ngOnInit() {
    // this.productSrv, this.paginator, this.sort, this.filter
    this.dataSource = new PaginatorStore({ service: this.productSrv, paginator: this.paginator, searchInputEle: this.filter });
    this.dataSource._dataSubject.takeUntil(this.destroy$).subscribe(rdata => {
      this.items = rdata.data ? rdata.data : [];
    });
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.selection = new SelectionModel<MyDataType>(allowMultiSelect, initialSelection);

  }

  applyFilter(fvalue: string) {
    // console.log(111, 'receive', fvalue);
    // fvalue = fvalue.trim().toLocaleLowerCase();
    // this.dataSource.filter = fvalue;
  }

  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?werwer
    //   this.selection.clear() :
    //   this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
