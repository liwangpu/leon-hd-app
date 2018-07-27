import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { BasicInfoTabExtend } from '../../../share/common/page-tpls/detail-page-tpls/detail-edit-refers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DialogFactoryService } from '../../../share/common/factories/dialog-factory.service';
import { MaterialLeftCategoryLaunchService } from '../../material/material-left-category-launch.service';
import { takeUntil } from 'rxjs/operators';
import { Material } from '../../../share/models/material';
import { SimpleCategoryPanelComponent } from '../../../share/common/factories/dialog-template/simple-category-panel/simple-category-panel.component';

@Component({
  selector: 'app-material-basic-info-ex',
  templateUrl: './material-basic-info-ex.component.html',
  styleUrls: ['./material-basic-info-ex.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => MaterialBasicInfoExComponent) },
    MaterialLeftCategoryLaunchService
  ]
})
export class MaterialBasicInfoExComponent extends BasicInfoTabExtend implements OnInit, OnDestroy {

  categoryId: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, protected dialogFac: DialogFactoryService, protected categoryLaunch: MaterialLeftCategoryLaunchService) {
    super();

    this.afterDataChange$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      let mat = (data as Material);
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
