import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { ProductSpec } from '@geek/micro-dmz-hd';

@Injectable()
export class ProductSpecService extends WebapiService<ProductSpec> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'ProductSpec';
  }//constructor

}
