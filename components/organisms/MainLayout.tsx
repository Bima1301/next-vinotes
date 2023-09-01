'use client'

import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import Transition from '../atoms/Transition';
import Sidebar from '../molecules/Sidebar';
import Topbar from '../molecules/Topbar';
import useIsMobile from '@/app/hooks/useIsMobile';

type MainLayoutProps = {
    children: React.ReactNode
    currentUser: any | null
}

export default function MainLayout(
    {
        children,
        currentUser
    }: MainLayoutProps
) {
    const [showNav, setShowNav] = useState(true);
    const { name, email, picture } = currentUser || {};


    const isMobile = useIsMobile();
    useEffect(() => {
        if (isMobile) {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
    }, [isMobile]);

    return (
        <section className='bg-slate-200 min-h-screen'>
            <Toaster />
            <Topbar showNav={showNav} setShowNav={setShowNav} name={name} />
            <Transition
                show={showNav}
            >
                <Sidebar setShowNav={setShowNav} />
            </Transition>
            <div
                className={`pt-24 ${showNav && !isMobile ? "pl-64" : ""
                    }`}
            >
                <main className="bg-transparent overflow-hidden rounded-sm">
                    {children}
                </main>
            </div>
        </section>
    )
}
