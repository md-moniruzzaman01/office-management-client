/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../../../../../components/ui/sidebar";
import { dashboardSidebarLinks } from "../../config/const";
import { ChevronRight } from "lucide-react";

const AllRoutes = () => {
  const location = useLocation();
  const userRole = "super_admin";
  const [openGroups, setOpenGroups] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    dashboardSidebarLinks?.forEach((item: any, index) => {
      if (item?.subLinks) {
        const isActive = item.subLinks?.some(
          (sub: any) => sub.url === location.pathname
        );
        if (isActive) {
          setOpenGroups((prev) => ({ ...prev, [index]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleGroup = (index: number) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground/70 tracking-wider font-semibold text-xs">DIRECTORIES</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {dashboardSidebarLinks.map((item: any, index) => {
              if (!item.access.includes(userRole)) return null;

              if (item.subLinks) {
                return (
                  <Collapsible
                    open={!!openGroups[index]}
                    onOpenChange={() => toggleGroup(index)}
                    key={index}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`flex items-center w-full transition-all duration-200 ${openGroups[index]
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                            }`}
                        >
                          {item.icon && <item.icon />}
                          <span className="flex-grow">{item.mainLabel}</span>
                          <div
                            className={`transition-transform duration-300 ${openGroups[index] ? "rotate-90" : ""
                              }`}
                          >
                            <ChevronRight className="h-4 w-4 opacity-50" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subLinks.map(
                            (subItem: any, subIndex: number) => {
                              if (!subItem.access.includes(userRole))
                                return null;
                              return (
                                <SidebarMenuSubItem key={subIndex}>
                                  <NavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      `block transition-all duration-200 ${isActive
                                        ? "font-medium text-sidebar-primary-foreground bg-sidebar-primary rounded-md"
                                        : "text-muted-foreground hover:text-foreground"
                                      }`
                                    }
                                  >
                                    {({ isActive }) => (
                                      <SidebarMenuButton
                                        className={
                                          isActive
                                            ? "bg-transparent hover:bg-transparent text-sidebar-primary-foreground"
                                            : ""
                                        }
                                      >
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.pageTitle}</span>
                                      </SidebarMenuButton>
                                    )}
                                  </NavLink>
                                </SidebarMenuSubItem>
                              );
                            }
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={index}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `block transition-all duration-200 ${isActive
                        ? "font-medium bg-sidebar-accent text-sidebar-accent-foreground rounded-md shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                      }`
                    }
                  >
                    <SidebarMenuButton className="hover:bg-transparent">
                      {item.icon && <item.icon />}
                      <span>{item.pageTitle}</span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AllRoutes;
