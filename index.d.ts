export interface KeyPair {
    pubKey: Buffer;
    privKey: Buffer;
}

export interface PreKey {
    keyId: number;
    keyPair: KeyPair;
}

export interface SignedPreKey {
    keyId: number;
    keyPair: KeyPair;
    signature: Buffer;
}

export interface EncryptedMessage {
    type: number;
    body: Buffer | string;
    registrationId?: number;
}

export namespace crypto {
    export function encrypt(key: Buffer, plaintext: Buffer, iv: Buffer): Buffer;
    export function decrypt(key: Buffer, ciphertext: Buffer, iv: Buffer): Buffer;
    export function calculateMAC(key: Buffer, data: Buffer): Buffer;
    export function verifyMAC(key: Buffer, data: Buffer, mac: Buffer): boolean;
    export function deriveSecrets(input: Buffer, salt: Buffer, info: Buffer, outputCount: number): Buffer[];
}

export namespace curve {
    export function generateKeyPair(): KeyPair;
    export function calculateAgreement(pubKey: Buffer, privKey: Buffer): Buffer;
    export function calculateSignature(privKey: Buffer, message: Buffer): Buffer;
    export function verifySignature(pubKey: Buffer, message: Buffer, signature: Buffer): boolean;
}

export namespace keyhelper {
    export function generateIdentityKeyPair(): KeyPair;
    export function generateRegistrationId(): number;
    export function generatePreKey(keyId: number): PreKey;
    export function generateSignedPreKey(identityKeyPair: KeyPair, keyId: number): SignedPreKey;
}

export class ProtocolAddress {
    constructor(name: string, deviceId: number);
    getName(): string;
    getDeviceId(): number;
    toString(): string;
    equals(other: ProtocolAddress): boolean;
    is(other: ProtocolAddress): boolean;
    static from(encoded: string): ProtocolAddress;
}

export class SessionBuilder {
    constructor(storage: any, remoteAddress: ProtocolAddress);
    initOutgoing(preKeyBundle: {
        identityKey: Buffer;
        registrationId: number;
        signedPreKey: {
            keyId: number;
            publicKey: Buffer;
            signature: Buffer;
        };
        preKey?: {
            keyId: number;
            publicKey: Buffer;
        };
    }): Promise<void>;
    initIncoming(sessionRecord: SessionRecord, preKeyWhisperMessage: any): Promise<number>;
}

export class SessionCipher {
    constructor(storage: any, remoteAddress: ProtocolAddress);
    encrypt(plaintext: Buffer): Promise<EncryptedMessage>;
    decryptPreKeyWhisperMessage(ciphertext: Buffer | string): Promise<Buffer>;
    decryptWhisperMessage(ciphertext: Buffer | string): Promise<Buffer>;
}

export class SessionRecord {
    version: string;
    sessions: Record<string, any>;
    constructor();
    serialize(): Record<string, any>;
    static deserialize(data: Record<string, any>): SessionRecord;
    isClosed(session: any): boolean;
    closeSession(session: any): void;
    openSession(session: any): void;
    removeOldSessions(): void;
}

export class SignalError extends Error {}
export class UntrustedIdentityKeyError extends SignalError {}
export class SessionError extends SignalError {}
export class MessageCounterError extends SignalError {}
export class PreKeyError extends SignalError {}

export function installNewsletterPatch(): boolean;
export function restoreNewsletterOriginal(): boolean;
