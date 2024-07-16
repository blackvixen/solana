import tokens from '@/data/Tokens.json';

export const getTokensByPlatform = (platform: string): PlatformToken[] => {
    return tokens.filter((token: Token) => token.platforms[platform])
                 .map((token: Token) => ({
                     id: token.id,
                     symbol: token.symbol,
                     name: token.name,
                     mintAddress: token.platforms[platform]
                 }));
};

export const getTokenBySymbolAndPlatform = (id: string, platform: string): PlatformToken | undefined => {
    return getTokensByPlatform(platform).find(token => token.id === id);
};