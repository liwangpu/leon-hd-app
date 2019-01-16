import { Component, OnInit, Inject } from '@angular/core';
// import { ISimpleConfirm } from '../../../share/common/factories/dialog-template/simple-confirm-dialog-tpls/simple-confirm-dialog-tpls.component';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ISimpleConfirm } from '@app/app-legacy';

@Component({
  selector: 'app-o-price-rate-setting',
  templateUrl: './o-price-rate-setting.component.html',
  styleUrls: ['./o-price-rate-setting.component.scss']
})
export class OPriceRateSettingComponent implements OnInit, ISimpleConfirm {

  dataValid = true;
  priceForm: FormGroup;
  afterConfirm: Subject<void> = new Subject();
  afterCancel: Subject<void> = new Subject();
  satisfyConfirm: Subject<boolean> = new Subject();
  closeDialog: Subject<void> = new Subject();
  persistDialog: Subject<boolean> = new Subject();
  disableButtons: Subject<boolean> = new Subject();
  disableConfirmButton: Subject<boolean> = new Subject();
  disableCancelButton: Subject<boolean> = new Subject();
  doneAsync: Subject<boolean> = new Subject();
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.priceForm = this.formBuilder.group({
      purchasePriceToPartnerPrice: ['', [Validators.required]],
      purchasePriceToRetailPrice: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.priceForm.patchValue(this.data.priceSetting);
    this.priceForm.valueChanges.subscribe(vl => {
      if (vl.purchasePriceToPartnerPrice != null && vl.purchasePriceToPartnerPrice >= 0 && vl.purchasePriceToRetailPrice != null && vl.purchasePriceToRetailPrice >= 0) {
        this.dataValid = true;
        this.satisfyConfirm.next(true);
      }
      else {
        this.dataValid = false;
        this.satisfyConfirm.next(false);
      }
    });
  }//ngOnInit

}
