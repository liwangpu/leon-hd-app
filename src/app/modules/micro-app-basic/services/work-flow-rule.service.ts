import { Injectable } from '@angular/core';
import { WorkFlowRule } from '../models/work-flow-rule';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class WorkFlowRuleService extends WebapiService<WorkFlowRule> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'WorkFlowRule';
  }//constructor

  defineRuleDetail(entity: any) {
    return this.httpClient.put<any>(`${this.uri}/DefineRuleDetail`, entity, { headers: this.header });
  }//defineRuleDetail

}
