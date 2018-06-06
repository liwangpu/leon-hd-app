import { Injectable } from '@angular/core';
import { ApiService, IQuery, Paging } from './api.service';
import { MediaShareResource } from '../../models/media-share-resource';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class MediaShareService extends ApiService<MediaShareResource>  {


  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'mediaShare';
  }

  /**
   * 根据id获取媒体分享信息
   * @param id 
   */
  getById(id: string | number): Observable<MediaShareResource> {
    if (!id) {
      return Observable.of(new MediaShareResource());
    }
    return super.getEntity(id);
  }

  /**
   * 创建媒体分享信息
   * @param entity 
   */
  create(entity: MediaShareResource): Observable<MediaShareResource> {
    return super.createEntity(entity);
  }

  /**
   * 更新媒体分享信息
   * @param entity 
   */
  update(entity: MediaShareResource): Observable<MediaShareResource> {
    return super.updateEntity(entity);
  }

  /**
   * 查询媒体分享信息
   * @param query 
   * @param advanceQueryFilters 
   */
  query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<MediaShareResource>> {
    return super.queryEntities(query, advanceQueryFilters);
  }

}
