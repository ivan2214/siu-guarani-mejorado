"use client";

import type React from "react";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function Navbar() {
	const { setTheme } = useTheme();
	const [notificationCount, setNotificationCount] = useState(3);

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center px-4 sm:px-6">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-0">
						<AppSidebar />
					</SheetContent>
				</Sheet>

				<SidebarTrigger className="hidden md:flex" />

				<Link href="/" className="ml-4 flex items-center space-x-2">
					<GraduationCap className="h-6 w-6" />
					<span className="hidden font-bold sm:inline-block">
						Sistema Académico
					</span>
				</Link>

				<div className="flex-1 px-2 md:px-6">
					<div className="relative mx-auto max-w-sm md:mx-0 md:max-w-md">
						<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Buscar..."
							className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
						/>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								{notificationCount > 0 && (
									<Badge
										variant="destructive"
										className="-right-1 -top-1 absolute flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
									>
										{notificationCount}
									</Badge>
								)}
								<span className="sr-only">Notificaciones</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<span>Inscripción a examen confirmada</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Nota publicada: Matemática I</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Recordatorio: Examen en 2 días</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
								<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Cambiar tema</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								<Sun className="mr-2 h-4 w-4" />
								<span>Claro</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								<Moon className="mr-2 h-4 w-4" />
								<span>Oscuro</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								<span>Sistema</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}

function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 10v6M2 10l10-5 10 5-10 5z" />
			<path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
		</svg>
	);
}
