import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AccountMdService } from './account-md.service';
import { DepartmentCardMdService } from './department-card-md.service';
import { AccountListMdService } from './account-list-md.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  providers: [AccountMdService, DepartmentCardMdService, AccountListMdService]
})
export class AccountComponent implements OnInit {


  constructor(public cardMdSrv: DepartmentCardMdService, public accountMdSrv: AccountListMdService) { }

  ngOnInit() {
    this.cardMdSrv.apiSrv.getByOrgan().subscribe(_ => { });
  }//ngOnInit



}
