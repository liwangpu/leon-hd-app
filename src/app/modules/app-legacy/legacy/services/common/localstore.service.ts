import { Injectable } from '@angular/core';
import { AppEncryptionService } from './app-encryption.service';

@Injectable({ providedIn: 'root' })
export class LocalstoreService {

  constructor(private enctrySrv: AppEncryptionService) { }

  setItem(key: string, value: string) {
    let ciphertext = this.enctrySrv.encryptString(value);
    localStorage.setItem(key, ciphertext);
  }

  getItem(key: string) {
    let ciphertext = localStorage.getItem(key);
    if (!ciphertext)
      return undefined;
    return this.enctrySrv.decryptString(ciphertext);
  }
}
