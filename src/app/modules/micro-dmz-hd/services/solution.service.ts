import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { Solution } from '../models/solution';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class SolutionService extends WebapiService<Solution> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'solution';
  }//constructor

}
