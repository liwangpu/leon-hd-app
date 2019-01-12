import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { V1DetailEditorPageBase } from 'apps-base';
import { AsyncHandleService } from 'scaffold-app-minor';
import { NavService } from 'micro-app-basic';


@Component({
  selector: 'app-nav-detail',
  templateUrl: './nav-detail.component.html',
  styleUrls: ['./nav-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class NavDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'Nav';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: NavService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
