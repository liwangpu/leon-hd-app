import { Injectable } from '@angular/core';
import { WorkFlow } from '../models/work-flow';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class WorkFlowService extends WebapiService<WorkFlow> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'WorkFlow';
  }//constructor

  updateWorkFlowItem(entity: any): Observable<WorkFlow> {
    return this.httpClient.put<WorkFlow>(`${this.uri}/UpdateWorkFlowItem`, entity, { headers: this.header });
  }//updateWorkFlowItem

  deleteWorkFlowItem(entity: any): Observable<WorkFlow> {
    return this.httpClient.put<WorkFlow>(`${this.uri}/DeleteWorkFlowItem`, entity, { headers: this.header });
  }//deleteWorkFlowItem

}
