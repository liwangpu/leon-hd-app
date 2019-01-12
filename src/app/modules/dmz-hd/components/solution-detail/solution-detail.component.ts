import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { SolutionService } from 'micro-dmz-hd';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";

@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class SolutionDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'Solution';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: SolutionService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}