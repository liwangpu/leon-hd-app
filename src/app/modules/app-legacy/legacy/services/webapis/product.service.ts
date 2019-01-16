import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Product } from '../../models/product';
import { Observable,of } from 'rxjs';
import { IListableService } from "./ilistableService";
import { IconService } from './icon.service';
import { IconModel } from '../../models/iconmodel';
import { IQueryFilter } from '../../common/interfaces/iqueryFilter';

@Injectable()
export class ProductService extends ApiService<Product> implements IListableService<Product> {

    constructor(protected http: HttpClient, protected config: ConfigService, private iconSrv: IconService) {
        super(http, config);
        this.uriPart = 'products';
    }

    /**
     * 根据id获取产品信息
     * @param id 
     */
    getById(id: string | number): Observable<Product> {
        if (!id) {
            return of(new Product());
        }
        return super.getEntity(id);
    }

    /**
     * 创建产品信息
     * @param product 
     */
    create(product: Product): Observable<Product> {
        return super.createEntity(product);
    }

    /**
     * 更新产品信息
     * @param product 
     */
    update(product: Product): Observable<Product> {
        return super.updateEntity(product);
    }

    /**
     * 查询产品信息
     * @param query 
     * @param advanceQueryFilters 
     */
    query(query: IQuery, advanceQueryFilters?: Array<IQueryFilter>): Observable<Paging<Product>> {
        return super.queryEntities(query, advanceQueryFilters);
    }

    /**
     * 更改图标信息
     * @param entity 
     */
    changeIcon(entity: IconModel) {
        let url = `${this.uri}/changeICon`;
        return this.iconSrv.changeIcon(url, entity);
    }

    /**
     * 批量修改产品分类
     * @param ids 
     * @param categoryId 
     */
    bulkChangeCategory(ids: string, categoryId: string) {
        return this.http.request('PUT', this.uri + '/BulkChangeCategory', { headers: this.header, body: { ids: ids, categoryId: categoryId }, responseType: 'text' });
    }//bulkChangeCategory
}