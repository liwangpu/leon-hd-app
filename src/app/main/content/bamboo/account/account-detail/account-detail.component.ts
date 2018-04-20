import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Account } from "../../../../toolkit/models/account";
import { AccountService } from "../../../../toolkit/server/webapi/account.service";
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { Subject } from 'rxjs';
import { AccountTypeEnums } from "../../../../toolkit/enums/enums";
import { DepartmentService } from "../../../../toolkit/server/webapi/department.service";
import { Department } from "../../../../toolkit/models/department";
import { DessertService } from "../../../services/dessert.service";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDetailComponent implements OnInit {
  onSave: Subject<Account> = new Subject();
  event: CalendarEvent;
  dialogTitle: string;
  accountForm: FormGroup;
  account: Account;
  hidePassword = true;
  hideDepartment: boolean;
  departments: Array<Department> = [];
  constructor(private departmentSrv: DepartmentService, private dessertSrv: DessertService, public dialogRef: MatDialogRef<AccountDetailComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private accountSrv: AccountService, private snackBarSrv: SnackbarService) {
    this.account = data.account;
    // console.log(111, 'get admin', this.account);
    this.accountForm = this.createAccountForm();
    if (this.account.type === AccountTypeEnums.user) {
      this.hideDepartment = false;
      this.getDepartment();
    }
  }

  ngOnInit() {
    this.accountForm.patchValue(this.account);
  }

  private getDepartment() {
    this.departmentSrv.getByOrgan(this.dessertSrv.organId).subscribe(res => {
      this.departments = res;
    });
  }//getDepartment

  private createAccountForm() {
    return this.formBuilder.group({
      id: [''],
      organizationId: [''],
      departmentId: [''],
      type: [''],
      name: ['组织管理员'],
      mail: ['', [Validators.required]],
      phone: [''],
      password: [''],
      location: [''],
      expireTime: [new Date(), [Validators.required]],
      activationTime: [new Date(), [Validators.required]]
    });
  }//createAccountForm

  private submit() {
    let acc = this.accountForm.value;
    this.accountSrv.update(acc).subscribe(rdata => {
      rdata.password = acc.password;
      this.accountForm.patchValue(rdata);
      this.snackBarSrv.simpleBar('保存成功');
      this.onSave.next(rdata);
    }, err => {
      console.log('nnn', err);
      this.snackBarSrv.simpleBar('保存失败:' + err);
    });
  }//onSave
}
