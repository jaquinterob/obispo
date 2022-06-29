import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  encrypt(texto: string): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(texto), 'obispo').toString();
    } catch (error) {
      console.error(error);
      return '';
    }
  }
  
  decrypt(texto: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(texto, 'obispo');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return texto;
    } catch (error) {
      console.error(error);
      return '';
    }
  }
}
