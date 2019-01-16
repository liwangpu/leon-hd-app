import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
// import { BasicInfoTabExtend } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';
import { ProductGroupLeftCategoryLaunchService } from '../../product-group/product-group-left-category-launch.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
// import { DialogFactoryService } from '../../../share/common/factories/dialog-factory.service';
import { takeUntil } from 'rxjs/operators';

import { DialogFactoryService, SimpleCategoryPanelComponent } from '@app/app-legacy';
import { BasicInfoTabExtend,ProductGroup } from '@app/app-legacy';

// import { ProductGroup } from '../../../share/models/product-group';
// import { SimpleCategoryPanelComponent } from '../../../share/common/factories/dialog-template/simple-category-panel/simple-category-panel.component';

@Component({
  selector: 'app-product-group-detail-basic-info-ex',
  templateUrl: './product-group-detail-basic-info-ex.component.html',
  styleUrls: ['./product-group-detail-basic-info-ex.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => ProductGroupDetailBasicInfoExComponent) },
    ProductGroupLeftCategoryLaunchService
  ]
})
export class ProductGroupDetailBasicInfoExComponent extends BasicInfoTabExtend implements OnInit, OnDestroy {

  categoryId: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, protected dialogFac: DialogFactoryService, protected categoryLaunch: ProductGroupLeftCategoryLaunchService) {
    super();

    this.afterDataChange$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      let mat = (data as ProductGroup);
      this.categoryId = mat.categoryId;
      this.canSave = Boolean(this.categoryId);
      if (!this.detailForm)
        return;
      this.detailForm.patchValue({ categoryId: mat.categoryId, categoryName: mat.categoryName });
    });

    this.detailForm = this.formBuilder.group({
      categoryId: [''],
      categoryName: ['', [Validators.required]]
    });
  }//constructor

  ngOnInit() {
    this.detailForm.valueChanges.subscribe(vl => {
      this.data = { categoryId: vl.categoryId, price: vl.price };
      this.canSave = this.categoryId ? true : false;
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
}
