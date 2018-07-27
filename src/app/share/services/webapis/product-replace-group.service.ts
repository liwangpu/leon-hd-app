import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { ProductReplaceGroup } from '../../models/product-replace-group';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class ProductReplaceGroupService extends ApiService<ProductReplaceGroup> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'ProductReplaceGroup';
  }

  /**
    * 根据id获取订单信息
    * @param id 
    */
  getById(id: string | number): Observable<ProductReplaceGroup> {
    if (!id) {
      return of(new ProductReplaceGroup());
    }
    return super.getEntity(id);
  }

  /**
   * 创建订单信息
   * @param entity 
   */
  create(entity: ProductReplaceGroup): Observable<ProductReplaceGroup> {
    return super.createEntity(entity);
  }

  /**
   * 更新订单信息
   * @param entity 
   */
  update(entity: ProductReplaceGroup): Observable<ProductReplaceGroup> {
    return super.updateEntity(entity);
  }

  /**
   * 查询订单信息
   * @param query 
   */
  query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<ProductReplaceGroup>> {
    return super.queryEntities(query, advanceQueryFilters);
  }


  setDefault(data: { id: string, itemId: string }) {
    return this.http.put<ProductReplaceGroup>(`${this.uri}/SetDefault`, data, { headers: this.header });
  }//setDefault

  removeItem(data: { id: string, itemId: string }) {
    return this.http.put<ProductReplaceGroup>(`${this.uri}/RemoveItem`, data, { headers: this.header });
  }//removeItem

}
