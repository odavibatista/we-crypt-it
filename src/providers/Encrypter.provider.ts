import { createCipheriv, createDecipheriv } from 'crypto';
import { EncrypterProviderInterface } from './interface/Encrypter.provider';
import { EncrypterDecryptDTO, EncrypterEncryptDTO } from './dto/Encrypter.provider.dto';

export class EncrypterProvider implements EncrypterProviderInterface {
    private readonly algorithm: string;
    private readonly iv: Buffer;
    private readonly secret: string;
  
    constructor(iv: string, secret: string) {
      this.algorithm = 'aes-256-cbc';
      this.iv = Buffer.from(iv);
      this.secret = secret;
    }
  
    public encrypt({ content, secret }: EncrypterEncryptDTO): string {
      const cipher = createCipheriv(
        this.algorithm,
        Buffer.from(secret || this.secret),
        this.iv,
      );
  
      const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
  
      const encryptedPayload = encrypted.toString('hex');
  
      return encryptedPayload;
    }
  
    public decrypt({ content, secret }: EncrypterDecryptDTO): string {
      const decipher = createDecipheriv(
        this.algorithm,
        secret || this.secret,
        this.iv,
      );
  
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(content, 'hex')),
        decipher.final(),
      ]);
  
      return decrypted.toString();
    }
}