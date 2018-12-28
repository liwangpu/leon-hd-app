import { Injectable } from '@angular/core';
import { Layout } from '../../models/layout';
import { ApiService, IQuery, Paging } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class LayoutService extends ApiService<Layout>  {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'layout';
  }

  /**
    * 根据id获取套餐信息
    * @param id 
    */
  getById(id: string | number): Observable<Layout> {
    if (!id) {
      return of(new Layout());
    }
    return super.getEntity(id);
  }

  /**
   * 创建套餐信息
   * @param entity 
   */
  create(entity: Layout): Observable<Layout> {
    return super.createEntity(entity);
  }

  /**
   * 更新套餐信息
   * @param entity 
   */
  update(entity: Layout): Observable<Layout> {
    return super.updateEntity(entity);
  }

  /**
   * 查询套餐信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<Layout>> {
    return super.queryEntities(query);
  }

}
