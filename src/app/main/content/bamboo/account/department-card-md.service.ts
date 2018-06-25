import { Injectable } from '@angular/core';
import { CommonCardPanelBase, ICommonCardManageButton } from '../common/common-card-panel/common-card-panel.component';
import { DepartmentService } from '../../../toolkit/server/webapi/department.service';
import { EntityBase } from '../../../toolkit/models/entitybase';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { AsyncHandleService } from '../../services/async-handle.service';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { SimpleMessageContentComponent } from '../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';
import { Account } from '../../../toolkit/models/account';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountMdService } from './account-md.service';
@Injectable()
export class DepartmentCardMdService extends CommonCardPanelBase {

  constructor(public apiSrv: DepartmentService, protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService, protected mdSrv: AccountMdService) {
    super();
    this.title = 'glossary.Department';
    let btnAddDepartment: ICommonCardManageButton = {
      icon: 'add',
      name: 'button.AddDepartment',
      onClick: () => {
        this.editData();
      }
    };
    this.buttons.push(btnAddDepartment);

    let btnAddAccount: ICommonCardManageButton = {
      icon: 'add',
      name: 'button.AddUser',
      onClick: () => {
        this.editUser();
      },
      needDataFirst: true
    };
    this.buttons.push(btnAddAccount);

    this.preItems = [
      { id: '', name: 'button.All', defaultItem: true }
    ];


    this.selectChange$.subscribe(departmentId => {
      this.mdSrv.afterDepartmentChange.next(departmentId);
    });
  }//constructor

  editData(data?: EntityBase) {
    this.dialogFac.tplsConfirm(DepartmentFormComponent, 'dialog.EditDepartment', { width: '400px', height: '300px', data: { department: data } });
  }//editData

  deleteData(data: EntityBase): void {
    let dialog = this.dialogFac.simpleConfirm({ key: 'message.DeleteConfirm', value: { value: data.name } });
    dialog.afterOpen().subscribe(_ => {
      let ins = dialog.componentInstance.componentIns as SimpleMessageContentComponent;
      ins.afterConfirm.subscribe(_ => {
        let source$ = this.apiSrv.delete(data.id);
        this.asyncHandle.asyncRequest(source$).subscribe(_ => {
          this.apiSrv.getByOrgan().subscribe();
          ins.doneAsync.next();
          ins.closeDialog.next();
        }, err => {
          ins.doneAsync.next();
        });
      });//afterConfirm
    });//afterOpen
  }//deleteData

  editUser(account?: Account) {
    let dialog = this.dialogFac.tplsConfirm(AccountDetailComponent, 'dialog.EditAccount', { width: '450px', height: '700px', data: { account: account } });
    dialog.afterOpen().subscribe(_ => {
      let ins = dialog.componentInstance.componentIns as AccountDetailComponent;
      ins.afterAccountChange.subscribe(_ => {
        this.mdSrv.afterAccountChange.next();
      });
    });
  }//editUser

}
