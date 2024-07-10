// utils/signMessage.ts
import { PublicKey } from '@solana/web3.js';

export const signMessage = async (provider: any, message: string) => {
    try {
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
        return signedMessage;
    } catch (error) {
        console.error("Error signing message:", error);
        throw error;
    }
};

export const verifySignature = (message: string, signedMessage: any, publicKey: string) => {
    const encodedMessage = new TextEncoder().encode(message);
    const publicKeyObj = new PublicKey(publicKey);
    const signature = new Uint8Array(signedMessage.signature);

    return publicKeyObj.verify(encodedMessage, signature);
};
