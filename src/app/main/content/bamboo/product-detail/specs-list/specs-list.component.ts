import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDetailMdService } from '../product-detail-md.service';
import { ProductSpec } from '../../../../toolkit/models/productspec';
import { ProductSpecService } from '../../../../toolkit/server/webapi/productSpec.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';
import { ConfigService } from '../../../../toolkit/config/config.service';
import { ProductService } from '../../../../toolkit/server/webapi/product.service';
import { IconModel } from '../../../../toolkit/models/iconmodel';

@Component({
  selector: 'app-product-detail-specs-list',
  templateUrl: './specs-list.component.html',
  styleUrls: ['./specs-list.component.scss']
})
export class SpecsListComponent implements OnInit, OnDestroy {
  private detailCharletUrl = "";
  private charlets: Array<FileAsset> = [];
  private detroy$: Subject<boolean> = new Subject();
  constructor(private detailMdSrv: ProductDetailMdService, private productSpeServ: ProductSpecService, private configSrv: ConfigService, private productSrv: ProductService) {
    //订阅规格图片更改事件
    this.detailMdSrv.afterProductCharletChange$.takeUntil(this.detroy$).subscribe((hasCharlet) => {
      if (hasCharlet) {
        this.refreshCharlet();
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.detroy$.next(true);
    this.detroy$.unsubscribe();
    this.detailMdSrv.productSpec = new ProductSpec();
  }//ngOnDestroy

  refreshCharlet() {
    this.productSpeServ.getById(this.detailMdSrv.productSpec.id).takeUntil(this.detroy$).subscribe(resSpec => {
      if (resSpec.charlets && resSpec.charlets.length) {
        this.charlets = resSpec.charlets;
        this.watchDetaiCharlet(this.charlets[0].url);
        //更改图标信息
        let iconMd = new IconModel();
        iconMd.AssetId = this.charlets[0].id;
        iconMd.ObjId = this.detailMdSrv.product.id;
        this.productSrv.changeIcon(iconMd).first().subscribe(() => {

        });

      }
    });
  }//refreshCharlet

  getCharletUrl(url: string) {
    return `${this.configSrv.serverBase}/${url}`;
  }//getCharletUrl

  watchDetaiCharlet(url: string) {
    this.detailCharletUrl = this.getCharletUrl(url);
  }//watchDetaiCharlet
}
