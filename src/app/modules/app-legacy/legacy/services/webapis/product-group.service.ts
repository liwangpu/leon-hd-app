import { Injectable } from '@angular/core';
import { ProductGroup } from '../../models/product-group';
import { ApiService, IQuery, Paging } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable,of } from 'rxjs';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class ProductGroupService extends ApiService<ProductGroup>  {


  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'ProductGroup';
  }

  /**
    * 根据id获取套餐信息
    * @param id 
    */
  getById(id: string | number): Observable<ProductGroup> {
    if (!id) {
      return of(new ProductGroup());
    }
    return super.getEntity(id);
  }

  /**
   * 创建套餐信息
   * @param entity 
   */
  create(entity: ProductGroup): Observable<ProductGroup> {
    return super.createEntity(entity);
  }

  /**
   * 更新套餐信息
   * @param entity 
   */
  update(entity: ProductGroup): Observable<ProductGroup> {
    return super.updateEntity(entity);
  }

  /**
   * 查询套餐信息
   * @param query 
   * @param advanceQueryFilters 
   */
  query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<ProductGroup>> {
    return super.queryEntities(query, advanceQueryFilters);
  }

      /**
     * 批量修改产品分类
     * @param ids 
     * @param categoryId 
     */
    bulkChangeCategory(ids: string, categoryId: string) {
      return this.http.request('PUT', this.uri + '/BulkChangeCategory', { headers: this.header, body: { ids: ids, categoryId: categoryId }, responseType: 'text' });
  }//bulkChangeCategory

}
