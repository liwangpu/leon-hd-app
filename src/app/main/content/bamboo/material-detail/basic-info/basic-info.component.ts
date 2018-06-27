import { Component, OnInit, forwardRef } from "@angular/core";
import { BasicInfoTabExtend } from "../../common/detail-edit-tpls/basic-info-tab/basic-info-tab.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Material } from "../../../../toolkit/models/material";
import { DialogFactoryService } from "../../../../toolkit/common/factory/dialog-factory.service";
import { CategoryChangeSuitComponent } from "./category-change-suit.component";

@Component({
  selector: 'app-material-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  providers: [{ provide: BasicInfoTabExtend, useExisting: forwardRef(() => BasicInfoComponent) }]
})
export class BasicInfoComponent extends BasicInfoTabExtend implements OnInit {

  categoryId: string;
  detailForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, protected dialogFac: DialogFactoryService) {
    super();

    this.afterDataChange$.takeUntil(this.destroy$).subscribe(data => {
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

  }//ngOnInit


  onEditCategory() {
    let dialog = this.dialogFac.tplsConfirm(CategoryChangeSuitComponent, '选择分类', { width: '450px', height: '550px', data: {} });

    dialog.afterOpen().first().subscribe(() => {
      let ins = (dialog.componentInstance.componentIns as CategoryChangeSuitComponent);
      ins.refreshData.subscribe(cate => {
        this.categoryId = cate.id;
        this.data = { categoryId: cate.id };
        this.detailForm.patchValue({ categoryId: cate.id, categoryName: cate.name });
      });

      ins.afterConfirm.subscribe(() => {
        this.canSave = Boolean(this.categoryId);
      });
    });

  }//onEditCategory
}
