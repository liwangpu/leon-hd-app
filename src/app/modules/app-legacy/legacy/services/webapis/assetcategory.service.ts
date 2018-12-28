import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { AssetCategory } from "../../models/assetcategory";
import { Observable } from 'rxjs';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
/**
 * asset category serve基类
 */
export class AssetCategoryService<T extends AssetCategory> {

    editData$ = new BehaviorSubject<AssetCategory>(new AssetCategory());
    private uriBase: string;//webapi基路径 例如:localhost:4200
    protected header: HttpHeaders;//默认为application/json的Content-Type Header
    protected uriPart: string;//webapi实体路径 例如products
    protected type;
    /**
     * 完整的webapi请求路径
     */
    public get uri(): string {
        return `${this.uriBase}/${this.uriPart}`;
    }
    constructor(private httpClient: HttpClient, private configService: ConfigService) {
        this.uriBase = this.configService.serverBase;

        this.header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }//constructor

    /**
     * 获取所有分类
     * @param type 
     */
    protected getByType(type: string, organId?: string) {
        if (type) {
            if (!organId)
                organId = '';//防止organId为null或者undefine被转为字符串
            return this.httpClient.get<T>(`${this.uri}?type=${type}&organId=${organId}`, { headers: this.header }).pipe(tap(vl => {
                this.editData$.next(vl);
            }));
        }
        return of<T>({} as T).pipe(tap(vl => {
            this.editData$.next(vl);
        }));
    }//getByType

    /**
     * 创建分类
     * @param entity 
     */
    protected createType<T>(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.uri}`, entity, { headers: this.header });
    }//createType

    /**
     * 更新分类
     * @param entity 
     */
    protected updateType<T extends AssetCategory>(entity: T): Observable<T> {
        if (entity.id)
            return this.httpClient.put<T>(`${this.uri}`, entity, { headers: this.header });
        return this.createType(entity);
    }//updateType

    /**
     * 删除分类
     * @param type 
     * @param id 
     */
    protected deleteType(type: string, id: string) {
        return this.httpClient.request('DELETE', `${this.uri}/${id}`, {
            responseType: 'text'
        });
    }//deleteType

    // /**
    //  * 移动分类
    //  * @param type 
    //  * @param id 
    //  * @param targetId 
    //  */
    // private arrow(entity: T): Observable<T> {
    //     return this.httpClient.post<T>(`${this.uri}/DisplayIndex?type=${entity.type}&id=${entity.id}&index=${entity.displayIndex}`, { headers: this.header });
    // }//move

    /**
     * 上移分类
     * @param entity 
     */
    protected arrowUp(entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.uri}/MoveUp?id=${entity.id}`, { headers: this.header });
    }//moveUp

    /**
     * 下移分类
     * @param entity 
     */
    protected arrowDown(entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.uri}/MoveDown?id=${entity.id}`, { headers: this.header });
    }//moveDown

    /**
     * 获取扁平结构的分类信息
     * @param type 
     * @param organId 
     */
    protected getFlat(type: string, organId: string): Observable<Array<T>> {
        return this.httpClient.get<Array<T>>(`${this.uri}/flat?type=${type}&organId=${organId}`, { headers: this.header });
    }
}
