import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ICommonTableColumndef } from '@geek/scaffold-page-plate';
import { AccountService, Account } from '@geek/micro-app-basic';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { V1ListViewPageBase } from '@geek/apps-base';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'Account';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , {
      id: 'mail',
      name: 'glossary.Mail',
      width: 120,
      cell: (data: Account) => {
        return data.mail;
      }
    }
    , {
      id: 'activationTime',
      name: 'glossary.ActivationTime',
      width: 120,
      cell: (data: Account) => {
        return data.activationTime ? this.datePipeTr.transform(data.activationTime, 'yyyy-MM-dd') : '';
      }
    }
    , {
      id: 'expireTime',
      name: 'glossary.ExpireTime',
      width: 120,
      cell: (data: Account) => {
        return data.expireTime ? this.datePipeTr.transform(data.expireTime, 'yyyy-MM-dd') : '';
      }
    }
    // , {
    //   id: 'accountType',
    //   name: 'glossary.AccountType',
    //   width: 120,
    //   needTranslate: true,
    //   cell: (data: Account) => {
    //     return data.isAdmin ? 'glossary.Admin' : 'glossary.Member';
    //   }
    // }
    , {
      id: 'departmentId',
      name: 'glossary.OrganDepartment',
      width: 120,
      cell: (data: Account) => {
        return data.departmentName;
      }
    }
    , this._descriptionColumnDef
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: AccountService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
