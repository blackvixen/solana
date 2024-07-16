// utils/signMessage.ts
import nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

export const signMessage = async (provider: any, message: string): Promise<SignedMessage> => {
    try {
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
        return {
            signature: bs58.encode(signedMessage.signature),
            publicKey: signedMessage.publicKey.toString()
        };
    } catch (error) {
        console.error("Error signing message:", error);
        throw error;
    }
};

export const verifySignature = (message: string, signedMessage: SignedMessage): boolean => {
    try {
        const encodedMessage = new TextEncoder().encode(message);
        const publicKeyObj = new PublicKey(signedMessage.publicKey);
        const signature = bs58.decode(signedMessage.signature);

        return nacl.sign.detached.verify(encodedMessage, signature, publicKeyObj.toBytes());
    } catch (error) {
        console.error("Error verifying signature:", error);
        throw error;
    }
};