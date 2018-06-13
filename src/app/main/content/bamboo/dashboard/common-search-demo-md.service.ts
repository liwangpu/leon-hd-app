import { Injectable } from '@angular/core';
import { CommonAutocompleteSearchBase } from '../common/common-autocomplete-search/common-autocomplete-search.component';
import { ProductService } from '../../../toolkit/server/webapi/product.service';

@Injectable()
export class CommonSearchDemoMdService extends CommonAutocompleteSearchBase {

  constructor(public apiSrv: ProductService) {
    super();
  }

}
