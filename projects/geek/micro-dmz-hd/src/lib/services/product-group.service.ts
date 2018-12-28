import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { ProductGroup } from '../models/product-group';
@Injectable()
export class ProductGroupService extends WebapiService<ProductGroup> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'ProductGroup';
  }//constructor

  /**
  * 批量修改分类
  * @param ids 
  * @param categoryId 
  */
  bulkChangeCategory(ids: string, categoryId: string) {
    return this.httpClient.request('PUT', this.uri + '/BulkChangeCategory', { headers: this.header, body: { ids: ids, categoryId: categoryId }, responseType: 'text' });
  }//bulkChangeCategory

}
