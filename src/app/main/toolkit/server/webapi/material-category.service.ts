import { Injectable } from '@angular/core';
import { MaterialCategory } from '../../models/material-category';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { CommonCategoryService } from './common-category.service';

@Injectable()
export class MaterialCategoryService extends CommonCategoryService {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config);
    this.type = 'material';
  }

  /**
   * 获取所有的材料分类树
   */
  public getAllMaterialCategory(organId?: string): Observable<MaterialCategory> {
    return this.getByType(this.type, organId);
  }//getAllMaterialCategory

  /**
   * 获取扁平结构的材料分类信息
   * @param organId 
   */
  public getAllFlatMaterialCategory(organId?: string): Observable<Array<MaterialCategory>> {
    return this.getFlat(this.type, organId);
  }//getAllFlatMaterialCategory

  /**
   * 创建材料分类
   * @param entity 
   */
  public createMaterialCategory(entity: MaterialCategory): Observable<MaterialCategory> {
    return this.createType(entity);
  }//createMaterialCategory

  /**
   * 更新材料分类
   * @param entity 
   */
  public updateMaterialCategory(entity: MaterialCategory): Observable<MaterialCategory> {
    if (!entity.id)
      return this.createMaterialCategory(entity);
    return this.updateType(entity);
  }//updateMaterialCategory

  /**
   * 上移材料分类
   * @param entity 
   */
  public moveUpMaterialCategory(entity: MaterialCategory): Observable<MaterialCategory> {
    return this.arrowUp(entity);
  }//moveUpMaterialCategory

  /**
   *下移材料分类
   * @param entity 
   */
  public moveDownMaterialCategory(entity: MaterialCategory): Observable<MaterialCategory> {
    return this.arrowDown(entity);
  }//moveDownMaterialCategory

  /**
   * 删除分类
   * @param id 
   */
  public deleteMaterialCategory(id: string): Observable<any> {
    return super.deleteType(this.type, id);
  }//deleteMaterialCategory

}
