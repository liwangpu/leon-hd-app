import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Map } from '../../models/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapService extends ApiService<Map>  {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'Map';
  }

  /**
    * 根据id获取套餐信息
    * @param id 
    */
  getById(id: string | number): Observable<Map> {
    if (!id) {
      return Observable.of(new Map());
    }
    return super.getEntity(id);
  }

  /**
   * 创建套餐信息
   * @param entity 
   */
  create(entity: Map): Observable<Map> {
    return super.createEntity(entity);
  }

  /**
   * 更新套餐信息
   * @param entity 
   */
  update(entity: Map): Observable<Map> {
    return super.updateEntity(entity);
  }

  /**
   * 查询套餐信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<Map>> {
    return super.queryEntities(query);
  }
}

