"use client";

import {
	Calendar,
	Check,
	ChevronRight,
	Clock,
	Filter,
	Info,
	MapPin,
	Search,
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample exams data
const exams = [
	{
		id: 1,
		code: "MAT301-F",
		subject: "Matemática III",
		date: "2023-06-15",
		time: "10:00 - 12:00",
		location: "Aula 305",
		professor: "Dr. Juan Martínez",
		quota: 40,
		enrolled: 25,
		status: "available",
		type: "final",
		requirements: [
			"Matemática II aprobada",
			"75% de asistencia a clases prácticas",
		],
	},
	{
		id: 2,
		code: "PRG202-F",
		subject: "Programación II",
		date: "2023-06-22",
		time: "14:00 - 16:00",
		location: "Laboratorio 2",
		professor: "Ing. María López",
		quota: 30,
		enrolled: 28,
		status: "available",
		type: "final",
		requirements: [
			"Programación I aprobada",
			"Trabajo práctico integrador entregado",
		],
	},
	{
		id: 3,
		code: "FIS201-F",
		subject: "Física II",
		date: "2023-06-29",
		time: "09:00 - 11:00",
		location: "Aula 201",
		professor: "Dr. Roberto García",
		quota: 45,
		enrolled: 30,
		status: "available",
		type: "final",
		requirements: ["Física I aprobada", "Matemática I aprobada"],
	},
	{
		id: 4,
		code: "EST101-F",
		subject: "Estadística",
		date: "2023-06-18",
		time: "14:00 - 16:00",
		location: "Aula 105",
		professor: "Dra. Ana Fernández",
		quota: 50,
		enrolled: 35,
		status: "available",
		type: "final",
		requirements: ["Matemática I aprobada"],
	},
	{
		id: 5,
		code: "ING201-F",
		subject: "Inglés Técnico",
		date: "2023-06-20",
		time: "16:00 - 18:00",
		location: "Aula 102",
		professor: "Lic. Carlos Pérez",
		quota: 35,
		enrolled: 35,
		status: "full",
		type: "final",
		requirements: [],
	},
	{
		id: 6,
		code: "MAT301-P",
		subject: "Matemática III",
		date: "2023-05-20",
		time: "10:00 - 12:00",
		location: "Aula 305",
		professor: "Dr. Juan Martínez",
		quota: 40,
		enrolled: 25,
		status: "past",
		type: "partial",
		requirements: ["Inscripción a la materia"],
	},
];

export default function EnrollmentExamsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedExams, setSelectedExams] = useState<number[]>([]);
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		type: "",
		date: "",
	});
	const [selectedExam, setSelectedExam] = useState<any>(null);

	// Filter exams based on search term and filters
	const filteredExams = exams.filter((exam) => {
		const matchesSearch =
			exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
			exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			exam.professor.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filters.type ? exam.type === filters.type : true;
		const matchesDate = filters.date
			? getDateFilter(exam.date, filters.date)
			: true;

		return (
			matchesSearch && matchesType && matchesDate && exam.status !== "past"
		);
	});

	const pastExams = exams.filter((exam) => exam.status === "past");

	const getDateFilter = (examDate: string, filterValue: string) => {
		const today = new Date();
		const examDateObj = new Date(examDate);

		switch (filterValue) {
			case "this_week": {
				const weekEnd = new Date(today);
				weekEnd.setDate(today.getDate() + 7);
				return examDateObj >= today && examDateObj <= weekEnd;
			}
			case "this_month": {
				const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
				return examDateObj >= today && examDateObj <= monthEnd;
			}
			case "next_month": {
				const nextMonthStart = new Date(
					today.getFullYear(),
					today.getMonth() + 1,
					1,
				);
				const nextMonthEnd = new Date(
					today.getFullYear(),
					today.getMonth() + 2,
					0,
				);
				return examDateObj >= nextMonthStart && examDateObj <= nextMonthEnd;
			}
			default:
				return true;
		}
	};

	const handleExamSelection = (examId: number) => {
		setSelectedExams((prev) => {
			if (prev.includes(examId)) {
				return prev.filter((id) => id !== examId);
			}
			return [...prev, examId];
		});
	};

	const handleEnrollment = () => {
		toast.success(`Te has inscrito en ${selectedExams.length} exámenes.`);
		setSelectedExams([]);
	};

	const resetFilters = () => {
		setFilters({
			type: "",
			date: "",
		});
		setFilterSheetOpen(false);
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString("es-ES", options);
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold text-3xl tracking-tight">
					Inscripción a Exámenes
				</h1>
				<p className="text-muted-foreground">
					Selecciona los exámenes a los que deseas inscribirte para el próximo
					período.
				</p>
			</div>

			<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="relative w-full sm:max-w-sm">
					<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por materia, código o profesor..."
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
								{(filters.type || filters.date) && (
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
									Filtra los exámenes según tus preferencias
								</SheetDescription>
							</SheetHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="type">Tipo de examen</Label>
									<Select
										value={filters.type}
										onValueChange={(value) =>
											setFilters({ ...filters, type: value })
										}
									>
										<SelectTrigger id="type">
											<SelectValue placeholder="Todos los tipos" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos los tipos</SelectItem>
											<SelectItem value="final">Finales</SelectItem>
											<SelectItem value="partial">Parciales</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="date">Fecha</Label>
									<Select
										value={filters.date}
										onValueChange={(value) =>
											setFilters({ ...filters, date: value })
										}
									>
										<SelectTrigger id="date">
											<SelectValue placeholder="Todas las fechas" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todas las fechas</SelectItem>
											<SelectItem value="this_week">Esta semana</SelectItem>
											<SelectItem value="this_month">Este mes</SelectItem>
											<SelectItem value="next_month">Próximo mes</SelectItem>
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

					<Button
						variant="default"
						onClick={handleEnrollment}
						disabled={selectedExams.length === 0}
					>
						Inscribirse ({selectedExams.length})
					</Button>
				</div>
			</div>

			<Tabs defaultValue="upcoming" className="space-y-4">
				<TabsList>
					<TabsTrigger value="upcoming">Próximos exámenes</TabsTrigger>
					<TabsTrigger value="past">Exámenes pasados</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="space-y-4">
					{filteredExams.length > 0 ? (
						filteredExams.map((exam) => (
							<Card
								key={exam.id}
								className={exam.status === "full" ? "opacity-70" : ""}
							>
								<CardHeader className="pb-2">
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-lg">{exam.subject}</CardTitle>
											<CardDescription>
												{exam.code} - {exam.professor}
											</CardDescription>
										</div>
										<div className="flex items-center gap-2">
											{exam.status === "full" ? (
												<Badge
													variant="outline"
													className="border-destructive text-destructive"
												>
													Cupo completo
												</Badge>
											) : (
												<Badge
													variant="outline"
													className="border-primary text-primary"
												>
													{exam.quota - exam.enrolled} cupos disponibles
												</Badge>
											)}
											<Checkbox
												checked={selectedExams.includes(exam.id)}
												onCheckedChange={() => handleExamSelection(exam.id)}
												disabled={exam.status === "full"}
												className="h-5 w-5"
											/>
										</div>
									</div>
								</CardHeader>
								<CardContent className="pb-2">
									<div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
										<div className="flex items-center gap-2">
											<Calendar className="h-4 w-4 text-muted-foreground" />
											<span>{formatDate(exam.date)}</span>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span>{exam.time}</span>
										</div>
										<div className="flex items-center gap-2">
											<MapPin className="h-4 w-4 text-muted-foreground" />
											<span>{exam.location}</span>
										</div>
										<div className="flex items-center gap-2">
											<Badge
												variant={
													exam.type === "final" ? "default" : "secondary"
												}
											>
												{exam.type === "final" ? "Final" : "Parcial"}
											</Badge>
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<div className="text-sm">
										<span className="font-medium">Requisitos: </span>
										{exam.requirements.length > 0 ? (
											<Button
												variant="link"
												className="h-auto p-0 text-sm"
												onClick={() => setSelectedExam(exam)}
											>
												Ver requisitos
											</Button>
										) : (
											"Ninguno"
										)}
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => {
											toast.success("Redirigiendo a la página de detalles");
											window.location.href = `/enrollment/exams/${exam.id}`;
										}}
									>
										<Info className="mr-1 h-4 w-4" />
										Detalles
										<ChevronRight className="ml-1 h-4 w-4" />
									</Button>
								</CardFooter>
							</Card>
						))
					) : (
						<div className="py-10 text-center">
							<p className="text-muted-foreground">
								No se encontraron exámenes con los criterios seleccionados.
							</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="past" className="space-y-4">
					<ScrollArea className="h-[600px] rounded-md border p-4">
						{pastExams.length > 0 ? (
							<div className="space-y-4">
								{pastExams.map((exam) => (
									<Card key={exam.id}>
										<CardHeader className="pb-2">
											<div className="flex items-start justify-between">
												<div>
													<CardTitle className="text-lg">
														{exam.subject}
													</CardTitle>
													<CardDescription>
														{exam.code} - {exam.professor}
													</CardDescription>
												</div>
												<Badge variant="outline">Pasado</Badge>
											</div>
										</CardHeader>
										<CardContent className="pb-2">
											<div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4 text-muted-foreground" />
													<span>{formatDate(exam.date)}</span>
												</div>
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4 text-muted-foreground" />
													<span>{exam.time}</span>
												</div>
												<div className="flex items-center gap-2">
													<MapPin className="h-4 w-4 text-muted-foreground" />
													<span>{exam.location}</span>
												</div>
												<div className="flex items-center gap-2">
													<Badge
														variant={
															exam.type === "final" ? "default" : "secondary"
														}
													>
														{exam.type === "final" ? "Final" : "Parcial"}
													</Badge>
												</div>
											</div>
										</CardContent>
										<CardFooter>
											<Button
												variant="ghost"
												size="sm"
												className="ml-auto"
												onClick={() => {
													toast.success("Redirigiendo a la página de detalles");
													window.location.href = `/enrollment/exams/${exam.id}`;
												}}
											>
												<Info className="mr-1 h-4 w-4" />
												Detalles
												<ChevronRight className="ml-1 h-4 w-4" />
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						) : (
							<div className="py-10 text-center">
								<p className="text-muted-foreground">
									No hay exámenes pasados para mostrar.
								</p>
							</div>
						)}
					</ScrollArea>
				</TabsContent>
			</Tabs>

			{/* Exam requirements dialog */}
			<Dialog
				open={!!selectedExam}
				onOpenChange={(open) => !open && setSelectedExam(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Requisitos para {selectedExam?.subject}</DialogTitle>
						<DialogDescription>
							Requisitos necesarios para inscribirse al examen
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<ul className="space-y-2">
							{selectedExam?.requirements.map((req: string) => (
								<li key={req} className="flex items-start gap-2">
									<Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
									<span>{req}</span>
								</li>
							))}
						</ul>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setSelectedExam(null)}>
							Cerrar
						</Button>
						<Button
							onClick={() => {
								handleExamSelection(selectedExam.id);
								setSelectedExam(null);
							}}
							disabled={
								selectedExam?.status === "full" ||
								(selectedExam && selectedExams.includes(selectedExam.id))
							}
						>
							{selectedExam && selectedExams.includes(selectedExam.id)
								? "Ya seleccionado"
								: "Seleccionar"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
