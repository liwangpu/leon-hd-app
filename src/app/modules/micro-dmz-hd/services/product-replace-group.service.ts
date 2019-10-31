import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { AppConfigService } from '../../../app-config.service';
import { ProductReplaceGroup } from '../models/product-replace-group';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductReplaceGroupService extends WebapiService<ProductReplaceGroup> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'ProductReplaceGroup';
  }//constructor

}
