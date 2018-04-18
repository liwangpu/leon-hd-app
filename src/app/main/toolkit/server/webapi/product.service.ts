import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';
import { IListableService } from "./ilistableService";
@Injectable()
export class ProductService extends ApiService<Product> implements IListableService<Product> {

    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'products';
    }

    /**
     * 根据id获取产品信息
     * @param id 
     */
    getById(id: string | number): Observable<Product> {
        if (!id) {
            return Observable.of(new Product());
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
     */
    query(query: IQuery): Observable<Paging<Product>> {
        return super.queryEntities(query);
    }
}