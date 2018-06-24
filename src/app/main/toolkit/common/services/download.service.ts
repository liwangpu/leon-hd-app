import { Injectable } from '@angular/core';
// import * as $ from 'jquery';
@Injectable()
export class DownloadService {

  constructor() { }

  download(url: string) {
    // let downloadFrmNode = $('#app_inner_download_frm');
    // if (downloadFrmNode.length <= 0) {
    //   downloadFrmNode = $('<iframe id="app_inner_download_frm" height="0" width="0" style="display:none;"></iframe>');
    //   let bodyNode = $('body');
    //   bodyNode.append(downloadFrmNode);
    // }
    // downloadFrmNode.attr('src', url);
  }
}
