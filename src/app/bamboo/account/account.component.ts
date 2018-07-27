import { Component, OnInit } from '@angular/core';
import { DepartmentCardLaunchService } from './department-card-launch.service';
import { AccountMdService } from './account-md.service';
import { AccountSimpleListLaunchService } from './account-simple-list-launch.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountMdService, DepartmentCardLaunchService, AccountSimpleListLaunchService]
})
export class AccountComponent implements OnInit {

  constructor(public cardMdSrv: DepartmentCardLaunchService, public userMdSrc: AccountSimpleListLaunchService) {
    this.cardMdSrv.apiSrv.getByOrgan().subscribe(_ => { });
  }

  ngOnInit() {

  }//

}
