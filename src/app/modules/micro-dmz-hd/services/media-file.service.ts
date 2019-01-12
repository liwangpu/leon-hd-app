import { Injectable } from '@angular/core';
import { WebapiService } from 'micro-base';
import { HttpClient } from '@angular/common/http';
import { MediaFile } from '../models/media-file';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class MediaFileService extends WebapiService<MediaFile> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient, appConfigSrv);
    this.uriPart = 'media';
  }//constructor

}
