'use client'
import React from 'react'
import Authform from './Authform'

export default function Rightside() {
    return (
        <section className='bg-white w-full flex flex-col justify-center md:px-24 px-16 md:max-w-[50%]'>
            <p className='md:text-3xl text-2xl font-extrabold'><span className='font-normal'>Wellcome to </span>ViNotes👋</p>
            <p className='md:mt-3 text-gray-500 md:text-base text-sm'>Enter your information to get started </p>
            <Authform />
        </section>
    )
}
