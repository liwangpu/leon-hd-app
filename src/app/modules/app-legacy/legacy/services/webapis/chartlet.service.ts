import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
@Injectable()
export class ChartletService {
    private uriBase: string;//webapi基路径 例如:localhost:4200
    protected header: HttpHeaders;//默认为application/json的Content-Type Header
    constructor(protected httpClient: HttpClient, protected configService: ConfigService) {
        this.uriBase = configService.serverBase;

        this.header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    /**
     * 上传ICon
     * @param url 
     * @param objId 
     * @param assetId 
     */
    UploadICon(url: string, objId: string, assetId: string): Observable<any> {
        return this.httpClient.put(`${this.uriBase}/${url}`, { ObjId: objId, AssetId: assetId }, { headers: this.header });
    }

    /**
     * 上传图册
     * @param url 
     * @param objId 
     * @param assetId 
     */
    UploadAlbum(url: string, objId: string, assetId: string): Observable<any> {
        return this.httpClient.put(`${this.uriBase}/${url}`, { ObjId: objId, AssetId: assetId }, { headers: this.header });
    }

    /**
     * 删除图册
     * @param url 
     * @param objId 
     * @param assetId 
     */
    DeleteAlbum(url: string, objId: string, assetId: string): Observable<any> {
        return this.httpClient.put(`${this.uriBase}/${url}`, { ObjId: objId, AssetId: assetId }, { headers: this.header });
    }
}