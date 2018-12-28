import { Injectable } from '@angular/core';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';
import { Package } from '../models/package';

@Injectable()
export class PackageService extends WebapiService<Package> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'Package';
  }//constructor

}
