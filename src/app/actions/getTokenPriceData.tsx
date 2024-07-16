"use server"

import { getTokenData } from '@/utils/fetchTokenPrice';
import { setCookie, getCookie } from '@/utils/cookies';
import { estimateTransferFee, getSolBalance, getTokenBalance } from '@/utils/walletProvider';

const COOKIE_TTL = 3600; // Time-to-live in seconds (1 hour)

export const getTokenDataAction = async (id: string) => {
    const cookieKey = `tokenData_${id}`;
    const cachedData = getCookie(cookieKey);

    if (cachedData) {
        console.log('Using cached data');
        return { data: cachedData };
    }

    try {
        const data = await getTokenData(id);
        setCookie(cookieKey, data, COOKIE_TTL);
        return { data };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const getCurrentRate = async (inToken: string, outToken: string) => {
    try {
        const inTokenData = await getTokenDataAction(inToken);
        const outTokenData = await getTokenDataAction(outToken);

        console.log(inTokenData)
        console.log(outTokenData)

        if (inTokenData.error || outTokenData.error) {
            return { error: 'Failed to fetch token data' };
        }

        const inTokenPrice = inTokenData.data?.price;
        const outTokenPrice = outTokenData.data?.price;

        const rate = inTokenPrice / outTokenPrice;
        return { data: rate.toFixed(6) };
    } catch (error: any) {
        return { error: error.message };
    }
};

export const checkBalance = async (amount: number, publicKey: string, tokenSymbol: string) => {
    const solBalance = await getSolBalance(publicKey)
    const tokenBalance = await getTokenBalance(publicKey, tokenSymbol)
    const transferFee = await estimateTransferFee()

    console.log(amount)
    console.log(Number(solBalance))
    console.log(Number(tokenBalance))
    console.log(Number(transferFee))

    if (Number(transferFee) > Number(solBalance)) {
        return { error: "Insufficient balance for transfer. Add more Sol Token to complete the transaction" }
    } else if (amount > Number(tokenBalance) || amount <= 0.000000) {
        return { error: "You do not have sufficient token balance for this transaction" }
    } else if (Number(solBalance) < 0.1) {
        return { error: "You do not have sufficient balance for fee" }
    }

    return { data: "Complete Transaction" }
}