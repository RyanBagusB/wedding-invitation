"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggle = () => setIsMinimized((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isMinimized, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
