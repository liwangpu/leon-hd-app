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
    this.dataSource = new PaginatorStore<Organization>({ service: this.organSrv, paginator: this.paginator, searchInputEle: this.filter, sort: this.sort });
  }//ngOnInit

  /**
   * 编辑组织管理员
   * @param organId 
   */
  onEditAdmin(organId: string) {
    this.organSrv.getOwner(organId).subscribe(resAccount => {

      let owner = resAccount ? resAccount : new Account();
      if (!owner.id)
        owner.name = '组织管理员';
      owner.organizationId = organId;
      owner.type = AccountTypeEnums.organAdmin;

      this.dialogRef = this.dialog.open(AccountDetailComponent, {
        panelClass: 'contact-form-dialog',
        data: {
          account: owner
        }
      });
    });
  }//onEditAdmin

}
