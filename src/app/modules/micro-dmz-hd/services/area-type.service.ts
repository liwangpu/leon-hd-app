import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AreaType } from '../models/area-type';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class AreaTypeService extends WebapiService<AreaType> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'AreaType';
  }//constructor

}
