import { Injectable } from '@angular/core';
import { Paging, IQuery } from './api.service';
import { AssetCategoryService } from "./assetcategory.service";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ProductCategory } from '../../models/productcategory';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductCategoryService extends AssetCategoryService<ProductCategory> {

    private type = 'product';
    constructor(private http: HttpClient, private config: ConfigService) {
        super(http, config);
        this.uriPart = 'category';
    }

    /**
     * 获取所有的产品分类树
     */
    public getAllProductCategory(): Observable<ProductCategory> {
        return this.getByType(this.type);
    }//getAllProductCategory

    /**
     * 创建产品分类
     * @param entity 
     */
    public createProductCategory(entity: ProductCategory): Observable<ProductCategory> {
        return this.createType(entity);
    }//createProductCategory

    /**
     * 更新产品分类
     * @param entity 
     */
    public updateProductCategory(entity: ProductCategory): Observable<ProductCategory> {
        return this.updateType(entity);
    }//updateProductCategory

    /**
     * 上移产品分类
     * @param entity 
     */
    public moveUpProductCategory(entity: ProductCategory): Observable<ProductCategory> {
        return this.arrowUp(entity);
    }//moveUpProductCategory

    /**
     *下移产品分类
     * @param entity 
     */
    public moveDownProductCategory(entity: ProductCategory): Observable<ProductCategory> {
        return this.arrowDown(entity);
    }//moveDownProductCategory

    /**
     * 删除分类
     * @param id 
     */
    public deleteProductCategory(id: string): Observable<any> {
        return super.deleteType(this.type, id);
    }//deleteProductCategory
}