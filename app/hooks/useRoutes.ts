import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { PiSquaresFourLight } from "react-icons/pi";
import { useMemo } from "react";
import { BsBuildingsFill, BsFillDoorOpenFill, BsFillFilePersonFill, BsFillGearFill } from "react-icons/bs";
import { RiUserLocationFill } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { BiNotepad, BiTask } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";

const useRoutes = () => {
    const pathName = usePathname();

    const isActive = (menuPath: any) => pathName.startsWith(menuPath);

    const routesConfig = [
        {
            top: [
                {
                    mainLabel: "Menu",
                    items: [
                        {
                            label: "Overview",
                            active: isActive("/home"),
                            href: "/dashboard/home",
                            icon: PiSquaresFourLight,
                        },
                        {
                            label: "Task",
                            active: isActive("/dashboard/project"),
                            href: "/dashboard/project",
                            icon: BiTask,
                        },
                        {
                            label: "Document",
                            active: isActive("/dashboard/project"),
                            href: "/dashboard/project",
                            icon: IoDocumentTextOutline,
                        },
                        {
                            label: "Notes",
                            active: isActive("/dashboard/project"),
                            href: "/dashboard/project",
                            icon: BiNotepad,
                        },
                    ],
                },
                // {
                //     mainLabel: "Category",
                //     items: [
                //         {
                //             label: "Project",
                //             active: isActive("/dashboard/division"),
                //             href: "/dashboard/division",
                //             icon: BsBuildingsFill,
                //         },
                //         {
                //             label: "Busniness",
                //             active: isActive("/dashboard/employee"),
                //             href: "/dashboard/employee",
                //             icon: BsFillFilePersonFill,
                //         },
                //         {
                //             label: "Personal",
                //             active: isActive("/dashboard/attendance-location"),
                //             href: "/dashboard/attendance-location",
                //             icon: RiUserLocationFill,
                //         }
                //     ]
                // }
            ]
        },
        {
            bottom: [
                {
                    mainLabel: "",
                    items: [
                        {
                            label: "Pengaturan",
                            active: isActive("/dashboard/setting"),
                            href: "/dashboard/setting",
                            icon: BsFillGearFill,
                        },
                        {
                            label: "Keluar",
                            active: isActive("/logout"),
                            href: "/logout",
                            icon: BsFillDoorOpenFill,
                            isButton: true,
                            onClick: () => {
                                signOut();
                            }
                        }
                    ]
                }
            ]
        }
    ];

    const routes = useMemo(() => {
        return routesConfig.map((section) => {
            const modifiedSection = { ...section };
            if (modifiedSection.top) {
                modifiedSection.top = modifiedSection.top.map((subSection) => {
                    const modifiedSubSection = { ...subSection };
                    if (modifiedSubSection.items) {
                        modifiedSubSection.items = modifiedSubSection.items.map((item) => {
                            const modifiedItem = { ...item };
                            if (modifiedItem.active === undefined) {
                                modifiedItem.active = isActive(modifiedItem.href.split('?')[0]);
                            }
                            return modifiedItem;
                        });
                    }
                    return modifiedSubSection;
                });
            }
            if (modifiedSection.bottom) {
                modifiedSection.bottom = modifiedSection.bottom.map((subSection) => {
                    const modifiedSubSection = { ...subSection };
                    if (modifiedSubSection.items) {
                        modifiedSubSection.items = modifiedSubSection.items.map((item) => {
                            const modifiedItem = { ...item };
                            if (modifiedItem.active === undefined) {
                                modifiedItem.active = isActive(modifiedItem.href.split('?')[0]);
                            }
                            return modifiedItem;
                        });
                    }
                    return modifiedSubSection;
                });
            }
            return modifiedSection;
        });
    }, [pathName, isActive, routesConfig]);

    return routes;
}

export default useRoutes;
