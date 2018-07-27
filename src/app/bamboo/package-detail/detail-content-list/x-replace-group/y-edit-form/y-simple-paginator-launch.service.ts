import { Injectable } from '@angular/core';
import { SimplePaginatorListBase } from '../../../../../share/common/page-tpls/simple-icon-list-page/simple-icon-list-page.component';
import { ProductReplaceGroupService } from '../../../../../share/services/webapis/product-replace-group.service';

@Injectable()
export class YSimplePaginatorLaunchService extends SimplePaginatorListBase {

  multipleSelect = true;
  constructor(public apiSrv: ProductReplaceGroupService) {
    super();
  }
}
