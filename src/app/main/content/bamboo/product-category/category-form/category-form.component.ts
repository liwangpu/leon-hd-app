import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductCategory } from '../../../../toolkit/models/productcategory';
import { ProductCategoryService } from '../../../../toolkit/server/webapi/productcategory.service';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../../../toolkit/common/services/snackbar.service';
import { DessertService } from '../../../services/dessert.service';
import { CategoryMdService } from '../category-md.service';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operator/startWith';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-product-category-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  afterCategorySubmit: Subject<ProductCategory> = new Subject();
  category: ProductCategory;
  categoryForm: FormGroup;
  flatCategories: Array<ProductCategory> = [];
  filteredOptions: Observable<Array<ProductCategory>>;
  destroy$: Subject<boolean> = new Subject();
  constructor(private dialogRef: MatDialogRef<CategoryFormComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private categorySrv: ProductCategoryService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private dessertSrv: DessertService, private categoryMdSrv: CategoryMdService) {
    this.category = this.data.category;
    this.category.organizationId = this.dessertSrv.organId;
    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      type: [''],
      organizationId: [''],
      displayIndex: [''],
      parentId: [''],
      parentObj: ['']
    });

  }

  ngOnInit() {
    this.flatCategories = this.categoryMdSrv.productCategories;
    this.categoryForm.patchValue(this.category);
    this.categoryForm.patchValue({ parentObj: this.flatCategories.filter(x => x.id == this.category.parentId)[0] });
    this.filteredOptions = this.categoryForm.get('parentObj').valueChanges.takeUntil(this.destroy$).pipe(
      map(val => this.filter(val)));

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
    // console.log(111, 'submit', this.categoryForm.value);
  }//submit

  filter(val: string): Array<ProductCategory> {
    return this.flatCategories.filter(option =>
      option.name.includes(val));
  }//

  displayFn(cat?: ProductCategory): string | undefined {
    return cat ? cat.name : '';
  }//displayFn

  /**
   * 父分类选择后事件
   * @param vl 
   */
  onParentSelected(vl: MatAutocompleteSelectedEvent) {
    this.categoryForm.patchValue({ parentId: vl.option.value.id });
  }//onParentSelected
}
