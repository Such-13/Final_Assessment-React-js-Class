/// <reference types="vite/client" />
import CryptoJS from 'crypto-js';

const ENC_KEY = import.meta.env.VITE_ENC_KEY;

export const encryptionService = {
  // Encrypts the payload and wraps it in RequestData
  wrapAndEncrypt: (data: any): { RequestData: string } => {
    try {
      const jsonString = JSON.stringify(data);
      // We use Utf8 parsing to ensure the key is handled correctly by CryptoJS
      const key = CryptoJS.enc.Utf8.parse(ENC_KEY);
      const encrypted = CryptoJS.AES.encrypt(jsonString, key, {
        mode: CryptoJS.mode.ECB, // Common in banking, or use CBC if your backend requires IV
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      
      return { RequestData: encrypted };
    } catch (error) {
      console.error('Encryption failed:', error);
      return { RequestData: '' };
    }
  },

  // Decrypts the response from the server
  decryptResponse: (encryptedData: string): any => {
    try {
      const key = CryptoJS.enc.Utf8.parse(ENC_KEY);
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      // If data is not encrypted (some error messages come in plain text), return as is
      return encryptedData;
    }
  }
};