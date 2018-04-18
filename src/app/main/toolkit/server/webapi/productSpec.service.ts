import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ProductSpec } from '../../models/productspec';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductSpecService extends ApiService<ProductSpec> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'productSpec';
    }

    getById(id: string | number): Observable<ProductSpec> {
        if (!id) {
            return Observable.of(new ProductSpec());
        }
        return super.getEntity(id);
    }

    /**
     * 创建产品规格信息
     * @param productSpec 
     */
    create(productSpec: ProductSpec): Observable<ProductSpec> {
        return super.createEntity<ProductSpec>(productSpec);
    }

    /**
     * 更新产品规格信息
     * @param productSpec 
     */
    update(productSpec: ProductSpec): Observable<ProductSpec> {
        return super.updateEntity<ProductSpec>(productSpec);
    }

    /**
     * 查询产品规格信息
     * @param search 
     * @param order 
     * @param page 
     * @param pageSize 
     * @param orderBy 
     * @param desc 
     * @param plus 
     */
    query(query:IQuery): Observable<Paging<ProductSpec>> {
        return super.queryEntities(query);
    }
}