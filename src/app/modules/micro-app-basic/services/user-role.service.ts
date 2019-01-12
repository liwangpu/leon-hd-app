import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { UserRole } from '../models/user-role';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class UserRoleService extends WebapiService<UserRole> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'UserRole';
  }//constructor

}
