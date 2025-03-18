"use client";

import { useState } from "react";
import {
  ChevronRight,
  Download,
  Filter,
  Pencil,
  Save,
  Search,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    pendingGrades: true,
    evaluations: [
      {
        id: 1,
        name: "Primer Parcial",
        date: "2023-04-15",
        status: "completed",
        published: true,
      },
      {
        id: 2,
        name: "Segundo Parcial",
        date: "2023-06-10",
        status: "completed",
        published: false,
      },
      {
        id: 3,
        name: "Trabajo Práctico",
        date: "2023-05-20",
        status: "completed",
        published: true,
      },
      {
        id: 4,
        name: "Examen Final",
        date: "2023-07-05",
        status: "pending",
        published: false,
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
    pendingGrades: false,
    evaluations: [
      {
        id: 5,
        name: "Primer Parcial",
        date: "2023-04-10",
        status: "completed",
        published: true,
      },
      {
        id: 6,
        name: "Segundo Parcial",
        date: "2023-06-05",
        status: "completed",
        published: true,
      },
      {
        id: 7,
        name: "Trabajo Práctico",
        date: "2023-05-15",
        status: "completed",
        published: true,
      },
      {
        id: 8,
        name: "Examen Final",
        date: "2023-07-10",
        status: "pending",
        published: false,
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
    pendingGrades: true,
    evaluations: [
      {
        id: 9,
        name: "Primer Parcial",
        date: "2023-04-12",
        status: "completed",
        published: true,
      },
      {
        id: 10,
        name: "Segundo Parcial",
        date: "2023-06-07",
        status: "completed",
        published: false,
      },
      {
        id: 11,
        name: "Trabajo Práctico",
        date: "2023-05-18",
        status: "completed",
        published: true,
      },
      {
        id: 12,
        name: "Examen Final",
        date: "2023-07-12",
        status: "pending",
        published: false,
      },
    ],
  },
];

// Sample students data for a specific evaluation
const studentsData = [
  {
    id: 1,
    name: "Juan Pérez",
    legajo: "12345",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: 8,
    status: "regular",
    attendance: 85,
  },
  {
    id: 2,
    name: "María López",
    legajo: "12346",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: 7,
    status: "regular",
    attendance: 90,
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    legajo: "12347",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: null,
    status: "regular",
    attendance: 75,
  },
  {
    id: 4,
    name: "Ana Fernández",
    legajo: "12348",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: 9,
    status: "regular",
    attendance: 95,
  },
  {
    id: 5,
    name: "Pedro Gómez",
    legajo: "12349",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: 6,
    status: "regular",
    attendance: 80,
  },
  {
    id: 6,
    name: "Laura Martínez",
    legajo: "12350",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: null,
    status: "regular",
    attendance: 70,
  },
  {
    id: 7,
    name: "Roberto García",
    legajo: "12351",
    avatar: "/placeholder.svg?height=32&width=32",
    grade: 4,
    status: "conditional",
    attendance: 65,
  },
];

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    career: "",
  });
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
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
    setSelectedEvaluation(null);
  };

  const handleSelectEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setEditingStudents(studentsData.map((student) => ({ ...student })));
    setIsEditing(false);
  };

  const handleGradeChange = (studentId: number, value: string) => {
    const numValue = value === "" ? null : Number(value);
    setEditingStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, grade: numValue } : student
      )
    );
  };

  const handleSaveGrades = () => {
    toast.success("Notas guardadas correctamente");
    setIsEditing(false);
  };

  const handlePublishGrades = () => {
    toast.success("Notas publicadas correctamente");
    setIsGradeDialogOpen(false);

    if (selectedEvaluation) {
      setSelectedEvaluation({
        ...selectedEvaluation,
        published: true,
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
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
          <h1 className="font-bold text-3xl tracking-tight">Carga de Notas</h1>
          <p className="text-muted-foreground">
            Administra y publica las notas de tus cursos
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => toast.success("Plantilla descargada")}
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar plantilla
          </Button>
          <Button onClick={() => toast.success("Importación iniciada")}>
            <Upload className="mr-2 h-4 w-4" />
            Importar notas
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
                Selecciona un curso para gestionar sus notas
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
                        {course.pendingGrades && (
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
                    <h3 className="font-medium text-sm">Evaluaciones</h3>
                    <div className="space-y-2">
                      {selectedCourse.evaluations.map((evaluation: any) => (
                        <Button
                          key={evaluation.id}
                          className={`flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-muted ${
                            selectedEvaluation?.id === evaluation.id
                              ? "bg-muted"
                              : ""
                          }`}
                          onClick={() => handleSelectEvaluation(evaluation)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                              <Pencil className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{evaluation.name}</p>
                              <p className="text-muted-foreground text-sm">
                                {formatDate(evaluation.date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {evaluation.status === "completed" ? (
                              evaluation.published ? (
                                <Badge
                                  variant="outline"
                                  className="border-green-500 text-green-500"
                                >
                                  Publicado
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="border-amber-500 text-amber-500"
                                >
                                  Sin publicar
                                </Badge>
                              )
                            ) : (
                              <Badge variant="outline">Pendiente</Badge>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedEvaluation && (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedEvaluation.name}</CardTitle>
                        <CardDescription>
                          {formatDate(selectedEvaluation.date)}
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
                            <Button onClick={handleSaveGrades}>
                              <Save className="mr-2 h-4 w-4" />
                              Guardar
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </Button>
                            {selectedEvaluation.status === "completed" &&
                              !selectedEvaluation.published && (
                                <Dialog
                                  open={isGradeDialogOpen}
                                  onOpenChange={setIsGradeDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <Button>Publicar notas</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Publicar notas</DialogTitle>
                                      <DialogDescription>
                                        ¿Estás seguro de que deseas publicar las
                                        notas de {selectedEvaluation.name}?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <p className="text-muted-foreground text-sm">
                                        Una vez publicadas, las notas serán
                                        visibles para todos los estudiantes.
                                        Esta acción no se puede deshacer.
                                      </p>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setIsGradeDialogOpen(false)
                                        }
                                      >
                                        Cancelar
                                      </Button>
                                      <Button onClick={handlePublishGrades}>
                                        Confirmar publicación
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                          </>
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
                          <TableHead>Asistencia</TableHead>
                          <TableHead className="text-right">Nota</TableHead>
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
                            <TableCell>{student.attendance}%</TableCell>
                            <TableCell className="text-right">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={
                                    student.grade === null ? "" : student.grade
                                  }
                                  onChange={(e) =>
                                    handleGradeChange(
                                      student.id,
                                      e.target.value
                                    )
                                  }
                                  className="ml-auto w-16 text-right"
                                />
                              ) : (
                                <span
                                  className={
                                    student.grade === null
                                      ? "text-muted-foreground"
                                      : ""
                                  }
                                >
                                  {student.grade === null
                                    ? "Sin nota"
                                    : student.grade}
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
                      Promedio:{" "}
                      {editingStudents.filter((s) => s.grade !== null).length >
                      0
                        ? (
                            editingStudents.reduce(
                              (sum, s) => sum + (s.grade || 0),
                              0
                            ) /
                            editingStudents.filter((s) => s.grade !== null)
                              .length
                          ).toFixed(2)
                        : "N/A"}
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          ) : (
            <Card className="flex h-full items-center justify-center">
              <CardContent className="py-10 text-center">
                <Pencil className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium text-lg">
                  Selecciona un curso
                </h3>
                <p className="text-muted-foreground">
                  Selecciona un curso de la lista para gestionar sus notas
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
