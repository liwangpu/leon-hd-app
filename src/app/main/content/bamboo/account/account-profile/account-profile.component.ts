import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../toolkit/server/webapi/account.service';
import { DessertService } from '../../../services/dessert.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  accountId: string;
  constructor(public apiSrc: AccountService, public dessertSrv: DessertService) { }

  ngOnInit() {
    this.accountId = this.dessertSrv.userId;
  }//ngOnInit

}
