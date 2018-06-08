import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AccountDetailComponent } from "./account-detail/account-detail.component";
import { Account } from "../../../toolkit/models/account";
import { AccountTypeEnums } from '../../../toolkit/enums/enums';
import { DessertService } from "../../services/dessert.service";
import { MomentService } from "../../../toolkit/common/services/moment.service";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountMdService } from './account-md.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  providers: [AccountMdService]
})
export class AccountComponent implements OnInit {

  constructor(public dialog: MatDialog, private dessertSrv: DessertService, private momentSrv: MomentService) { }

  ngOnInit() {
  }



}
