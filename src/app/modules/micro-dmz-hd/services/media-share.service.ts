import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { MediaShare } from '../models/media-share';
import { AppConfigService } from '../../../app-config.service';


@Injectable()
export class MediaShareService extends WebapiService<MediaShare> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'mediaShare';
  }//constructor

}
