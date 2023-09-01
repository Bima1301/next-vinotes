"use client"
import React from 'react'
import { Dropdown, MenuProps, Space } from 'antd';
import { IoIosArrowDown } from 'react-icons/io'
import Image from 'next/image';
import imgProfile from '@/public/profile.jpg'
import { signOut } from 'next-auth/react';

const items: MenuProps['items'] = [
    {
        label: <button onClick={() => signOut()}>Log Out</button>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];
type DropdownProfileProps = {
    name?: string
}
export default function DropdownProfile({ name }: DropdownProfileProps) {
    return (
        <div className='absolute right-5 top-5 bg-slate-700 text-white px-2 py-2 rounded-full'>
            <Dropdown menu={{ items }} trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()} className='cursor-pointer flex flex-row items-center gap-3'>
                    <Image
                        priority
                        src={imgProfile}
                        alt='profile'
                        className='w-8 h-8 rounded-full'
                    />
                    <Space>
                        <p className=''>
                            Hello, {" "}
                            {
                                name?.substring(0, 11) + (name ? (name.length > 11 ? '...' : '') : "")
                            }
                        </p>
                        <IoIosArrowDown />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}
