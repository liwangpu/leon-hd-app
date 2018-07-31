import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { BasicInfoTabExtend } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DialogFactoryService } from '../../../share/common/factories/dialog-factory.service';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../../share/models/product';
import { ProductLeftCategoryLaunchService } from '../../product/product-left-category-launch.service';
import { SimpleCategoryPanelComponent } from '../../../share/common/factories/dialog-template/simple-category-panel/simple-category-panel.component';
import { AccountService } from '../../../share/services/webapis/account.service';
import { AccountTypeEnums } from '../../../share/enums/enums';
import { PreferenceService } from '../../../share/services/webapis/preference.service';

@Component({
  selector: 'app-product-basic-info-ex',
  templateUrl: './product-basic-info-ex.component.html',
  styleUrls: ['./product-basic-info-ex.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => ProductBasicInfoExComponent) },
    ProductLeftCategoryLaunchService
  ]
})
export class ProductBasicInfoExComponent extends BasicInfoTabExtend implements OnInit, OnDestroy {

  purchasePriceToPartnerPriceRate = 0;
  purchasePriceToRetailPriceRate = 0;
  showPurchasePrice = false;
  showPartnerPrice = false;
  categoryId: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, protected dialogFac: DialogFactoryService, protected categoryLaunch: ProductLeftCategoryLaunchService, protected accountSrv: AccountService, protected preferenceSrv: PreferenceService) {
    super();

    this.afterDataChange$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      let mat = (data as Product);
      this.categoryId = mat.categoryId;
      this.canSave = Boolean(this.categoryId);
      if (!this.detailForm)
        return;
      this.detailForm.patchValue({ categoryId: mat.categoryId, categoryName: mat.categoryName });


      this.preferenceSrv.uriPart = 'Products/Preference';
      this.preferenceSrv.getByKey('Price-Setting').subscribe(prf => {
        try {
          let vl = JSON.parse(prf.value);
          this.purchasePriceToPartnerPriceRate = vl.purchasePriceToPartnerPrice ? vl.purchasePriceToPartnerPrice : 0;
          this.purchasePriceToRetailPriceRate = vl.purchasePriceToRetailPrice ? vl.purchasePriceToRetailPrice : 0;
        } catch (error) { }

        let t_purchasePrice = mat.purchasePrice ? mat.purchasePrice : 0;
        let t_partnerPrice = mat.partnerPrice > 0 ? mat.partnerPrice : (t_purchasePrice * this.purchasePriceToPartnerPriceRate);
        let t_price = mat.price > 0 ? mat.price : (t_purchasePrice * this.purchasePriceToRetailPriceRate);
        this.detailForm.patchValue({ price: t_price, purchasePrice: t_purchasePrice, partnerPrice: t_partnerPrice });
      });
    });

    this.detailForm = this.formBuilder.group({
      categoryId: [''],
      price: [''],
      purchasePrice: [''],
      partnerPrice: [''],
      categoryName: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      this.data = { categoryId: vl.categoryId, price: vl.price, purchasePrice: vl.purchasePrice, partnerPrice: vl.partnerPrice };
      this.canSave = this.categoryId ? true : false;
    });
    //订阅个人信息变更事件
    this.accountSrv.profile$.subscribe(profile => {

      if (profile.role == AccountTypeEnums.brandAdmin || profile.role == AccountTypeEnums.brandMember) {
        this.showPurchasePrice = true;
        this.showPartnerPrice = true;
      }
      else if (profile.role == AccountTypeEnums.partnerAdmin || profile.role == AccountTypeEnums.partnerMember) {
        this.showPartnerPrice = true;
      }
      else { }
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onEditCategory() {
    let dialog = this.dialogFac.simpleCategorySelect(this.categoryLaunch);
    dialog.afterOpen().subscribe(() => {
      let ins: SimpleCategoryPanelComponent = dialog.componentInstance.componentIns;
      ins.afterConfirm.subscribe(() => {
        this.canSave = ins.selectedCategory ? true : false;
        this.categoryId = ins.selectedCategoryId;
        this.detailForm.patchValue({ categoryId: ins.selectedCategory.id, categoryName: ins.selectedCategory.name });
        ins.doneAsync.next();
        ins.closeDialog.next();
      });//afterConfirm
    });//afterOpen

  }//onEditCategory

  purchasePriceChange(price: string) {
    let t_purchasePrice = price.indexOf('.') > 0 ? Number.parseFloat(Number.parseFloat(price).toFixed(2)) : Number.parseFloat(price);
    let p1 = (t_purchasePrice * this.purchasePriceToPartnerPriceRate);
    let t_partnerPrice = p1.toString().indexOf('.') > 0 ? p1.toFixed(2) : p1;
    let p2 = (t_purchasePrice * this.purchasePriceToRetailPriceRate);
    let t_price = p2.toString().indexOf('.') > 0 ? p2.toFixed(2) : p2;
    this.detailForm.patchValue({ price: t_price, purchasePrice: t_purchasePrice, partnerPrice: t_partnerPrice });
  }//purchasePriceChange

}
