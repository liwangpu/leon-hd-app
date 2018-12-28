import { HttpClient } from '@angular/common/http';
import { AssetCategory } from '../models/asset-category';
import { Observable } from 'rxjs';
import { WebapiBaseService } from '@geek/micro-base';


export class AssetCategoryService<T extends AssetCategory> extends WebapiBaseService {

  protected type;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'Category';
  }//constructor

  /**
   * 获取所有分类
   */
  getAll(organId?: string) {
    if (!organId)
      organId = '';//防止organId为null或者undefine被转为字符串
    return this.httpClient.get<T>(`${this.uri}?type=${this.type}&organId=${organId}`, { headers: this.header });
  }//getByType

  /**
   * 创建分类
   * @param entity 
   */
  createType<T>(entity: T): Observable<T> {
    return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header });
  }//createType

  /**
   * 更新分类
   * @param entity 
   */
  updateType<T extends AssetCategory>(entity: T): Observable<T> {
    if (entity.id)
      return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header });
    return this.createType(entity);
  }//updateType

  /**
   * 删除分类
   * @param id 
   */
  deleteType(id: string) {
    return this.httpClient.request('DELETE', `${this.uri}/${id}`, {
      responseType: 'text'
    });
  }//deleteType

  /**
   * 上移分类
   * @param id 
   */
  arrowUp(id: string): Observable<T> {
    return this.httpClient.put<T>(`${this.uri}/MoveUp?id=${id}`, { headers: this.header });
  }//moveUp

  /**
   * 下移分类
   * @param id 
   */
  arrowDown(id: string): Observable<T> {
    return this.httpClient.put<T>(`${this.uri}/MoveDown?id=${id}`, { headers: this.header });
  }//moveDown

  /**
   * 获取扁平结构的分类信息
   * @param organId 
   */
  getFlat(organId?: string): Observable<Array<T>> {
    return this.httpClient.get<Array<T>>(`${this.uri}/flat?type=${this.type}&organId=${organId ? organId : ''}`, { headers: this.header });
  }
}
