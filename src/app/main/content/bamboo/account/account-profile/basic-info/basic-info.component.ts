import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { BasicInfoTabExtend, BasicInfoTabExtendManageButton } from '../../../common/detail-edit-tpls/basic-info-tab/basic-info-tab.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Account } from "../../../../../toolkit/models/account";
import { DatePipe } from '@angular/common';
import { DialogFactoryService } from '../../../../../toolkit/common/factory/dialog-factory.service';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
import { DessertService } from '../../../../services/dessert.service';

@Component({
  selector: 'app-account-profile-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => BasicInfoComponent) }]
})
export class BasicInfoComponent extends BasicInfoTabExtend implements OnInit, OnDestroy {

  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, protected datePipeTr: DatePipe, protected dialogFac: DialogFactoryService, private dessertSrv: DessertService) {
    super();
    this.detailForm = this.formBuilder.group({
      phone: [''],
      location: [''],
      department: [{ value: '', disabled: true }],
      activationTime: [{ value: '', disabled: true }],
      expireTime: [{ value: '', disabled: true }],
      mail: ['', [Validators.required]]
    });

    this.afterDataChange$.takeUntil(this.destroy$).subscribe(data => {
      let mat = (data as Account);
      this.dessertSrv.nickName = mat.name;
      this.dessertSrv.icon = mat.icon;
      this.dessertSrv.afterProfileChange$.next();
      if (!this.detailForm)
        return;
      this.detailForm.patchValue({ mail: mat.mail, phone: mat.phone, location: mat.location, activationTime: this.datePipeTr.transform(mat.activationTime, 'yyyy-MM-dd'), expireTime: this.datePipeTr.transform(mat.expireTime, 'yyyy-MM-dd'), department: mat.departmentName });
    });

    let changePasswordBtn: BasicInfoTabExtendManageButton = {
      icon: 'lock',
      name: 'button.ChangePassword',
      click: (data) => {
        this.changePassword(data as Account);
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

  changePassword(acc: Account) {
    let dialog = this.dialogFac.tplsConfirm(ChangePasswordComponent, 'dialog.ChangePassword', { width: '400px', height: '350px' });
  }//changePassword
}
