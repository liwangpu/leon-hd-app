import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserRoleService, AccountService, UserRole } from 'micro-app-basic';
import { IQueryFilter, QueryOperateEnum } from 'micro-base';
import { AsyncHandleService } from 'scaffold-app-minor';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account-detail-role-form',
  templateUrl: './account-detail-role-form.component.html',
  styleUrls: ['./account-detail-role-form.component.scss']
})
export class AccountDetailRoleFormComponent implements OnInit, OnDestroy {


  private _selectedRoleId: string;
  selectedRoleName: string;
  existUserRole = false;
  currentUserId: string;
  curAdditionalRoleIds: string;
  enableConfirm = false;
  detailForm: FormGroup;
  roleAdvanceFilters: Array<IQueryFilter> = [
    {
      field: 'excludeInner',
      value: true,
      operate: QueryOperateEnum.equal
    }
  ];
  set selectedRoleId(value: string) {
    this._selectedRoleId = value;
    this.enableConfirm = value ? true : false;
  }
  get selectedRoleId() {
    return this._selectedRoleId;
  }
  afterAddRole$ = new Subject();
  constructor(protected formBuilder: FormBuilder, public roleSrv: UserRoleService, protected accountSrv: AccountService, protected asyncHandleSrv: AsyncHandleService) {
    this.detailForm = this.formBuilder.group({
      id: []
      , flowGrade: ['']
      , workFlowId: ['']
      , subWorkFlowName: ['']
      , subWorkFlowId: ['']
      , name: ['']
      , description: ['']
      , operateRoles: ['']
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.afterAddRole$.complete();
    this.afterAddRole$.unsubscribe();
  }//ngOnDestroy

  onRoleClear() {
    this.selectedRoleId = undefined;
    this.selectedRoleName = undefined;
    this.existUserRole = false;
  }//onRoleClear

  onRoleSelected(item: UserRole) {
    this.curAdditionalRoleIds = this.curAdditionalRoleIds ? this.curAdditionalRoleIds : '';
    this.existUserRole = this.curAdditionalRoleIds.indexOf(item.id) > -1;
    if (this.existUserRole) return;
    this.selectedRoleId = item.id;
    this.selectedRoleName = item.name;
    this.curAdditionalRoleIds += `,${item.id}`;
  }//onRoleSelected

  afterReceiveData(data: { userId: string, additionalRoleIds: string }) {
    this.currentUserId = data.userId;
    this.curAdditionalRoleIds = data.additionalRoleIds;
  }//afterReceiveData

  afterConfirm() {
    let data = {
      userId: this.currentUserId,
      additionalRoleIds: this.curAdditionalRoleIds
    };
    let source$ = this.accountSrv.updateAdditionalRole(data);
    this.asyncHandleSrv.asyncRequest(source$).subscribe(() => {
      this.afterAddRole$.next();
    });
  }//afterConfirm

}
