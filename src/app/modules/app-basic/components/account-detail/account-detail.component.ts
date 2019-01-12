import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService, DialogFactoryService } from "scaffold-app-minor";
import { AccountService, Account } from 'micro-app-basic';
import { AccountDetailResetpwdFormComponent } from './account-detail-resetpwd-form/account-detail-resetpwd-form.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class AccountDetailComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  currentUserId: string;
  resource = 'Account';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: AccountService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected dialogSrv: DialogFactoryService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    this.interactSrv.afterDataRefresh$.subscribe((data: Account) => {
      if (!data) return;
      this.currentUserId = data.id;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  resetPassword() {
    let dialogRef = this.dialogSrv.open(AccountDetailResetpwdFormComponent, {
      width: '400px',
      height: '300px',
      disableClose: true,
      data: {
        userId: this.currentUserId
      }
    });

    dialogRef.componentInstance.afterChangePassword$.subscribe(() => {
      dialogRef.close();
    });
  }//resetPassword

}
