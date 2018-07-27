import { Component, OnInit, OnDestroy, forwardRef, ComponentFactoryResolver } from '@angular/core';
import { BasicInfoTabExtend, BasicInfoTabExtendManageButton } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { Subject } from '../../../../../node_modules/rxjs';
import { DatePipe } from '../../../../../node_modules/@angular/common';
import { DialogFactoryService } from '../../../share/common/factories/dialog-factory.service';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';
import { Account } from "../../../share/models/account";
import { OChangePasswordComponent } from '../o-change-password/o-change-password.component';

@Component({
  selector: 'app-account-profile-o-basic-info',
  templateUrl: './o-basic-info.component.html',
  styleUrls: ['./o-basic-info.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => OBasicInfoComponent) }]
})
export class OBasicInfoComponent extends BasicInfoTabExtend implements OnInit, OnDestroy {

  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, protected datePipeTr: DatePipe, protected dialogFac: DialogFactoryService, protected componentFactoryResolver: ComponentFactoryResolver) {
    super();
    this.detailForm = this.formBuilder.group({
      phone: [''],
      location: [''],
      department: [{ value: '', disabled: true }],
      activationTime: [{ value: '', disabled: true }],
      expireTime: [{ value: '', disabled: true }],
      mail: ['', [Validators.required]]
    });

    this.afterDataChange$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      let mat = (data as Account);
      // this.dessertSrv.nickName = mat.name;
      // this.dessertSrv.icon = mat.icon;
      // this.dessertSrv.afterProfileChange$.next();
      if (!this.detailForm)
        return;
      this.detailForm.patchValue({ mail: mat.mail, phone: mat.phone, location: mat.location, activationTime: this.datePipeTr.transform(mat.activationTime, 'yyyy-MM-dd'), expireTime: this.datePipeTr.transform(mat.expireTime, 'yyyy-MM-dd'), department: mat.departmentName });
    });

    let changePasswordBtn: BasicInfoTabExtendManageButton = {
      icon: 'lock',
      name: 'button.ChangePassword',
      click: (data) => {
        this.changePassword();
      }
    };
    this.manageButtons.push(changePasswordBtn);
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      this.data = { mail: vl.mail, price: vl.price, phone: vl.phone, location: vl.location };
      this.canSave = vl.mail ? true : false;
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  changePassword() {
    this.dialogFac.lazyModelEntryConfirm(OChangePasswordComponent, this.componentFactoryResolver, 'dialog.ChangePassword', { width: '400px', height: '350px' });
  }//changePassword
}
