import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { OrganizationService } from 'micro-app-basic';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class OrganizationDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'Organization';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: OrganizationService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy


}