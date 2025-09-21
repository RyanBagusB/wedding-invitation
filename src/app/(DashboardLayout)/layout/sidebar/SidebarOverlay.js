"use client";

export default function SidebarOverlay({ isMinimized, toggle }) {
  return (
    <div
      role="presentation"
      aria-hidden={isMinimized ? "true" : "false"}
      aria-label="Sidebar overlay"
      tabIndex={-1}
      className={`fixed inset-0 z-40 bg-black/25 transition-opacity duration-300 sm:hidden
        ${isMinimized ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      onClick={toggle}
    />
  );
}
