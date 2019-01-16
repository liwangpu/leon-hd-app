import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({ providedIn: 'root' })
export class PathService {

  constructor(private cfgSrv: ConfigService) {

  }
  /**
 * 将资源文件路径指向服务器路径
 * @param url 
 */
  redirectServerUrl(url?: string): string {
    if (url) {
      let urlTrans = `/${url}`.replace(/\/+/g, '/');
      let path = this.cfgSrv.serverBase + urlTrans;
      return path;
    }
    return '';
  }

  /**
 * 获取文件扩展名
 * @param path 
 */
  getFileExtension(path: string) {
    let idx = path.lastIndexOf('.');
    if (idx) {
      return path.substring(idx, path.length);
    }
    return '';
  }//getFileExtension
}
