'use client'
import useRoutes from "@/app/hooks/useRoutes";
import Image from "next/image";
import Link from "next/link";
import DashboardItem from "./DashboardItem";
import Searchbar from "./Searchbar";

const Sidebar = () => {


    const routes = useRoutes();

    return (
        <aside className="fixed z-10 top-0 flex flex-col justify-between h-screen  bg-gray-800 transition duration-300 xl:w-64 w-60">
            <Link href={"/"} className="flex justify-center mt-6 mb-14">
                <picture className="flex flex-row items-center gap-4">
                    <p className="md:text-3xl text-lg font-extrabold text-white">
                        Vi Notes
                    </p>
                </picture>
            </Link>
            <div className="px-3 mb-5 flex w-full">
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
