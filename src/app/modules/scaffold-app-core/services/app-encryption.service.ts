import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppConfigService } from '../../../app-config.service';


@Injectable()
export class AppEncryptionService {

  constructor(protected appConfigSrv: AppConfigService) { }

  /**
  * 加密普通字符串
  * @param msg 
  */
  encryptString(msg: string): string {
    let ciphertext = CryptoJS.AES.encrypt(msg, this.appConfigSrv.appConfig.secretKey);
    return ciphertext.toString();
  }

  /**
   * 简单解密普通字符串
   * @param ciphertext 
   */
  decryptString(ciphertext: string): string {
    let bys = CryptoJS.AES.decrypt(ciphertext.toString(), this.appConfigSrv.appConfig.secretKey);
    return bys.toString(CryptoJS.enc.Utf8);
  }
}
