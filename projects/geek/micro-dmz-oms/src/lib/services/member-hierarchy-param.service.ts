import { Injectable } from '@angular/core';
import { MemberHierarchyParam } from '../models/member-hierarchy-param';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MemberHierarchyParamService extends WebapiService<MemberHierarchyParam> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'MemberHierarchyParam';
  }//constructor

  getHierarchySetting(hierarchyId: string) {
    return this.httpClient.get<{ memberHierarchyParamId: string, rate: number }>(`${this.uri}/HierarchySetting/${hierarchyId}`, { headers: this.header });
  }//getHierarchySetting

  updateHierarchySetting(data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.uri}/updateHierarchySetting`, data, { headers: this.header });
  }//updateHierarchySetting
}
