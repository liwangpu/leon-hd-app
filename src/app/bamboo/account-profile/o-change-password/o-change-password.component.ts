import { Component, OnInit } from '@angular/core';
import { ISimpleConfirm } from '../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AsyncHandleService } from '../../../share/services/common/async-handle.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../share/services/webapis/account.service';
import { ViewportService } from '../../../share/services/common/viewport.service';


@Component({
  selector: 'app-o-change-password',
  templateUrl: './o-change-password.component.html',
  styleUrls: ['./o-change-password.component.scss']
})
export class OChangePasswordComponent implements OnInit, ISimpleConfirm {

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
  constructor(private formBuilder: FormBuilder, private asyncHandle: AsyncHandleService, private accountSr: AccountService, protected viewPortSrv: ViewportService,protected router: Router) {
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
        this.viewPortSrv.outletMaximize$.next(true);
        this.router.navigateByUrl('/login');
      }, 2000);
    }, err => {
      this.doneAsync.next();
    });

  }//changePassword

}
