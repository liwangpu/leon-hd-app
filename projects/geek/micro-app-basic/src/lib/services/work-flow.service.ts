import { Injectable } from '@angular/core';
import { WorkFlow } from '../models/work-flow';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorkFlowService extends WebapiService<WorkFlow> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'WorkFlow';
  }//constructor

  updateWorkFlowItem(entity: any): Observable<WorkFlow> {
    return this.httpClient.put<WorkFlow>(`${this.uri}/UpdateWorkFlowItem`, entity, { headers: this.header });
  }//updateWorkFlowItem

  deleteWorkFlowItem(entity: any): Observable<WorkFlow> {
    return this.httpClient.put<WorkFlow>(`${this.uri}/DeleteWorkFlowItem`, entity, { headers: this.header });
  }//deleteWorkFlowItem

}
