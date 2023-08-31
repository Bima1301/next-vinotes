'use client'

import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import Topbar from './Topbar';
import Transition from './Transition';
import Sidebar from './Sidebar';
import Header from './molecules/Header';

export default function MainLayout(
    { children }: { children: React.ReactNode }
) {
    const [showNav, setShowNav] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    function handleResize() {
        if (innerWidth <= 640) {
            setShowNav(false);
            setIsMobile(true);
        } else {
            setShowNav(true);
            setIsMobile(false);
        }
    }

    useEffect(() => {
        if (typeof window != undefined) {
            addEventListener("resize", handleResize);
        }

        return () => {
            removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <section className='bg-transparent min-h-full'>
            <Toaster />
            <Topbar showNav={showNav} setShowNav={setShowNav} />
            <Transition
                show={showNav}
            >
                <Sidebar />
            </Transition>
            <div
                className={`pt-16 ${showNav && !isMobile ? "pl-56" : ""
                    }`}
            >
                <Header />
                <div className="px-4 md:px-16">
                    <div className="py-12">
                        <main className="bg-transparent overflow-hidden rounded-sm">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </section>
    )
}
