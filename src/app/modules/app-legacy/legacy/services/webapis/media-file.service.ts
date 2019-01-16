import { Injectable } from '@angular/core';
import { MediaFile } from '../../models/media-file';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { ApiService, IQuery, Paging } from './api.service';
import { Observable,of } from 'rxjs';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class MediaFileService extends ApiService<MediaFile>  {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'media';
  }

  /**
   * 根据id获取媒体文件信息
   * @param id 
   */
  getById(id: string | number): Observable<MediaFile> {
    if (!id) {
      return of(new MediaFile());
    }
    return super.getEntity(id);
  }

  /**
   * 创建媒体文件信息
   * @param entity 
   */
  create(entity: MediaFile): Observable<MediaFile> {
    return super.createEntity(entity);
  }

  /**
   * 更新媒体文件信息
   * @param entity 
   */
  update(entity: MediaFile): Observable<MediaFile> {
    return super.updateEntity(entity);
  }

  /**
   * 查询媒体文件信息
   * @param query 
   * @param advanceQueryFilters 
   */
  query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<MediaFile>> {
    return super.queryEntities(query, advanceQueryFilters);
  }

}
