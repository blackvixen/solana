/* eslint-disable react/no-unescaped-entities */
"use client";

import { useProviderStore } from '@/hooks/general'
import React from 'react'
import { motion } from "framer-motion"
import { Separator } from '@/components/ui/separator';
import { GiReceiveMoney } from "react-icons/gi";
import { IoMdSwap } from "react-icons/io";
import { useOnClickOutside } from 'usehooks-ts'
import { IoWallet } from "react-icons/io5";
import { formatPublicKey, getProvider } from '@/utils/walletProvider';
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { LimitOrderForm } from '@/components/modals/LimitOrderModal'
import { SwapForm } from '@/components/modals/SwapModal'


export default function Bottom() {
  const { publicKey, privateKey, setPrivateKey, setPublicKey, setProvider, provider, mobileMenuOpen, setMobileMenuOpen } = useProviderStore()
  const ref = React.useRef(null);
  const [openLimitOrder, setOpenLimitOrder] = React.useState(false)
  const [openSwap, setOpenSwap] = React.useState(false)


  const toggleSwap = () => {
    setOpenSwap(!openSwap);
  }

  const toggleLimitOrder = () => {
    setOpenLimitOrder(!openLimitOrder);
  }

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
  }, [])

  return (
    <motion.section
      ref={ref}
      initial={{ y: "100%" }} // Start the object off-screen (100% below viewport)
      animate={{ y: mobileMenuOpen ? 0 : "100%" }} // Animate to y position of 0 (top of viewport)
      transition={{ duration: 0.3 }} // Set transition duration to 300ms
      className={`z-50 w-screen fixed bottom-0 left-0 right-0 lg:hidden p-3.5`}>
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-lightSecondary dark:bg-darkSecondary text-lightTextGray dark:text-darkTextGray shadow">
        <Drawer open={openSwap} onOpenChange={setOpenSwap}>
          <DrawerTrigger className="lg:hidden" asChild>
            <Button className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center" variant={null}>
              <IoMdSwap className="w-6 h-6" />
              <span className="text-[10px]">Swap</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="lg:hidden">
            <DrawerHeader className="text-left">
              <DrawerTitle>Swap Tokens</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <SwapForm className='px-4' />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
        <button type="button" onClick={connectWallet} className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center">
          <IoWallet className="w-6 h-6" />
          <span className="text-[10px] text-nowrap">
            {
              !publicKey ?
                "Connect Wallet" :
                formatPublicKey(publicKey)
            }
          </span>
        </button>
        <Separator className="h-8 hidden lg:flex bg-lightTextGray dark:bg-darkTextGray" orientation='vertical' />
        <Drawer open={openLimitOrder} onOpenChange={setOpenLimitOrder}>
          <DrawerTrigger className="lg:hidden" asChild>
            <Button className="hover:bg-dark hover:text-light p-2 rounded-lg dark:hover:bg-light dark:hover:text-dark focus:bg-dark focus:text-light dark:focus:bg-light dark:focus:text-dark flex min-w-[55px] h-[55px] flex-col items-center" variant={null}>
              <GiReceiveMoney className="w-6 h-6" />
              <span className="text-[10px]">Limit Order</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="lg:hidden">
            <DrawerHeader className="text-left">
              <DrawerTitle>Limit Order</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <LimitOrderForm className='px-4' />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.section>
  )
}
