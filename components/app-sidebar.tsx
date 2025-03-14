"use client";

import {
	BookOpen,
	Calendar,
	ClipboardList,
	FileText,
	GraduationCap,
	LayoutDashboard,
	LogOut,
	MessageSquare,
	Settings,
	User,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

export function AppSidebar() {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path;
	};

	const handleLogout = () => {
		toast("Cerrando sesión", {
			description: "Has cerrado sesión correctamente",
		});
		// In a real app, we would handle the logout logic here
	};

	// Define menu items based on user role
	// This would typically come from an auth context
	const userRole = "student"; // Could be "student", "teacher", or "admin"

	const studentMenuItems = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
		{
			icon: BookOpen,
			label: "Inscripción a Materias",
			path: "/enrollment/courses",
		},
		{
			icon: ClipboardList,
			label: "Inscripción a Exámenes",
			path: "/enrollment/exams",
		},
		{ icon: FileText, label: "Historial Académico", path: "/academic-history" },
		{ icon: GraduationCap, label: "Plan de Estudios", path: "/curriculum" },
		{ icon: Calendar, label: "Calendario", path: "/calendar" },
		{ icon: MessageSquare, label: "Mensajes", path: "/messages" },
	];

	const teacherMenuItems = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
		{ icon: Users, label: "Mis Cursos", path: "/my-courses" },
		{ icon: ClipboardList, label: "Carga de Notas", path: "/grades" },
		{ icon: FileText, label: "Asistencia", path: "/attendance" },
		{ icon: Calendar, label: "Calendario", path: "/calendar" },
		{ icon: MessageSquare, label: "Mensajes", path: "/messages" },
	];

	const adminMenuItems = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
		{
			icon: GraduationCap,
			label: "Gestión de Carreras",
			path: "/manage/careers",
		},
		{ icon: BookOpen, label: "Gestión de Materias", path: "/manage/courses" },
		{ icon: Users, label: "Gestión de Usuarios", path: "/manage/users" },
		{ icon: Calendar, label: "Horarios y Cupos", path: "/manage/schedules" },
		{ icon: FileText, label: "Certificados", path: "/certificates" },
		{ icon: MessageSquare, label: "Comunicaciones", path: "/communications" },
	];

	// Select menu items based on user role
	const menuItems =
		userRole === "student"
			? studentMenuItems
			: userRole === "teacher"
				? teacherMenuItems
				: adminMenuItems;

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-2 px-2">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src="/placeholder.svg?height=32&width=32"
							alt="Avatar"
						/>
						<AvatarFallback>US</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="font-medium text-sm">Usuario Estudiante</span>
						<span className="text-muted-foreground text-xs">
							Ingeniería en Sistemas
						</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.path}>
									<SidebarMenuButton
										asChild
										isActive={isActive(item.path)}
										tooltip={item.label}
									>
										<Link href={item.path}>
											<item.icon className="h-4 w-4" />
											<span>{item.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Configuración</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={isActive("/profile")}
									tooltip="Perfil"
								>
									<Link href="/profile">
										<User className="h-4 w-4" />
										<span>Perfil</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={isActive("/settings")}
									tooltip="Configuración"
								>
									<Link href="/settings">
										<Settings className="h-4 w-4" />
										<span>Configuración</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button
					variant="ghost"
					className="w-full justify-start"
					onClick={handleLogout}
				>
					<LogOut className="mr-2 h-4 w-4" />
					Cerrar Sesión
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
