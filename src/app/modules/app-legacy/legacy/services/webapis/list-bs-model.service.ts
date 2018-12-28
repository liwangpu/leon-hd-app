import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WebapiBaseService } from './webapi-base.service';
import { HttpClient } from '@angular/common/http';
import { AppCacheService } from '../common/app-cache.service';
import { UIListBSModel } from '../../models/common';

@Injectable({ providedIn: 'root' })
export class ListBsModelService extends WebapiBaseService {

  constructor(protected http: HttpClient, protected appCacheSrv: AppCacheService) {
    super(http);
    this.uriPart = 'BSModel';
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UIListBSModel> | Observable<Observable<UIListBSModel>> | Promise<Observable<UIListBSModel>> {
    let modelName = route.paramMap.get('model');
    let durl = `${this.uri}/${modelName}`;
    return this.http.get<UIListBSModel>(durl, { headers: this.header });
  }

}
