import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SiStorybook } from "react-icons/si";

export default function Logo() {
    return (
        <Link href={"/"} className="relative flex items-center ">
            <SiStorybook className="w-6 h-6" /> <span className="font-bold">Sledge</span>
        </Link>
    )
}
