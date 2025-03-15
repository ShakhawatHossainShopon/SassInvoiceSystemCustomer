"use client";
import React from "react";
import Logo from "@/assets/logo2.PNG";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

const navItems = [
  {
    icon: <DashboardRoundedIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <LocalPrintshopIcon />,
    name: "Add Invoice",
    path: "/dashboard/addInvoice",
  },
  {
    icon: <ManageHistoryIcon />,
    name: "All Invoices",
    path: "/dashboard/allInvoice",
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path) => path === pathname;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        } 
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src={Logo}
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src={Logo}
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image src={Logo} alt="logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                Menu
              </h2>
              {/* Loop through navItems to render each item */}
              <ul className="flex flex-col gap-4 overflow-x-hidden">
                {navItems.map((nav, index) => (
                  <li key={index}>
                    <Link
                      href={nav.path}
                      className={`${
                        isActive(nav.path)
                          ? "bg-blue-500 text-white hover:bg-blue-500"
                          : "text-gray-600"
                      } menu-item group flex items-center p-2 rounded-lg hover:text-gray-700 hover:bg-gray-200`}
                    >
                      <span
                        className={`${
                          isActive(nav.path) ? "" : ""
                        } flex items-center mr-3 text-xl`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="font-semibold tracking-wider">
                          {nav.name}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
