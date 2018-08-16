import { Injectable } from '@angular/core';
import { WebapiBaseService } from './webapi-base.service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NavService extends WebapiBaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'navigation';
  }

  getByRole(role: string) {
    return this.httpClient.get(`${this.uri}?role=${role}`, { headers: this.header });
  }//getByRole

  update(role: string, navs: string) {
    let entity = {
      role: role,
      navs: navs
    };
    return this.httpClient.post(`${this.uri}`, entity, { headers: this.header, responseType: 'text' });
  }//Update
}
