import { Component, ElementRef, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Organization } from "../../../toolkit/models/organization";
import { OrderService } from "../../../toolkit/server/webapi/order.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { DataSource } from '@angular/cdk/collections';
import { AccountDetailComponent } from "../account/account-detail/account-detail.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Account } from "../../../toolkit/models/account";
import { AccountTypeEnums } from "../../../toolkit/enums/enums";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: fuseAnimations
})
export class OrderComponent implements OnInit, OnDestroy {

  displayedColumns = ['icon', 'name', 'description', 'createdTime'];
  dataSource: PaginatorStore<Organization>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  destroy$: Subject<boolean> = new Subject();
  constructor(private orderSrv: OrderService) { }

  ngOnInit() {
    this.dataSource = new PaginatorStore<Organization>({ service: this.orderSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

}
