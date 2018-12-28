import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { MemberRegistry } from '../models/member-registry';

@Injectable()
export class MemberRegistryService extends WebapiService<MemberRegistry> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'MemberRegistry';
  }//constructor

  approveRegistry(model: { id: string }) {
    return this.httpClient.post(`${this.uri}/ApproveRegistry`, model, { headers: this.header });
  }//approveRegistry

}
