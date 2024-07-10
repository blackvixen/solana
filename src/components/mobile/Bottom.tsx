"use client";

import { useProviderStore } from '@/hooks/general'
import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { GiReceiveMoney } from "react-icons/gi";
import { SiStorybook } from "react-icons/si";
import { TbPackages } from "react-icons/tb";
import { BsNintendoSwitch } from "react-icons/bs";
import { useOnClickOutside } from 'usehooks-ts'
import { IoWallet } from "react-icons/io5";
import { getProvider } from '@/utils/walletProvider';
import { toast } from "sonner"


export default function Bottom() {
  const { publicKey, privateKey, setPrivateKey, setPublicKey, setProvider, provider, mobileMenuOpen, setMobileMenuOpen } = useProviderStore()
  const ref = React.useRef(null);

  const handleClickOutside = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  useOnClickOutside(ref, handleClickOutside)

  const connectWallet = async () => {
    if (provider && provider.isConnected) {
      toast.info("Connected", {
        description: 'You are already connected',
        action: {
          label: "Disconnect",
          onClick: () => {
            setPublicKey(null);
            setProvider(null);
            provider.disconnect()
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
        const resp = await phantomProvider.connect({ onlyIfTrusted: true });
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

  return (
    <motion.section
      ref={ref}
      initial={{ y: "100%" }} // Start the object off-screen (100% below viewport)
      animate={{ y: mobileMenuOpen ? 0 : "100%" }} // Animate to y position of 0 (top of viewport)
      transition={{ duration: 0.3 }} // Set transition duration to 300ms
      className={`z-50 w-screen fixed bottom-0 left-0 right-0 lg:hidden p-3.5`}>
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-lightSecondary dark:bg-darkSecondary text-lightTextGray dark:text-darkTextGray shadow">
        <Link className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center" href="#Story">
          <SiStorybook className="w-6 h-6" />
          <span className="text-[10px]">About</span>
        </Link>
        <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
        <Link className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center" href="#Features">
          <TbPackages className="w-6 h-6" />
          <span className="text-[10px]">Features</span>
        </Link>
        <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
        <Link className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center" href="#Presale">
          <GiReceiveMoney className="w-6 h-6" />
          <span className="text-[10px]">Snipe</span>
        </Link>
        <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
        <Link className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center" href="#Utility">
          <BsNintendoSwitch className="w-6 h-6" />
          <span className="text-[10px]">Copy Trade</span>
        </Link>
        {
          !publicKey && <button type="button" onClick={connectWallet} className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center">
            <IoWallet className="w-6 h-6" />
            <span className="text-[10px] text-nowrap">Connect</span>
          </button>
        }
      </div>
    </motion.section>
  )
}
