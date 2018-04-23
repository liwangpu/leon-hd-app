import { Component, OnInit, ViewEncapsulation, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from '../../../../core/animations';
import { ProductDetailService } from "./product-detail.service";
import { Product } from '../../../toolkit/models/product';
import { FileAsset } from '../../../toolkit/models/fileasset';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProductDetailComponent implements OnInit, AfterViewInit, AfterContentInit {
  productSpecCharlets: Array<FileAsset>;
  constructor(private detailService: ProductDetailService, private route: ActivatedRoute) {
    let entity = this.route.snapshot.data.entity ? this.route.snapshot.data.entity : new Product();
    this.detailService.product = entity;
  }

  ngOnInit() {
    this.detailService.onProductSpecSelected
      .subscribe(charlets => {
        this.productSpecCharlets = charlets;
      });

  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
    // this.detailService.AfterProductChange.next(this.detailService.product);
    // setTimeout(() => {
    //   this.detailService.AfterProductChange.next(this.detailService.product);
    // }, 1000);
  }

}




// import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// import { ProductService } from "../../../toolkit/server/webapi/product.service";
// import { fuseAnimations } from '../../../../core/animations';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import { Subscription } from 'rxjs/Subscription';
// import { Product } from "../../../toolkit/models/product";
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { FuseUtils } from '../../../../core/fuseUtils';
// import { MatSnackBar } from '@angular/material';
// import { Location } from '@angular/common';
// import { ActivatedRoute } from "@angular/router";
// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.scss'],
//   encapsulation: ViewEncapsulation.None,
//   animations: fuseAnimations
// })
// export class ProductDetailComponent implements OnInit, OnDestroy {
//   product: Product;
//   onProductChanged: Subscription;
//   productForm: FormGroup;

//   constructor(private productService: ProductService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {

//   }

//   ngOnInit() {
//     this.product = this.route.snapshot.data.entity;
//     // console.log(111, this.product);
//     // Subscribe to update product on changes
//     // this.onProductChanged =
//     //   this.productService.onProductChanged
//     //     .subscribe(product => {

//     //       if (product) {
//     //         this.product = new Product(product);
//     //         this.pageType = 'edit';
//     //       }
//     //       else {
//     //         this.pageType = 'new';
//     //         this.product = new Product();
//     //       }

//     //       this.productForm = this.createProductForm();
//     //     });

//   }

//   createProductForm() {
//     // return this.formBuilder.group({
//     //   id: [this.product.id],
//     //   name: [this.product.name],
//     //   handle: [this.product.handle],
//     //   description: [this.product.description],
//     //   categories: [this.product.categories],
//     //   tags: [this.product.tags],
//     //   images: [this.product.images],
//     //   priceTaxExcl: [this.product.priceTaxExcl],
//     //   priceTaxIncl: [this.product.priceTaxIncl],
//     //   taxRate: [this.product.taxRate],
//     //   comparedPrice: [this.product.comparedPrice],
//     //   quantity: [this.product.quantity],
//     //   sku: [this.product.sku],
//     //   width: [this.product.width],
//     //   height: [this.product.height],
//     //   depth: [this.product.depth],
//     //   weight: [this.product.weight],
//     //   extraShippingFee: [this.product.extraShippingFee],
//     //   active: [this.product.active]
//     // });
//   }

//   saveProduct() {
//     // const data = this.productForm.getRawValue();
//     // data.handle = FuseUtils.handleize(data.name);
//     // this.productService.saveProduct(data)
//     //   .then(() => {

//     //     // Trigger the subscription with new data
//     //     this.productService.onProductChanged.next(data);

//     //     // Show the success message
//     //     this.snackBar.open('Product saved', 'OK', {
//     //       verticalPosition: 'top',
//     //       duration: 2000
//     //     });
//     //   });
//   }

//   addProduct() {
//     // const data = this.productForm.getRawValue();
//     // data.handle = FuseUtils.handleize(data.name);
//     // this.productService.addProduct(data)
//     //   .then(() => {

//     //     // Trigger the subscription with new data
//     //     this.productService.onProductChanged.next(data);

//     //     // Show the success message
//     //     this.snackBar.open('Product added', 'OK', {
//     //       verticalPosition: 'top',
//     //       duration: 2000
//     //     });

//     //     // Change the location with new one
//     //     // this.location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
//     //   });
//   }

//   ngOnDestroy() {
//     // this.onProductChanged.unsubscribe();
//   }
// }
