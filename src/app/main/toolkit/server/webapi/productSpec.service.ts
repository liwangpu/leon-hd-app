import { Injectable } from '@angular/core';
import { ApiService, Paging, IQuery } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { ProductSpec } from '../../models/productspec';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductSpecService extends ApiService<ProductSpec> {

    constructor(protected http: HttpClient, protected config: ConfigService) {
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
    query(query: IQuery): Observable<Paging<ProductSpec>> {
        return super.queryEntities(query);
    }


    /**
     * 更新规格的static mesh信息
     * @param data 
     */
    uploadMesh(data: IMeshUpload) {
        return this.http.put<void>(`${this.uri}/UploadStaticMesh`, data, { headers: this.header });
    }

    /**
     * 删除规格的static mesh信息
     * @param data 
     */
    deleteMesh(data: IMeshUpload) {
        return this.http.put<void>(`${this.uri}/DeleteStaticMesh`, data, { headers: this.header });
    }

    /**
     * 上传规格材质信息
     * @param data 
     */
    uploadMaterial(data: IMaterialUpload) {
        return this.http.put<void>(`${this.uri}/UploadMaterial`, data, { headers: this.header });
    }

    /**
     * 删除规格材质信息
     * @param data 
     */
    deleteMaterial(data: IMaterialUpload) {
        return this.http.put<void>(`${this.uri}/DeleteMaterial`, data, { headers: this.header });
    }
}

interface IMeshUpload {
    productSpecId: string;
    staticMeshId: string;
}

interface IMaterialUpload {
    productSpecId: string;
    staticMeshId: string;
    materialId: string;
}