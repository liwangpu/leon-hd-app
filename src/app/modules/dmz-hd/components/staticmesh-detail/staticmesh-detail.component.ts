import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { StaticmeshService } from 'micro-dmz-hd';
import { AsyncHandleService } from 'scaffold-app-minor';

@Component({
  selector: 'app-staticmesh-detail',
  templateUrl: './staticmesh-detail.component.html',
  styleUrls: ['./staticmesh-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class StaticmeshDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'StaticMesh';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: StaticmeshService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}