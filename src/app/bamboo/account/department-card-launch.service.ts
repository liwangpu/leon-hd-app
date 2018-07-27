import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { CommonCardPanelBase, ICommonCardManageButton } from '../../share/common/page-tpls/card-list-panel-tpls/card-list-panel-refers';
import { DialogFactoryService } from '../../share/common/factories/dialog-factory.service';
import { DepartmentService } from '../../share/services/webapis/department.service';
import { AsyncHandleService } from '../../share/services/common/async-handle.service';
import { AccountMdService } from './account-md.service';
import { EntityBase } from '../../share/models/entitybase';
import { XDepartmentFormComponent } from './x-department-form/x-department-form.component';
import { SimpleMessageContentComponent } from '../../share/common/factories/dialog-template/simple-message-content/simple-message-content.component';
import { XDetailComponent } from './x-detail/x-detail.component';


@Injectable()
export class DepartmentCardLaunchService extends CommonCardPanelBase {

  constructor(public apiSrv: DepartmentService, protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService, protected mdSrv: AccountMdService, protected componentFactoryResolver: ComponentFactoryResolver) {
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
    this.dialogFac.lazyModelEntryConfirm(XDepartmentFormComponent, this.componentFactoryResolver, 'dialog.EditDepartment', { width: '400px', height: '300px', data: { department: data } });
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
    let dialog = this.dialogFac.lazyModelEntryConfirm(XDetailComponent, this.componentFactoryResolver, 'dialog.EditAccount', { width: '450px', height: '700px', data: { account: account } });
    dialog.afterOpen().subscribe(_ => {
      let ins: XDetailComponent = dialog.componentInstance.componentIns.lazyEntryIns;
      ins.afterAccountChange.subscribe(_ => {
        this.mdSrv.afterAccountChange.next();
      });
    });
  }//editUser

}
