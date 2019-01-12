import { Injectable } from '@angular/core';
import { FileAsset } from 'micro-dmz-hd';
import { WebapiService } from 'micro-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

@Injectable()
export class FileService extends WebapiService<FileAsset> {

  constructor(protected httpClient: HttpClient, protected appConfigSrv: AppConfigService) {
    super(httpClient,appConfigSrv);
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
