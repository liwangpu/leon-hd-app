import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsyncHandleService } from 'scaffold-app-minor';
import { AccountService } from 'micro-app-basic';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account-detail-resetpwd-form',
  templateUrl: './account-detail-resetpwd-form.component.html',
  styleUrls: ['./account-detail-resetpwd-form.component.scss']
})
export class AccountDetailResetpwdFormComponent implements OnInit, OnDestroy {


  enableConfirm = false;
  detailForm: FormGroup;
  confirmPasswordNotSame = false;
  afterChangePassword$ = new Subject();
  constructor(protected formBuilder: FormBuilder, protected asyncHandleSrv: AsyncHandleService, protected accountSrv: AccountService) {
    this.detailForm = this.formBuilder.group({
      userId: []
      , password: ['', [Validators.required]]
      , confirmPassword: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe((vl: { password: string, confirmPassword: string }) => {
      this.confirmPasswordNotSame = vl.password && vl.confirmPassword && vl.password != vl.confirmPassword;
      this.enableConfirm = this.detailForm.valid && !this.confirmPasswordNotSame;
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterChangePassword$.unsubscribe();
  }//ngOnDestroy


  afterReceiveData(data: { userId: string }) {
    this.detailForm.patchValue({
      userId: data.userId
    });
  }//afterReceiveData

  afterConfirm() {
    let data = this.detailForm.value;
    let source$ = this.accountSrv.resetPassword(data);

    let manualHandleError = (error: any) => {
      let msg = '';
      if (error.error && error.error.errors && error.error.errors.length > 0) {
        for (let it of error.error.errors)
          msg += it.message + ' ';
      }
      return msg;
    };
    this.asyncHandleSrv.asyncRequest(source$, false, manualHandleError).subscribe(() => {
      this.afterChangePassword$.next();
    });
  }//afterConfirm

}
