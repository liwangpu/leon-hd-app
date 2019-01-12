import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { OrganizationTypeService } from 'micro-app-basic';

@Component({
  selector: 'app-organization-type-detail',
  templateUrl: './organization-type-detail.component.html',
  styleUrls: ['./organization-type-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class OrganizationTypeDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'OrganizationType';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: OrganizationTypeService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}

