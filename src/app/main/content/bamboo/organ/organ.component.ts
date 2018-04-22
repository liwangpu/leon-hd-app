import { Component, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Organization } from "../../../toolkit/models/organization";
import { OrganService } from "../../../toolkit/server/webapi/organ.service";
import { PaginatorStore } from "../../../toolkit/common/classes/paginator-store";
import { DataSource } from '@angular/cdk/collections';
import { AccountDetailComponent } from "../account/account-detail/account-detail.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Account } from "../../../toolkit/models/account";
import { AccountTypeEnums } from "../../../toolkit/enums/enums";
@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  animations: fuseAnimations
})
export class OrganComponent implements OnInit {
  displayedColumns = ['icon', 'name', 'description', 'createdTime', 'buttons'];
  dataSource: PaginatorStore<Organization>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;
  dialogRef: any;
  constructor(private organSrv: OrganService, public dialog: MatDialog) {
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

  onEditAdmin(organId: string) {
    this.organSrv.getById(organId).subscribe(resAccount => {
      console.log(1111, 'resAccount', resAccount);
      // let owner = rdata.owner ? rdata.owner : new Account();
      // owner.organizationId = organId;
      // owner.type = AccountTypeEnums.organization;
      // this.dialogRef = this.dialog.open(AccountDetailComponent, {
      //   panelClass: 'contact-form-dialog',
      //   data: {
      //     account: owner
      //   }
      // });
    });
    // this.dialogRef = this.dialog.open(AccountDetailComponent, {
    //   panelClass: 'contact-form-dialog',
    //   data: {
    //     account: {
    //       organizationId: organId,
    //       type: AccountTypeEnums.organization
    //     }
    //   }
    // });

    // this.dialogRef.afterClosed()
    //   .subscribe(response => {
    //     console.log(111);
    //   });
  }//onEditAdmin

}
