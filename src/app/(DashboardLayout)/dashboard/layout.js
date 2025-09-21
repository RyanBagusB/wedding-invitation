import { SidebarProvider } from "../layout/context/SidebarProvider";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col sm:flex-row font-sans bg-violet-50 dark:bg-neutral-950">
        <Sidebar />

        <div className="h-screen flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
