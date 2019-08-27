import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { ICommonTableColumndef } from 'scaffold-page-plate';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';
import { UserNavService, UserNav } from 'micro-app-basic';

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
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: UserNavService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe,protected dialogSrv: DialogFactoryService) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr,dialogSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
