import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Material } from '../models/material';

@Injectable()
export class MaterialService extends WebapiService<Material> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'Material';
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
