import { Injectable } from '@angular/core';
import { Staticmesh } from '../models/staticmesh';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';


@Injectable()
export class StaticmeshService extends WebapiService<Staticmesh> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'staticMesh';
  }//constructor

}
