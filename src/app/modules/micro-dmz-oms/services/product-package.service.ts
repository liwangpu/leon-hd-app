import { Injectable } from '@angular/core';
import { WebapiBaseService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { ProductPackage } from '../models/product-package';

@Injectable()
export class ProductPackageService extends WebapiBaseService {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'ProductPackage';
  }//constructor

  getBySpecId(productSpecId: string) {
    return this.httpClient.get<Array<ProductPackage>>(`${this.uri}?productSpecId=${productSpecId}`, { headers: this.header });
  }//getBySpecId

}
