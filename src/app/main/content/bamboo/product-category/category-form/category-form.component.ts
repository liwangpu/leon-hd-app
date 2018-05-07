import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductCategory } from '../../../../toolkit/models/productcategory';
import { ProductCategoryService } from '../../../../toolkit/server/webapi/productcategory.service';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { DessertService } from '../../../services/dessert.service';
@Component({
  selector: 'app-product-category-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  afterCategorySubmit: Subject<ProductCategory> = new Subject();
  category: ProductCategory;
  categoryForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<CategoryFormComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private categorySrv: ProductCategoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private dessertSrv: DessertService) {
    this.category = this.data.category;
    this.category.organizationId = this.dessertSrv.organId;
    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      type: [''],
      organizationId: [''],
      displayIndex: [''],
      parentId: ['']
    });

  }

  ngOnInit() {
    this.categoryForm.patchValue(this.category);
  }//ngOnInit

  closeDialog() {
    this.dialogRef.close();
  }//closeDialog

  submit() {
    let saveAsync = () => {
      return new Promise((resolve, reject) => {
        this.categorySrv.updateProductCategory(this.categoryForm.value).first().subscribe(resCate => {
          this.categoryForm.patchValue(resCate);
          this.afterCategorySubmit.next(resCate);
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          reject({ k: 'message.OperationError', v: { value: err } });
        });
      });//promise
    };//saveAsync

    let tranAsync = (objMsg: { k: string, v: string }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(objMsg.k, objMsg.v).first().subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//tranAsync

    saveAsync().then(tranAsync).then((msg) => {
      this.snackBarSrv.simpleBar(msg as string);
    });

  }//submit
}
