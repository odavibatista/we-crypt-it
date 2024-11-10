export interface KeyProviderInterface {
    generateIV(): string;
    generateSecret(): string;
}