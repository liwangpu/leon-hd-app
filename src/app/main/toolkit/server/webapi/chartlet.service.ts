import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IEntitybase } from '../../models/ientitybase';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class ChartletService {
    private uriBase: string;//webapi基路径 例如:localhost:4200
    protected header: HttpHeaders;//默认为application/json的Content-Type Header
    constructor(private httpClient: HttpClient, private configService: ConfigService) {
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
     * 上传贴图
     * @param url 
     * @param objId 
     * @param assetId 
     */
    UploadChartlet(url: string, objId: string, assetId: string): Observable<any> {
        return this.httpClient.put(`${this.uriBase}/${url}`, { ObjId: objId, AssetId: assetId }, { headers: this.header });
    }

    /**
     * 删除贴图
     * @param url 
     * @param objId 
     * @param assetId 
     */
    DeleteChartlet(url: string, objId: string, assetId: string): Observable<any> {
        return this.httpClient.put(`${this.uriBase}/${url}`, { ObjId: objId, AssetId: assetId }, { headers: this.header });
    }
}