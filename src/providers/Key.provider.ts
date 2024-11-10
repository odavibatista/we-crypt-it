import { randomBytes } from 'crypto';
import { KeyProviderInterface } from './interface/Key.provider';

export class KeyProvider implements KeyProviderInterface {
    constructor() {}
    
    public generateIV(): string {
        let iv = randomBytes(16);

        return iv.toString('hex');
    }

    public generateSecret(): string {
        let secret = randomBytes(32);

        return secret.toString('hex');
    }
}