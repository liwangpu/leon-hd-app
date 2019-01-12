import { AppConfigService } from "../../../app-config.service";

export class Path {

    /**
    * 将资源文件路径指向服务器路径
    * @param url 
    */
    static redirectServerUrl(url?: string): string {
        if (url) {
            let urlTrans = `/${url}`.replace(/\/+/g, '/');
            let path = AppConfigService._AppConfig.server + urlTrans;
            return path;
        }
        return '';
    }

    /**
   * 获取文件扩展名
   * @param path 
   */
    static getFileExtension(path: string) {
        let idx = path.lastIndexOf('.');
        if (idx) {
            return path.substring(idx, path.length);
        }
        return '';
    }//getFileExtension
}
