import { Injectable } from '@angular/core';
import { WebapiBaseService } from './webapi-base.service';
import { AppCacheService } from '../common/app-cache.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IQuery, IQueryFilter, Paging, QueryOperateEnums } from '../../models/common';
import { Observable } from 'rxjs';
import { IEntity } from '../../models/ientity';

@Injectable({ providedIn: 'root' })
export class ResourceService extends WebapiBaseService {

  constructor(protected http: HttpClient, protected appCacheSrv: AppCacheService) {
    super(http);

  }
  query(query?: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<IEntity>> {
    if (!query)
      query = {};
    var params = new HttpParams();
    if (query.search)
      params = params.append('search', `${query.search}`);
    if (query.orderBy)
      params = params.append('orderBy', `${query.orderBy}`);
    if (query.desc)
      params = params.append('desc', `${query.desc}`);

    let queryPart = conjunctFilter(advanceQueryFilters);

    params = params.append('page', `${query.page ? query.page : 1}`);
    params = params.append('pageSize', `${query.pageSize ? query.pageSize : 10}`);
    return this.httpClient.request<Paging<IEntity>>('get', `${this.uri}?${queryPart}`, { headers: this.header, params: params });
  }


}

//TODO:转为q查询方式
function conjunctFilter(advanceQueryFilters?: Array<IQueryFilter>): string {
  let queryPart = '';
  if (advanceQueryFilters && advanceQueryFilters.length) {
    for (let item of advanceQueryFilters) {
      let operateStr = '';
      switch (item.operate) {
        case QueryOperateEnums.equal:
          operateStr = '=';
          break;
        default:
          operateStr = '=';
          break;
      }
      queryPart += `${item.field}${operateStr}${item.value}&`;
    }
  }
  return queryPart;
}//conjunctFilter
