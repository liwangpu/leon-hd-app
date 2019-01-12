import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Package } from '../models/package';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class PackageService extends WebapiService<Package> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'Package';
  }//constructor

}
