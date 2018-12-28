import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from "@env/environment";

@Injectable()
export class AppEncryptionService {

  constructor() { }

  /**
  * 加密普通字符串
  * @param msg 
  */
  encryptString(msg: string): string {
    let ciphertext = CryptoJS.AES.encrypt(msg, environment.secretKey);
    return ciphertext.toString();
  }

  /**
   * 简单解密普通字符串
   * @param ciphertext 
   */
  decryptString(ciphertext: string): string {
    let bys = CryptoJS.AES.decrypt(ciphertext.toString(), environment.secretKey);
    return bys.toString(CryptoJS.enc.Utf8);
  }
}
