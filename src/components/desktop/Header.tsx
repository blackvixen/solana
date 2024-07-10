import React from 'react'
import Logo from '@/components/constant/Logo'
import Navbar from '@/components/desktop/Navbar'
import Link from 'next/link'

export default function Header() {
    return (
        <section className="z-50 w-screen py-4 padding-x fixed top-0 left-0 right-0">
            <div className="flex items-center rounded-md bg-lightSecondary dark:bg-darkSecondary text-lightTextGray dark:text-darkTextGray shadow justify-between py-3.5 px-3.5 lg:max-w-6xl mx-auto w-full">
                <div className="flex items-center space-x-6">
                    <Logo />
                    <div className="items-center space-x-3 hidden lg:flex">
                        <Link href="#About" className="hover:text-lightTextColored dark:hover:text-darkTextColored ease-in-out transition-all duration-300 uppercase font-aorta text-base  hidden lg:flex">About</Link>
                        <Link href="#Features" className="hover:text-lightTextColored dark:hover:text-darkTextColored ease-in-out transition-all duration-300 uppercase font-aorta text-base  hidden lg:flex">Features</Link>
                        <Link href="#Snipe" className="hover:text-lightTextColored dark:hover:text-darkTextColored ease-in-out transition-all duration-300 uppercase font-aorta text-base  hidden lg:flex">Snipe</Link>
                        <Link href="#CopyTrade" className="hover:text-lightTextColored dark:hover:text-darkTextColored ease-in-out transition-all duration-300 uppercase font-aorta text-base  hidden lg:flex">CopyTrade</Link>
                    </div>
                </div>

                <Navbar />
            </div>
        </section>
    )
}
