import { Injectable } from '@angular/core';
import { CommonAutocompleteSearchBase } from '../../../common/common-autocomplete-search/common-autocomplete-search.component';
import { ProductGroupService } from '../../../../../toolkit/server/webapi/product-group.service';
import { IQueryFilter } from '../../../../../toolkit/common/interfaces/iqueryFilter';
import { ProductGroup } from '../../../../../toolkit/models/product-group';

@Injectable()
export class GroupListGroupMapsMdService extends CommonAutocompleteSearchBase {
  keywordAndAdvanceSingleSearch = true;
  constructor(public apiSrv: ProductGroupService) {
    super();
  }

  advanceQuery(keyword: string): Array<IQueryFilter> {
    return [{ field: 'serie', value: keyword }];
  }

  optionDisplayFn(item?: ProductGroup): string {
    return item ? item.name+'--'+item.serie : '';
  }//
}
