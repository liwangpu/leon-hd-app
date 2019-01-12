import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class ProductService extends WebapiService<Product> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'Products';
  }//constructor

  /**
 * 批量修改产品分类
 * @param ids 
 * @param categoryId 
 */
  bulkChangeCategory(ids: string, categoryId: string) {
    return this.httpClient.request('PUT', this.uri + '/BulkChangeCategory', { headers: this.header, body: { ids: ids, categoryId: categoryId }, responseType: 'text' });
  }//bulkChangeCategory

}
