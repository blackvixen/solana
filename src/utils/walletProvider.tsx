export const getProvider = () => {
    if (typeof window !== 'undefined' && 'phantom' in window) {
        const provider = (window as any).phantom?.solana;

        if (provider?.isPhantom) {
            return provider;
        }
    }

    if (typeof window !== 'undefined') {
        window.open('https://phantom.app/', '_blank');
    }

    return null;
};

export const formatPublicKey = (publicKey: string): string => {
    return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
};