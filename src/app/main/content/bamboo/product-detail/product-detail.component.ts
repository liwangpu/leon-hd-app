import { Component, OnInit, ViewEncapsulation, AfterViewInit, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from '../../../../core/animations';
import { ProductDetailService } from "./product-detail.service";
import { Product } from '../../../toolkit/models/product';
import { FileAsset } from '../../../toolkit/models/fileasset';
import { SpecCharletsComponent } from "./spec-charlets/spec-charlets.component";
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productSpecCharlets: Array<FileAsset>;
  @ViewChild('charletCt') charletCt: SpecCharletsComponent;
  constructor(private detailService: ProductDetailService, private route: ActivatedRoute) {
    let entity = this.route.snapshot.data.entity ? this.route.snapshot.data.entity : new Product();
    this.detailService.product = entity;
  }

  ngOnInit() {
    // this.detailService.onProductSpecSelected
    //   .subscribe(charlets => {
    //     this.productSpecCharlets = charlets;
    //   });
  }

  ngOnDestroy(): void {
    this.charletCt.reset();
  }


}
