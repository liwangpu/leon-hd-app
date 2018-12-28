import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ICommonTableColumndef } from '@geek/scaffold-page-plate';
import { WorkFlow, OrganizationTypeEnum, WorkFlowService } from '@geek/micro-app-basic';
import { AppProgressService, AppSearchService } from '@geek/scaffold-app-core';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { V1ListViewPageBase } from '@geek/apps-base';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss']
})
export class WorkFlowComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'WorkFlow';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'applyOrgan',
      name: 'glossary.ApplyOrgan',
      width: 120,
      needTranslate: true,
      cell: (data: WorkFlow) => {
        if (data.applyOrgans == OrganizationTypeEnum.Brand)
          return 'glossary.OrganBrand';
        else if (data.applyOrgans == OrganizationTypeEnum.Partner)
          return 'glossary.OrganPartner';
        else if (data.applyOrgans == OrganizationTypeEnum.Supplier)
          return 'glossary.OrganSupplier';
        else
          return '';
      }
    }
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: WorkFlowService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
