import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navigation } from '../models/navigation';
import { Observable } from 'rxjs';
import { WebapiService } from '@geek/micro-base';

@Injectable()
export class NavService extends WebapiService<Navigation> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'navigation';
  }


  getByRole(role: string): Observable<Array<Navigation>> {
    return this.httpClient.get<Array<Navigation>>(`${this.uri}/GetByRole?role=${role}`, { headers: this.header });
  }//getByRole
}
