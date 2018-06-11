import { Injectable } from '@angular/core';
import { AreaType } from '../../models/area-type';
import { HttpClient } from '@angular/common/http';
import { ApiService, IQuery, Paging } from './api.service';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AreaTypeService extends ApiService<AreaType>  {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'AreaType';
  }

  /**
    * 根据id获取套餐信息
    * @param id 
    */
  getById(id: string | number): Observable<AreaType> {
    if (!id) {
      return Observable.of(new AreaType());
    }
    return super.getEntity(id);
  }

  /**
   * 创建套餐信息
   * @param entity 
   */
  create(entity: AreaType): Observable<AreaType> {
    return super.createEntity(entity);
  }

  /**
   * 更新套餐信息
   * @param entity 
   */
  update(entity: AreaType): Observable<AreaType> {
    return super.updateEntity(entity);
  }

  /**
   * 查询套餐信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<AreaType>> {
    return super.queryEntities(query);
  }


}
