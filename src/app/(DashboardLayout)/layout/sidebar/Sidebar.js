"use client";

import { useSidebar } from "../context/SidebarProvider";
import { sidebarConfig } from "./sidebarConfig";

import SidebarOverlay from "./SidebarOverlay";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const { toggle, isMinimized } = useSidebar();
  const { width, logo, items, classes } = sidebarConfig;
  const LogoIcon = logo.icon;

  return (
    <>
      <SidebarOverlay isMinimized={isMinimized} toggle={toggle} />
      <aside
        className={`
          fixed sm:static inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-neutral-900
          transition-all duration-300 ease-in-out sm:px-2 overflow-x-hidden
          ${isMinimized ? width.minimized : width.expanded}
          ${isMinimized ? "-translate-x-full sm:translate-x-0" : "translate-x-0"}
        `}
        role="navigation"
        aria-label="Main sidebar"
      >
        <SidebarHeader
          isMinimized={isMinimized}
          toggle={toggle}
          LogoIcon={LogoIcon}
          logo={logo}
          classes={classes}
        />
        <SidebarNav
          items={items}
          isMinimized={isMinimized}
          classes={classes}
        />
      </aside>
    </>
  );
}
