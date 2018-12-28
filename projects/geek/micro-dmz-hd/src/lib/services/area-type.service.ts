import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { AreaType } from '../models/area-type';

@Injectable()
export class AreaTypeService extends WebapiService<AreaType> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'AreaType';
  }//constructor

}
