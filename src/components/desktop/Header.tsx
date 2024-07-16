/* eslint-disable react/no-unescaped-entities */
"use client"

import React from 'react'
import Logo from '@/components/constant/Logo'
import Navbar from '@/components/desktop/Navbar'
import { useProviderStore } from "@/hooks/general"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { LimitOrderForm } from '@/components/modals/LimitOrderModal'
import { SwapForm } from '@/components/modals/SwapModal'

export default function Header() {
    const [ openLimitOrder, setOpenLimitOrder ] = React.useState(false)
    const [ openSwap, setOpenSwap ] = React.useState(false)

    return (
        <section className="z-50 w-screen py-4 padding-x fixed top-0 left-0 right-0">
            <div className="flex items-center rounded-md bg-lightSecondary dark:bg-darkSecondary text-lightTextGray dark:text-darkTextGray shadow justify-between py-3.5 px-3.5 lg:max-w-6xl mx-auto w-full">
                <div className="flex items-center space-x-6">
                    <Logo />
                    <div className="items-center space-x-3 hidden lg:flex">
                        <Dialog open={openSwap} onOpenChange={setOpenSwap}>
                            <DialogTrigger asChild>
                                <Button className="hover:text-lightTextColored dark:hover:text-darkTextColored ease-in-out transition-all duration-300 uppercase font-aorta text-base  hidden lg:flex" variant={null}>Swap</Button>
                            </DialogTrigger>
                            <DialogContent className="md:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Swap Token</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <SwapForm />
                            </DialogContent>
                        </Dialog>
                        <Dialog open={openLimitOrder} onOpenChange={setOpenLimitOrder}>
                            <DialogTrigger asChild>
                                <Button className="hover:text-lightTextColored dark:hover:text-darkTextColored ease-in-out transition-all duration-300 uppercase font-aorta text-base  hidden lg:flex" variant={null}>Limit Order</Button>
                            </DialogTrigger>
                            <DialogContent className="md:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Limit Order</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <LimitOrderForm />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Navbar />
            </div>
        </section>
    )
}


