import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-change-password-form',
  templateUrl: './profile-change-password-form.component.html',
  styleUrls: ['./profile-change-password-form.component.scss']
})
export class ProfileChangePasswordFormComponent implements OnInit, OnDestroy {


  satisfyConfirm = false;
  unUniformPassword = false;
  detailForm: FormGroup;
  afterConfirm$ = new Subject<any>();
  constructor(protected formBuilder: FormBuilder) {
    this.detailForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      if (vl.confirmPassword) {
        if (vl.confirmPassword === vl.newPassword) {
          if (vl.oldPassword && vl.newPassword)
            this.satisfyConfirm = true;
          this.unUniformPassword = false;
        }
        else {
          this.satisfyConfirm = false;
          this.unUniformPassword = true;
        }
      }
      else {
        this.satisfyConfirm = false;
      }
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterConfirm$.complete();
    this.afterConfirm$.unsubscribe();
  }//ngOnDestroy

  afterConfirm() {
    let data = this.detailForm.value;
    this.afterConfirm$.next(data);
  }//afterConfirm
}
