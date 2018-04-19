import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Account } from "../../../../toolkit/models/account";
import { AccountService } from "../../../../toolkit/server/webapi/account.service";
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDetailComponent implements OnInit {

  event: CalendarEvent;
  dialogTitle: string;
  accountForm: FormGroup;
  account: Account;
  hidePassword = true;
  constructor(public dialogRef: MatDialogRef<AccountDetailComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private accountSrv: AccountService, private snackBarSrv: SnackbarService) {
    this.account = data.account;
    // console.log(111, 'get admin', this.account);
    this.accountForm = this.createAccountForm();
  }

  ngOnInit() {
    this.accountForm.patchValue(this.account);
  }

  createAccountForm() {
    // return this.formBuilder.group({
    //   id: new FormControl('', []),
    //   organizationId: new FormControl('', []),
    //   type: new FormControl('', []),
    //   name: new FormControl('', []),
    //   mail: new FormControl('', [Validators.required]),
    //   phone: new FormControl('', []),
    //   password: new FormControl('', []),
    //   location: new FormControl('', []),
    //   expireTime: new FormControl('', [Validators.required]),
    //   activationTime: new FormControl('', [Validators.required])
    // });
    return this.formBuilder.group({
      id: [''],
      organizationId: [''],
      type: [''],
      name: ['组织管理员'],
      mail: ['', [Validators.required]],
      phone: [''],
      password: [''],
      location: [''],
      expireTime: ['', [Validators.required]],
      activationTime: ['', [Validators.required]]
    });
  }//createAccountForm

  onSave() {
    let acc = this.accountForm.value;
    this.accountSrv.update(acc).subscribe(rdata => {
      rdata.password = acc.password;
      this.accountForm.patchValue(rdata);
      this.snackBarSrv.simpleBar('保存成功');
    }, err => {
      this.snackBarSrv.simpleBar('保存失败');
    });
  }//onSave
}
