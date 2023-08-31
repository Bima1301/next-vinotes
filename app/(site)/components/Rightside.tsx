'use client'
import React from 'react'
import Authform from './Authform'

export default function Rightside() {
    return (
        <section className='bg-white w-full flex flex-col justify-center px-24'>
            <p className='text-3xl font-extrabold'>Hey, hello👋</p>
            <p className='mt-3 text-gray-500'>Enter your information to get started </p>
            <Authform />
        </section>
    )
}
