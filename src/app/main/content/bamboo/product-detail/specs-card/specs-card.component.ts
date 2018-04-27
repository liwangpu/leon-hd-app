import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductSpec } from "../../../../toolkit/models/productspec";
import { ProductDetailMdService } from "../product-detail-md.service";
import { ProductSpecService } from "../../../../toolkit/server/webapi/productSpec.service";
import { ProductService } from '../../../../toolkit/server/webapi/product.service';
@Component({
  selector: 'app-product-detail-specs-card',
  templateUrl: './specs-card.component.html',
  styleUrls: ['./specs-card.component.scss']
})
export class SpecsCardComponent implements OnInit, OnDestroy {

  @Output() onSelected: EventEmitter<string> = new EventEmitter();
  private filterBy = 'all';
  private productSpecs: Array<ProductSpec> = [];
  private destroy$: Subject<boolean> = new Subject();
  constructor(private detailMdSrv: ProductDetailMdService, private productSpecSrv: ProductSpecService, private productSrv: ProductService) {
    this.detailMdSrv.afterSaveProductSpec$.takeUntil(this.destroy$).subscribe(() => {
      this.refreshSpecs();
    });
  }

  ngOnInit() {
    this.productSpecs = this.detailMdSrv.specifications;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private onEditSpec(specid?: string) {
    if (!specid) {
      this.detailMdSrv.productSpec = new ProductSpec();
      this.detailMdSrv.productSpec.productId = this.detailMdSrv.product.id;
      this.detailMdSrv.afterSelectProductSpec$.next();
    }
    else {
      this.productSpecSrv.getById(specid).takeUntil(this.destroy$).subscribe(resSpec => {
        this.detailMdSrv.productSpec = resSpec;
        this.detailMdSrv.afterSelectProductSpec$.next();
      });
    }
  }//onEditSpec

  private refreshSpecs() {
    this.productSrv.getById(this.detailMdSrv.product.id).takeUntil(this.destroy$).subscribe(resProd => {
      this.detailMdSrv.product = resProd;
      this.productSpecs = resProd.specifications;
    });
  }//refreshSpecs

  private onDeleteSpec(specid: string) {

  }

}
