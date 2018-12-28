import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Map } from '../../models/map';
import { Observable, of } from 'rxjs';

@Injectable()
export class MapService extends ApiService<Map>  {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'Map';
  }

  /**
    * 根据id获取地图信息
    * @param id 
    */
  getById(id: string | number): Observable<Map> {
    if (!id) {
      return of(new Map());
    }
    return super.getEntity(id);
  }

  /**
   * 创建地图信息
   * @param entity 
   */
  create(entity: Map): Observable<Map> {
    return super.createEntity(entity);
  }

  /**
   * 更新地图信息
   * @param entity 
   */
  update(entity: Map): Observable<Map> {
    return super.updateEntity(entity);
  }

  /**
   * 查询地图信息
   * @param query 
   */
  query(query: IQuery): Observable<Paging<Map>> {
    return super.queryEntities(query);
  }

  /**
   * 地图生成户型
   * @param mapId 
   */
  transToLayout(mapId: string) {
    return this.http.put(`${this.uri}/TransferToLayout`, { MapId: mapId }, { headers: this.header, responseType: 'text' });
  }//transToLayout
}

