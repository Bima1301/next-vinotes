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
export default function DropdownProfile() {
    return (
        <div className='absolute right-5 top-5 bg-black text-white px-2 py-2 rounded-full'>
            <Dropdown menu={{ items }} trigger={['click']}
                className='bg-black'
            >
                <a onClick={(e) => e.preventDefault()} className='cursor-pointer flex flex-row items-center gap-3'>
                    <Image
                        priority
                        src={imgProfile}
                        alt='profile'
                        className='w-6 h-6 rounded-full'
                    />
                    <Space>
                        <p className='text-sm'>
                            {
                                'Yanuar Bima'.substring(0, 11) + ('yanuar bima'.length > 11 ? '...' : '')
                            }
                        </p>
                        <IoIosArrowDown />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}
