"use client";

import type React from "react";

import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const role = searchParams.get("role") || "student";

	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast("Inicio de sesión exitoso", {
				description: "Bienvenido al sistema académico",
			});
			router.push("/dashboard");
		}, 1500);
	};

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="mb-2 flex justify-center">
						<div className="rounded-full bg-primary/10 p-2">
							<GraduationCap className="h-6 w-6 text-primary" />
						</div>
					</div>
					<CardTitle className="text-center text-2xl">Iniciar Sesión</CardTitle>
					<CardDescription className="text-center">
						Ingresa tus credenciales para acceder al sistema
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Correo electrónico</Label>
							<Input
								id="email"
								type="email"
								placeholder="usuario@ejemplo.com"
								required
								autoComplete="email"
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Contraseña</Label>
								<Link
									href="/forgot-password"
									className="text-primary text-sm hover:underline"
								>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									required
									autoComplete="current-password"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute top-0 right-0 h-full px-3"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									) : (
										<Eye className="h-4 w-4 text-muted-foreground" />
									)}
									<span className="sr-only">
										{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
									</span>
								</Button>
							</div>
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Iniciando sesión...
								</>
							) : (
								"Iniciar Sesión"
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="text-center text-sm">
						¿No tienes una cuenta?{" "}
						<Link href="/register" className="text-primary hover:underline">
							Regístrate
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
