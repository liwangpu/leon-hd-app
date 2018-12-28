import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from '@geek/scaffold-page-plate';
import { DialogFactoryService } from '@geek/scaffold-app-minor';
import { ProductDetailCategoryFormComponent } from '../product-detail-category-form/product-detail-category-form.component';

@Component({
  selector: 'app-product-detail-basic-editor-ex',
  templateUrl: './product-detail-basic-editor-ex.component.html',
  styleUrls: ['./product-detail-basic-editor-ex.component.scss']
})
export class ProductDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected dialogSrv: DialogFactoryService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: [],
      categoryId: [''],
      unit: [''],
      categoryName: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.dataRefershSubject$.subscribe(data => {
      this.detailForm.patchValue(data);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }//ngOnInit

  onEditCategory() {
    let dialogRef = this.dialogSrv.open(ProductDetailCategoryFormComponent, {
      width: '450px',
      height: '600px',
      disableClose: true
    });

    dialogRef.componentInstance.afterSelected$.subscribe(item => {
      this.detailForm.patchValue({
        categoryId: item.id,
        categoryName: item.name
      });
      dialogRef.close();
    });
  }//onEditCategory

}


