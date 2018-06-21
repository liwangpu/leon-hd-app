import { Injectable } from '@angular/core';
import { AssetCategoryService } from './assetcategory.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { AssetCategory } from '../../models/assetcategory';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommonCategoryService extends AssetCategoryService<AssetCategory> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.uriPart = 'category';
  }

  /**
   * 获取所有的材料分类树
   */
  public getAllAssetCategory(organId?: string): Observable<AssetCategory> {
    return this.getByType(this.type, organId);
  }//getAllAssetCategory

  /**
   * 获取扁平结构的材料分类信息
   * @param organId 
   */
  public getAllFlatAssetCategory(organId?: string): Observable<Array<AssetCategory>> {
    return this.getFlat(this.type, organId);
  }//getAllFlatAssetCategory

  /**
   * 创建材料分类
   * @param entity 
   */
  public createAssetCategory(entity: AssetCategory): Observable<AssetCategory> {
    entity.type = this.type;
    return this.createType(entity);
  }//createAssetCategory

  /**
   * 更新材料分类
   * @param entity 
   */
  public updateAssetCategory(entity: AssetCategory): Observable<AssetCategory> {
    if (!entity.id)
      return this.createAssetCategory(entity);
    return this.updateType(entity);
  }//updateAssetCategory

  /**
   * 上移材料分类
   * @param entity 
   */
  public moveUpAssetCategory(entity: AssetCategory): Observable<AssetCategory> {
    return this.arrowUp(entity);
  }//moveUpAssetCategory

  /**
   *下移材料分类
   * @param entity 
   */
  public moveDownAssetCategory(entity: AssetCategory): Observable<AssetCategory> {
    return this.arrowDown(entity);
  }//moveDownAssetCategory

  /**
   * 删除分类
   * @param id 
   */
  public deleteAssetCategory(id: string): Observable<any> {
    return super.deleteType(this.type, id);
  }//deleteAssetCategory

}