import Image from 'next/image'
import React from 'react'
import header from '@/public/header.jpg'

export default function Header() {
    return (
        <section className='-mt-44 fixed -z-20 w-full'>
            <Image
                src={header}
                alt='Notes'
                className='w-full h-96 object-cover'
            />
        </section>
    )
}
