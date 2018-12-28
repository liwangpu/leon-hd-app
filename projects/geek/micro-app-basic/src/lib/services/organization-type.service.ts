import { Injectable } from '@angular/core';
import { OrganizationType } from '../models/organization-type';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrganizationTypeService extends WebapiService<OrganizationType> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'OrganType';
  }//constructor
}
