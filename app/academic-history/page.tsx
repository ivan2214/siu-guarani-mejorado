"use client";

import { BarChart, Download, FileText, Filter, Search } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample academic history data
const courses = [
	{
		id: 1,
		code: "MAT101",
		name: "Matemática I",
		year: 1,
		semester: 1,
		credits: 6,
		grade: 8,
		status: "approved",
		date: "12/12/2021",
	},
	{
		id: 2,
		code: "PRG101",
		name: "Programación I",
		year: 1,
		semester: 1,
		credits: 8,
		grade: 9,
		status: "approved",
		date: "15/12/2021",
	},
	{
		id: 3,
		code: "FIS101",
		name: "Física I",
		year: 1,
		semester: 1,
		credits: 6,
		grade: 7,
		status: "approved",
		date: "20/12/2021",
	},
	{
		id: 4,
		code: "QUI101",
		name: "Química",
		year: 1,
		semester: 1,
		credits: 4,
		grade: 6,
		status: "approved",
		date: "22/12/2021",
	},
	{
		id: 5,
		code: "MAT201",
		name: "Matemática II",
		year: 1,
		semester: 2,
		credits: 6,
		grade: 8,
		status: "approved",
		date: "10/07/2022",
	},
	{
		id: 6,
		code: "PRG102",
		name: "Programación II",
		year: 1,
		semester: 2,
		credits: 8,
		grade: 10,
		status: "approved",
		date: "15/07/2022",
	},
	{
		id: 7,
		code: "FIS201",
		name: "Física II",
		year: 1,
		semester: 2,
		credits: 6,
		grade: 8,
		status: "approved",
		date: "20/07/2022",
	},
	{
		id: 8,
		code: "ALG101",
		name: "Álgebra",
		year: 1,
		semester: 2,
		credits: 4,
		grade: 7,
		status: "approved",
		date: "25/07/2022",
	},
	{
		id: 9,
		code: "MAT301",
		name: "Matemática III",
		year: 2,
		semester: 1,
		credits: 6,
		grade: null,
		status: "in_progress",
		date: "",
	},
	{
		id: 10,
		code: "PRG201",
		name: "Programación III",
		year: 2,
		semester: 1,
		credits: 8,
		grade: null,
		status: "in_progress",
		date: "",
	},
];

