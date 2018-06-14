import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Package } from '../../models/package';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class PackageService extends ApiService<Package>  {

  constructor(protected http: HttpClient, protected config: ConfigService) {
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
   * @param advanceQueryFilters 
   */
  query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<Package>> {
    return super.queryEntities(query, advanceQueryFilters);
  }


  /**
   * 编辑套餐区域模型
   * @param data 
   */
  editAreaType(data: { packageId: string, areaAlias: string, areaTypeId: string }) {
    return this.http.request<Package>('PUT', this.uri + '/EditAreaType', { headers: this.header, body: data }).pipe(tap(x => {
      this.editData$.next(x);
    }));
  }//editAreaType

  deleteAreaType(data: { packageId: string, id: string }) {
    return this.http.request<Package>('PUT', this.uri + '/DeleteAreaType', { headers: this.header, body: data }).pipe(tap(x => {
      this.editData$.next(x);
    }));
  }//deleteAreaType

  AddProductGroup(data: { packageId: string, areaId: string, productGroupId: string }) {
    return this.http.request<Package>('PUT', this.uri + '/AddProductGroup', { headers: this.header, body: data }).pipe(tap(x => {
      this.editData$.next(x);
    }));
  }//AddProductGroup


  deleteProductGroup(data: { packageId: string, areaId: string, productGroupId: string }) {
    return this.http.request<Package>('PUT', this.uri + '/DeleteProductGroup', { headers: this.header, body: data }).pipe(tap(x => {
      this.editData$.next(x);
    }));
  }//deleteProductGroup

  addCategoryProduct(data: { packageId: string, areaId: string, productId: string }) {
    return this.http.request<Package>('PUT', this.uri + '/AddCategoryProduct', { headers: this.header, body: data }).pipe(tap(x => {
      this.editData$.next(x);
    }));
  }//addCategoryProduct


}
