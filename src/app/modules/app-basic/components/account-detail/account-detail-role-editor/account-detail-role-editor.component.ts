import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AsyncHandleService, DialogFactoryService } from "scaffold-app-minor";
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { Account, UserRoleService, UserRole, AccountService } from 'micro-app-basic';
import { IQueryFilter, QueryOperateEnum } from 'micro-base';
import { AccountDetailRoleFormComponent } from '../account-detail-role-form/account-detail-role-form.component';

@Component({
  selector: 'app-account-detail-role-editor',
  templateUrl: './account-detail-role-editor.component.html',
  styleUrls: ['./account-detail-role-editor.component.scss']
})
export class AccountDetailRoleEditorComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  currentAccount: Account;
  defaultRole: string;
  additionalRoles: Array<{
    userRoleId: string,
    userRoleName: string
  }> = [];
  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected asyncHandleSrv: AsyncHandleService, protected roleSrv: UserRoleService, protected dialogSrv: DialogFactoryService, protected accountSrv: AccountService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      keyword: []
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.interactSrv.afterDataRefresh$.subscribe((data: Account) => {
      if (!data) return;
      this.currentAccount = data;
      this.defaultRole = data.roleName;
      console.log(121, data);

      this.additionalRoles = data.additionRoles ? data.additionRoles : [];


      // let roleAdvanceFilters: Array<IQueryFilter> = [
      //   {
      //     field: 'innerOnly',
      //     value: true,
      //     operate: QueryOperateEnum.equal
      //   }
      // ];

      // this.roleSrv.query({
      //   page: 1,
      //   pageSize: 999
      // }, roleAdvanceFilters).subscribe(roles => {
      //   roles.data = roles.data ? roles.data : [];
      //   let refRole: UserRole = roles.data.filter(x => x.role == data.roleId)[0];
      //   if (!refRole) return;
      //   this.defaultRole = refRole.name;
      // });
    });//subscribe

  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  addAdditionalRole() {
    let dialogRef = this.dialogSrv.open(AccountDetailRoleFormComponent, {
      width: '400px',
      height: '300px',
      disableClose: true,
      data: {
        userId: this.currentAccount.id,
        additionalRoleIds: this.additionalRoles.map(x => x.userRoleId).join(',')
      }
    });

    dialogRef.componentInstance.afterAddRole$.subscribe(() => {
      let nrole = {
        userRoleId: dialogRef.componentInstance.selectedRoleId,
        userRoleName: dialogRef.componentInstance.selectedRoleName
      };

      this.additionalRoles.push(nrole);
      dialogRef.close();
    });
  }//addAdditionalRole

  deleteAdditionalRole(roleId: string) {
    let roleIdArr = this.additionalRoles.filter(x => x.userRoleId != roleId);
    let data = {
      userId: this.currentAccount.id,
      additionalRoleIds: roleIdArr.map(x => x.userRoleId).join(',')
    };
    let source$ = this.accountSrv.updateAdditionalRole(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(() => {
      this.additionalRoles = roleIdArr;
    });
  }//deleteAdditionalRole

}
