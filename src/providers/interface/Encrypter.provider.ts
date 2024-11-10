import {
    EncrypterDecryptDTO,
    EncrypterEncryptDTO } from '../dto/Encrypter.provider.dto';
  
  export interface EncrypterProviderInterface {
    encrypt(data: EncrypterEncryptDTO): string;
    decrypt(data: EncrypterDecryptDTO): string;
  }  