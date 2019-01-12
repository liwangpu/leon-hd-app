import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncHandleService } from "scaffold-app-minor";
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { WorkFlowRuleService } from 'micro-app-basic';

@Component({
  selector: 'app-work-flow-rule-detail',
  templateUrl: './work-flow-rule-detail.component.html',
  styleUrls: ['./work-flow-rule-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class WorkFlowRuleDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'WorkFlowRule';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: WorkFlowRuleService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}