import { Injectable } from '@angular/core';
import { NationalUrban } from '../models/national-urban';
import { HttpClient } from '@angular/common/http';
import { WebapiBaseService, IPageData } from 'micro-base';
import { Observable, of } from 'rxjs';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class NationalUrbanService extends WebapiBaseService {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'NationalUrban';
  }//constructor

  /**
* 根据id获取实体信息
* @param id 
*/
  getById(id: string | number): Observable<NationalUrban> {
    if (!id) {
      return of(new NationalUrban());
    }
    return this.httpClient.get<NationalUrban>(`${this.uri}/${id}`, { headers: this.header });
  }//getById

  query(name?: string, nationalUrbanTypes?: string, parentId?: string, page?: number, size?: number): Observable<IPageData<NationalUrban>> {
    page = page ? page : 0;
    size = size ? size : 10;
    return this.httpClient.request<IPageData<NationalUrban>>('get', `${this.uri}?page=${page}&pageSize=${size}&search=${name ? name : ''}&nationalUrbanTypes=${nationalUrbanTypes ? nationalUrbanTypes : ''}&parentId=${parentId ? parentId : ''}`, { headers: this.header });
  }//query

}
