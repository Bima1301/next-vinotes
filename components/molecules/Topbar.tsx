'use client';

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import useIsMobile from "@/app/hooks/useIsMobile";
import DropdownProfile from "../atoms/DropdownProfile";

interface TopbarProps {
    showNav: boolean;
    setShowNav: (showNav: boolean) => void;
    name?: string;
}

const Topbar: React.FC<TopbarProps> = ({ showNav, setShowNav, name }) => {
    const isMobile = useIsMobile();                 
    return (
        <div
            className={`bg-white fixed w-full h-24 flex justify-between gap-2 items-center transition-all duration-300 shadow-lg ${showNav ? "pl-56" : ""}`}
        >
            <div className={`lg:pl-12 pl-5 flex flex-row items-center gap-3 ${isMobile && showNav ? "hidden" : ""}`}

            >
                <div className={`bg-black/50 text-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200 ${isMobile ? "hidden" : ""}`}
                    onClick={() => {
                        setShowNav(false)
                    }}>
                    <IoIosArrowBack size={34} />
                </div>
                <div className="bg-black/50 text-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200"
                    onClick={() => { setShowNav(true) }}
                >
                    <IoIosArrowForward size={34} />
                </div>
            </div>


            <div className="flex items-center lg:pr-16 pr-4">
                <DropdownProfile name={name} />
            </div>
        </div>
    );
};

export default Topbar;
