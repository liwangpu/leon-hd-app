import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { ProductSpec } from 'micro-dmz-hd';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class ProductSpecService extends WebapiService<ProductSpec> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'ProductSpec';
  }//constructor

}
