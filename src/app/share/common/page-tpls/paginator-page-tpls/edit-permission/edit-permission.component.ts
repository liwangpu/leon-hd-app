import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../../../../../node_modules/rxjs';
import { ISimpleConfirm } from '../../../factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { OrganService } from '../../../../services/webapis/organ.service';
import { Organization } from '../../../../models/organization';
import { MatCheckboxChange } from '../../../../../../../node_modules/@angular/material';


@Component({
  selector: 'app-paginator-page-tpls-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit, ISimpleConfirm {

  allRetrieve = false;
  allUpdate = false;
  allDelete = false;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  organizations: Array<OrganizationEx>;
  constructor(protected organSrv: OrganService) {

  }//constructor

  ngOnInit() {
    this.organSrv.query().subscribe(datas => {
      this.organizations = datas.data;
      this.satisfyConfirm.next(true);
    });
    // let arr = [];
    // for (let idx = 0; idx <= 3; idx++) {
    //   let m = new OrganizationEx();
    //   m.id = idx.toString();
    //   m.name = 'Organ' + idx;
    //   arr.push(m);
    // }//for
    // this.organizations = arr;
  }//ngOnInit

  onAllRetrieve(evt: MatCheckboxChange) {
    for (let item of this.organizations) {
      item.retrieveOp = evt.checked;
    }
  }//onAllRetrieve

  onAllUpdate(evt: MatCheckboxChange) {
    for (let item of this.organizations) {
      item.updateOp = evt.checked;
    }
  }//onAllUpdate

  onAllDelete(evt: MatCheckboxChange) {
    for (let item of this.organizations) {
      item.deleteOp = evt.checked;
    }
  }//onAllDelete

}

export class OrganizationEx extends Organization {
  retrieveOp?: boolean;
  updateOp?: boolean;
  deleteOp?: boolean;
}