import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime.js';
import { ProductDetailMdService } from "../product-detail-md.service";
import { ProductService } from "../../../../toolkit/server/webapi/product.service";
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from "../../../../toolkit/common/services/snackbar.service";
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CategoryPanelComponent } from '../../product-category/category-panel/category-panel.component';
import { ProductCategoryService } from '../../../../toolkit/server/webapi/productcategory.service';
import { PathService } from '../../../services/path.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';

@Component({
  selector: 'app-product-detail-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  iconUploadUrl: string;
  productForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private formBuilder: FormBuilder, public detaiMdSrv: ProductDetailMdService, private productSrv: ProductService, private tranSrv: TranslateService, private snackBarSrv: SnackbarService, private dialog: MatDialog, private categorySrv: ProductCategoryService, private pathSrv: PathService) {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
      categoryId: [''],
      categoryName: ['', [Validators.required]]
    });

    //订阅提交事件
    this.detaiMdSrv.submitProduct$.takeUntil(this.destroy$).subscribe(() => {
      this.submitProduct();
    });
    this.iconUploadUrl = this.productSrv.uri + '/changeICon';
  }//constructor

  ngOnInit() {
    this.productForm.patchValue(this.detaiMdSrv.product);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  submitProduct() {

    let saveProdAsync = () => {
      let vl = this.productForm.value;
      return new Promise((resolve) => {
        vl.iconAssetId = this.detaiMdSrv.product.iconAssetId;
        this.productSrv.update(vl).subscribe(resProd => {
          this.detaiMdSrv.product.id = resProd.id;
          this.detaiMdSrv.product.name = resProd.name;
          this.detaiMdSrv.product.description = resProd.description;
          this.detaiMdSrv.product.categoryId = vl.categoryId;
          this.detaiMdSrv.product.categoryName = vl.categoryName;
          this.detaiMdSrv.afterSaveProduct$.next();
          this.productForm.patchValue(this.detaiMdSrv.product);
          resolve({ k: 'message.SaveSuccessfully' });
        }, err => {
          resolve({ k: 'message.OperationError', v: { value: err } });
        });
      });//promise
    };//saveProdAsync

    let transAsync = (mobj: { k: string, v: any }) => {
      return new Promise((resolve) => {
        this.tranSrv.get(mobj.k, mobj.v).subscribe(msg => {
          resolve(msg);
        });
      });//promise
    };//transAsync

    saveProdAsync().then(transAsync).then(msg => {
      this.snackBarSrv.simpleBar(msg as string);
    });
  }//submitProduct

  onEditCategory() {
    let dialogObj = this.dialog.open(CategoryPanelComponent, {
      width: '700px',
      height: '800px'
    });//

    let dialogDestroy$ = new Subject<boolean>();
    dialogObj.componentInstance.afterUserSelect$.takeUntil(dialogDestroy$).subscribe(resCate => {
      this.productForm.patchValue({ categoryId: resCate.id, categoryName: resCate.name });
    });
    dialogObj.afterClosed().first().subscribe(() => {
      dialogDestroy$.next(true);
      dialogDestroy$.unsubscribe();
    });
  }//onEditCategory

  afterIConChange(ass: FileAsset) {
    this.detaiMdSrv.product.icon = ass.url;
    this.detaiMdSrv.product.iconAssetId = ass.id;
  }//afterIConChange
}
