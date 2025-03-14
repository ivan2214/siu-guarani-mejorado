"use client";

import {
	Camera,
	Edit,
	GraduationCap,
	Mail,
	MapPin,
	Phone,
	Save,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveProfile = () => {
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			setIsEditing(false);
			toast.success("Perfil actualizado correctamente");
		}, 1000);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Mi Perfil</h1>
					<p className="text-muted-foreground">
						Administra tu información personal y académica.
					</p>
				</div>
				<Button
					variant={isEditing ? "default" : "outline"}
					onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
					disabled={isLoading}
				>
					{isEditing ? (
						<>
							<Save className="mr-2 h-4 w-4" />
							{isLoading ? "Guardando..." : "Guardar cambios"}
						</>
					) : (
						<>
							<Edit className="mr-2 h-4 w-4" />
							Editar perfil
						</>
					)}
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card className="md:col-span-1">
					<CardHeader>
						<CardTitle>Información personal</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center text-center">
						<div className="relative mb-4">
							<Avatar className="h-32 w-32">
								<AvatarImage
									src="/placeholder.svg?height=128&width=128"
									alt="Avatar"
								/>
								<AvatarFallback className="text-4xl">US</AvatarFallback>
							</Avatar>
							{isEditing && (
								<Button
									size="icon"
									variant="secondary"
									className="absolute right-0 bottom-0 h-8 w-8 rounded-full"
								>
									<Camera className="h-4 w-4" />
									<span className="sr-only">Cambiar foto</span>
								</Button>
							)}
						</div>
						<h3 className="font-bold text-xl">Usuario Estudiante</h3>
						<p className="text-muted-foreground text-sm">Legajo: 12345</p>

						<div className="mt-6 w-full space-y-4">
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>usuario@ejemplo.com</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>+54 11 1234-5678</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span>Buenos Aires, Argentina</span>
							</div>
							<div className="flex items-center gap-2">
								<GraduationCap className="h-4 w-4 text-muted-foreground" />
								<span>Ingeniería en Sistemas</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6 md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Datos personales</CardTitle>
							<CardDescription>Información básica de tu perfil</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="firstName">Nombre</Label>
									<Input
										id="firstName"
										defaultValue="Usuario"
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Apellido</Label>
									<Input
										id="lastName"
										defaultValue="Estudiante"
										disabled={!isEditing}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="documentType">Tipo de documento</Label>
									<Input
										id="documentType"
										defaultValue="DNI"
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="documentNumber">Número de documento</Label>
									<Input
										id="documentNumber"
										defaultValue="12345678"
										disabled={!isEditing}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="birthDate">Fecha de nacimiento</Label>
									<Input
										id="birthDate"
										type="date"
										defaultValue="1995-05-15"
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="gender">Género</Label>
									<Input
										id="gender"
										defaultValue="Masculino"
										disabled={!isEditing}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Información de contacto</CardTitle>
							<CardDescription>Datos para comunicarnos contigo</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="email">Correo electrónico</Label>
									<Input
										id="email"
										type="email"
										defaultValue="usuario@ejemplo.com"
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Teléfono</Label>
									<Input
										id="phone"
										defaultValue="+54 11 1234-5678"
										disabled={!isEditing}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="address">Dirección</Label>
								<Input
									id="address"
									defaultValue="Av. Siempre Viva 742"
									disabled={!isEditing}
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div className="space-y-2">
									<Label htmlFor="city">Ciudad</Label>
									<Input
										id="city"
										defaultValue="Buenos Aires"
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="state">Provincia</Label>
									<Input
										id="state"
										defaultValue="Buenos Aires"
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="zipCode">Código postal</Label>
									<Input
										id="zipCode"
										defaultValue="1000"
										disabled={!isEditing}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Información académica</CardTitle>
							<CardDescription>
								Datos sobre tu carrera y estudios
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="career">Carrera</Label>
									<Input
										id="career"
										defaultValue="Ingeniería en Sistemas"
										disabled={true}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="plan">Plan de estudios</Label>
									<Input id="plan" defaultValue="Plan 2018" disabled={true} />
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="admissionDate">Fecha de ingreso</Label>
									<Input
										id="admissionDate"
										defaultValue="01/03/2020"
										disabled={true}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="status">Estado académico</Label>
									<Input id="status" defaultValue="Regular" disabled={true} />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
