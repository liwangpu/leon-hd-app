import { Injectable } from '@angular/core';
import { FileAsset } from '@geek/micro-dmz-hd';
import { WebapiService } from '@geek/micro-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FileService extends WebapiService<FileAsset> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.uriPart = 'Files';
  }

  uploadFormFile(formData: any, fileExt?: string, localPath?: string, description?: string) {
    let header = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'fileExt': fileExt ? encodeURI(fileExt) : '',
      'localPath': localPath ? encodeURI(localPath) : '',
      'description': description ? encodeURI(description) : ''
    });
    return this.httpClient.post<FileAsset>(`${this.uri}/UploadFormFile`, formData, { headers: header });
  }//uploadFormFile

}
