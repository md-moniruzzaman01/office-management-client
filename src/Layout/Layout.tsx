import { Outlet } from "react-router-dom";

import { LayoutProps } from "./config/types";

import { SidebarProvider } from "../components/ui/sidebar";
import Navbar from "../common/widgets/Navbar/Navbar";
import SideBar from "../common/widgets/Sidebar/SideBar";

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground animate-in fade-in duration-500">
      <SidebarProvider>
        <SideBar />
      </SidebarProvider>
      <main className="flex-1 w-full overflow-x-hidden flex flex-col relative">
        <Navbar />
        <div className="flex-1 px-4 pb-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
