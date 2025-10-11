"use client";

import { usePathname } from "next/navigation";
import { sidebarConfig } from "./sidebarConfig";
import SidebarItem from "./SidebarItem";
import SidebarLogout from "./SidebarLogout";

export default function SidebarNav({ role, isMinimized }) {
  const pathname = usePathname();

  const items =
    role === "SCANNER"
      ? sidebarConfig.items.filter(
          (item) => item.href !== "/dashboard/my-invitations"
        )
      : sidebarConfig.items;

  return (
    <nav
      className="flex-1 flex flex-col justify-between pb-25 sm:pb-10"
      role="navigation"
      aria-label="Main sidebar"
    >
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.title}
            item={item}
            isActive={pathname === item.href}
            isMinimized={isMinimized}
          />
        ))}
      </div>
      <SidebarLogout isMinimized={isMinimized} />
    </nav>
  );
}
