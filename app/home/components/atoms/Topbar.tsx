'use client'

import Input from '@/components/atoms/Input'
import { cn } from '@/lib/utils'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { LiaTimesSolid } from 'react-icons/lia'
import CreateModal from '../molecules/CreateModal'

export default function Topbar() {
    const [showModal, setShowModal] = useState(false)

    const nav = ['All', 'Project', 'Bussines', 'Personal']
    const [active, setActive] = useState('All' as string)
    return (
        <section className=' flex lg:flex-row flex-col-reverse md:gap-0 gap-4 justify-between items-center my-8 md:text-xl text-sm rounded-md  lg:h-[4rem]'>
            <div className='flex flex-row items-center gap-4'>
                {
                    nav.map((item, index) => (
                        <p key={index}
                            onClick={() => setActive(item)}
                            className={cn('cursor-pointer font-semibold duration-200',
                                item === active ? 'px-6 rounded-md py-2 text-white bg-purple-500' : 'text-gray-500 hover:text-black'
                            )}>{item}</p>
                    ))
                }
            </div>
            <div className='md:flex flex-row items-center font-semibold text-purple-500 hidden md:gap-3 gap-0 cursor-pointer' onClick={() => setShowModal(true)}>
                <AiOutlinePlusCircle size={30} />
                <p>Add new note</p>
            </div>
            <CreateModal
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <button className='bg-purple-500 border border-white p-2 fixed bottom-0 right-0 text-white rounded-full m-4 md:hidden block cursor-pointer' onClick={() => setShowModal(true)}>
                <AiOutlinePlusCircle size={30} />
            </button>
        </section>
    )
}
