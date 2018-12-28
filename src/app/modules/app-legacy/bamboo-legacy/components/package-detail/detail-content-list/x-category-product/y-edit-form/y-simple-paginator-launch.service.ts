import { Injectable } from '@angular/core';
import { SimplePaginatorListBase, ProductService } from '@app/app-legacy';

@Injectable()
export class YSimplePaginatorLaunchService extends SimplePaginatorListBase {

  constructor(public apiSrv: ProductService) {
    super();
  }
}
