"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavDropDown } from "@/components/nav-main";
//import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
//import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
//importar el contexto de auth para obtener el user
import { useAuth } from "@/context/AuthContext";

import SidebarBanner from "./layout/HeadSidebar";
import { NavButton } from "./nav-button";

// This is sample data.
const data = {
  user: {
    userId: "guest-id", // <--- Agrega esto
    name: "Sample Name",
    email: "m@example.com",
    role: "SELLER", // <--- Agrega esto también para cumplir con 'Role'
    avatar:
      "https://i.pinimg.com/736x/01/07/8c/01078c4a824ea92e1bb3e742ccd6f216.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Empleados",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Usuarios",
          url: "/dashboard/users",
        },
        {
          title: "Personal",
          url: "/dashboard/personal",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  buttons: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Home",
      url: "/dashboard/home",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  //user desde el context
  let usera = useAuth().user ?? data.user;
  //el avatar debe venir desde el backend, por ahora lo sobreescribo
  usera.avatar =
    "https://i.pinimg.com/736x/01/07/8c/01078c4a824ea92e1bb3e742ccd6f216.jpg";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarBanner />
      </SidebarHeader>
      <SidebarContent>
        <NavButton projects={data.buttons} />
        <NavDropDown items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={usera ?? data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
