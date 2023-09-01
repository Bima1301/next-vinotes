'use client'
import useRoutes from "@/app/hooks/useRoutes";
import Image from "next/image";
import Link from "next/link";
import DashboardItem from "../atoms/DashboardItem";
import Searchbar from "./Searchbar";
import { LiaTimesCircleSolid } from "react-icons/lia";

type SidebarProps = {
    setShowNav: (showNav: boolean) => void;
}
const Sidebar = ({ setShowNav }: SidebarProps) => {

    const routes = useRoutes();

    return (
        <aside className="fixed z-40 top-0 flex flex-col justify-between h-screen  bg-purple-500 transition duration-300 xl:w-64 w-60">
            <div className="w-full md:hidden flex p-2 justify-end text-white absolute">
                <button onClick={() => {
                    setShowNav(false)
                }}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <Link href={"/"} className="flex justify-center py-8 bg-purple-600 mb-8">
                <picture className="flex flex-row items-center gap-4">
                    <p className="md:text-2xl text-lg font-extrabold text-white">
                        Vi Notes
                    </p>
                </picture>
            </Link>
            <div className="px-4 mb-5 flex w-full">
                <Searchbar className="w-full" placeholder="Mencari fitur" />
            </div>
            <div className="flex flex-col h-full  justify-between ">
                <div className="flex flex-col">
                    {routes[0]?.top?.map((item) => (
                        <DashboardItem
                            key={item.mainLabel}
                            mainLabel={item.mainLabel}
                            items={item.items}
                        />
                    ))}
                </div>
                <div className="flex flex-col mb-5">
                    {routes[1]?.bottom?.map((item) => (
                        <DashboardItem
                            key={item.mainLabel}
                            mainLabel={item.mainLabel}
                            items={item.items}
                        />
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
