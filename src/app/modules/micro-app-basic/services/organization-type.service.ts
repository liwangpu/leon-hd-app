import { Injectable } from '@angular/core';
import { OrganizationType } from '../models/organization-type';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class OrganizationTypeService extends WebapiService<OrganizationType> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'OrganType';
  }//constructor
}
