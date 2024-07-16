import { VersionedTransaction, Connection, PublicKey, Transaction, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';


export const swapTokens = async (publicKey: string, inToken: string, outToken: string, inAmount: number, slippageBps: number) => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed")
        const quoteResponse = await (
            await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inToken}&outputMint=${outToken}&amount=${inAmount.toString()}&slippageBps=${slippageBps}`)
        ).json();

        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: publicKey,
                    wrapAndUnwrapSol: true,
                }),
            })
        ).json();

        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        return { data: { transaction: transaction, connection: connection } }
    } catch (error: any) {
        return { error: error.message };
    }
};