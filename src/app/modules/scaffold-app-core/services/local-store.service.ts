import { Injectable } from '@angular/core';
import { AppEncryptionService } from './app-encryption.service';

@Injectable()
export class LocalStoreService {

  constructor(private enctrySrv: AppEncryptionService) { }

  setItem(key: string, value: string) {
    if (typeof localStorage == 'undefined') return;
    let ciphertext = this.enctrySrv.encryptString(value);
    localStorage.setItem(key, ciphertext);
  }

  getItem(key: string) {
    if (typeof localStorage == 'undefined') return;
    let ciphertext = localStorage.getItem(key);
    if (!ciphertext)
      return undefined;
    return this.enctrySrv.decryptString(ciphertext);
  }
}
