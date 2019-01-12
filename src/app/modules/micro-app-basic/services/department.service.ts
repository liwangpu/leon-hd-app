import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { Department } from 'micro-app-basic';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class DepartmentService extends WebapiService<Department>{

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'Department';
  }//constructor
}
