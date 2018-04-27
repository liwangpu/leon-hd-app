import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDetailMdService } from '../product-detail-md.service';
import { ProductSpec } from '../../../../toolkit/models/productspec';

@Component({
  selector: 'app-product-detail-specs-list',
  templateUrl: './specs-list.component.html',
  styleUrls: ['./specs-list.component.scss']
})
export class SpecsListComponent implements OnInit, OnDestroy {


  private detroy$: Subject<boolean> = new Subject();
  constructor(private detailMdSrv: ProductDetailMdService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.detroy$.next(true);
    this.detroy$.unsubscribe();
    this.detailMdSrv.productSpec = new ProductSpec();
  }
}
