import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { V1ListViewPageBase } from 'apps-base';
import { ICommonTableColumndef } from 'scaffold-page-plate';
import { WorkFlowRule, WorkFlowRuleService } from 'micro-app-basic';
import { AppProgressService, AppSearchService } from 'scaffold-app-core';
import { AsyncHandleService, DialogFactoryService } from 'scaffold-app-minor';

@Component({
  selector: 'app-work-flow-rule',
  templateUrl: './work-flow-rule.component.html',
  styleUrls: ['./work-flow-rule.component.scss']
})
export class WorkFlowRuleComponent extends V1ListViewPageBase implements OnInit, OnDestroy {

  resource = 'WorkFlowRule';
  columnDefs: Array<ICommonTableColumndef> = [
    this._nameColumnDef
    , this._descriptionColumnDef
    , {
      id: 'isInner',
      name: 'glossary.IsInner',
      width: 90,
      cell: (data: WorkFlowRule) => {
        return data.isInner ? '是' : '';
      }
    }
    , this._createdTime
  ];//给几个默认常用列
  constructor(protected actr: ActivatedRoute, protected router: Router, protected location: Location, protected apiSrv: WorkFlowRuleService, protected progressSrv: AppProgressService, protected searchSrv: AppSearchService, protected asyncHandle: AsyncHandleService, protected datePipeTr: DatePipe,protected dialogSrv: DialogFactoryService) {
    super(actr, router, location, apiSrv, progressSrv, searchSrv, asyncHandle, datePipeTr,dialogSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
