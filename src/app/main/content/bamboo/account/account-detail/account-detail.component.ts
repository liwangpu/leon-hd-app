import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatCheckboxChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from "../../../../toolkit/models/account";
import { AccountService } from "../../../../toolkit/server/webapi/account.service";
import { DepartmentService } from "../../../../toolkit/server/webapi/department.service";
import { Department } from "../../../../toolkit/models/department";
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs/Subject';
import { AsyncHandleService } from '../../../services/async-handle.service';
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, ISimpleConfirm {
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
  constructor(private departmentSrv: DepartmentService, public dialogRef: MatDialogRef<AccountDetailComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private accountSrv: AccountService, protected asyncHandle: AsyncHandleService) {
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
    this.getDepartment();
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
      this.doneAsync.next();
    }, err => {
      this.doneAsync.next();
    });
  }//onSubmit


}
