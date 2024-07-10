import { create } from 'zustand'


interface ProviderState {
    provider: any;
    mobileMenuOpen: boolean;
    publicKey: string | null;
    privateKey: string | null;
    setProvider: (provider: any) => void;
    setPublicKey: (publicKey: string | null) => void;
    setMobileMenuOpen: (open: boolean) => void;
    setPrivateKey: (privateKey: string | null) => void;
}

export const useProviderStore = create<ProviderState>((set) => ({
    provider: null,
    mobileMenuOpen: false,
    privateKey: null,
    publicKey: null,
    setProvider: (provider) => set({ provider }),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    setPrivateKey: (privateKey) => set({ privateKey: privateKey }),
    setPublicKey: (publicKey) => set({ publicKey }),
}));