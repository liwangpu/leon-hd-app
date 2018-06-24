import { Injectable } from '@angular/core';
import { CommonCardPanelBase, ICommonCardManageButton } from '../common/common-card-panel/common-card-panel.component';
import { DepartmentService } from '../../../toolkit/server/webapi/department.service';
import { EntityBase } from '../../../toolkit/models/entitybase';
import { DialogFactoryService } from '../../../toolkit/common/factory/dialog-factory.service';
import { AsyncHandleService } from '../../services/async-handle.service';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { SimpleMessageContentComponent } from '../../../toolkit/common/factory/dialog-template/simple-message-content/simple-message-content.component';
@Injectable()
export class DepartmentCardMdService extends CommonCardPanelBase {

  constructor(public apiSrv: DepartmentService, protected dialogFac: DialogFactoryService, private asyncHandle: AsyncHandleService) {
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

  }


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


}
