import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService } from "scaffold-app-minor";
import { UserRoleService } from 'micro-app-basic';

@Component({
  selector: 'app-user-role-detail',
  templateUrl: './user-role-detail.component.html',
  styleUrls: ['./user-role-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class UserRoleDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  resource = 'UserRole';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: UserRoleService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

}
