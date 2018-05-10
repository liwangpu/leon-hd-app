import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Package } from '../../models/package';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PackageService extends ApiService<Package>  {

  constructor(private http: HttpClient, private config: ConfigService) {
    super(http, config);
    this.uriPart = 'Package';
  }

  /**
    * 根据id获取套餐信息
    * @param id 
    */
  getById(id: string | number): Observable<Package> {
    if (!id) {
      return Observable.of(new Package());
    }
    return super.getEntity(id);
  }

  /**
   * 创建套餐信息
   * @param entity 
   */
  create(entity: Package): Observable<Package> {
    return super.createEntity(entity);
  }

  /**
   * 更新套餐信息
   * @param entity 
   */
  update(entity: Package): Observable<Package> {
    return super.updateEntity(entity);
  }

  /**
   * 查询套餐信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<Package>> {
    return super.queryEntities(query);
  }
}
