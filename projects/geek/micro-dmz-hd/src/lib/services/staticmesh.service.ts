import { Injectable } from '@angular/core';
import { Staticmesh } from '../models/staticmesh';
import { WebapiService } from '@geek/micro-base';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class StaticmeshService extends WebapiService<Staticmesh> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'staticMesh';
  }//constructor

}
