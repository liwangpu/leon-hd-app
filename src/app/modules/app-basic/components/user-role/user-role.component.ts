import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';import { AsyncHandleService } from 'scaffold-app-minor';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { ICommonTableColumndef } from 'scaffold-page-plate';
import { UserRole, OrganizationTypeEnum, UserRoleService } from 'micro-app-basic';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'UserRole';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    // , {
    //   id: 'applyBrand',
    //   name: 'glossary.OrganBrand',
    //   width: 90,
    //   transToCheckFlag: true,
    //   cell: (data: UserRole) => {
    //     let exist = data.applyOrgans && data.applyOrgans.indexOf(OrganizationTypeEnum.Brand) > -1;
    //     return exist;
    //   }
    // }
    // , {
    //   id: 'applyPartner',
    //   name: 'glossary.OrganPartner',
    //   width: 90,
    //   transToCheckFlag: true,
    //   cell: (data: UserRole) => {
    //     let exist = data.applyOrgans && data.applyOrgans.indexOf(OrganizationTypeEnum.Partner) > -1;
    //     return exist;
    //   }
    // }
    // , {
    //   id: 'applySupplier',
    //   name: 'glossary.OrganSupplier',
    //   width: 90,
    //   transToCheckFlag: true,
    //   cell: (data: UserRole) => {
    //     let exist = data.applyOrgans && data.applyOrgans.indexOf(OrganizationTypeEnum.Supplier) > -1;
    //     return exist;
    //   }
    // }
    , {
      id: 'isInner',
      name: 'glossary.IsInner',
      width: 90,
      cell: (data: UserRole) => {
        return data.isInner ? '是' : '';
      }
    }
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: UserRoleService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
