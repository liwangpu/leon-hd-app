import { Injectable } from '@angular/core';
import { WebapiBaseService, WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { ProductPackage } from '../models/product-package';

@Injectable()
export class ProductPackageService extends WebapiService<ProductPackage> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'ProductPackage';
  }//constructor

  getBySpecId(productSpecId: string) {
    return this.httpClient.get<Array<ProductPackage>>(`${this.uri}/GetByProductSpecId/${productSpecId}`, { headers: this.header });
  }//getBySpecId

}
