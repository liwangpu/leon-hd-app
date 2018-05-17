import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDetailMdService } from "./product-detail-md.service";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from '../../../toolkit/models/product';
import { ProductSpec } from '../../../toolkit/models/productspec';
import { PathService } from '../../services/path.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductDetailMdService]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productName: string;
  showSubmitBtn: boolean;
  showSpecification: boolean;
  detroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public detailMdSrv: ProductDetailMdService, private route: ActivatedRoute, public pathSrv: PathService) {
    let tmp = this.route.snapshot.data.entity;
    this.detailMdSrv.product = tmp ? tmp : new Product();
    this.detailMdSrv.productSpec = new ProductSpec();
    this.detailMdSrv.productSpec.productId = this.detailMdSrv.product.id;
    this.detailMdSrv.specifications = this.detailMdSrv.product.specifications ? this.detailMdSrv.product.specifications : [];
    this.showSpecification = this.detailMdSrv.product.id ? true : false;
    //订阅编辑变化事件
    this.detailMdSrv.onEdit$.takeUntil(this.detroy$).subscribe(() => {
      this.showSubmitBtn = true;
    });
    //订阅产品信息保存事件
    this.detailMdSrv.afterSaveProduct$.takeUntil(this.detroy$).subscribe(() => {
      this.showSpecification = true;
      this.productName = this.detailMdSrv.product.name;
      if (!this.detailMdSrv.productSpec)
        this.detailMdSrv.productSpec = new ProductSpec();
      this.detailMdSrv.productSpec.productId = this.detailMdSrv.product.id;
    });
  }

  ngOnInit() {
    this.productName = this.detailMdSrv.product.name;
  }

  ngOnDestroy(): void {
    this.detroy$.next(true);
    this.detroy$.unsubscribe();
    this.detailMdSrv.product = new Product();
  }

  submit() {

  }
}
