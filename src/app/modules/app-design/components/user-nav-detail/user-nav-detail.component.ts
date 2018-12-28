import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { V1DetailEditorPageBase } from '@geek/apps-base';
import { AsyncHandleService } from '@geek/scaffold-app-minor';
import { UserNavService } from '@geek/micro-app-basic';


@Component({
  selector: 'app-user-nav-detail',
  templateUrl: './user-nav-detail.component.html',
  styleUrls: ['./user-nav-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class UserNavDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'UserNav';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: UserNavService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
