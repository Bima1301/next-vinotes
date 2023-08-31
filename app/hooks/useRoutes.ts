import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { useMemo } from "react";
import { BsBuildingsFill, BsFillDoorOpenFill, BsFillFilePersonFill, BsFillGearFill } from "react-icons/bs";
import { RiUserLocationFill } from "react-icons/ri";
import { signOut } from "next-auth/react";

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
                            active: isActive("/dashboard/home"),
                            href: "/dashboard/home",
                            icon: HiHome,
                        }
                    ],
                },
                {
                    mainLabel: "Kelola Karyawan",
                    items: [
                        {
                            label: "Divisi",
                            active: isActive("/dashboard/division"),
                            href: "/dashboard/division",
                            icon: BsBuildingsFill,
                        },
                        {
                            label: "Karyawan",
                            active: isActive("/dashboard/employee"),
                            href: "/dashboard/employee",
                            icon: BsFillFilePersonFill,
                        },
                        {
                            label: "Lokasi Kehadiran",
                            active: isActive("/dashboard/attendance-location"),
                            href: "/dashboard/attendance-location",
                            icon: RiUserLocationFill,
                        }
                    ]
                }
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
