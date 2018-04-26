import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDetailMdService } from "./product-detail-md.service";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Product } from '../../../toolkit/models/product';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productName: string;
  private showSubmitBtn: boolean;
  private detroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private detailMdSrv: ProductDetailMdService, private route: ActivatedRoute) {
    let tmp = this.route.snapshot.data.entity;
    this.detailMdSrv.product = tmp ? tmp : new Product();
    //订阅编辑变化事件
    this.detailMdSrv.onEdit$.takeUntil(this.detroy$).subscribe(() => {
      this.showSubmitBtn = true;
    });
    //订阅产品信息保存事件
    this.detailMdSrv.afterSaveProduct$.takeUntil(this.detroy$).subscribe(() => {
      this.productName = this.detailMdSrv.product.name;
    });
  }

  ngOnInit() {
    this.productName = this.detailMdSrv.product.name;
  }

  ngOnDestroy(): void {
    this.detroy$.next(true);
    this.detroy$.unsubscribe();
  }

  submit() {
    this.detailMdSrv.submitProduct$.next();
  }
}
