import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { WebapiBaseService } from './webapi-base.service';
import { Observable, of } from 'rxjs';
import { IEntity } from '../interfaces/i-entity';
import { Entity } from '../models/entity';
import { IQuery } from '../interfaces/i-query';
import { IQueryFilter } from '../interfaces/i-query-filter';
import { IPageData } from '../interfaces/i-page-data';
import { QueryOperateEnum } from '../enums/query-operate-enum';
import { AppConfigService } from '../../../app-config.service';

export class WebapiService<T extends IEntity> extends WebapiBaseService {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
  }//constructor

  /**
  * 根据id获取实体信息
  * @param id 
  */
  getById(id: string | number): Observable<IEntity> {
    if (!id) {
      return of(new Entity());
    }
    return this.getEntity(id);
  }//getById

  query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<IPageData<T>> {
    return this.queryEntities(query, advanceQueryFilters);
  }//query

  /**
 * 更新实体信息
 * @param entity 
 */
  update(entity: T): Observable<T> {
    return this.updateEntity(entity);
  }//update


  /**
  * 根据id删除实体
  * @param id 
  */
  delete(id: string | number): Observable<HttpResponse<Object>> {
    return this.httpClient.delete(`${this.uri}/${id}`, { observe: 'response', responseType: 'json' });
  }//delete

  /**
 * 批量删除实体信息
 * @param idsArr 
 */
  batchDelete(idsArr: Array<string>): Observable<HttpResponse<Object>> {
    let idsStr = idsArr && idsArr.length > 0 ? idsArr.join(',') : '';
    return this.httpClient.delete(`${this.uri}/BatchDelete?ids=${idsStr}`, { observe: 'response', responseType: 'json' });
  }//batchDelete

  changeIcon(entity: { objId: string, assetId: string }) {
    return this.httpClient.request('PUT', `${this.uri}/ChangeICon`, {
      body: entity
      , headers: this.header
      , responseType: 'text'
    });
  }//changeIcon

  /**
   * 根据id获取实体信息
   * @param id 
   */
  protected getEntity<T>(id: number | string): Observable<T> {
    if (id) {
      return this.httpClient.get<T>(`${this.uri}/${id}`, { headers: this.header });
    }
    return of<T>({} as T);
  }

  /**
   * 创建实体信息
   * @param entity 
   */
  protected createEntity<T>(entity: T): Observable<T> {
    return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header });
  }

  /**
   * 更新实体信息
   * @param entity 
   */
  protected updateEntity<T extends IEntity>(entity: T): Observable<T> {
    if (entity.id)
      return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header });
    return this.createEntity(entity);
  }

  /**
     * 查询实体信息
     * @param query 
     * @param advanceQueryFilters 
     */
  protected queryEntities<T>(query?: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<IPageData<T>> {
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
    return this.httpClient.request<IPageData<T>>('get', `${this.uri}?${queryPart}`, { headers: this.header, params: params });
  }


}

//TODO:转为q查询方式
function conjunctFilter(advanceQueryFilters?: Array<IQueryFilter>): string {
  let queryPart = '';
  if (advanceQueryFilters && advanceQueryFilters.length) {
    for (let item of advanceQueryFilters) {
      let operateStr = '';
      switch (item.operate) {
        case QueryOperateEnum.equal:
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