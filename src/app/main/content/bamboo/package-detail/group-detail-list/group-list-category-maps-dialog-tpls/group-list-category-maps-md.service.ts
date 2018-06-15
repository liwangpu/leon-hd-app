import { Injectable } from '@angular/core';
import { CommonAutocompleteSearchBase } from '../../../common/common-autocomplete-search/common-autocomplete-search.component';
import { ProductService } from '../../../../../toolkit/server/webapi/product.service';
import { Product } from '../../../../../toolkit/models/product';
import { IQueryFilter } from '../../../../../toolkit/common/interfaces/iqueryFilter';

@Injectable()
export class GroupListCategoryMapsMdService extends CommonAutocompleteSearchBase {

  keywordAndAdvanceSingleSearch = true;
  constructor(public apiSrv: ProductService) {
    super();
  }

  advanceQuery(keyword: string): Array<IQueryFilter> {
    return [{ field: 'categoryName', value: keyword }];
  }
  
  optionDisplayFn(item?: Product): string {
    return item ? item.name + '--' + item.categoryName : '';
  }//

}
