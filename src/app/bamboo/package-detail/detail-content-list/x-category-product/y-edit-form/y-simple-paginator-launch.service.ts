import { Injectable } from '@angular/core';
import { SimplePaginatorListBase } from '../../../../../share/common/page-tpls/simple-icon-list-page/simple-icon-list-page.component';
import { ProductService } from '../../../../../share/services/webapis/product.service';

@Injectable()
export class YSimplePaginatorLaunchService extends SimplePaginatorListBase {

  constructor(public apiSrv: ProductService) {
    super();
  }
}
