import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDetailMdService } from '../product-detail-md.service';
import { ProductSpec } from '../../../../toolkit/models/productspec';
import { ProductSpecService } from '../../../../toolkit/server/webapi/productSpec.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';
import { PathService } from '../../../services/path.service';
import { CustomTabBaseExtend } from '../../common/detail-edit-tpls/detail-info-tab/detail-info-tab.component';
import { Product } from '../../../../toolkit/models/product';

@Component({
  selector: 'app-product-detail-specs-list',
  templateUrl: './specs-list.component.html',
  styleUrls: ['./specs-list.component.scss'],
  providers: [{ provide: CustomTabBaseExtend, useExisting: forwardRef(() => SpecsListComponent) }]
})
export class SpecsListComponent extends CustomTabBaseExtend implements OnInit, OnDestroy {
  detailCharletUrl = "";
  charlets: Array<FileAsset> = [];
  detroy$: Subject<boolean> = new Subject();
  constructor(private detailMdSrv: ProductDetailMdService, private productSpeServ: ProductSpecService, private pathSrv: PathService) {
    super();
    //订阅规格图片更改事件
    this.detailMdSrv.afterProductCharletChange$.takeUntil(this.detroy$).subscribe((hasCharlet) => {
      if (hasCharlet) {
        this.refreshCharlet();
      }
      else {
        this.charlets = [];
      }
    });
  }

  ngOnInit() {
    this.dataChange$.takeUntil(this.destroy$).subscribe(prod => {
      this.detailMdSrv.product = (prod as Product);
      this.detailMdSrv.specifications = (prod as Product).specifications;
    });
  }

  ngOnDestroy() {
    this.detroy$.next(true);
    this.detroy$.unsubscribe();
    this.detailMdSrv.productSpec = new ProductSpec();
  }//ngOnDestroy

  refreshCharlet() {
    this.productSpeServ.getById(this.detailMdSrv.productSpec.id).takeUntil(this.detroy$).subscribe(resSpec => {
      if (resSpec.album && resSpec.album.length) {
        this.charlets = resSpec.album;
        this.watchDetaiCharlet(this.charlets[0].url);
        // //更改图标信息
        // let iconMd = new IconModel();
        // iconMd.AssetId = this.charlets[0].id;
        // iconMd.ObjId = this.detailMdSrv.product.id;
        // this.productSrv.changeIcon(iconMd).first().subscribe(() => {

        // });

      }
    });
  }//refreshCharlet

  getCharletUrl(url: string) {
    return this.pathSrv.redirectServerUrl(url);
  }//getCharletUrl

  watchDetaiCharlet(url: string) {
    this.detailCharletUrl = this.getCharletUrl(url);
  }//watchDetaiCharlet
}
