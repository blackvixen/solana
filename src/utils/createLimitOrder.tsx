import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import fetch from "cross-fetch";
import bs58 from "bs58";

export const createLimitOrder = async (
    provider: any,
    publicKey: string,
    inToken: string,
    outToken: string,
    inAmount: number,
    outAmount: number
): Promise<string> => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const owner = new PublicKey(publicKey);

    const base = Keypair.generate();

    const response = await fetch('https://quote-api.jup.ag/v6/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner: owner.toString(),
            inAmount: inAmount,
            outAmount: outAmount,
            inputMint: inToken,
            outputMint: outToken,
            expiredAt: null,
            base: base.publicKey.toString(),
        }),
    });

    const { tx } = await response.json();

    const txBuf = Buffer.from(tx, 'base64');
    const transaction = Transaction.from(txBuf);

    // Get recent blockhash
    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    // Add fee payer
    transaction.feePayer = provider.publicKey;

    // Sign the transaction with the base keypair
    transaction.partialSign(base);

    // Sign the transaction with the provider
    const signedTransaction = await provider.signTransaction(transaction);

    const rawTransaction = signedTransaction.serialize();
    const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
    });

    await connection.confirmTransaction(txid);

    const record = `https://solscan.io/tx/${txid}`;
    return record;
};
