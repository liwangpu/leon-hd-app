import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {  MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from "../../models/product";
import { PaginatorStore } from "../../common/classes/paginator-store";

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  columnsToDisplay = ['select', 'Name', 'age'];
  dataSource: PaginatorStore<Product> | null;
  selection = new SelectionModel<{ name: string, age: number }>(true, []);
  constructor() {
    // for (let idx = 0; idx < 15; idx++) {
    //   this.myDataArray.push({ name: 'Leon'+idx, age: 18 });
    // }werewrewr
  }

  ngOnInit() {
    // this.dataSource = new PaginatorStore(this.productSrv, this.paginator, this.sort, this.filter);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.selection = new SelectionModel<MyDataType>(allowMultiSelect, initialSelection);

  }

  applyFilter() {
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

  getData() {
    // this.dataSource.filteredData = [];
    this.dataSource.filter = 'leon';
  }

  clear(){
    this.dataSource.filter = '';
  }

}
