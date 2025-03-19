"use client";

import {
	Award,
	Check,
	Download,
	Eye,
	FileText,
	Filter,
	LucideSearch,
	Plus,
	Printer,
	Settings,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample certificates data
const certificates = [
	{
		id: 1,
		type: "Analítico",
		student: "Juan Pérez",
		studentId: "12345",
		avatar: "/placeholder.svg?height=32&width=32",
		career: "Ingeniería en Sistemas",
		requestDate: "2023-06-10",
		status: "completed",
		completedDate: "2023-06-15",
		notes: "Entregado al estudiante",
	},
	{
		id: 2,
		type: "Título en trámite",
		student: "María López",
		studentId: "12346",
		avatar: "/placeholder.svg?height=32&width=32",
		career: "Ingeniería Civil",
		requestDate: "2023-06-12",
		status: "in_progress",
		completedDate: null,
		notes: "En proceso de firma",
	},
	{
		id: 3,
		type: "Materias aprobadas",
		student: "Carlos Rodríguez",
		studentId: "12347",
		avatar: "/placeholder.svg?height=32&width=32",
		career: "Ingeniería en Sistemas",
		requestDate: "2023-06-14",
		status: "pending",
		completedDate: null,
		notes: "Pendiente de revisión",
	},
	{
		id: 4,
		type: "Alumno regular",
		student: "Ana Fernández",
		studentId: "12348",
		avatar: "/placeholder.svg?height=32&width=32",
		career: "Medicina",
		requestDate: "2023-06-08",
		status: "completed",
		completedDate: "2023-06-09",
		notes: "Entregado al estudiante",
	},
	{
		id: 5,
		type: "Título en trámite",
		student: "Pedro Gómez",
		studentId: "12349",
		avatar: "/placeholder.svg?height=32&width=32",
		career: "Derecho",
		requestDate: "2023-06-05",
		status: "rejected",
		completedDate: "2023-06-07",
		notes: "Falta documentación",
	},
];

// Sample certificate templates
const certificateTemplates = [
	{
		id: 1,
		name: "Analítico",
		description: "Certificado analítico de materias aprobadas",
	},
	{
		id: 2,
		name: "Título en trámite",
		description: "Constancia de título en trámite",
	},
	{
		id: 3,
		name: "Materias aprobadas",
		description: "Listado de materias aprobadas",
	},
	{
		id: 4,
		name: "Alumno regular",
		description: "Certificado de alumno regular",
	},
	{
		id: 5,
		name: "Programa de estudios",
		description: "Programa completo de la carrera",
	},
];

export default function CertificatesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		type: "",
		status: "",
		career: "",
	});
	const [isNewCertificateOpen, setIsNewCertificateOpen] = useState(false);
	const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
	const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
	const [activeTab, setActiveTab] = useState("all");

	// Filter certificates based on search term, filters, and active tab
	const filteredCertificates = certificates.filter((certificate) => {
		const matchesSearch =
			certificate.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
			certificate.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			certificate.type.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filters.type ? certificate.type === filters.type : true;
		const matchesStatus = filters.status
			? certificate.status === filters.status
			: true;
		const matchesCareer = filters.career
			? certificate.career === filters.career
			: true;

		const matchesTab =
			activeTab === "all"
				? true
				: activeTab === "pending"
					? certificate.status === "pending"
					: activeTab === "in_progress"
						? certificate.status === "in_progress"
						: activeTab === "completed"
							? certificate.status === "completed"
							: activeTab === "rejected"
								? certificate.status === "rejected"
								: true;

		return (
			matchesSearch &&
			matchesType &&
			matchesStatus &&
			matchesCareer &&
			matchesTab
		);
	});

	const resetFilters = () => {
		setFilters({
			type: "",
			status: "",
			career: "",
		});
		setFilterSheetOpen(false);
	};

	const handleCreateCertificate = () => {
		toast.success("Solicitud de certificado creada correctamente");
		setIsNewCertificateOpen(false);
	};

	const handleUpdateStatus = (status: string) => {
		toast.success(`Estado actualizado a: ${status}`);
		setSelectedCertificate(null);
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "pending":
				return <Badge variant="outline">Pendiente</Badge>;
			case "in_progress":
				return <Badge variant="secondary">En proceso</Badge>;
			case "completed":
				return (
					<Badge
						variant="success"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
					>
						Completado
					</Badge>
				);
			case "rejected":
				return <Badge variant="destructive">Rechazado</Badge>;
			default:
				return <Badge variant="outline">Desconocido</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">
						Gestión de Certificados
					</h1>
					<p className="text-muted-foreground">
						Administra las solicitudes de certificados de los estudiantes
					</p>
				</div>
				<div className="flex gap-2">
					<Dialog
						open={isTemplateDialogOpen}
						onOpenChange={setIsTemplateDialogOpen}
					>
						<DialogTrigger asChild>
							<Button variant="outline">
								<Settings className="mr-2 h-4 w-4" />
								Plantillas
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[600px]">
							<DialogHeader>
								<DialogTitle>Plantillas de certificados</DialogTitle>
								<DialogDescription>
									Administra las plantillas disponibles para los certificados
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<div className="space-y-4">
									{certificateTemplates.map((template) => (
										<div
											key={template.id}
											className="flex items-center justify-between rounded-md border p-3"
										>
											<div>
												<p className="font-medium">{template.name}</p>
												<p className="text-muted-foreground text-sm">
													{template.description}
												</p>
											</div>
											<div className="flex gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => toast.success("Vista previa generada")}
												>
													<Eye className="h-4 w-4" />
													<span className="sr-only">Vista previa</span>
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => toast.success("Plantilla editada")}
												>
													<FileText className="h-4 w-4" />
													<span className="sr-only">Editar</span>
												</Button>
											</div>
										</div>
									))}
								</div>
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setIsTemplateDialogOpen(false)}
								>
									Cerrar
								</Button>
								<Button onClick={() => toast.success("Nueva plantilla creada")}>
									<Plus className="mr-2 h-4 w-4" />
									Nueva plantilla
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Dialog
						open={isNewCertificateOpen}
						onOpenChange={setIsNewCertificateOpen}
					>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Nuevo certificado
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[600px]">
							<DialogHeader>
								<DialogTitle>Crear solicitud de certificado</DialogTitle>
								<DialogDescription>
									Completa los datos para crear una nueva solicitud de
									certificado
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="student-search">Estudiante</Label>
									<div className="relative">
										<LucideSearch className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
										<Input
											id="student-search"
											placeholder="Buscar por nombre o legajo..."
											className="pl-8"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="certificate-type">Tipo de certificado</Label>
									<Select>
										<SelectTrigger id="certificate-type">
											<SelectValue placeholder="Seleccionar tipo de certificado" />
										</SelectTrigger>
										<SelectContent>
											{certificateTemplates.map((template) => (
												<SelectItem key={template.id} value={template.name}>
													{template.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="notes">Notas adicionales</Label>
									<Input
										id="notes"
										placeholder="Notas o comentarios sobre la solicitud"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => setIsNewCertificateOpen(false)}
								>
									Cancelar
								</Button>
								<Button onClick={handleCreateCertificate}>
									Crear solicitud
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="relative w-full sm:max-w-sm">
					<LucideSearch className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por estudiante, legajo o tipo..."
						className="w-full pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex w-full gap-2 sm:w-auto">
					<Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
						<SheetTrigger asChild>
							<Button variant="outline" className="flex gap-2">
								<Filter className="h-4 w-4" />
								Filtros
								{(filters.type || filters.status || filters.career) && (
									<Badge
										variant="secondary"
										className="ml-1 rounded-full px-1 py-0 text-xs"
									>
										{Object.values(filters).filter(Boolean).length}
									</Badge>
								)}
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Filtros</SheetTitle>
								<SheetDescription>
									Filtra las solicitudes de certificados
								</SheetDescription>
							</SheetHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="type-filter">Tipo de certificado</Label>
									<Select
										value={filters.type}
										onValueChange={(value) =>
											setFilters({ ...filters, type: value })
										}
									>
										<SelectTrigger id="type-filter">
											<SelectValue placeholder="Todos los tipos" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos los tipos</SelectItem>
											<SelectItem value="Analítico">Analítico</SelectItem>
											<SelectItem value="Título en trámite">
												Título en trámite
											</SelectItem>
											<SelectItem value="Materias aprobadas">
												Materias aprobadas
											</SelectItem>
											<SelectItem value="Alumno regular">
												Alumno regular
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="status-filter">Estado</Label>
									<Select
										value={filters.status}
										onValueChange={(value) =>
											setFilters({ ...filters, status: value })
										}
									>
										<SelectTrigger id="status-filter">
											<SelectValue placeholder="Todos los estados" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos los estados</SelectItem>
											<SelectItem value="pending">Pendiente</SelectItem>
											<SelectItem value="in_progress">En proceso</SelectItem>
											<SelectItem value="completed">Completado</SelectItem>
											<SelectItem value="rejected">Rechazado</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="career-filter">Carrera</Label>
									<Select
										value={filters.career}
										onValueChange={(value) =>
											setFilters({ ...filters, career: value })
										}
									>
										<SelectTrigger id="career-filter">
											<SelectValue placeholder="Todas las carreras" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todas las carreras</SelectItem>
											<SelectItem value="Ingeniería en Sistemas">
												Ingeniería en Sistemas
											</SelectItem>
											<SelectItem value="Ingeniería Civil">
												Ingeniería Civil
											</SelectItem>
											<SelectItem value="Medicina">Medicina</SelectItem>
											<SelectItem value="Derecho">Derecho</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<SheetFooter>
								<Button variant="outline" onClick={resetFilters}>
									Limpiar filtros
								</Button>
								<SheetClose asChild>
									<Button>Aplicar filtros</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			<Tabs
				defaultValue="all"
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList>
					<TabsTrigger value="all">Todos</TabsTrigger>
					<TabsTrigger value="pending">Pendientes</TabsTrigger>
					<TabsTrigger value="in_progress">En proceso</TabsTrigger>
					<TabsTrigger value="completed">Completados</TabsTrigger>
					<TabsTrigger value="rejected">Rechazados</TabsTrigger>
				</TabsList>

				<TabsContent value={activeTab}>
					<Card>
						<CardHeader>
							<CardTitle>Solicitudes de certificados</CardTitle>
							<CardDescription>
								{activeTab === "all"
									? "Todas las solicitudes"
									: activeTab === "pending"
										? "Solicitudes pendientes"
										: activeTab === "in_progress"
											? "Solicitudes en proceso"
											: activeTab === "completed"
												? "Solicitudes completadas"
												: "Solicitudes rechazadas"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Estudiante</TableHead>
										<TableHead>Tipo</TableHead>
										<TableHead>Carrera</TableHead>
										<TableHead>Fecha de solicitud</TableHead>
										<TableHead>Estado</TableHead>
										<TableHead className="text-right">Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredCertificates.length > 0 ? (
										filteredCertificates.map((certificate) => (
											<TableRow key={certificate.id}>
												<TableCell>
													<div className="flex items-center gap-2">
														<Avatar className="h-8 w-8">
															<AvatarImage
																src={certificate.avatar}
																alt={certificate.student}
															/>
															<AvatarFallback>
																{certificate.student.charAt(0)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">
																{certificate.student}
															</p>
															<p className="text-muted-foreground text-xs">
																Legajo: {certificate.studentId}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell>{certificate.type}</TableCell>
												<TableCell>{certificate.career}</TableCell>
												<TableCell>
													{new Date(
														certificate.requestDate,
													).toLocaleDateString()}
												</TableCell>
												<TableCell>
													{getStatusBadge(certificate.status)}
												</TableCell>
												<TableCell className="text-right">
													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	setSelectedCertificate(certificate)
																}
															>
																Ver detalles
															</Button>
														</DialogTrigger>
														<DialogContent className="sm:max-w-[600px]">
															<DialogHeader>
																<DialogTitle>
																	Detalles del certificado
																</DialogTitle>
																<DialogDescription>
																	Información detallada de la solicitud
																</DialogDescription>
															</DialogHeader>
															{selectedCertificate && (
																<div className="py-4">
																	<div className="mb-4 grid grid-cols-2 gap-4">
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Estudiante
																			</h4>
																			<div className="flex items-center gap-2">
																				<Avatar className="h-8 w-8">
																					<AvatarImage
																						src={selectedCertificate.avatar}
																						alt={selectedCertificate.student}
																					/>
																					<AvatarFallback>
																						{selectedCertificate.student.charAt(
																							0,
																						)}
																					</AvatarFallback>
																				</Avatar>
																				<div>
																					<p className="text-sm">
																						{selectedCertificate.student}
																					</p>
																					<p className="text-muted-foreground text-xs">
																						Legajo:{" "}
																						{selectedCertificate.studentId}
																					</p>
																				</div>
																			</div>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Tipo de certificado
																			</h4>
																			<p className="text-sm">
																				{selectedCertificate.type}
																			</p>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Carrera
																			</h4>
																			<p className="text-sm">
																				{selectedCertificate.career}
																			</p>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Estado
																			</h4>
																			<div>
																				{getStatusBadge(
																					selectedCertificate.status,
																				)}
																			</div>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Fecha de solicitud
																			</h4>
																			<p className="text-sm">
																				{new Date(
																					selectedCertificate.requestDate,
																				).toLocaleDateString()}
																			</p>
																		</div>
																		{selectedCertificate.completedDate && (
																			<div>
																				<h4 className="mb-1 font-medium text-sm">
																					Fecha de finalización
																				</h4>
																				<p className="text-sm">
																					{new Date(
																						selectedCertificate.completedDate,
																					).toLocaleDateString()}
																				</p>
																			</div>
																		)}
																	</div>

																	<div className="mb-4">
																		<h4 className="mb-1 font-medium text-sm">
																			Notas
																		</h4>
																		<p className="text-sm">
																			{selectedCertificate.notes ||
																				"Sin notas adicionales"}
																		</p>
																	</div>

																	<Separator className="my-4" />

																	<div className="space-y-2">
																		<h4 className="font-medium text-sm">
																			Actualizar estado
																		</h4>
																		<div className="flex gap-2">
																			<Button
																				variant="outline"
																				size="sm"
																				onClick={() =>
																					handleUpdateStatus("pending")
																				}
																				disabled={
																					selectedCertificate.status ===
																					"pending"
																				}
																			>
																				Pendiente
																			</Button>
																			<Button
																				variant="outline"
																				size="sm"
																				onClick={() =>
																					handleUpdateStatus("in_progress")
																				}
																				disabled={
																					selectedCertificate.status ===
																					"in_progress"
																				}
																			>
																				En proceso
																			</Button>
																			<Button
																				variant="outline"
																				size="sm"
																				onClick={() =>
																					handleUpdateStatus("completed")
																				}
																				disabled={
																					selectedCertificate.status ===
																					"completed"
																				}
																			>
																				Completado
																			</Button>
																			<Button
																				variant="outline"
																				size="sm"
																				onClick={() =>
																					handleUpdateStatus("rejected")
																				}
																				disabled={
																					selectedCertificate.status ===
																					"rejected"
																				}
																			>
																				Rechazado
																			</Button>
																		</div>
																	</div>
																</div>
															)}
															<DialogFooter>
																{selectedCertificate &&
																	selectedCertificate.status ===
																		"completed" && (
																		<>
																			<Button
																				variant="outline"
																				onClick={() =>
																					toast.success(
																						"Certificado descargado",
																					)
																				}
																			>
																				<Download className="mr-2 h-4 w-4" />
																				Descargar
																			</Button>
																			<Button
																				onClick={() =>
																					toast.success(
																						"Certificado enviado a impresión",
																					)
																				}
																			>
																				<Printer className="mr-2 h-4 w-4" />
																				Imprimir
																			</Button>
																		</>
																	)}
																{selectedCertificate &&
																	selectedCertificate.status === "pending" && (
																		<Button
																			onClick={() =>
																				handleUpdateStatus("in_progress")
																			}
																		>
																			<Check className="mr-2 h-4 w-4" />
																			Iniciar proceso
																		</Button>
																	)}
															</DialogFooter>
														</DialogContent>
													</Dialog>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={6} className="py-6 text-center">
												<div className="flex flex-col items-center justify-center">
													<Award className="mb-2 h-8 w-8 text-muted-foreground" />
													<p className="text-muted-foreground">
														No se encontraron certificados con los criterios
														seleccionados.
													</p>
												</div>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-muted-foreground text-sm">
								Mostrando {filteredCertificates.length} de {certificates.length}{" "}
								certificados
							</div>
							<Button
								variant="outline"
								onClick={() => toast.success("Reporte generado")}
							>
								<Download className="mr-2 h-4 w-4" />
								Exportar
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
