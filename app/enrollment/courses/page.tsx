"use client";

import { Check, Filter, Info, Search } from "lucide-react";
import { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";

// Sample courses data
const courses = [
	{
		id: 1,
		code: "MAT301",
		name: "Matemática III",
		professor: "Dr. Juan Martínez",
		schedule: "Lunes y Miércoles 10:00-12:00",
		location: "Aula 305",
		quota: 40,
		enrolled: 25,
		credits: 6,
		year: 2,
		semester: 1,
		department: "Ciencias Exactas",
		prerequisites: ["Matemática II"],
		status: "available",
	},
	{
		id: 2,
		code: "PRG202",
		name: "Programación II",
		professor: "Ing. María López",
		schedule: "Martes y Jueves 14:00-16:00",
		location: "Laboratorio 2",
		quota: 30,
		enrolled: 28,
		credits: 8,
		year: 2,
		semester: 1,
		department: "Informática",
		prerequisites: ["Programación I", "Algoritmos"],
		status: "available",
	},
	{
		id: 3,
		code: "FIS201",
		name: "Física II",
		professor: "Dr. Roberto García",
		schedule: "Lunes y Viernes 08:00-10:00",
		location: "Aula 201",
		quota: 45,
		enrolled: 30,
		credits: 6,
		year: 2,
		semester: 1,
		department: "Ciencias Exactas",
		prerequisites: ["Física I", "Matemática I"],
		status: "available",
	},
	{
		id: 4,
		code: "EST101",
		name: "Estadística",
		professor: "Dra. Ana Fernández",
		schedule: "Miércoles 14:00-18:00",
		location: "Aula 105",
		quota: 50,
		enrolled: 35,
		credits: 4,
		year: 2,
		semester: 1,
		department: "Ciencias Exactas",
		prerequisites: ["Matemática I"],
		status: "available",
	},
	{
		id: 5,
		code: "ING201",
		name: "Inglés Técnico",
		professor: "Lic. Carlos Pérez",
		schedule: "Viernes 14:00-16:00",
		location: "Aula 102",
		quota: 35,
		enrolled: 35,
		credits: 2,
		year: 2,
		semester: 1,
		department: "Idiomas",
		prerequisites: [],
		status: "full",
	},
];

export default function EnrollmentCoursesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		year: "",
		semester: "",
		department: "",
	});

	// Filter courses based on search term and filters
	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.professor.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesYear = filters.year
			? course.year.toString() === filters.year
			: true;
		const matchesSemester = filters.semester
			? course.semester.toString() === filters.semester
			: true;
		const matchesDepartment = filters.department
			? course.department === filters.department
			: true;

		return matchesSearch && matchesYear && matchesSemester && matchesDepartment;
	});

	const handleCourseSelection = (courseId: number) => {
		setSelectedCourses((prev) => {
			if (prev.includes(courseId)) {
				return prev.filter((id) => id !== courseId);
			}
			return [...prev, courseId];
		});
	};

	const handleEnrollment = () => {
		toast("Inscripción exitosa", {
			description: `Te has inscrito en ${selectedCourses.length} materias.`,
		});
		setSelectedCourses([]);
	};

	const resetFilters = () => {
		setFilters({
			year: "",
			semester: "",
			department: "",
		});
		setFilterSheetOpen(false);
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold text-3xl tracking-tight">
					Inscripción a Materias
				</h1>
				<p className="text-muted-foreground">
					Selecciona las materias a las que deseas inscribirte para el próximo
					período académico.
				</p>
			</div>

			<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="relative w-full sm:max-w-sm">
					<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por nombre, código o profesor..."
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
								{(filters.year || filters.semester || filters.department) && (
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
									Filtra las materias según tus preferencias
								</SheetDescription>
							</SheetHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="year">Año</Label>
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
									<Label htmlFor="semester">Semestre</Label>
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
									<Label htmlFor="department">Departamento</Label>
									<Select
										value={filters.department}
										onValueChange={(value) =>
											setFilters({ ...filters, department: value })
										}
									>
										<SelectTrigger id="department">
											<SelectValue placeholder="Todos los departamentos" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">
												Todos los departamentos
											</SelectItem>
											<SelectItem value="Ciencias Exactas">
												Ciencias Exactas
											</SelectItem>
											<SelectItem value="Informática">Informática</SelectItem>
											<SelectItem value="Idiomas">Idiomas</SelectItem>
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
						disabled={selectedCourses.length === 0}
					>
						Inscribirse ({selectedCourses.length})
					</Button>
				</div>
			</div>

			<Tabs defaultValue="list" className="space-y-4">
				<TabsList>
					<TabsTrigger value="list">Lista</TabsTrigger>
					<TabsTrigger value="grid">Cuadrícula</TabsTrigger>
				</TabsList>

				<TabsContent value="list" className="space-y-4">
					{filteredCourses.length > 0 ? (
						filteredCourses.map((course) => (
							<Card
								key={course.id}
								className={course.status === "full" ? "opacity-70" : ""}
							>
								<CardHeader className="pb-2">
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-lg">{course.name}</CardTitle>
											<CardDescription>
												{course.code} - {course.professor}
											</CardDescription>
										</div>
										<div className="flex items-center gap-2">
											{course.status === "full" ? (
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
													{course.quota - course.enrolled} cupos disponibles
												</Badge>
											)}
											<Checkbox
												checked={selectedCourses.includes(course.id)}
												onCheckedChange={() => handleCourseSelection(course.id)}
												disabled={course.status === "full"}
												className="h-5 w-5"
											/>
										</div>
									</div>
								</CardHeader>
								<CardContent className="pb-2">
									<div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
										<div className="flex items-center gap-2">
											<span className="font-medium">Horario:</span>
											<span>{course.schedule}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-medium">Ubicación:</span>
											<span>{course.location}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-medium">Créditos:</span>
											<span>{course.credits}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-medium">Departamento:</span>
											<span>{course.department}</span>
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<div className="text-sm">
										<span className="font-medium">Requisitos: </span>
										{course.prerequisites.length > 0
											? course.prerequisites.join(", ")
											: "Ninguno"}
									</div>
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="ghost" size="sm">
												<Info className="mr-1 h-4 w-4" />
												Detalles
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													{course.name} ({course.code})
												</DialogTitle>
												<DialogDescription>
													Información detallada de la materia
												</DialogDescription>
											</DialogHeader>
											<div className="space-y-4 py-4">
												<div className="grid grid-cols-2 gap-4">
													<div>
														<h4 className="mb-1 font-medium">Profesor</h4>
														<p className="text-sm">{course.professor}</p>
													</div>
													<div>
														<h4 className="mb-1 font-medium">Horario</h4>
														<p className="text-sm">{course.schedule}</p>
													</div>
													<div>
														<h4 className="mb-1 font-medium">Ubicación</h4>
														<p className="text-sm">{course.location}</p>
													</div>
													<div>
														<h4 className="mb-1 font-medium">Cupos</h4>
														<p className="text-sm">
															{course.enrolled}/{course.quota}
														</p>
													</div>
													<div>
														<h4 className="mb-1 font-medium">Créditos</h4>
														<p className="text-sm">{course.credits}</p>
													</div>
													<div>
														<h4 className="mb-1 font-medium">Departamento</h4>
														<p className="text-sm">{course.department}</p>
													</div>
												</div>
												<div>
													<h4 className="mb-1 font-medium">
														Requisitos previos
													</h4>
													<p className="text-sm">
														{course.prerequisites.length > 0
															? course.prerequisites.join(", ")
															: "Ninguno"}
													</p>
												</div>
												<div>
													<h4 className="mb-1 font-medium">Descripción</h4>
													<p className="text-sm">
														Esta es una descripción detallada de la materia{" "}
														{course.name}. Incluye los objetivos, contenidos y
														metodología de evaluación.
													</p>
												</div>
											</div>
											<DialogFooter>
												<Button
													onClick={() => handleCourseSelection(course.id)}
													disabled={
														course.status === "full" ||
														selectedCourses.includes(course.id)
													}
												>
													{selectedCourses.includes(course.id) ? (
														<>
															<Check className="mr-2 h-4 w-4" />
															Seleccionado
														</>
													) : (
														"Seleccionar"
													)}
												</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</CardFooter>
							</Card>
						))
					) : (
						<div className="py-10 text-center">
							<p className="text-muted-foreground">
								No se encontraron materias con los criterios seleccionados.
							</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="grid">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{filteredCourses.length > 0 ? (
							filteredCourses.map((course) => (
								<Card
									key={course.id}
									className={course.status === "full" ? "opacity-70" : ""}
								>
									<CardHeader className="pb-2">
										<div className="flex items-start justify-between">
											<div>
												<CardTitle className="text-lg">{course.name}</CardTitle>
												<CardDescription>{course.code}</CardDescription>
											</div>
											<Checkbox
												checked={selectedCourses.includes(course.id)}
												onCheckedChange={() => handleCourseSelection(course.id)}
												disabled={course.status === "full"}
												className="h-5 w-5"
											/>
										</div>
									</CardHeader>
									<CardContent className="pb-2">
										<div className="space-y-2 text-sm">
											<div className="flex items-center gap-2">
												<span className="font-medium">Profesor:</span>
												<span>{course.professor}</span>
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Horario:</span>
												<span>{course.schedule}</span>
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Créditos:</span>
												<span>{course.credits}</span>
											</div>
										</div>
									</CardContent>
									<CardFooter className="flex justify-between">
										{course.status === "full" ? (
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
												{course.quota - course.enrolled} cupos
											</Badge>
										)}
										<Dialog>
											<DialogTrigger asChild>
												<Button variant="ghost" size="sm">
													<Info className="mr-1 h-4 w-4" />
													Detalles
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>
														{course.name} ({course.code})
													</DialogTitle>
													<DialogDescription>
														Información detallada de la materia
													</DialogDescription>
												</DialogHeader>
												<div className="space-y-4 py-4">
													<div className="grid grid-cols-2 gap-4">
														<div>
															<h4 className="mb-1 font-medium">Profesor</h4>
															<p className="text-sm">{course.professor}</p>
														</div>
														<div>
															<h4 className="mb-1 font-medium">Horario</h4>
															<p className="text-sm">{course.schedule}</p>
														</div>
														<div>
															<h4 className="mb-1 font-medium">Ubicación</h4>
															<p className="text-sm">{course.location}</p>
														</div>
														<div>
															<h4 className="mb-1 font-medium">Cupos</h4>
															<p className="text-sm">
																{course.enrolled}/{course.quota}
															</p>
														</div>
													</div>
													<div>
														<h4 className="mb-1 font-medium">
															Requisitos previos
														</h4>
														<p className="text-sm">
															{course.prerequisites.length > 0
																? course.prerequisites.join(", ")
																: "Ninguno"}
														</p>
													</div>
												</div>
												<DialogFooter>
													<Button
														onClick={() => handleCourseSelection(course.id)}
														disabled={
															course.status === "full" ||
															selectedCourses.includes(course.id)
														}
													>
														{selectedCourses.includes(course.id) ? (
															<>
																<Check className="mr-2 h-4 w-4" />
																Seleccionado
															</>
														) : (
															"Seleccionar"
														)}
													</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</CardFooter>
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
