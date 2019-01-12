import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { Member } from '../models/member';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class MemberService extends WebapiService<Member>{

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'Member';
  }//constructor
}
