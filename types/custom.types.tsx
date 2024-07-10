interface PhantomProvider {
    isPhantom: boolean;
    // Add any other properties and methods you need to use from the provider
}

interface Window {
    phantom?: {
        solana?: PhantomProvider;
    };
}