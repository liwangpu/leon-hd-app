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
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent implements OnInit {

  readDataOnly = true;
  constructor(private organSrv: OrganService, public dialog: MatDialog) {
  }

  ngOnInit() {

  }//ngOnInit


}
