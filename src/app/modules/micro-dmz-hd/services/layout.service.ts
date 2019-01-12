import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Layout } from '../models/layout';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class LayoutService extends WebapiService<Layout> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'layout';
  }//constructor

}
