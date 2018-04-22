// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-spec-nav-left-product',
//   templateUrl: './spec-nav-left-product.component.html',
//   styleUrls: ['./spec-nav-left-product.component.scss']
// })
// export class SpecNavLeftProductComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailService } from "../../../product-detail.service";
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Product } from "../../../../../../toolkit/models/product";
import { ProductService } from "../../../../../../toolkit/server/webapi/product.service";
import { SnackbarService } from "../../../../../../toolkit/common/services/snackbar.service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-spec-nav-left-product',
  templateUrl: './spec-nav-left-product.component.html',
  styleUrls: ['./spec-nav-left-product.component.scss']
})
export class SpecNavLeftProductComponent implements OnInit, OnDestroy {
  user: any;
  onFormChange: any;
  userForm: FormGroup;
  product: Product;
  productForm: FormGroup;
  constructor(private detailService: ProductDetailService, private formBuilder: FormBuilder, private productSrv: ProductService, private snackBarSrv: SnackbarService, private transSrv: TranslateService) {
    // this.user = this.detailService.user;
    // this.userForm = new FormGroup({
    //   mood: new FormControl(this.user.mood),
    //   status: new FormControl(this.user.status)
    // });

    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    // this.onFormChange = this.userForm.valueChanges
    //   .debounceTime(500)
    //   .distinctUntilChanged()
    //   .subscribe(data => {
    //     this.user.mood = data.mood;
    //     this.user.status = data.status;
    //     this.detailService.updateUserData(this.user);
    //   });
    this.product = this.detailService.product;
    this.productForm.patchValue(this.product);
  }

  onBackToSpecs(view) {
    this.detailService.onLeftSidenavViewChanged.next(view);
  }

  onSaveProduct() {
    let prod = this.productForm.value;
    // this.productSrv.update(prod).subscribe(rdata => {
    //   console.log(111, 'prod', rdata);
    // });

    let saveAsync = () => {
      return new Promise((resolve, reject) => {
        this.productSrv.update(prod).subscribe(rdata => {
          resolve(rdata);
        });
      });
    };//saveAsync

    let transAsync = (data) => {
      return new Promise((resolve, reject) => {
        this.transSrv.get('message.SaveSuccessfully').subscribe(msg => {
          this.snackBarSrv.simpleBar(msg);
          this.detailService.product = data;
        });
      });
    };//transAsync

    saveAsync().then(transAsync);
  }//onSaveProduct

  ngOnDestroy() {
    // this.onFormChange.unsubscribe();
  }
}
