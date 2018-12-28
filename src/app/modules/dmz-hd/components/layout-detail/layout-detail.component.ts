import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from '@geek/apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from '@geek/micro-dmz-hd';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { AsyncHandleService } from "@geek/scaffold-app-minor";


@Component({
  selector: 'app-layout-detail',
  templateUrl: './layout-detail.component.html',
  styleUrls: ['./layout-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class LayoutDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'Layout';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: LayoutService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
