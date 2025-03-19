"use client";

import {
	Bell,
	Calendar,
	Download,
	Edit,
	Mail,
	MessageSquare,
	Plus,
	Search,
	Send,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
import { Checkbox } from "@/components/ui/checkbox";
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
import {} from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Sample communications data
const communications = [
	{
		id: 1,
		title: "Inscripción a exámenes finales",
		type: "announcement",
		sender: "Secretaría Académica",
		recipients: "Todos los estudiantes",
		date: "2023-06-10",
		status: "sent",
		content:
			"Se informa a todos los estudiantes que el período de inscripción a exámenes finales estará abierto desde el 15 hasta el 25 de junio. Las inscripciones se realizarán a través del sistema académico.",
		views: 245,
		responses: 12,
	},
	{
		id: 2,
		title: "Cambio de aula - Matemática III",
		type: "notification",
		sender: "Dr. Juan Martínez",
		recipients: "Estudiantes de Matemática III",
		date: "2023-06-12",
		status: "sent",
		content:
			"Se informa a los estudiantes de Matemática III que a partir del lunes 19 de junio, las clases se dictarán en el Aula 305 en lugar del Aula 201.",
		views: 28,
		responses: 3,
	},
	{
		id: 3,
		title: "Recordatorio entrega de trabajos prácticos",
		type: "notification",
		sender: "Ing. María López",
		recipients: "Estudiantes de Programación II",
		date: "2023-06-14",
		status: "scheduled",
		scheduledDate: "2023-06-16",
		content:
			"Recordamos a los estudiantes de Programación II que la fecha límite para la entrega del trabajo práctico N°3 es el viernes 23 de junio.",
		views: 0,
		responses: 0,
	},
	{
		id: 4,
		title: "Suspensión de clases por jornada institucional",
		type: "announcement",
		sender: "Rectorado",
		recipients: "Toda la comunidad académica",
		date: "2023-06-08",
		status: "draft",
		content:
			"Se informa que el día 30 de junio se suspenderán las actividades académicas debido a la realización de la Jornada Institucional Anual. Las actividades se retomarán con normalidad el día 3 de julio.",
		views: 0,
		responses: 0,
	},
	{
		id: 5,
		title: "Becas de investigación disponibles",
		type: "announcement",
		sender: "Departamento de Investigación",
		recipients: "Estudiantes de 4° y 5° año",
		date: "2023-06-05",
		status: "sent",
		content:
			"El Departamento de Investigación informa que se encuentran abiertas las inscripciones para las becas de investigación 2023. Los interesados pueden presentar su solicitud hasta el 15 de julio.",
		views: 112,
		responses: 28,
	},
];

// Sample recipient groups
const recipientGroups = [
	{ id: 1, name: "Todos los estudiantes", count: 450 },
	{ id: 2, name: "Todos los docentes", count: 85 },
	{ id: 3, name: "Toda la comunidad académica", count: 550 },
	{ id: 4, name: "Estudiantes de Ingeniería en Sistemas", count: 120 },
	{ id: 5, name: "Estudiantes de Ingeniería Civil", count: 95 },
	{ id: 6, name: "Estudiantes de Matemática III", count: 25 },
	{ id: 7, name: "Estudiantes de Programación II", count: 30 },
	{ id: 8, name: "Estudiantes de 4° y 5° año", count: 180 },
];

export default function CommunicationsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		type: "",
		status: "",
		sender: "",
	});
	const [isNewCommunicationOpen, setIsNewCommunicationOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedCommunication, setSelectedCommunication] = useState<any>(null);
	const [activeTab, setActiveTab] = useState("all");
	const [newCommunication, setNewCommunication] = useState({
		title: "",
		type: "notification",
		recipients: "",
		content: "",
		schedule: false,
		scheduledDate: "",
	});

	// Filter communications based on search term, filters, and active tab
	const filteredCommunications = communications.filter((communication) => {
		const matchesSearch =
			communication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			communication.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
			communication.recipients.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filters.type
			? communication.type === filters.type
			: true;
		const matchesStatus = filters.status
			? communication.status === filters.status
			: true;
		const matchesSender = filters.sender
			? communication.sender === filters.sender
			: true;

		const matchesTab =
			activeTab === "all"
				? true
				: activeTab === "sent"
					? communication.status === "sent"
					: activeTab === "scheduled"
						? communication.status === "scheduled"
						: activeTab === "draft"
							? communication.status === "draft"
							: true;

		return (
			matchesSearch &&
			matchesType &&
			matchesStatus &&
			matchesSender &&
			matchesTab
		);
	});

	const resetFilters = () => {
		setFilters({
			type: "",
			status: "",
			sender: "",
		});
		setFilterSheetOpen(false);
	};

	const handleCreateCommunication = () => {
		toast.success(
			newCommunication.schedule
				? "Comunicación programada correctamente"
				: "Comunicación enviada correctamente",
		);
		setIsNewCommunicationOpen(false);
		setNewCommunication({
			title: "",
			type: "notification",
			recipients: "",
			content: "",
			schedule: false,
			scheduledDate: "",
		});
	};

	const handleDeleteCommunication = () => {
		toast.success("Comunicación eliminada correctamente");
		setIsDeleteDialogOpen(false);
		setSelectedCommunication(null);
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "sent":
				return (
					<Badge
						variant="success"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
					>
						Enviado
					</Badge>
				);
			case "scheduled":
				return (
					<Badge variant="outline" className="border-blue-500 text-blue-500">
						Programado
					</Badge>
				);
			case "draft":
				return <Badge variant="secondary">Borrador</Badge>;
			default:
				return <Badge variant="outline">Desconocido</Badge>;
		}
	};

	return (
		<div className="container space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Comunicaciones</h1>
					<p className="text-muted-foreground">
						Gestiona anuncios y notificaciones para la comunidad académica
					</p>
				</div>
				<div className="flex gap-2">
					<Dialog
						open={isNewCommunicationOpen}
						onOpenChange={setIsNewCommunicationOpen}
					>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Nueva comunicación
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[700px]">
							<DialogHeader>
								<DialogTitle>Crear nueva comunicación</DialogTitle>
								<DialogDescription>
									Completa los datos para crear y enviar una nueva comunicación
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="comm-title">Título</Label>
										<Input
											id="comm-title"
											placeholder="Título de la comunicación"
											value={newCommunication.title}
											onChange={(e) =>
												setNewCommunication({
													...newCommunication,
													title: e.target.value,
												})
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="comm-type">Tipo</Label>
										<Select
											value={newCommunication.type}
											onValueChange={(value) =>
												setNewCommunication({
													...newCommunication,
													type: value,
												})
											}
										>
											<SelectTrigger id="comm-type">
												<SelectValue placeholder="Seleccionar tipo" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="notification">
													Notificación
												</SelectItem>
												<SelectItem value="announcement">Anuncio</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="comm-recipients">Destinatarios</Label>
									<Select
										value={newCommunication.recipients}
										onValueChange={(value) =>
											setNewCommunication({
												...newCommunication,
												recipients: value,
											})
										}
									>
										<SelectTrigger id="comm-recipients">
											<SelectValue placeholder="Seleccionar destinatarios" />
										</SelectTrigger>
										<SelectContent>
											{recipientGroups.map((group) => (
												<SelectItem key={group.id} value={group.name}>
													{group.name} ({group.count})
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="comm-content">Contenido</Label>
									<Textarea
										id="comm-content"
										placeholder="Escribe el contenido de la comunicación..."
										rows={6}
										value={newCommunication.content}
										onChange={(e) =>
											setNewCommunication({
												...newCommunication,
												content: e.target.value,
											})
										}
									/>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="schedule"
										checked={newCommunication.schedule}
										onCheckedChange={(checked) =>
											setNewCommunication({
												...newCommunication,
												schedule: checked as boolean,
											})
										}
									/>
									<Label htmlFor="schedule">Programar envío</Label>
								</div>

								{newCommunication.schedule && (
									<div className="space-y-2">
										<Label htmlFor="scheduled-date">
											Fecha y hora de envío
										</Label>
										<Input
											id="scheduled-date"
											type="datetime-local"
											value={newCommunication.scheduledDate}
											onChange={(e) =>
												setNewCommunication({
													...newCommunication,
													scheduledDate: e.target.value,
												})
											}
										/>
									</div>
								)}
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => {
										toast.success("Comunicación guardada como borrador");
										setIsNewCommunicationOpen(false);
									}}
								>
									Guardar borrador
								</Button>
								<Button onClick={handleCreateCommunication}>
									{newCommunication.schedule ? (
										<>
											<Calendar className="mr-2 h-4 w-4" />
											Programar
										</>
									) : (
										<>
											<Send className="mr-2 h-4 w-4" />
											Enviar
										</>
									)}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="relative w-full sm:max-w-sm">
					<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por título, remitente o destinatarios..."
						className="w-full pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{/*     <div className="flex w-full gap-2 sm:w-auto">
          <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filtros
                {(filters.type || filters.status || filters.sender) && (
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
                <SheetDescription>Filtra las comunicaciones</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="type-filter">Tipo</Label>
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
                      <SelectItem value="notification">Notificación</SelectItem>
                      <SelectItem value="announcement">Anuncio</SelectItem>
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
                      <SelectItem value="">Todos los estados</SelectItem>
                      <SelectItem value="sent">Enviado</SelectItem>
                      <SelectItem value="scheduled">Programado</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-filter">Remitente</Label>
                  <Select
                    value={filters.sender}
                    onValueChange={(value) =>
                      setFilters({ ...filters, sender: value })
                    }
                  >
                    <SelectTrigger id="sender-filter">
                      <SelectValue placeholder="Todos los remitentes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos los remitentes</SelectItem>
                      <SelectItem value="Secretaría Académica">
                        Secretaría Académica
                      </SelectItem>
                      <SelectItem value="Rectorado">Rectorado</SelectItem>
                      <SelectItem value="Dr. Juan Martínez">
                        Dr. Juan Martínez
                      </SelectItem>
                      <SelectItem value="Ing. María López">
                        Ing. María López
                      </SelectItem>
                      <SelectItem value="Departamento de Investigación">
                        Departamento de Investigación
                      </SelectItem>
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
        </div> */}
			</div>

			<Tabs
				defaultValue="all"
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList>
					<TabsTrigger value="all">Todos</TabsTrigger>
					<TabsTrigger value="sent">Enviados</TabsTrigger>
					<TabsTrigger value="scheduled">Programados</TabsTrigger>
					<TabsTrigger value="draft">Borradores</TabsTrigger>
				</TabsList>

				<TabsContent value={activeTab}>
					<Card>
						<CardHeader>
							<CardTitle>Comunicaciones</CardTitle>
							<CardDescription>
								{activeTab === "all"
									? "Todas las comunicaciones"
									: activeTab === "sent"
										? "Comunicaciones enviadas"
										: activeTab === "scheduled"
											? "Comunicaciones programadas"
											: "Borradores de comunicaciones"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Título</TableHead>
										<TableHead>Tipo</TableHead>
										<TableHead>Remitente</TableHead>
										<TableHead>Destinatarios</TableHead>
										<TableHead>Fecha</TableHead>
										<TableHead>Estado</TableHead>
										<TableHead className="text-right">Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredCommunications.length > 0 ? (
										filteredCommunications.map((communication) => (
											<TableRow key={communication.id}>
												<TableCell className="font-medium">
													{communication.title}
												</TableCell>
												<TableCell>
													{communication.type === "notification" ? (
														<Badge
															variant="outline"
															className="flex w-fit items-center gap-1"
														>
															<Bell className="h-3 w-3" />
															Notificación
														</Badge>
													) : (
														<Badge
															variant="outline"
															className="flex w-fit items-center gap-1"
														>
															<MessageSquare className="h-3 w-3" />
															Anuncio
														</Badge>
													)}
												</TableCell>
												<TableCell>{communication.sender}</TableCell>
												<TableCell>{communication.recipients}</TableCell>
												<TableCell>
													{new Date(communication.date).toLocaleDateString()}
												</TableCell>
												<TableCell>
													{getStatusBadge(communication.status)}
												</TableCell>
												<TableCell className="text-right">
													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	setSelectedCommunication(communication)
																}
															>
																Ver detalles
															</Button>
														</DialogTrigger>
														<DialogContent className="sm:max-w-[700px]">
															<DialogHeader>
																<DialogTitle>{communication.title}</DialogTitle>
																<DialogDescription>
																	Detalles de la comunicación
																</DialogDescription>
															</DialogHeader>
															{selectedCommunication && (
																<div className="py-4">
																	<div className="mb-4 grid grid-cols-2 gap-4">
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Tipo
																			</h4>
																			<p className="text-sm">
																				{selectedCommunication.type ===
																				"notification"
																					? "Notificación"
																					: "Anuncio"}
																			</p>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Estado
																			</h4>
																			<div>
																				{getStatusBadge(
																					selectedCommunication.status,
																				)}
																			</div>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Remitente
																			</h4>
																			<p className="text-sm">
																				{selectedCommunication.sender}
																			</p>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Destinatarios
																			</h4>
																			<p className="text-sm">
																				{selectedCommunication.recipients}
																			</p>
																		</div>
																		<div>
																			<h4 className="mb-1 font-medium text-sm">
																				Fecha de creación
																			</h4>
																			<p className="text-sm">
																				{new Date(
																					selectedCommunication.date,
																				).toLocaleDateString()}
																			</p>
																		</div>
																		{selectedCommunication.status ===
																			"scheduled" &&
																			selectedCommunication.scheduledDate && (
																				<div>
																					<h4 className="mb-1 font-medium text-sm">
																						Fecha programada
																					</h4>
																					<p className="text-sm">
																						{new Date(
																							selectedCommunication.scheduledDate,
																						).toLocaleDateString()}
																					</p>
																				</div>
																			)}
																	</div>

																	<div className="mb-4">
																		<h4 className="mb-1 font-medium text-sm">
																			Contenido
																		</h4>
																		<div className="rounded-md border bg-muted/50 p-3">
																			<p className="whitespace-pre-line text-sm">
																				{selectedCommunication.content}
																			</p>
																		</div>
																	</div>

																	{selectedCommunication.status === "sent" && (
																		<div className="mb-4 grid grid-cols-2 gap-4">
																			<div>
																				<h4 className="mb-1 font-medium text-sm">
																					Vistas
																				</h4>
																				<p className="text-sm">
																					{selectedCommunication.views}
																				</p>
																			</div>
																			<div>
																				<h4 className="mb-1 font-medium text-sm">
																					Respuestas
																				</h4>
																				<p className="text-sm">
																					{selectedCommunication.responses}
																				</p>
																			</div>
																		</div>
																	)}

																	<Separator className="my-4" />

																	{selectedCommunication.status === "draft" && (
																		<div className="flex justify-between">
																			<Button
																				variant="outline"
																				onClick={() =>
																					toast.success("Comunicación editada")
																				}
																			>
																				<Edit className="mr-2 h-4 w-4" />
																				Editar
																			</Button>
																			<Button
																				onClick={() =>
																					toast.success("Comunicación enviada")
																				}
																			>
																				<Send className="mr-2 h-4 w-4" />
																				Enviar ahora
																			</Button>
																		</div>
																	)}
																</div>
															)}
															<DialogFooter>
																{selectedCommunication &&
																	selectedCommunication.status ===
																		"scheduled" && (
																		<Button
																			variant="outline"
																			onClick={() =>
																				toast.success("Comunicación cancelada")
																			}
																		>
																			Cancelar envío
																		</Button>
																	)}
																<Dialog
																	open={isDeleteDialogOpen}
																	onOpenChange={setIsDeleteDialogOpen}
																>
																	<DialogTrigger asChild>
																		<Button variant="destructive">
																			<Trash2 className="mr-2 h-4 w-4" />
																			Eliminar
																		</Button>
																	</DialogTrigger>
																	<DialogContent>
																		<DialogHeader>
																			<DialogTitle>
																				Eliminar comunicación
																			</DialogTitle>
																			<DialogDescription>
																				¿Estás seguro de que deseas eliminar
																				esta comunicación?
																			</DialogDescription>
																		</DialogHeader>
																		<div className="py-4">
																			<p className="text-muted-foreground text-sm">
																				Esta acción no se puede deshacer. Se
																				eliminará la comunicación
																				permanentemente.
																			</p>
																		</div>
																		<DialogFooter>
																			<Button
																				variant="outline"
																				onClick={() =>
																					setIsDeleteDialogOpen(false)
																				}
																			>
																				Cancelar
																			</Button>
																			<Button
																				variant="destructive"
																				onClick={handleDeleteCommunication}
																			>
																				Eliminar
																			</Button>
																		</DialogFooter>
																	</DialogContent>
																</Dialog>
															</DialogFooter>
														</DialogContent>
													</Dialog>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={7} className="py-6 text-center">
												<div className="flex flex-col items-center justify-center">
													<Mail className="mb-2 h-8 w-8 text-muted-foreground" />
													<p className="text-muted-foreground">
														No se encontraron comunicaciones con los criterios
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
								Mostrando {filteredCommunications.length} de{" "}
								{communications.length} comunicaciones
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
