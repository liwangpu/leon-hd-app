import { Injectable } from '@angular/core';
import { CommonAutocompleteSearchBase } from '../../../common/common-autocomplete-search/common-autocomplete-search.component';
import { ProductGroupService } from '../../../../../toolkit/server/webapi/product-group.service';

@Injectable()
export class GroupListGroupMapsMdService extends CommonAutocompleteSearchBase {
  constructor(public apiSrv:ProductGroupService) {
    super();
   }

}
