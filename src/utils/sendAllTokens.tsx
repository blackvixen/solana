// utils/sendAllSPLTokens.ts
import { Connection, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const sendAllSPLTokens = async (
    provider: any,
    senderPublicKey: string,
    recipientPublicKey: string
): Promise<any> => {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const sender = new PublicKey(senderPublicKey);
    const recipient = new PublicKey(recipientPublicKey);

    // Get recent blockhash
    const { blockhash } = await connection.getRecentBlockhash();

    // Get all SPL token accounts owned by the sender
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(sender, {
        programId: TOKEN_PROGRAM_ID,
    });

    const transactions: Transaction[] = [];

    for (const { pubkey, account } of tokenAccounts.value) {
        const tokenAmount = account.data.parsed.info.tokenAmount.amount;
        const mint = new PublicKey(account.data.parsed.info.mint);

        if (parseInt(tokenAmount) > 0) {
            // Create associated token account for the recipient if it doesn't exist
            const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                provider.publicKey, // provider as the payer
                mint, // mint
                recipient // owner
            );

            // Create transfer transaction
            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: provider.publicKey,
            }).add(
                createTransferInstruction(
                    pubkey, // source
                    recipientTokenAccount.address, // destination
                    sender, // owner
                    parseInt(tokenAmount), // amount
                    [], // multisig
                    TOKEN_PROGRAM_ID
                )
            );

            transactions.push(transaction);
        }
    }

    if (transactions.length === 0) {
        return "No SPL tokens to transfer";
    }

    // Sign and send all transactions
    const signedTransactions = await provider.signAllTransactions(transactions);
    const signatures = await Promise.all(signedTransactions.map((tx: Transaction) => connection.sendRawTransaction(tx.serialize())));

    // Get transaction statuses
    const statuses = await connection.getSignatureStatuses(signatures.map((sig: string) => sig));

    return statuses.value;
};
