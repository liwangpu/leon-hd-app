import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailBasicEditorExBase, DetailEditorInteractService } from 'scaffold-page-plate';
import { DialogFactoryService } from 'scaffold-app-minor';
import { MaterialDetailCategoryFormComponent } from '../material-detail-category-form/material-detail-category-form.component';

@Component({
  selector: 'app-material-detail-basic-editor-ex',
  templateUrl: './material-detail-basic-editor-ex.component.html',
  styleUrls: ['./material-detail-basic-editor-ex.component.scss']
})
export class MaterialDetailBasicEditorExComponent extends DetailBasicEditorExBase implements OnInit, OnDestroy {

  constructor(protected formBuilder: FormBuilder, protected interactSrv: DetailEditorInteractService, protected dialogSrv: DialogFactoryService) {
    super(interactSrv);

    this.detailForm = this.formBuilder.group({
      id: [],
      categoryId: [''],
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
    let dialogRef = this.dialogSrv.open(MaterialDetailCategoryFormComponent, {
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

