import { WebapiBaseService } from './webapi-base.service';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IEntitybase } from '../../models/ientitybase';
import { EntityBase } from '../../models/entitybase';
import { IQuery, Paging, QueryOperateEnums } from '../../models/common';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';
import { tap } from 'rxjs/operators';


export class WebapiService<T extends IEntitybase> extends WebapiBaseService {

  queryData$ = new BehaviorSubject<Array<T>>([]);
  editData$ = new BehaviorSubject<IEntitybase>(new EntityBase());
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  /**
    * 根据id删除实体
    * @param id 
    */
  delete(id: string | number): Observable<HttpResponse<string>> {
    return this.httpClient.delete(`${this.uri}/${id}`, { observe: 'response', responseType: 'text' });
  }

  /**
   * 根据id获取实体信息
   * @param id 
   */
  protected getEntity<T>(id: number | string): Observable<T> {
    if (id) {
      return this.httpClient.get<T>(`${this.uri}/${id}`, { headers: this.header }).pipe(tap(x => {
        this.editData$.next(x as any);
      }));
    }
    return of<T>({} as T).pipe(tap(x => {
      this.editData$.next(x as any);
    }));
  }

  /**
   * 创建实体信息
   * @param entity 
   */
  protected createEntity<T>(entity: T): Observable<T> {
    return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header }).pipe(tap(x => {
      this.editData$.next(x as any);
    }));
  }

  /**
   * 更新实体信息
   * @param entity 
   */
  protected updateEntity<T extends IEntitybase>(entity: T): Observable<T> {
    if (entity.id)
      return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header }).pipe(tap(x => {
        this.editData$.next(x);
      }));
    return this.createEntity(entity);
  }

  /**
   * 查询实体信息
   * @param query 
   * @param advanceQueryFilters 
   */
  protected queryEntities<T>(query?: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<T>> {
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
    return this.httpClient.request<Paging<T>>('get', `${this.uri}?${queryPart}`, { headers: this.header, params: params }).pipe(tap(res => {
      this.queryData$.next(res && res.data ? (res.data as any) : []);
    }));
  }

  /**
   * 批量删除实体信息
   * @param idsArr 
   */
  public batchDelete(idsArr: Array<string>) {
    let idsStr = idsArr && idsArr.length > 0 ? idsArr.join(',') : '';
    return this.httpClient.delete(`${this.uri}/BatchDelete?ids=${idsStr}`, { responseType: 'text' });
  }//batchDelete

  public exportData(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>) {
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
    return this.httpClient.request('get', `${this.uri}/export?${queryPart}`, { headers: this.header, params: params, responseType: 'blob' });
  }//exportData

  /**
   * 分享实体信息
   * @param idsArr 
   */
  public shareDatas(idsArr: Array<string>) {
    let idsStr = idsArr && idsArr.length > 0 ? idsArr.join(',') : '';
    return this.httpClient.request('put', `${this.uri}/Share?ids=${idsStr}`, { headers: this.header, responseType: 'text' });
  }//shareDatas

  /**
   * 取消分享实体信息
   * @param idsArr 
   */
  public cancelShareDatas(idsArr: Array<string>) {
    let idsStr = idsArr && idsArr.length > 0 ? idsArr.join(',') : '';
    return this.httpClient.request('put', `${this.uri}/CancelShare?ids=${idsStr}`, { headers: this.header, responseType: 'text' });
  }//cancelShareDatas
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