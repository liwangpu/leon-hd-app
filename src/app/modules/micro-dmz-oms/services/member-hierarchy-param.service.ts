import { Injectable } from '@angular/core';
import { MemberHierarchyParam } from '../models/member-hierarchy-param';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class MemberHierarchyParamService extends WebapiService<MemberHierarchyParam> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'MemberHierarchyParam';
  }//constructor

  getHierarchySetting(hierarchyId: string) {
    return this.httpClient.get<{ memberHierarchyParamId: string, rate: number }>(`${this.uri}/HierarchySetting/${hierarchyId}`, { headers: this.header });
  }//getHierarchySetting

  updateHierarchySetting(data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.uri}/updateHierarchySetting`, data, { headers: this.header });
  }//updateHierarchySetting

  getPointExchange() {
    return this.httpClient.get<number>(`${this.uri}/PointExchange`, { headers: this.header });
  }//getPointExchange

  updatePointExchange(rate: number) {
    return this.httpClient.put(`${this.uri}/PointExchange`, { rate: rate }, { headers: this.header });
  }//updatePointExchange
}
