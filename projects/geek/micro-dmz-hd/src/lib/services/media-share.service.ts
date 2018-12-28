import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { MediaShare } from '../models/media-share';


@Injectable()
export class MediaShareService extends WebapiService<MediaShare> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'mediaShare';
  }//constructor

}
