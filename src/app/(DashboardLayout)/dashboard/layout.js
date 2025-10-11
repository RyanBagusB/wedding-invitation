import { cookies } from "next/headers";
import { SidebarProvider } from "../layout/context/SidebarProvider";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  return (
    <SidebarProvider>
      <div className="flex flex-col sm:flex-row font-sans bg-violet-50 dark:bg-neutral-950">
        <Sidebar role={role} />

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
