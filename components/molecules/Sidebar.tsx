'use client'
import useRoutes from "@/app/hooks/useRoutes";
import Link from "next/link";
import DashboardItem from "../atoms/DashboardItem";
import Searchbar from "./Searchbar";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";

type SidebarProps = {
    setShowNav: (showNav: boolean) => void;
    category: {} | null
}
const Sidebar = ({ setShowNav, category }: SidebarProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<Array<{ name: string, color: string }> | null>(null)

    useEffect(() => {
        if (category) {
            const arrCategory = Object.values(category).map((item: any) => { return { name: item.name, color: item.color } })
            setCategoryList(arrCategory)
        }
    }, [category])

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
            <div className="flex flex-col h-full justify-between overflow-y-auto overflow-x-hidden blue-scroll">
                <div className="flex flex-col">
                    {routes[0]?.top?.map((item) => (
                        <DashboardItem
                            key={item.mainLabel}
                            mainLabel={item.mainLabel}
                            items={item.items}
                        />
                    ))}
                    <div className="flex flex-col border-y border-y-slate-600/50 mx-10 py-7 gap-3">
                        <div className="flex flex-col min-h-[] max-h-[14rem] overflow-y-auto overflow-x-hidden blue-scroll">
                            {categoryList?.map((item, index) => (
                                <p key={index} className='py-3 rounded-md text-center cursor-pointer  flex items-center gap-3  md:text-base text-sm text-white hover:translate-x-2 duration-500 hover:text-indigo-300'>
                                    <GoDotFill size={20} style={{ color: item.color }} />
                                    {item.name} </p>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className='py-3 rounded-md text-center cursor-pointer  flex items-center gap-3  md:text-base text-sm text-white hover:scale-105 duration-500 hover:text-indigo-300'>
                            <AiOutlinePlus size={20} />
                            Add new </button>
                    </div>
                    <CreateCategoryModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
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
