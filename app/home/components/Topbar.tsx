'use client';
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import DropdownProfile from "./DropdownProfile";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface TopbarProps {
    showNav: boolean;
    setShowNav: (showNav: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ showNav, setShowNav }) => {

    return (
        <div
            className={`bg-transparent fixed w-full h-24 flex justify-between gap-2 items-center transition-all duration-300 ${showNav ? "pl-56" : ""}`}
        >
            <div className="lg:pl-12 pl-5 flex flex-row items-center gap-3"

            >
                <div className="bg-black/50 text-white rounded-full p-1"
                    onClick={() => {
                        setShowNav(false)
                    }}>
                    <IoIosArrowBack size={34} />
                </div>
                <div className="bg-black/50 text-white rounded-full p-1"
                    onClick={() => { setShowNav(true) }}
                >
                    <IoIosArrowForward size={34} />
                </div>
            </div>


            <div className="flex items-center lg:pr-16 pr-4">
                <DropdownProfile />
                {/* <div className="relative inline-block text-left">
                    <div className="relative p-3">
                        <AiFillBell className="text-[#B0C3CC]" size={30} />
                        <BsDot className="absolute top-0 right-1 text-red-600" size={35} />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Topbar;
