"use client";

import {
	Book,
	Check,
	ChevronRight,
	Clock,
	Download,
	Filter,
	Save,
	Search,
	Users,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

// Sample courses data
const courses = [
	{
		id: 1,
		code: "MAT301",
		name: "Matemática III",
		career: "Ingeniería en Sistemas",
		year: 2,
		semester: 1,
		students: 25,
		status: "active",
		pendingAttendance: false,
		classes: [
			{
				id: 1,
				date: "2023-06-05",
				type: "Teórica",
				status: "completed",
				attendance: true,
			},
			{
				id: 2,
				date: "2023-06-07",
				type: "Práctica",
				status: "completed",
				attendance: true,
			},
			{
				id: 3,
				date: "2023-06-12",
				type: "Teórica",
				status: "completed",
				attendance: false,
			},
			{
				id: 4,
				date: "2023-06-14",
				type: "Práctica",
				status: "upcoming",
				attendance: false,
			},
		],
	},
	{
		id: 2,
		code: "MAT101",
		name: "Matemática I",
		career: "Ingeniería Civil",
		year: 1,
		semester: 1,
		students: 40,
		status: "active",
		pendingAttendance: true,
		classes: [
			{
				id: 5,
				date: "2023-06-06",
				type: "Teórica",
				status: "completed",
				attendance: true,
			},
			{
				id: 6,
				date: "2023-06-08",
				type: "Práctica",
				status: "completed",
				attendance: false,
			},
			{
				id: 7,
				date: "2023-06-13",
				type: "Teórica",
				status: "completed",
				attendance: false,
			},
			{
				id: 8,
				date: "2023-06-15",
				type: "Práctica",
				status: "upcoming",
				attendance: false,
			},
		],
	},
	{
		id: 3,
		code: "MAT201",
		name: "Matemática II",
		career: "Ingeniería Industrial",
		year: 1,
		semester: 2,
		students: 35,
		status: "active",
		pendingAttendance: true,
		classes: [
			{
				id: 9,
				date: "2023-06-02",
				type: "Teórica",
				status: "completed",
				attendance: true,
			},
			{
				id: 10,
				date: "2023-06-09",
				type: "Práctica",
				status: "completed",
				attendance: true,
			},
			{
				id: 11,
				date: "2023-06-16",
				type: "Teórica",
				status: "upcoming",
				attendance: false,
			},
			{
				id: 12,
				date: "2023-06-23",
				type: "Práctica",
				status: "upcoming",
				attendance: false,
			},
		],
	},
];

// Sample students data for a specific class
const studentsData = [
	{
		id: 1,
		name: "Juan Pérez",
		legajo: "12345",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "regular",
		attendance: true,
		totalAttendance: 85,
	},
	{
		id: 2,
		name: "María López",
		legajo: "12346",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "regular",
		attendance: true,
		totalAttendance: 90,
	},
	{
		id: 3,
		name: "Carlos Rodríguez",
		legajo: "12347",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "regular",
		attendance: false,
		totalAttendance: 75,
	},
	{
		id: 4,
		name: "Ana Fernández",
		legajo: "12348",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "regular",
		attendance: true,
		totalAttendance: 95,
	},
	{
		id: 5,
		name: "Pedro Gómez",
		legajo: "12349",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "regular",
		attendance: false,
		totalAttendance: 80,
	},
	{
		id: 6,
		name: "Laura Martínez",
		legajo: "12350",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "regular",
		attendance: true,
		totalAttendance: 70,
	},
	{
		id: 7,
		name: "Roberto García",
		legajo: "12351",
		avatar: "/placeholder.svg?height=32&width=32",
		status: "conditional",
		attendance: false,
		totalAttendance: 65,
	},
];

export default function AttendancePage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [filters, setFilters] = useState({
		status: "",
		career: "",
	});
	const [selectedCourse, setSelectedCourse] = useState<any>(null);
	const [selectedClass, setSelectedClass] = useState<any>(null);
	const [editingStudents, setEditingStudents] = useState<any[]>([]);
	const [isEditing, setIsEditing] = useState(false);

	// Filter courses based on search term and filters
	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.career.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = filters.status
			? course.status === filters.status
			: true;
		const matchesCareer = filters.career
			? course.career === filters.career
			: true;

		return matchesSearch && matchesStatus && matchesCareer;
	});

	const resetFilters = () => {
		setFilters({
			status: "",
			career: "",
		});
		setFilterSheetOpen(false);
	};

	const handleSelectCourse = (course: any) => {
		setSelectedCourse(course);
		setSelectedClass(null);
	};

	const handleSelectClass = (classItem: any) => {
		setSelectedClass(classItem);
		setEditingStudents(studentsData.map((student) => ({ ...student })));
		setIsEditing(false);
	};

	const handleAttendanceChange = (studentId: number, value: boolean) => {
		setEditingStudents((prev) =>
			prev.map((student) =>
				student.id === studentId ? { ...student, attendance: value } : student,
			),
		);
	};

	const handleSaveAttendance = () => {
		toast.success("Asistencia guardada correctamente");
		setIsEditing(false);
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
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">
						Registro de Asistencia
					</h1>
					<p className="text-muted-foreground">
						Administra la asistencia de tus cursos
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => toast.success("Reporte descargado")}
					>
						<Download className="mr-2 h-4 w-4" />
						Descargar reporte
					</Button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="relative w-full sm:max-w-sm">
					<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por nombre, código o carrera..."
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
								{(filters.status || filters.career) && (
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
									Filtra tus cursos según tus preferencias
								</SheetDescription>
							</SheetHeader>
							<div className="grid gap-4 py-4">
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
											<SelectItem value="active">En curso</SelectItem>
											<SelectItem value="upcoming">Próximos</SelectItem>
											<SelectItem value="finished">Finalizados</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label htmlFor="career">Carrera</label>
									<Select
										value={filters.career}
										onValueChange={(value) =>
											setFilters({ ...filters, career: value })
										}
									>
										<SelectTrigger id="career">
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
											<SelectItem value="Ingeniería Industrial">
												Ingeniería Industrial
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
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="md:col-span-1">
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Mis Cursos</CardTitle>
							<CardDescription>
								Selecciona un curso para gestionar su asistencia
							</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<div className="space-y-1">
								{filteredCourses.length > 0 ? (
									filteredCourses.map((course) => (
										<Button
											key={course.id}
											className={`flex w-full items-center justify-between p-3 text-left hover:bg-muted ${
												selectedCourse?.id === course.id ? "bg-muted" : ""
											}`}
											onClick={() => handleSelectCourse(course)}
										>
											<div>
												<p className="font-medium">{course.name}</p>
												<p className="text-muted-foreground text-sm">
													{course.code} - {course.career}
												</p>
											</div>
											<div className="flex items-center">
												{course.pendingAttendance && (
													<Badge
														variant="outline"
														className="mr-2 border-amber-500 text-amber-500"
													>
														Pendiente
													</Badge>
												)}
												<ChevronRight className="h-4 w-4 text-muted-foreground" />
											</div>
										</Button>
									))
								) : (
									<div className="py-6 text-center">
										<p className="text-muted-foreground">
											No se encontraron cursos con los criterios seleccionados.
										</p>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="md:col-span-2">
					{selectedCourse ? (
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div>
											<CardTitle>{selectedCourse.name}</CardTitle>
											<CardDescription>
												{selectedCourse.code} - {selectedCourse.career}
											</CardDescription>
										</div>
										<Badge variant="outline">
											{selectedCourse.students} estudiantes
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<h3 className="font-medium text-sm">Clases</h3>
										<div className="space-y-2">
											{selectedCourse.classes.map((classItem: any) => (
												<Button
													key={classItem.id}
													className={`flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-muted ${
														selectedClass?.id === classItem.id ? "bg-muted" : ""
													}`}
													onClick={() => handleSelectClass(classItem)}
												>
													<div className="flex items-center gap-3">
														<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
															{classItem.type === "Teórica" ? (
																<Book className="h-4 w-4 text-primary" />
															) : (
																<Clock className="h-4 w-4 text-primary" />
															)}
														</div>
														<div>
															<p className="font-medium">
																Clase {classItem.type}
															</p>
															<p className="text-muted-foreground text-sm">
																{formatDate(classItem.date)}
															</p>
														</div>
													</div>
													<div className="flex items-center gap-2">
														{classItem.status === "completed" ? (
															classItem.attendance ? (
																<Badge
																	variant="outline"
																	className="border-green-500 text-green-500"
																>
																	Registrada
																</Badge>
															) : (
																<Badge
																	variant="outline"
																	className="border-amber-500 text-amber-500"
																>
																	Pendiente
																</Badge>
															)
														) : (
															<Badge variant="outline">Próxima</Badge>
														)}
														<ChevronRight className="h-4 w-4 text-muted-foreground" />
													</div>
												</Button>
											))}
										</div>
									</div>
								</CardContent>
							</Card>

							{selectedClass && (
								<Card>
									<CardHeader>
										<div className="flex items-start justify-between">
											<div>
												<CardTitle>Clase {selectedClass.type}</CardTitle>
												<CardDescription>
													{formatDate(selectedClass.date)}
												</CardDescription>
											</div>
											<div className="flex gap-2">
												{isEditing ? (
													<>
														<Button
															variant="outline"
															onClick={() => setIsEditing(false)}
														>
															Cancelar
														</Button>
														<Button onClick={handleSaveAttendance}>
															<Save className="mr-2 h-4 w-4" />
															Guardar
														</Button>
													</>
												) : (
													<Button onClick={() => setIsEditing(true)}>
														Editar asistencia
													</Button>
												)}
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className="w-[50px]">#</TableHead>
													<TableHead>Estudiante</TableHead>
													<TableHead>Legajo</TableHead>
													<TableHead>Estado</TableHead>
													<TableHead>Asistencia total</TableHead>
													<TableHead className="text-right">Presente</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{editingStudents.map((student, index) => (
													<TableRow key={student.id}>
														<TableCell>{index + 1}</TableCell>
														<TableCell>
															<div className="flex items-center gap-2">
																<Avatar className="h-8 w-8">
																	<AvatarImage
																		src={student.avatar}
																		alt={student.name}
																	/>
																	<AvatarFallback>
																		{student.name.charAt(0)}
																	</AvatarFallback>
																</Avatar>
																<span>{student.name}</span>
															</div>
														</TableCell>
														<TableCell>{student.legajo}</TableCell>
														<TableCell>
															<Badge
																variant={
																	student.status === "regular"
																		? "outline"
																		: "secondary"
																}
															>
																{student.status === "regular"
																	? "Regular"
																	: "Condicional"}
															</Badge>
														</TableCell>
														<TableCell>{student.totalAttendance}%</TableCell>
														<TableCell className="text-right">
															{isEditing ? (
																<Checkbox
																	checked={student.attendance}
																	onCheckedChange={(checked) =>
																		handleAttendanceChange(
																			student.id,
																			checked as boolean,
																		)
																	}
																/>
															) : student.attendance ? (
																<Check className="ml-auto h-4 w-4 text-green-500" />
															) : (
																<span className="text-muted-foreground">
																	Ausente
																</span>
															)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
									<CardFooter className="flex justify-between">
										<div className="text-muted-foreground text-sm">
											Total: {editingStudents.length} estudiantes
										</div>
										<div className="text-sm">
											Presentes:{" "}
											{editingStudents.filter((s) => s.attendance).length} (
											{Math.round(
												(editingStudents.filter((s) => s.attendance).length /
													editingStudents.length) *
													100,
											)}
											%)
										</div>
									</CardFooter>
								</Card>
							)}
						</div>
					) : (
						<Card className="flex h-full items-center justify-center">
							<CardContent className="py-10 text-center">
								<Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
								<h3 className="mb-2 font-medium text-lg">
									Selecciona un curso
								</h3>
								<p className="text-muted-foreground">
									Selecciona un curso de la lista para gestionar su asistencia
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
