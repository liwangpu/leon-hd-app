import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { AsyncHandleService ,ConfirmDialogBase} from "scaffold-app-minor";
import { AccountService } from 'micro-app-basic';


@Component({
  selector: 'app-organization-owner-profile',
  templateUrl: './organization-owner-profile.component.html',
  styleUrls: ['./organization-owner-profile.component.scss']
})
export class OrganizationOwnerProfileComponent extends ConfirmDialogBase implements OnInit {

  hidePassword=true;
  detailForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private accSrv: AccountService, private asyncHandle: AsyncHandleService) {
    super();
    this.detailForm = this.formBuilder.group({
      id: [''],
      departmentId: [''],
      type: [''],
      location: [''],
      isAdmin: [''],
      name: [{ value: '', disabled: true }],
      mail: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      password: [''],
      expireTime: [new Date(), [Validators.required]],
      activationTime: [new Date(), [Validators.required]]
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.detailForm.valueChanges.subscribe(() => {
      this.satisfyConfirm$.next(true);
    });//subscribe
    this.detailForm.patchValue(this.data.owner);


    this.afterConfirm$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      let data = this.detailForm.value;
      this.asyncHandle.asyncRequest(this.accSrv.update(data)).subscribe(res => {
      }, err => { }, () => {
        this.doneAsync$.next();
      });
    });//subscribe

    // this.afterConfirm$.pipe(takeUntil(this.destroy$)).pipe(mapTo(() => {
    //   let data = this.detailForm.value;
    //   return this.accSrv.update(data);
    // })).subscribe(res => {
    //   this.doneAsync$.next();
    // }, error => {
    //   this.doneAsync$.next();
    // });
  }//ngOnInit

}
