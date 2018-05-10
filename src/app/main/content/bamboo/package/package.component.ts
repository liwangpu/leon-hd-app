import { Component, ElementRef, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Package } from "../../../toolkit/models/package";
import { PackageService } from "../../../toolkit/server/webapi/package.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { DataSource } from '@angular/cdk/collections';
import { AccountDetailComponent } from "../account/account-detail/account-detail.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Account } from "../../../toolkit/models/account";
import { AccountTypeEnums } from "../../../toolkit/enums/enums";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  animations: fuseAnimations
})
export class PackageComponent implements OnInit {

  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<Package>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  destroy$: Subject<boolean> = new Subject();
  constructor(private packageSrv: PackageService) {


  }

  ngOnInit() {
    this.dataSource = new PaginatorStore<Package>({ service: this.packageSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
