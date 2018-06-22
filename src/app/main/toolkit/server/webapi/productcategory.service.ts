import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ProductCategory } from '../../models/productcategory';
import { Observable } from 'rxjs/Observable';
import { CommonCategoryService } from './common-category.service';
 
@Injectable()
export class ProductCategoryService extends CommonCategoryService {

    constructor(protected http: HttpClient, protected config: ConfigService) {
        super(http, config);
        this.uriPart = 'category';
        this.type = 'product';
    }

    /**
     * 获取所有的产品分类树
     */
    public getAllProductCategory(organId?: string): Observable<ProductCategory> {
        return this.getByType(this.type, organId);
    }//getAllProductCategory

    /**
     * 获取扁平结构的产品分类信息
     * @param organId 
     */
    public getAllFlatProductCategory(organId?: string): Observable<Array<ProductCategory>> {
        return this.getFlat(this.type, organId);
    }//getAllFlatProductCategory

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
        if (!entity.id)
            return this.createProductCategory(entity);
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