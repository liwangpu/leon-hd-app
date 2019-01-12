import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { MemberRegistry } from '../models/member-registry';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class MemberRegistryService extends WebapiService<MemberRegistry> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'MemberRegistry';
  }//constructor

  approveRegistry(model: { id: string }) {
    return this.httpClient.post(`${this.uri}/ApproveRegistry`, model, { headers: this.header });
  }//approveRegistry

}