export default function AcademicHistoryPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		year: "",
		semester: "",
		status: "",
	});

	// Calculate statistics
	const approvedCourses = courses.filter(
		(course) => course.status === "approved",
	);
	const totalCredits = approvedCourses.reduce(
		(sum, course) => sum + course.credits,
		0,
	);
	const weightedSum = approvedCourses.reduce(
		(sum, course) => sum + (course.grade || 0) * course.credits,
		0,
	);
	const gpa = weightedSum / totalCredits;

	// Filter courses based on search term and filters
	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.code.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesYear = filters.year
			? course.year.toString() === filters.year
			: true;
		const matchesSemester = filters.semester
			? course.semester.toString() === filters.semester
			: true;
		const matchesStatus = filters.status
			? course.status === filters.status
			: true;

		return matchesSearch && matchesYear && matchesSemester && matchesStatus;
	});

	const resetFilters = () => {
		setFilters({
			year: "",
			semester: "",
			status: "",
		});
		setFilterSheetOpen(false);
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "approved":
				return <Badge variant="success">Aprobada</Badge>;
			case "failed":
				return <Badge variant="destructive">Reprobada</Badge>;
			case "in_progress":
				return <Badge variant="outline">En curso</Badge>;
			default:
				return <Badge variant="secondary">Pendiente</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold text-3xl tracking-tight">
					Historial Académico
				</h1>
				<p className="text-muted-foreground">
					Consulta tu historial académico, notas y progreso en la carrera.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Materias Aprobadas
						</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{approvedCourses.length}</div>
						<p className="text-muted-foreground text-xs">
							De un total de {courses.length} materias
						</p>
						<Progress
							value={(approvedCourses.length / courses.length) * 100}
							className="mt-2 h-2"
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Promedio General
						</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{gpa.toFixed(2)}</div>
						<p className="text-muted-foreground text-xs">Escala 1-10</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Créditos Aprobados
						</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{totalCredits}</div>
						<p className="text-muted-foreground text-xs">
							De un total de 240 créditos
						</p>
						<Progress value={(totalCredits / 240) * 100} className="mt-2 h-2" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Avance de Carrera
						</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">33%</div>
						<p className="text-muted-foreground text-xs">
							2 de 6 semestres completados
						</p>
						<Progress value={33} className="mt-2 h-2" />
					</CardContent>
				</Card>
			</div>

			<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="relative w-full sm:max-w-sm">
					<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por nombre o código..."
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
								{(filters.year || filters.semester || filters.status) && (
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
									Filtra tu historial académico
								</SheetDescription>
							</SheetHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<label htmlFor="year">Año</label>
									<Select
										value={filters.year}
										onValueChange={(value) =>
											setFilters({ ...filters, year: value })
										}
									>
										<SelectTrigger id="year">
											<SelectValue placeholder="Todos los años" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos los años</SelectItem>
											<SelectItem value="1">Primer año</SelectItem>
											<SelectItem value="2">Segundo año</SelectItem>
											<SelectItem value="3">Tercer año</SelectItem>
											<SelectItem value="4">Cuarto año</SelectItem>
											<SelectItem value="5">Quinto año</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label htmlFor="semester">Semestre</label>
									<Select
										value={filters.semester}
										onValueChange={(value) =>
											setFilters({ ...filters, semester: value })
										}
									>
										<SelectTrigger id="semester">
											<SelectValue placeholder="Todos los semestres" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos los semestres</SelectItem>
											<SelectItem value="1">Primer semestre</SelectItem>
											<SelectItem value="2">Segundo semestre</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label htmlFor="status">Estado</label>
									<Select
										value={filters.status}
										onValueChange={(value) =>
											setFilters({ ...filters, status: value })
										}
									>
										<SelectTrigger id="status">
											<SelectValue placeholder="Todos los estados" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">Todos los estados</SelectItem>
											<SelectItem value="approved">Aprobadas</SelectItem>
											<SelectItem value="failed">Reprobadas</SelectItem>
											<SelectItem value="in_progress">En curso</SelectItem>
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

					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Descargar PDF
					</Button>
				</div>
			</div>

			<Tabs defaultValue="table" className="space-y-4">
				<TabsList>
					<TabsTrigger value="table">Tabla</TabsTrigger>
					<TabsTrigger value="cards">Tarjetas</TabsTrigger>
				</TabsList>

				<TabsContent value="table">
					<Card>
						<CardHeader>
							<CardTitle>Historial de Materias</CardTitle>
							<CardDescription>
								Listado completo de materias cursadas y en curso
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Código</TableHead>
										<TableHead>Materia</TableHead>
										<TableHead>Año</TableHead>
										<TableHead>Semestre</TableHead>
										<TableHead>Créditos</TableHead>
										<TableHead>Nota</TableHead>
										<TableHead>Estado</TableHead>
										<TableHead>Fecha</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredCourses.length > 0 ? (
										filteredCourses.map((course) => (
											<TableRow key={course.id}>
												<TableCell className="font-medium">
													{course.code}
												</TableCell>
												<TableCell>{course.name}</TableCell>
												<TableCell>{course.year}°</TableCell>
												<TableCell>{course.semester}°</TableCell>
												<TableCell>{course.credits}</TableCell>
												<TableCell>
													{course.grade !== null ? course.grade : "-"}
												</TableCell>
												<TableCell>{getStatusBadge(course.status)}</TableCell>
												<TableCell>{course.date || "-"}</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={8} className="text-center">
												No se encontraron materias con los criterios
												seleccionados.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="cards">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{filteredCourses.length > 0 ? (
							filteredCourses.map((course) => (
								<Card key={course.id}>
									<CardHeader className="pb-2">
										<div className="flex justify-between">
											<div>
												<CardTitle className="text-lg">{course.name}</CardTitle>
												<CardDescription>{course.code}</CardDescription>
											</div>
											{getStatusBadge(course.status)}
										</div>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-muted-foreground text-sm">
													Año:
												</span>
												<span>
													{course.year}° año, {course.semester}° semestre
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground text-sm">
													Créditos:
												</span>
												<span>{course.credits}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground text-sm">
													Nota:
												</span>
												<span className="font-medium">
													{course.grade !== null ? course.grade : "-"}
												</span>
											</div>
											{course.date && (
												<div className="flex justify-between">
													<span className="text-muted-foreground text-sm">
														Fecha:
													</span>
													<span>{course.date}</span>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="col-span-full py-10 text-center">
								<p className="text-muted-foreground">
									No se encontraron materias con los criterios seleccionados.
								</p>
							</div>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
