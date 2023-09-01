"use client"

import clsx from 'clsx'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface SearchBarProps {
    className?: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name?: string,
    value?: string,

}

const Searchbar: React.FC<SearchBarProps> = ({ className, name, onChange, placeholder, ...props }: SearchBarProps
) => {
    return (
        <div
            className={clsx('flex flex-row items-center gap-5 py-3 px-4 bg-white border border-[#E5E7EB] rounded-md', className)}
        >
            <AiOutlineSearch className="text-[#6B7280] scale-150" size={20} />
            <input className='focus:outline-none focus:ring-0 w-full' placeholder={placeholder} name={name} onChange={onChange} {...props} />
        </div>
    )
}

export default Searchbar
