import { create } from 'zustand'


interface ProviderState {
    provider: any;
    mobileMenuOpen: boolean;
    publicKey: string | null;
    privateKey: string | null;
    selectedNetwork: string;
    slippage: number;
    setSlippage: (value: number) => void;
    setProvider: (provider: any) => void;
    setPublicKey: (publicKey: string | null) => void;
    setMobileMenuOpen: (open: boolean) => void;
    setSelectedNetwork: (network: string) => void;
    setPrivateKey: (privateKey: string | null) => void;
}

export const useProviderStore = create<ProviderState>((set) => ({
    provider: null,
    mobileMenuOpen: false,
    privateKey: null,
    publicKey: null,
    selectedNetwork: "solana",
    slippage: 3,
    setSlippage: (value) => set({ slippage: value }),
    setProvider: (provider) => set({ provider }),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    setPrivateKey: (privateKey) => set({ privateKey: privateKey }),
    setSelectedNetwork: (network) => set({ selectedNetwork: network }),
    setPublicKey: (publicKey) => set({ publicKey: publicKey }),
}));