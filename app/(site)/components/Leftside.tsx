'use client'
import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

export default function Leftside() {
    return (
        <section className='relative min-w-[50%] overflow-hidden xl:p-32 md:p-24 md:flex hidden justify-center items-center'>
            <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[16rem] sm:w-[98.75rem] dark:bg-[#946263]"></div>
            <div className="bg-[#dbd7fb] absolute bottom-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[16rem] sm:w-[98.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
            <div className='backdrop-blur-sm bg-white/30 p-16 border border-gray-300 z-40'>
                <div className='xl:text-5xl font-bold xl:leading-relaxed text-white md:text-4xl md:leading-relaxed'>
                    <div className='w-fit flex flex-row items-center '>
                        <BiSolidRightArrow />
                        <p>Digital</p>
                    </div>
                    <p>platform for <span className='text-black'>easier notes</span></p>
                </div>
                <p className='text-white max-w-[200px] mt-5'>
                    You can easily create, edit and delete notes.
                </p>
            </div>
        </section>
    )
}
