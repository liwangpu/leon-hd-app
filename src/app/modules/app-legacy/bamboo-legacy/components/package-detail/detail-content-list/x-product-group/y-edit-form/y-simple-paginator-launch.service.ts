import { Injectable } from '@angular/core';
import { SimplePaginatorListBase, ProductGroupService } from '@app/app-legacy';
// import { SimplePaginatorListBase } from '../../../../../share/common/page-tpls/simple-icon-list-page/simple-icon-list-page.component';
// import { ProductGroupService } from '../../../../../share/services/webapis/product-group.service';

@Injectable()
export class YSimplePaginatorLaunchService extends SimplePaginatorListBase {

  constructor(public apiSrv: ProductGroupService) {
    super();
  }
}
