"use client";

import {
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Users,
} from "lucide-react";

import {} from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import type { NavMainItem } from "@/types";
import { usePathname } from "next/navigation";
import { CarrearSwitcher } from "./carrear-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Define menu items based on user role
  // This would typically come from an auth context
  const userRole: "student" | "teacher" | "admin" = "student"; // Could be "student", "teacher", or "admin"

  const studentMenuItems: NavMainItem[] = [
    { icon: LayoutDashboard, title: "Dashboard", url: "/dashboard/student" },
    {
      icon: BookOpen,
      title: "Inscripción a Materias",
      url: "/dashboard/student/enrollment/courses",
    },
    {
      icon: ClipboardList,
      title: "Inscripción a Exámenes",
      url: "/dashboard/student/enrollment/exams",
    },
    {
      icon: FileText,
      title: "Historial Académico",
      url: "/dashboard/student/academic-history",
    },
    {
      icon: GraduationCap,
      title: "Plan de Estudios",
      url: "/dashboard/student/curriculum",
    },
    {
      icon: Calendar,
      title: "Calendario",
      url: "/dashboard/student/calendar",
    },
    {
      icon: MessageSquare,
      title: "Mensajes",
      url: "/dashboard/student/messages",
    },
  ];

  const teacherMenuItems: NavMainItem[] = [
    { icon: LayoutDashboard, title: "Dashboard", url: "/dashboard/teacher" },
    { icon: Users, title: "Mis Cursos", url: "/dashboard/teacher/my-courses" },
    {
      icon: ClipboardList,
      title: "Carga de Notas",
      url: "/dashboard/teacher/grades",
    },
    {
      icon: FileText,
      title: "Asistencia",
      url: "/dashboard/teacher/attendance",
    },
    {
      icon: Calendar,
      title: "Calendario",
      url: "/dashboard/teacher/calendar",
    },
    {
      icon: MessageSquare,
      title: "Mensajes",
      url: "/dashboard/teacher/messages",
    },
  ];

  const adminMenuItems: NavMainItem[] = [
    { icon: LayoutDashboard, title: "Dashboard", url: "/dashboard/admin" },
    {
      icon: GraduationCap,
      title: "Gestión de Carreras",
      url: "/dashboard/admin/careers",
    },
    {
      icon: BookOpen,
      title: "Gestión de Materias",
      url: "/dashboard/admin/courses",
    },
    {
      icon: Users,
      title: "Gestión de Usuarios",
      url: "/dashboard/admin/users",
    },
    {
      icon: Calendar,
      title: "Horarios y Cupos",
      url: "/dashboard/admin/schedules",
    },
    {
      icon: FileText,
      title: "Certificados",
      url: "/dashboard/admin/certificates",
    },
    {
      icon: MessageSquare,
      title: "Comunicaciones",
      url: "/dashboard/admin/communications",
    },
  ];

  // Select menu items based on user role
  const menuItems: NavMainItem[] =
    userRole === "student"
      ? studentMenuItems
      : userRole === "teacher"
      ? teacherMenuItems
      : adminMenuItems;

  const navMain: NavMainItem[] = menuItems.map((item) => ({
    ...item,
    isActive: isActive(item.url),
  }));

  const carrears = [
    "Programador Universitario",
    "Analista de Sistemas",
    "Ingeniería en Sistemas",
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="transition-all duration-200 ease-in-out group-data-[state=collapsed]:mx-auto group-data-[state=expanded]:ml-auto" />

        <CarrearSwitcher carrears={carrears} defaultCarrear={carrears[0]} />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: "/placeholder.svg?height=32&width=32",
            email: "",
            name: "Usuario Estudiante",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
