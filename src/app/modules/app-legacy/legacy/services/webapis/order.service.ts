import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Order } from '../../models/order';
import { Observable,of } from 'rxjs';

@Injectable()
export class OrderService extends ApiService<Order> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'Orders';
  }

  /**
    * 根据id获取订单信息
    * @param id 
    */
  getById(id: string | number): Observable<Order> {
    if (!id) {
      return of(new Order());
    }
    return super.getEntity(id);
  }

  /**
   * 创建订单信息
   * @param entity 
   */
  create(entity: Order): Observable<Order> {
    return super.createEntity(entity);
  }

  /**
   * 更新订单信息
   * @param entity 
   */
  update(entity: Order): Observable<Order> {
    return super.updateEntity(entity);
  }

  /**
   * 查询订单信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<Order>> {
    return super.queryEntities(query);
  }

}//OrderService
