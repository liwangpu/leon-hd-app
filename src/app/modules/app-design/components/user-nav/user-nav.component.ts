import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';
import { ICommonTableColumndef } from '@geek/scaffold-page-plate';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { UserNavService, UserNav } from '@geek/micro-app-basic';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'UserNav';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , {
      id: 'roleId',
      name: 'glossary.UserRole',
      width: 120,
      cell: (data: UserNav) => {
        return data.roleName;
      }
    }
    , this._descriptionColumnDef
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: UserNavService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
