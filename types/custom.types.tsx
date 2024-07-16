interface PhantomProvider {
    isPhantom: boolean;
    // Add any other properties and methods you need to use from the provider
}

interface Window {
    phantom?: {
        solana?: PhantomProvider;
    };
}

interface Token {
    id: string;
    symbol: string;
    name: string;
    platforms: {
        [key: string]: string;
    };
}

interface PlatformToken {
    id: string;
    symbol: string;
    name: string;
    mintAddress: string;
}

interface Country {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
}

interface SelectOptionProps {
    id: string;
    symbol: string;
    name: string;
    mintAddress: string;
}


interface SelectProps {
    options: SelectOptionProps[] // an array of the options.
    selected?: SelectOptionProps // the selected option.
    handleSelect: (option: SelectOptionProps) => void // function that is called when an option is selected.
    placeholder?: string
    isFetchingOptions?: boolean
    isSearchable?: boolean
    searchInput?: string
    lastOptionRef?: (node: Element | null) => void
    setSearchInput?: React.Dispatch<React.SetStateAction<string>>
}

interface SwapParams {
    provider: any;
    publicKey: string;
    inToken: string;
    outToken: string;
    inAmount: number;
    slippageBps: number;
}

interface SignedMessage {
    publicKey: string;
    signature: string;
}
