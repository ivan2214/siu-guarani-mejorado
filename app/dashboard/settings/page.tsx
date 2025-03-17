"use client";

import { Lock, Moon, Save, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTheme } from "@/components/theme-provider";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
	const { setTheme, theme } = useTheme();
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveSettings = () => {
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast.success("Configuración guardada correctamente");
		}, 1000);
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold text-3xl tracking-tight">Configuración</h1>
				<p className="text-muted-foreground">
					Administra tus preferencias y configuración de la cuenta.
				</p>
			</div>

			<Tabs defaultValue="account" className="space-y-4">
				<TabsList>
					<TabsTrigger value="account">Cuenta</TabsTrigger>
					<TabsTrigger value="appearance">Apariencia</TabsTrigger>
					<TabsTrigger value="notifications">Notificaciones</TabsTrigger>
					<TabsTrigger value="language">Idioma</TabsTrigger>
				</TabsList>

				<TabsContent value="account" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Información de la cuenta</CardTitle>
							<CardDescription>
								Actualiza la información de tu cuenta y cambia tu contraseña.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Correo electrónico</Label>
								<Input
									id="email"
									type="email"
									defaultValue="usuario@ejemplo.com"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="current-password">Contraseña actual</Label>
								<Input id="current-password" type="password" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="new-password">Nueva contraseña</Label>
									<Input id="new-password" type="password" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirm-password">Confirmar contraseña</Label>
									<Input id="confirm-password" type="password" />
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveSettings} disabled={isLoading}>
								{isLoading ? "Guardando..." : "Guardar cambios"}
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Sesiones activas</CardTitle>
							<CardDescription>
								Administra tus sesiones activas en diferentes dispositivos.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-4">
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<p className="font-medium text-sm">Chrome en Windows</p>
										<p className="text-muted-foreground text-xs">
											Activo ahora
										</p>
									</div>
									<Button variant="outline" size="sm">
										<Lock className="mr-2 h-4 w-4" />
										Cerrar sesión
									</Button>
								</div>
								<div className="flex items-center justify-between rounded-lg border p-4">
									<div className="space-y-0.5">
										<p className="font-medium text-sm">Safari en iPhone</p>
										<p className="text-muted-foreground text-xs">Hace 2 días</p>
									</div>
									<Button variant="outline" size="sm">
										<Lock className="mr-2 h-4 w-4" />
										Cerrar sesión
									</Button>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full">
								Cerrar todas las sesiones
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="appearance" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Apariencia</CardTitle>
							<CardDescription>
								Personaliza la apariencia del sistema.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>Tema</Label>
								<RadioGroup
									defaultValue={theme}
									onValueChange={setTheme}
									className="flex gap-6"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="light" id="light" />
										<Label
											htmlFor="light"
											className="flex cursor-pointer items-center gap-2"
										>
											<Sun className="h-4 w-4" />
											Claro
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="dark" id="dark" />
										<Label
											htmlFor="dark"
											className="flex cursor-pointer items-center gap-2"
										>
											<Moon className="h-4 w-4" />
											Oscuro
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="system" id="system" />
										<Label htmlFor="system" className="cursor-pointer">
											Sistema
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label>Tamaño de fuente</Label>
								<Select defaultValue="medium">
									<SelectTrigger>
										<SelectValue placeholder="Selecciona un tamaño" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="small">Pequeño</SelectItem>
										<SelectItem value="medium">Mediano</SelectItem>
										<SelectItem value="large">Grande</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="sidebar-collapsed">
										Sidebar colapsado por defecto
									</Label>
									<p className="text-muted-foreground text-xs">
										El sidebar estará colapsado al iniciar sesión
									</p>
								</div>
								<Switch id="sidebar-collapsed" />
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveSettings} disabled={isLoading}>
								{isLoading ? "Guardando..." : "Guardar cambios"}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Notificaciones</CardTitle>
							<CardDescription>
								Configura cómo y cuándo quieres recibir notificaciones.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="email-notifications">
										Notificaciones por correo
									</Label>
									<p className="text-muted-foreground text-xs">
										Recibe notificaciones importantes por correo electrónico
									</p>
								</div>
								<Switch id="email-notifications" defaultChecked />
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="push-notifications">
										Notificaciones push
									</Label>
									<p className="text-muted-foreground text-xs">
										Recibe notificaciones en tiempo real en tu navegador
									</p>
								</div>
								<Switch id="push-notifications" defaultChecked />
							</div>

							<div className="space-y-2">
								<Label>Tipos de notificaciones</Label>
								<div className="space-y-2">
									{[
										{
											id: "exams",
											label: "Exámenes",
											description: "Fechas de exámenes y resultados",
										},
										{
											id: "enrollment",
											label: "Inscripciones",
											description:
												"Períodos de inscripción a materias y exámenes",
										},
										{
											id: "messages",
											label: "Mensajes",
											description: "Mensajes de profesores y compañeros",
										},
										{
											id: "news",
											label: "Noticias",
											description: "Noticias y anuncios institucionales",
										},
									].map((item) => (
										<div
											key={item.id}
											className="flex items-center justify-between rounded-lg border p-4"
										>
											<div className="space-y-0.5">
												<Label htmlFor={item.id}>{item.label}</Label>
												<p className="text-muted-foreground text-xs">
													{item.description}
												</p>
											</div>
											<Switch id={item.id} defaultChecked />
										</div>
									))}
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveSettings} disabled={isLoading}>
								{isLoading ? "Guardando..." : "Guardar cambios"}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="language" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Idioma</CardTitle>
							<CardDescription>
								Configura el idioma del sistema.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="language">Idioma del sistema</Label>
								<Select defaultValue="es">
									<SelectTrigger id="language">
										<SelectValue placeholder="Selecciona un idioma" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="es">Español</SelectItem>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="pt">Português</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="date-format">Formato de fecha</Label>
								<Select defaultValue="dd/mm/yyyy">
									<SelectTrigger id="date-format">
										<SelectValue placeholder="Selecciona un formato" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
										<SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
										<SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label htmlFor="auto-translate">Traducción automática</Label>
									<p className="text-muted-foreground text-xs">
										Traducir automáticamente mensajes en otros idiomas
									</p>
								</div>
								<Switch id="auto-translate" />
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveSettings} disabled={isLoading}>
								<Save className="mr-2 h-4 w-4" />
								{isLoading ? "Guardando..." : "Guardar cambios"}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
