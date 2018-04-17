import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay = ['select','userName', 'age'];
  dataSource = new MatTableDataSource(PRODATA);
  selection = new SelectionModel<{ name: string, age: number }>(true, []);
  constructor() {
    // for (let idx = 0; idx < 15; idx++) {
    //   this.myDataArray.push({ name: 'Leon'+idx, age: 18 });
    // }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // this.selection = new SelectionModel<MyDataType>(allowMultiSelect, initialSelection);
  }

  applyFilter(fvalue: string) {
    // console.log(111, 'receive', fvalue);
    fvalue = fvalue.trim().toLocaleLowerCase();
    this.dataSource.filter = fvalue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}



const PRODATA = [
  { name: 'Leon', age: 18 }
  , { name: 'John', age: 6 }
  , { name: 'Mark', age: 11 }
  , { name: 'Hello', age: 12 }
  , { name: 'Jimi', age: 34 }
];
