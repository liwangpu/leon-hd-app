import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DessertService } from '../../../services/dessert.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { AccountService } from '../../../../toolkit/server/webapi/account.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Account } from '../../../../toolkit/models/account';
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit, OnDestroy {


  event: CalendarEvent;
  dialogTitle: string;
  accountForm: FormGroup;
  account: Account;
  hidePassword = true;
  hideDepartment: boolean;
  destroy$: Subject<boolean> = new Subject();
  constructor(private dessertSrv: DessertService, @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private accountSrv: AccountService, private snackBarSrv: SnackbarService, private tranSrv: TranslateService) {

    this.accountForm = this.formBuilder.group({
      id: [''],
      name: [''],
      mail: ['', [Validators.required]],
      phone: [''],
      password: [''],
      location: ['']
    });;
  }

  ngOnInit() {
    this.getProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  getProfile() {
    this.accountSrv.getById(this.data.id).takeUntil(this.destroy$).subscribe(data => {
      this.account = data;
      this.accountForm.patchValue(data);
    });
  }//getProfile

  onSubmit() {
    let saveAccountAsync = () => {
      let acc = { ...this.account, ...this.accountForm.value };
      return new Promise((resolve, reject) => {
        this.accountSrv.update(acc).subscribe(resAccount => {
          resAccount.password = acc.password;
          resAccount.departmentId = acc.departmentId;
          this.accountForm.patchValue(resAccount);

          this.dessertSrv.nickName = resAccount.name;
          this.dessertSrv.icon = resAccount.icon;
          this.dessertSrv.afterProfileChange$.next();
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });//promise
    };//saveAccountAsync

    let tranAsync = (msgObj: { k: string, v: any }) => {
      return new Promise((resolve, reject) => {
        this.tranSrv.get(msgObj.k, msgObj.v).subscribe(resMsg => {
          resolve(resMsg);
        });
      });//promise
    };//tranAsync


    saveAccountAsync().then(tranAsync).then((msg: string) => {
      this.snackBarSrv.simpleBar(msg);
    });
  }//onSubmit

}
