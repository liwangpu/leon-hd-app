import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Organization } from "../../../toolkit/models/organization";
import { OrganService } from "../../../toolkit/server/webapi/organ.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  animations: fuseAnimations
})
export class OrganComponent implements OnInit {
  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<Organization>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(private organSrv: OrganService) {
  }

  ngOnInit() {
    this.dataSource = new PaginatorStore<Organization>({ service: this.organSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort })
    //   this.dataSource = new FilesDataSource(this.productsService, this.paginator, this.sort);
    //   Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) {
    //         return;
    //       }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
    // }
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

  getData() {
    // this.dataSource.filteredData = [];
    // this.dataStore.filter = 'leon';
  }

  clear() {
    // this.dataStore.filter = '';
  }
}
