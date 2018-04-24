import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../product-detail.service';
import { FileAsset } from '../../../../toolkit/models/fileasset';
import { ProductSpec } from '../../../../toolkit/models/productspec';
import { ConfigService } from "../../../../toolkit/config/config.service";
@Component({
  selector: 'app-product-detail-spec-charlets',
  templateUrl: './spec-charlets.component.html',
  styleUrls: ['./spec-charlets.component.scss']
})
export class SpecCharletsComponent implements OnInit {

  specname: string;
  charlets: Array<FileAsset> = [];
  constructor(private productDetailService: ProductDetailService, private configSrv: ConfigService) {
  }

  ngOnInit() {
    this.productDetailService.onProductSpecSelected
      .subscribe(spec => {
        if (spec)
          this.specname = spec.name;
        if (spec && spec.charlets && spec.charlets.length) {
          this.charlets = spec.charlets;
        }
        else {
          this.charlets = [];
        }
      });
  }//ngOnInit

  reset() {
    this.specname = '';
    this.charlets = [];
  }

  getCharletUrl(url: string) {
    return `${this.configSrv.serverBase}/${url}`;
  }

}
