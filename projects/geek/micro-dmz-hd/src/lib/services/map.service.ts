import { Injectable } from '@angular/core';
import { Map } from '../models/map';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService extends WebapiService<Map> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'map';
  }//constructor

}
