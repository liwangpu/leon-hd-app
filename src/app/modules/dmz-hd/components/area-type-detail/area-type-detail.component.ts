import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { AsyncHandleService } from "@geek/scaffold-app-minor";
import { AreaTypeService } from '@geek/micro-dmz-hd';
import { V1DetailEditorPageBase } from '@geek/apps-base';

@Component({
  selector: 'app-area-type-detail',
  templateUrl: './area-type-detail.component.html',
  styleUrls: ['./area-type-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class AreaTypeDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'AreaType';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: AreaTypeService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
