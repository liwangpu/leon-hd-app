import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../../toolkit/common/factory/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsyncHandleService } from '../../../services/async-handle.service';
import { AccountService } from '../../../../toolkit/server/webapi/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, ISimpleConfirm {

  unUniformPassword = false;
  detailForm: FormGroup;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(private formBuilder: FormBuilder, private asyncHandle: AsyncHandleService, private accountSr: AccountService, private router: Router) {
    this.detailForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.afterConfirm.subscribe(_ => {
      this.changePassword();
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      if (vl.confirmPassword) {
        if (vl.confirmPassword === vl.newPassword) {
          if (vl.oldPassword && vl.newPassword)
            this.satisfyConfirm.next(true);
          this.unUniformPassword = false;
        }
        else {
          this.satisfyConfirm.next(false);
          this.unUniformPassword = true;
        }
      }
      else {
        this.satisfyConfirm.next(false);
      }
    });
  }//ngOnInit

  changePassword() {
    let model = this.detailForm.value;
    let source$ = this.accountSr.changePassword(model.oldPassword, model.newPassword);
    this.asyncHandle.asyncRequest(source$).subscribe(_ => {
      this.doneAsync.next();
      this.closeDialog.next();
      setTimeout(() => {
        this.router.navigateByUrl('/app/login2');
      }, 2000);
    }, err => {
      this.doneAsync.next();
    });

  }//changePassword

}
