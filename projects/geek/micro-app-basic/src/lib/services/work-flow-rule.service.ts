import { Injectable } from '@angular/core';
import { WorkFlowRule } from '../models/work-flow-rule';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkFlowRuleService extends WebapiService<WorkFlowRule> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'WorkFlowRule';
  }//constructor

  defineRuleDetail(entity: any) {
    return this.httpClient.put<any>(`${this.uri}/DefineRuleDetail`, entity, { headers: this.header });
  }//defineRuleDetail

}
