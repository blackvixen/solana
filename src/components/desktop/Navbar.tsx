"use client";

import Link from 'next/link';
import React from 'react'
import { Separator } from '@/components/ui/separator';
import DarkModeToggle from '@/components/constant/DarkModeButton';
import FullScreenButton from '@/components/constant/FullScreen';
import { TiThMenuOutline } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { toast } from "sonner"
import { formatPublicKey, getProvider } from '@/utils/walletProvider';
import { useProviderStore } from '@/hooks/general';

export default function Navbar() {
    const { publicKey, privateKey, setPrivateKey, setPublicKey, setProvider, provider, mobileMenuOpen, setMobileMenuOpen } = useProviderStore()
    


    const toggleOpen = () => {
        if (mobileMenuOpen) {
            setMobileMenuOpen(false)
        } else {
            setMobileMenuOpen(true)
        }
    }

    

    const connectWallet = async () => {
        if (provider && provider.isConnected) {
            toast.info("Connected", {
                description: 'You are already connected',
                action: {
                    label: "Disconnect",
                    onClick: async () => {
                        await disconnect()
                        return
                    }
                }
            })
            return
        }

        const phantomProvider = getProvider();

        if (!phantomProvider) {
            toast.info("Phantom Wallet Missing", {
                description: 'You need to have a phantom wallet installed',
                action: {
                    label: "Download",
                    onClick: () => { window.open('https://phantom.app/', '_blank') },
                }
            })
        } else {
            setProvider(phantomProvider)
            try {
                const resp = await phantomProvider.connect();
                setPublicKey(resp.publicKey.toString());
            } catch (error: any) {
                toast.error("Error connecting to Phantom Wallet:", { description: error.message.toString() });
            }
        }
    }

    React.useEffect(() => {
        if (!provider) {
            connectWallet();
        }
    }, [provider])

    const disconnect = async () => {
        setPublicKey(null);
        setProvider(null);
        provider.disconnect()
    }


    return (
        <div className="z-50 items-center space-x-1 lg:space-x-4 flex relative">
            <button type="button" onClick={connectWallet} className="hidden lg:flex px-5 py-1.5 uppercase font-aorta text-base border border-dark text-dark hover:border-lightTextColored hover:bg-lightTextColored hover:text-light rounded-lg dark:border-light dark:text-light dark:hover:border-darkTextColored dark:hover:bg-darkTextColored dark:hover:text-dark ease-in-out transition-all duration-500 items-center space-x-2">
                <IoWallet className="w-6 h-6" />
                <span className="text-nowrap">
                    {
                        !publicKey ?
                            "Connect Wallet" :
                            formatPublicKey(publicKey)
                    }
                </span>
            </button>
            <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
            <div className="flex items-center space-x-2">
                <DarkModeToggle />
                <FullScreenButton />
            </div>
            <Separator className="h-8 lg:hidden bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
            <button onClick={toggleOpen} className="lg:hidden p-2.5 text-base"><TiThMenuOutline className="w-6 h-6" /></button>
        </div>
    )
}
