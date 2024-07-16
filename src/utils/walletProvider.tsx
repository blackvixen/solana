import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL, clusterApiUrl, ParsedAccountData } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTokenMetadata } from './fetchTokenPrice';


export const getProvider = () => {
    if (typeof window !== 'undefined' && 'phantom' in window) {
        const provider = (window as any).phantom?.solana;

        if (provider?.isPhantom) {
            return provider;
        }
    }

    // if (typeof window !== 'undefined') {
    //     window.open('https://phantom.app/', '_blank');
    // }

    return null;
};

export const formatPublicKey = (publicKey: string): string => {
    return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
};

export const getSolBalance = async (publicKey: string): Promise<string> => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const balance = await connection.getBalance(new PublicKey(publicKey)) / 1e9;
        return balance.toFixed(6); // Convert lamports to SOL
    } catch (error) {
        console.error('Failed to fetch SOL balance:', error);
        return "0.000000";
    }
};

export const getTokenBalance = async (publicKey: string, tokenMint: string): Promise<string> => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        console.log("mint: ", tokenMint)
        const accounts = await connection.getParsedProgramAccounts(
            TOKEN_PROGRAM_ID,
            {
                filters: [
                    {
                        dataSize: 165,
                    },
                    {
                        memcmp: {
                            offset: 32,
                            bytes: publicKey
                        }
                    },
                ],
            }
        );

        // console.log(accounts)

        const targetAccount: any = accounts.find((account: any) => {
            console.log("Account Data: ", account.account.data)
            if (account.account.data.parsed.info.mint === tokenMint) {
                return account
            }
            return undefined;
        });

        console.log(targetAccount)

        if (targetAccount) {
            const tokenAmount = targetAccount.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
            console.log("Token Amount", tokenAmount)
            return tokenAmount.toFixed(6);
        }
        return "0.000000";
    } catch (error) {
        console.error('Failed to fetch token balance:', error);
        return '0.000000';
    }
};

export const estimateTransferFee = async (): Promise<string> => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const { feeCalculator } = await connection.getRecentBlockhash();
        const feeInLamports = feeCalculator.lamportsPerSignature * 2; // Typically 2 signatures per transaction
        const feeInSol = feeInLamports / LAMPORTS_PER_SOL; // Convert lamports to SOL
        return feeInSol.toFixed(6); // Return the fee as a string with 6 decimal places
    } catch (error) {
        console.error('Failed to estimate transfer fee:', error);
        return '0.000000';
    }
};