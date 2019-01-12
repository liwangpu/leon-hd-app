import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization';
import { Observable, of } from 'rxjs';
import { Account } from "../models/account";
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class OrganizationService extends WebapiService<Organization> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'Organ';
  }//constructor

  getOwner(organId: string | number): Observable<Account> {
    if (!organId)
      return of(new Account());
    return this.httpClient.get<Account>(`${this.uri}/owner?organId=${organId}`, { headers: this.header });
  }//getOwner

}
