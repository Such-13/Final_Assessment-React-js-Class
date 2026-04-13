import CryptoJS from 'crypto-js';

/**
 * SOLID: Single Responsibility Principle
 * This service has one job: handling the security of your data payloads.
 */

const ENC_KEY = import.meta.env.VITE_ENC_KEY;

export const encryptionService = {
  /**
   * Encrypts the JSON payload before sending it to the API
   */
  encrypt: (data: any): string => {
    try {
      const jsonString = JSON.stringify(data);
      // Using AES encryption as per standard banking protocol requirements
      const encrypted = CryptoJS.AES.encrypt(jsonString, ENC_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  },

  /**
   * Decrypts the response received from the API
   */
  decrypt: (cipherText: string): any => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, ENC_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }
};