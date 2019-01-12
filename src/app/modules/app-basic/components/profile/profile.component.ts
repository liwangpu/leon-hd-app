import { Component, OnInit, OnDestroy } from '@angular/core';
import { V1DetailEditorPageBase } from 'apps-base';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailEditorInteractService } from 'scaffold-page-plate';
import { AsyncHandleService, DialogFactoryService } from "scaffold-app-minor";
import { AccountService } from 'micro-app-basic';
import { AppCacheService, ProfileResolverService } from 'scaffold-app-core';
import { ProfileChangePasswordFormComponent } from './profile-change-password-form/profile-change-password-form.component';
import { ProfileMemberInviteFormComponent } from './profile-member-invite-form/profile-member-invite-form.component';

@Component({
  selector: 'app-bamboo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    DetailEditorInteractService
  ]
})
export class ProfileComponent extends V1DetailEditorPageBase implements OnInit, OnDestroy {

  hideGoBack = true;
  resource = 'Profile';
  constructor(protected actr: ActivatedRoute, protected router: Router, protected apiSrv: AccountService, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected cacheSrv: AppCacheService, protected profileSrv: ProfileResolverService, protected dialogSrv: DialogFactoryService) {
    super(actr, router, apiSrv, interactSrv, asyncHandleSrv);
  }//constructor

  ngOnInit() {
    super.ngOnInit();
    this.apiSrv.getById(this.cacheSrv.userId).subscribe(data => {
      this._persisted = data && data.id ? true : false;
      this.interactSrv.afterDataRefresh$.next(data);
    });

    this.interactSrv.afterDataRefresh$.subscribe(data => {
      if (!data || !data.id) return;
      this.profileSrv.profile$.next(data);
    });
    this.iconChange$.subscribe(icon => {
      if (icon == null) return;
      let profile = this.profileSrv.profile$.getValue();
      profile.icon = icon;
      this.profileSrv.profile$.next(profile);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnDestroy

  changePassword() {
    let dialogRef = this.dialogSrv.open(ProfileChangePasswordFormComponent, {
      width: '400px',
      height: '360px',
      disableClose: true
    });

    dialogRef.componentInstance.afterConfirm$.subscribe((data: { oldPassword: string, newPassword: string }) => {
      let errorHandle = (error) => {
        return '原密码输入错误';
      };
      let source$ = this.apiSrv.changePassword(data.oldPassword, data.newPassword);
      this.asyncHandleSrv.asyncRequest(source$, false, errorHandle).subscribe(() => {
        dialogRef.close();
      });
    });
  }//changePassword

  memberInvite() {
    let data = {
      userId: this.cacheSrv.userId,
      username: this.cacheSrv.nickName,
      avatar: this.cacheSrv.icon
    };
    this.dialogSrv.open(ProfileMemberInviteFormComponent, {
      width: '380px',
      height: '400px',
      disableClose: true,
      data: data
    });
  }//memberInvite

}
