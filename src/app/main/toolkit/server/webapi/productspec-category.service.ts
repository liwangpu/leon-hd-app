import { Injectable } from '@angular/core';
import { AssetCategoryService } from "./assetcategory.service";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ProductspecCategory } from '../../models/productspec-category';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductspecCategoryService extends AssetCategoryService<ProductspecCategory> {

  private type = 'product-spec';
  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'category';
  }

  /**
   * 获取所有的产品规格分类树
   */
  public getAllProductCategory(organId:string): Observable<ProductspecCategory> {
    return this.getByType(this.type,organId);
  }//getAllProductCategory

  /**
   * 创建产品规格分类
   * @param entity 
   */
  public createProductCategory(entity: ProductspecCategory): Observable<ProductspecCategory> {
    return this.createType(entity);
  }//createProductCategory

  /**
   * 更新产品规格分类
   * @param entity 
   */
  public updateProductCategory(entity: ProductspecCategory): Observable<ProductspecCategory> {
    if (!entity.id)
      return this.createProductCategory(entity);
    return this.updateType(entity);
  }//updateProductCategory

  /**
   * 上移产品规格分类
   * @param entity 
   */
  public moveUpProductCategory(entity: ProductspecCategory): Observable<ProductspecCategory> {
    return this.arrowUp(entity);
  }//moveUpProductCategory

  /**
   *下移产品规格分类
   * @param entity 
   */
  public moveDownProductCategory(entity: ProductspecCategory): Observable<ProductspecCategory> {
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