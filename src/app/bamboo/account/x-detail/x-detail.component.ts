import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ISimpleConfirm } from '../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Department } from '../../../share/models/department';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../../share/services/webapis/department.service';
import { MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { AccountService } from '../../../share/services/webapis/account.service';
import { AsyncHandleService } from '../../../share/services/common/async-handle.service';
import { Account } from "../../../share/models/account";
@Component({
  selector: 'app-x-detail',
  templateUrl: './x-detail.component.html',
  styleUrls: ['./x-detail.component.scss']
})
export class XDetailComponent implements OnInit, OnDestroy, ISimpleConfirm {
  hidePassword = true;
  isOwner = false;
  isAdmin = false;
  accountForm: FormGroup;
  account: Account;
  afterAccountChange = new Subject<void>();
  departments: Array<Department> = [];
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  destroy$ = new Subject<boolean>();
  constructor(private departmentSrv: DepartmentService, @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private accountSrv: AccountService, protected asyncHandle: AsyncHandleService) {
    this.accountForm = this.formBuilder.group({
      id: [''],
      departmentId: [''],
      type: [''],
      name: [''],
      mail: ['', [Validators.required]],
      phone: [''],
      password: [''],
      location: [''],
      _isAdmin: [''],
      expireTime: [new Date(), [Validators.required]],
      activationTime: [new Date(), [Validators.required]]
    });
    this.afterConfirm.subscribe(_ => this.onSubmit());
  }//constructor

  ngOnInit() {
    this.account = this.data.account;
    if (this.account) {
      this.accountForm.patchValue(this.account);
      this.isAdmin = this.account.isAdmin;
    }
    else {
      this.account = new Account();
    }
    this.accountForm.valueChanges.subscribe(vl => {
      this.satisfyConfirm.next(this.accountForm.valid);
    });
    this.isOwner = this.data.isOwner;
    if (!this.isOwner)
      this.getDepartment();
  }

  ngOnDestroy(): void {

  }


  getDepartment() {
    this.departmentSrv.getByOrgan(this.account ? this.account.organizationId : '').subscribe(res => {
      this.departments = res;
    });
  }//getDepartment

  adminChange(evt: MatCheckboxChange) {
    this.isAdmin = evt.checked;
    this.account.isAdmin = evt.checked;
    this.accountForm.patchValue({ _isAdmin: evt.checked });
  }//adminChange


  onSubmit() {
    let acc = this.accountForm.value;
    let source$ = this.accountSrv.update({ ...this.account, ...acc })
    this.asyncHandle.asyncRequest(source$).subscribe(res => {
      this.afterAccountChange.next();
    }, null, () => {
      this.doneAsync.next();
      this.closeDialog.next();
    });
  }//onSubmit
}
