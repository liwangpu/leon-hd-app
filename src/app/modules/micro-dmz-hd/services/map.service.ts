import { Injectable } from '@angular/core';
import { Map } from '../models/map';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class MapService extends WebapiService<Map> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'map';
  }//constructor

}
