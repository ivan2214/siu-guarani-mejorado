import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SonnerProvider } from "@/components/sonner-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Academic Management System",
	description: "A modern academic management system",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					geistSans.variable,
					geistMono.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<div className="relative flex min-h-screen w-full flex-col">
							<Navbar />
							<div className="flex w-full flex-1">
								<AppSidebar />
								<main className="w-full flex-1 p-4 md:p-6">{children}</main>
							</div>
						</div>
						<SonnerProvider />
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
