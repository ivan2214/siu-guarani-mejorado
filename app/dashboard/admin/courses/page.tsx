"use client";

import {
	ArrowUpDown,
	Book,
	ChevronRight,
	Download,
	Edit,
	Filter,
	Menu,
	Plus,
	Search,
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Sample courses data
const courses = [
	{
		id: 1,
		name: "Matemática III",
		code: "MAT301",
		career: "Ingeniería en Sistemas",
		department: "Ciencias Exactas",
		professor: "Dr. Juan Martínez",
		year: 2,
		semester: 1,
		credits: 6,
		status: "active",
		students: 25,
		description:
			"Cálculo avanzado, integrales múltiples y ecuaciones diferenciales.",
	},
	{
		id: 2,
		name: "Programación II",
		code: "PRG202",
		career: "Ingeniería en Sistemas",
		department: "Informática",
		professor: "Ing. María López",
		year: 2,
		semester: 1,
		credits: 8,
		status: "active",
		students: 30,
		description:
			"Programación orientada a objetos y estructuras de datos avanzadas.",
	},
	{
		id: 3,
		name: "Física II",
		code: "FIS201",
		career: "Ingeniería en Sistemas",
		department: "Ciencias Exactas",
		professor: "Dr. Roberto García",
		year: 2,
		semester: 1,
		credits: 6,
		status: "active",
		students: 28,
		description: "Electromagnetismo, ondas y óptica.",
	},
	{
		id: 4,
		name: "Estadística",
		code: "EST101",
		career: "Ingeniería en Sistemas",
		department: "Ciencias Exactas",
		professor: "Dra. Ana Fernández",
		year: 2,
		semester: 1,
		credits: 4,
		status: "active",
		students: 32,
		description:
			"Estadística descriptiva e inferencial, probabilidad y distribuciones.",
	},
	{
		id: 5,
		name: "Inglés Técnico",
		code: "ING201",
		career: "Ingeniería en Sistemas",
		department: "Idiomas",
		professor: "Lic. Carlos Pérez",
		year: 2,
		semester: 1,
		credits: 2,
		status: "active",
		students: 35,
		description: "Inglés técnico orientado a la informática y la ingeniería.",
	},
	{
		id: 6,
		name: "Álgebra Lineal",
		code: "ALG101",
		career: "Ingeniería Civil",
		department: "Ciencias Exactas",
		professor: "Dr. Pedro Gómez",
		year: 1,
		semester: 2,
		credits: 4,
		status: "inactive",
		students: 0,
		description: "Espacios vectoriales, matrices y transformaciones lineales.",
	},
];

// Sample careers data
const careers = [
	{ id: 1, name: "Ingeniería en Sistemas" },
	{ id: 2, name: "Ingeniería Civil" },
	{ id: 3, name: "Ingeniería Industrial" },
	{ id: 4, name: "Medicina" },
	{ id: 5, name: "Derecho" },
];

// Sample departments data
const departments = [
	{ id: 1, name: "Informática" },
	{ id: 2, name: "Ciencias Exactas" },
	{ id: 3, name: "Idiomas" },
	{ id: 4, name: "Construcción" },
	{ id: 5, name: "Producción" },
];

// Sample professors data
const professors = [
	{ id: 1, name: "Dr. Juan Martínez" },
	{ id: 2, name: "Ing. María López" },
	{ id: 3, name: "Dr. Roberto García" },
	{ id: 4, name: "Dra. Ana Fernández" },
	{ id: 5, name: "Lic. Carlos Pérez" },
	{ id: 6, name: "Dr. Pedro Gómez" },
];

export default function ManageCoursesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		career: "",
		department: "",
		status: "",
	});
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");
	const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<any>(null);
	const [newCourse, setNewCourse] = useState({
		name: "",
		code: "",
		career: "",
		department: "",
		professor: "",
		year: 1,
		semester: 1,
		credits: 4,
		status: "active",
		description: "",
	});

	// Filter courses based on search term and filters
	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.professor.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesCareer = filters.career
			? course.career === filters.career
			: true;
		const matchesDepartment = filters.department
			? course.department === filters.department
			: true;
		const matchesStatus = filters.status
			? course.status === filters.status
			: true;

		return matchesSearch && matchesCareer && matchesDepartment && matchesStatus;
	});

	// Sort courses
	const sortedCourses = [...filteredCourses].sort((a, b) => {
		if (sortOrder === "asc") {
			return a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b] ? 1 : -1;
		}
		return a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b] ? 1 : -1;
	});

	const resetFilters = () => {
		setFilters({
			career: "",
			department: "",
			status: "",
		});
		setFilterSheetOpen(false);
	};

	const handleSort = (column: string) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(column);
			setSortOrder("asc");
		}
	};

	const handleAddCourse = () => {
		toast.success(
			selectedCourse
				? "Materia actualizada correctamente"
				: "Materia agregada correctamente",
		);
		setIsAddCourseOpen(false);
		setSelectedCourse(null);
		setNewCourse({
			name: "",
			code: "",
			career: "",
			department: "",
			professor: "",
			year: 1,
			semester: 1,
			credits: 4,
			status: "active",
			description: "",
		});
	};

	const handleEditCourse = (course: any) => {
		setSelectedCourse(course);
		setNewCourse({
			name: course.name,
			code: course.code,
			career: course.career,
			department: course.department,
			professor: course.professor,
			year: course.year,
			semester: course.semester,
			credits: course.credits,
			status: course.status,
			description: course.description,
		});
		setIsAddCourseOpen(true);
	};

	const handleDeleteCourse = () => {
		toast.success("Materia eliminada correctamente");
		setIsDeleteDialogOpen(false);
		setSelectedCourse(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">
						Gestión de Materias
					</h1>
					<p className="text-muted-foreground">
						Administra las materias de la institución
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => toast.success("Reporte descargado")}
					>
						<Download className="mr-2 h-4 w-4" />
						Exportar
					</Button>
					<Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Nueva materia
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[600px]">
							<DialogHeader>
								<DialogTitle>
									{selectedCourse ? "Editar materia" : "Agregar nueva materia"}
								</DialogTitle>
								<DialogDescription>
									{selectedCourse
										? "Modifica los datos de la materia seleccionada"
										: "Completa los datos para crear una nueva materia"}
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="name">Nombre de la materia</Label>
										<Input
											id="name"
											value={newCourse.name}
											onChange={(e) =>
												setNewCourse({ ...newCourse, name: e.target.value })
											}
											placeholder="Ej: Matemática III"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="code">Código</Label>
										<Input
											id="code"
											value={newCourse.code}
											onChange={(e) =>
												setNewCourse({ ...newCourse, code: e.target.value })
											}
											placeholder="Ej: MAT301"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="career">Carrera</Label>
										<Select
											value={newCourse.career}
											onValueChange={(value) =>
												setNewCourse({ ...newCourse, career: value })
											}
										>
											<SelectTrigger id="career">
												<SelectValue placeholder="Seleccionar carrera" />
											</SelectTrigger>
											<SelectContent>
												{careers.map((career) => (
													<SelectItem key={career.id} value={career.name}>
														{career.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="department">Departamento</Label>
										<Select
											value={newCourse.department}
											onValueChange={(value) =>
												setNewCourse({ ...newCourse, department: value })
											}
										>
											<SelectTrigger id="department">
												<SelectValue placeholder="Seleccionar departamento" />
											</SelectTrigger>
											<SelectContent>
												{departments.map((dept) => (
													<SelectItem key={dept.id} value={dept.name}>
														{dept.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="professor">Profesor</Label>
									<Select
										value={newCourse.professor}
										onValueChange={(value) =>
											setNewCourse({ ...newCourse, professor: value })
										}
									>
										<SelectTrigger id="professor">
											<SelectValue placeholder="Seleccionar profesor" />
										</SelectTrigger>
										<SelectContent>
											{professors.map((prof) => (
												<SelectItem key={prof.id} value={prof.name}>
													{prof.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div className="space-y-2">
										<Label htmlFor="year">Año</Label>
										<Select
											value={String(newCourse.year)}
											onValueChange={(value) =>
												setNewCourse({ ...newCourse, year: Number(value) })
											}
										>
											<SelectTrigger id="year">
												<SelectValue placeholder="Año" />
											</SelectTrigger>
											<SelectContent>
												{[1, 2, 3, 4, 5].map((year) => (
													<SelectItem key={year} value={String(year)}>
														{year}° año
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="semester">Semestre</Label>
										<Select
											value={String(newCourse.semester)}
											onValueChange={(value) =>
												setNewCourse({ ...newCourse, semester: Number(value) })
											}
										>
											<SelectTrigger id="semester">
												<SelectValue placeholder="Semestre" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1">1° semestre</SelectItem>
												<SelectItem value="2">2° semestre</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="credits">Créditos</Label>
										<Input
											id="credits"
											type="number"
											min="1"
											max="10"
											value={newCourse.credits}
											onChange={(e) =>
												setNewCourse({
													...newCourse,
													credits: Number(e.target.value),
												})
											}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="description">Descripción</Label>
									<Textarea
										id="description"
										value={newCourse.description}
										onChange={(e) =>
											setNewCourse({
												...newCourse,
												description: e.target.value,
											})
										}
										placeholder="Breve descripción de la materia"
										rows={3}
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label htmlFor="status">Estado</Label>
									<div className="flex items-center gap-2">
										<Label htmlFor="status" className="text-sm">
											{newCourse.status === "active" ? "Activa" : "Inactiva"}
										</Label>
										<Switch
											id="status"
											checked={newCourse.status === "active"}
											onCheckedChange={(checked) =>
												setNewCourse({
													...newCourse,
													status: checked ? "active" : "inactive",
												})
											}
										/>
									</div>
								</div>
							</div>
							<DialogFooter>
								<Button
									variant="outline"
									onClick={() => {
										setIsAddCourseOpen(false);
										setSelectedCourse(null);
										setNewCourse({
											name: "",
											code: "",
											career: "",
											department: "",
											professor: "",
											year: 1,
											semester: 1,
											credits: 4,
											status: "active",
											description: "",
										});
									}}
								>
									Cancelar
								</Button>
								<Button onClick={handleAddCourse}>
									{selectedCourse ? "Guardar cambios" : "Agregar materia"}
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
								{(filters.career || filters.department || filters.status) && (
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
									<label htmlFor="career-filter">Carrera</label>
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
											<SelectItem value="">Todas las carreras</SelectItem>
											{careers.map((career) => (
												<SelectItem key={career.id} value={career.name}>
													{career.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label htmlFor="department-filter">Departamento</label>
									<Select
										value={filters.department}
										onValueChange={(value) =>
											setFilters({ ...filters, department: value })
										}
									>
										<SelectTrigger id="department-filter">
											<SelectValue placeholder="Todos los departamentos" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="">Todos los departamentos</SelectItem>
											{departments.map((dept) => (
												<SelectItem key={dept.id} value={dept.name}>
													{dept.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label htmlFor="status-filter">Estado</label>
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
											<SelectItem value="active">Activas</SelectItem>
											<SelectItem value="inactive">Inactivas</SelectItem>
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

			<Card>
				<CardHeader>
					<CardTitle>Listado de Materias</CardTitle>
					<CardDescription>
						Total: {sortedCourses.length} materias
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]">#</TableHead>
								<TableHead>
									<Button
										className="flex cursor-pointer items-center gap-1"
										onClick={() => handleSort("name")}
									>
										Nombre
										{sortBy === "name" && <ArrowUpDown className="h-4 w-4" />}
									</Button>
								</TableHead>
								<TableHead>
									<Button
										className="flex cursor-pointer items-center gap-1"
										onClick={() => handleSort("code")}
									>
										Código
										{sortBy === "code" && <ArrowUpDown className="h-4 w-4" />}
									</Button>
								</TableHead>
								<TableHead>
									<Button
										className="flex cursor-pointer items-center gap-1"
										onClick={() => handleSort("career")}
									>
										Carrera
										{sortBy === "career" && <ArrowUpDown className="h-4 w-4" />}
									</Button>
								</TableHead>
								<TableHead>
									<Button
										className="flex cursor-pointer items-center gap-1"
										onClick={() => handleSort("professor")}
									>
										Profesor
										{sortBy === "professor" && (
											<ArrowUpDown className="h-4 w-4" />
										)}
									</Button>
								</TableHead>
								<TableHead>
									<Button
										className="flex cursor-pointer items-center gap-1"
										onClick={() => handleSort("year")}
									>
										Año/Sem
										{sortBy === "year" && <ArrowUpDown className="h-4 w-4" />}
									</Button>
								</TableHead>
								<TableHead>
									<Button
										className="flex cursor-pointer items-center gap-1"
										onClick={() => handleSort("credits")}
									>
										Créditos
										{sortBy === "credits" && (
											<ArrowUpDown className="h-4 w-4" />
										)}
									</Button>
								</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead className="text-right">Acciones</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sortedCourses.length > 0 ? (
								sortedCourses.map((course, index) => (
									<TableRow key={course.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell className="font-medium">{course.name}</TableCell>
										<TableCell>{course.code}</TableCell>
										<TableCell>{course.career}</TableCell>
										<TableCell>{course.professor}</TableCell>
										<TableCell>
											{course.year}°/{course.semester}°
										</TableCell>
										<TableCell>{course.credits}</TableCell>
										<TableCell>
											<Badge
												variant={
													course.status === "active" ? "outline" : "secondary"
												}
											>
												{course.status === "active" ? "Activa" : "Inactiva"}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<Menu className="h-4 w-4" />
														<span className="sr-only">Abrir menú</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Acciones</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={() => handleEditCourse(course)}
													>
														<Edit className="mr-2 h-4 w-4" />
														<span>Editar</span>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															setSelectedCourse(course);
															setIsDeleteDialogOpen(true);
														}}
													>
														<Trash2 className="mr-2 h-4 w-4" />
														<span>Eliminar</span>
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem>
														<ChevronRight className="mr-2 h-4 w-4" />
														<Link
															href={`/dashboard/admin/courses/${course.id}`}
														>
															Ver detalles
														</Link>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={8} className="py-6 text-center">
										<div className="flex flex-col items-center justify-center">
											<Book className="mb-2 h-8 w-8 text-muted-foreground" />
											<p className="text-muted-foreground">
												No se encontraron materias con los criterios
												seleccionados.
											</p>
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Eliminar materia</DialogTitle>
						<DialogDescription>
							¿Estás seguro de que deseas eliminar la materia{" "}
							{selectedCourse?.name}?
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<p className="text-muted-foreground text-sm">
							Esta acción no se puede deshacer. Se eliminará la materia y todos
							sus datos asociados.
						</p>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancelar
						</Button>
						<Button variant="destructive" onClick={handleDeleteCourse}>
							Eliminar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
