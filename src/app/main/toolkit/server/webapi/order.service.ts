import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Order } from '../../models/order';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService extends ApiService<Order> {

  constructor(private http: HttpClient, private config: ConfigService) {
    super(http, config);
    this.uriPart = 'Orders';
  }

  /**
    * 根据id获取材质信息
    * @param id 
    */
  getById(id: string | number): Observable<Order> {
    if (!id) {
      return Observable.of(new Order());
    }
    return super.getEntity(id);
  }

  /**
   * 创建材质信息
   * @param entity 
   */
  create(entity: Order): Observable<Order> {
    return super.createEntity(entity);
  }

  /**
   * 更新材质信息
   * @param entity 
   */
  update(entity: Order): Observable<Order> {
    return super.updateEntity(entity);
  }

  /**
   * 查询材质信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<Order>> {
    return super.queryEntities(query);
  }

}//OrderService
