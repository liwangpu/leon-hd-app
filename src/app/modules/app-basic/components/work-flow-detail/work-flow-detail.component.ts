import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { WorkFlowService } from 'micro-app-basic';

@Component({
  selector: 'app-work-flow-detail',
  templateUrl: './work-flow-detail.component.html',
  styleUrls: ['./work-flow-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class WorkFlowDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'WorkFlow';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: WorkFlowService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
