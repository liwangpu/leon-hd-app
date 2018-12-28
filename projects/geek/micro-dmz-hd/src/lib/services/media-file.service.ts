import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { MediaFile } from '../models/media-file';

@Injectable()
export class MediaFileService extends WebapiService<MediaFile> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'media';
  }//constructor

}
