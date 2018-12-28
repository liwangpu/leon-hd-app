import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from '@geek/apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { AsyncHandleService } from "@geek/scaffold-app-minor";
import { MapService } from '@geek/micro-dmz-hd';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class MapDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'Map';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: MapService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
