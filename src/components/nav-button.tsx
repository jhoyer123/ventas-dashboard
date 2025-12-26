"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
//traer los permisos
import { permissions } from "@/utils/permission";
//context con el rol del user
import { useAuth } from "@/context/AuthContext";

export function NavButton({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
    permissions: string;
  }[];
}) {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(
          (item) =>
            //verificar si el rol del user tiene permiso para ver el boton
            permissions[role || ""]?.includes(item.permissions) && (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
