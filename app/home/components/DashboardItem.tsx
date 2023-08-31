"use client"

import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface ItemsProps {
    label: string;
    icon: any;
    active: boolean;
    href: string;
    isButton?: boolean;
    onClick?: () => void;
}

function className({ active }: { active: boolean }) {
    return clsx(`pl-6 py-3 mx-5 rounded-md text-center cursor-pointer mb-3 flex items-center transition-colors md:text-base text-sm`, active
        ? "bg-[#033FFF] bg-opacity-[0.1] text-white" : "text-white hover:bg-[#033FFF] hover:bg-opacity-[0.1] hover:text-[#4A9FF5]")
}
const Items: React.FC<ItemsProps> = ({ label, icon: Icon, active, href, onClick, isButton }) => (
    <>
        {isButton ? (
            <div onClick={onClick}
                className={className({ active })}
            >
                <Icon className="h-5 w-5 shrink-0 mr-2" />
                <div>
                    <p>{label}</p>
                </div>
            </div>
        ) : (
            <Link href={href}
                className={className({ active })}
            >
                <Icon className="h-5 w-5 shrink-0 mr-2 " />
                <div>
                    <p>{label}</p>
                </div>
            </Link>
        )}
    </>
);

interface DashboardItemProps {
    mainLabel: string;
    items: {
        label: string;
        icon: any;
        active: boolean;
        href: string;
        isButton?: boolean;
        onClick?: () => void;
    }[];
}
const DashboardItem: React.FC<DashboardItemProps> = ({ mainLabel, items }) => (
    <div className="mb-4">
        <p className="px-6 mx-5 md:mb-2 mb-0 text-white text-sm text-opacity-[0.5]">
            {mainLabel}
        </p>
        {items.map((item, index) => (
            <Items
                key={index}
                label={item.label}
                icon={item.icon}
                active={item.active}
                href={item.href}
                isButton={item.isButton}
                onClick={item.onClick}
            />
        ))}
    </div>
);

export default DashboardItem;
