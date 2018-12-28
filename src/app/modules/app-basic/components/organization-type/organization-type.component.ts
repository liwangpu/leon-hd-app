import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from '@geek/apps-base';
import { ICommonTableColumndef } from '@geek/scaffold-page-plate';
import { WorkFlowRuleService, OrganizationType, OrganizationTypeService } from '@geek/micro-app-basic';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { AsyncHandleService } from '@geek/scaffold-app-minor';

@Component({
  selector: 'app-organization-type',
  templateUrl: './organization-type.component.html',
  styleUrls: ['./organization-type.component.scss']
})
export class OrganizationTypeComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'OrganizationType';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'isInner',
      name: 'glossary.IsInner',
      width: 90,
      cell: (data: OrganizationType) => {
        return data.isInner ? '是' : '';
      }
    }
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: OrganizationTypeService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}