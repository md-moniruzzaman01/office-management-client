// import "./SideBar.css";

import { Sidebar, SidebarTrigger } from "../../../components/ui/sidebar";
import AllRoutes from "./partials/All Routes/AllRoutes";
import SidebarFooterMain from "./partials/Footer/SidebarFooter";

const SideBar = () => {
  return (
    <Sidebar variant="sidebar" className="shadow-lg" collapsible="icon">
      <SidebarTrigger />
      <AllRoutes />
      <SidebarFooterMain />
    </Sidebar>
  );
};

export default SideBar;
