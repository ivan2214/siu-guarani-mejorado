"use client";

import type React from "react";

import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function RegisterPage() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [role, setRole] = useState("student");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast("Registro exitoso", {
				description:
					"Se ha enviado un correo de confirmación a tu dirección de email",
			});
			router.push("/login");
		}, 1500);
	};

	return (
		<div className="flex items-center justify-center py-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="mb-2 flex justify-center">
						<div className="rounded-full bg-primary/10 p-2">
							<GraduationCap className="h-6 w-6 text-primary" />
						</div>
					</div>
					<CardTitle className="text-center text-2xl">Crear Cuenta</CardTitle>
					<CardDescription className="text-center">
						Ingresa tus datos para registrarte en el sistema
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">Nombre</Label>
								<Input id="firstName" placeholder="Juan" required />
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Apellido</Label>
								<Input id="lastName" placeholder="Pérez" required />
							</div>
						</div>

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
							<Label htmlFor="documentNumber">Número de documento</Label>
							<Input id="documentNumber" placeholder="12345678" required />
						</div>

						<div className="space-y-2">
							<Label>Tipo de usuario</Label>
							<RadioGroup
								defaultValue="student"
								onValueChange={setRole}
								className="flex space-x-4"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="student" id="student" />
									<Label htmlFor="student" className="cursor-pointer">
										Estudiante
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="teacher" id="teacher" />
									<Label htmlFor="teacher" className="cursor-pointer">
										Docente
									</Label>
								</div>
							</RadioGroup>
						</div>

						{role === "student" && (
							<div className="space-y-2">
								<Label htmlFor="career">Carrera</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona una carrera" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="systems">
											Ingeniería en Sistemas
										</SelectItem>
										<SelectItem value="civil">Ingeniería Civil</SelectItem>
										<SelectItem value="industrial">
											Ingeniería Industrial
										</SelectItem>
										<SelectItem value="medicine">Medicina</SelectItem>
										<SelectItem value="law">Derecho</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="password">Contraseña</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									required
									autoComplete="new-password"
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
									Registrando...
								</>
							) : (
								"Registrarse"
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="text-center text-sm">
						¿Ya tienes una cuenta?{" "}
						<Link href="/login" className="text-primary hover:underline">
							Iniciar sesión
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
