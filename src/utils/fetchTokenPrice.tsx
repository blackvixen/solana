import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import { ENV, TokenListProvider } from '@solana/spl-token-registry';

export const getTokenData = async (id: string, network:string = "solana") => {
    if (!id) {
        throw new Error('Token ID is required');
    }

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!response.ok) {
        console.error(response)
        throw new Error('Failed to fetch token data');
    }

    const data = await response.json();

    let decimal = 6
    if (network === "solana") {
        decimal = data.detail_platforms.solana.decimal_place
    } else {
        decimal = data.detail_platforms.ethereum.decimal_place
    }

    return {
        symbol: data.symbol,
        image: data.image.large,
        decimal: decimal,
        price: data.market_data.current_price.usd,
    };
};

export async function getTokenMetadata(mintAddress: PublicKey) {
    const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
    const metaplex = Metaplex.make(connection);

    let tokenName;
    let tokenSymbol;
    let tokenLogo;

    const metadataAccount = metaplex
        .nfts()
        .pdas()
        .metadata({ mint: mintAddress });

    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

    if (metadataAccountInfo) {
        const token = await metaplex.nfts().findByMint({ mintAddress });
        console.log(token)

        if (token === undefined) {
            tokenName = "";
            tokenSymbol = "";
            tokenLogo = "";
            return { tokenName, tokenSymbol, tokenLogo };
        }

        tokenName = token.name || "";
        tokenSymbol = token.symbol || "";
        tokenLogo = token.json?.image || "";
        return { tokenName, tokenSymbol, tokenLogo };
    } else {
        const provider = await new TokenListProvider().resolve();
        const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
        const tokenMap = tokenList.reduce((map, item) => {
            map.set(item.address, item);
            return map;
        }, new Map());

        const token = tokenMap.get(mintAddress.toBase58());
        console.log(token)

        if (token === undefined) {
            tokenName = "";
            tokenSymbol = "";
            tokenLogo = "";
            return { tokenName, tokenSymbol, tokenLogo };
        }

        tokenName = "";
        tokenSymbol =  "";
        tokenLogo =  "";
        return { tokenName, tokenSymbol, tokenLogo };
    }
}