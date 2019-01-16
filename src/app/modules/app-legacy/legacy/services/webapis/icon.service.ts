import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IconModel } from "../../models/iconmodel";
@Injectable()
export class IconService {

  constructor(private httpClient: HttpClient) {

  }

  /**
   * 更改图标
   * @param url 
   * @param entity 
   */
  changeIcon(url: string, entity: IconModel) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.request('PUT', url, {
      body: entity
      , headers: header
      , responseType: 'text'
    });
  }//changeIcon

}
