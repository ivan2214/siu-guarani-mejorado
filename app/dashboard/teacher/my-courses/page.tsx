"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  Calendar,
  ChevronRight,
  Download,
  Filter,
  Pencil,
  Search,
  Users,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

// Sample courses data for a teacher
const courses = [
  {
    id: 1,
    code: "MAT301",
    name: "Matemática III",
    career: "Ingeniería en Sistemas",
    year: 2,
    semester: 1,
    students: 25,
    schedule: "Lunes y Miércoles 10:00-12:00",
    location: "Aula 305",
    status: "active",
    progress: 65,
    nextClass: "2023-06-15T10:00:00",
    pendingGrades: true,
    pendingAttendance: false,
  },
  {
    id: 2,
    code: "MAT101",
    name: "Matemática I",
    career: "Ingeniería Civil",
    year: 1,
    semester: 1,
    students: 40,
    schedule: "Martes y Jueves 08:00-10:00",
    location: "Aula 201",
    status: "active",
    progress: 70,
    nextClass: "2023-06-14T08:00:00",
    pendingGrades: false,
    pendingAttendance: true,
  },
  {
    id: 3,
    code: "MAT201",
    name: "Matemática II",
    career: "Ingeniería Industrial",
    year: 1,
    semester: 2,
    students: 35,
    schedule: "Viernes 14:00-18:00",
    location: "Aula 105",
    status: "active",
    progress: 60,
    nextClass: "2023-06-16T14:00:00",
    pendingGrades: true,
    pendingAttendance: true,
  },
  {
    id: 4,
    code: "EST101",
    name: "Estadística",
    career: "Ingeniería en Sistemas",
    year: 2,
    semester: 1,
    students: 30,
    schedule: "Miércoles 14:00-18:00",
    location: "Aula 202",
    status: "active",
    progress: 55,
    nextClass: "2023-06-14T14:00:00",
    pendingGrades: false,
    pendingAttendance: false,
  },
  {
    id: 5,
    code: "MAT401",
    name: "Matemática IV",
    career: "Ingeniería en Sistemas",
    year: 2,
    semester: 2,
    students: 20,
    schedule: "Lunes y Viernes 16:00-18:00",
    location: "Aula 301",
    status: "upcoming",
    progress: 0,
    nextClass: null,
    pendingGrades: false,
    pendingAttendance: false,
  },
  {
    id: 6,
    code: "MAT102",
    name: "Álgebra",
    career: "Ingeniería Civil",
    year: 1,
    semester: 1,
    students: 45,
    schedule: "Martes y Jueves 10:00-12:00",
    location: "Aula 203",
    status: "finished",
    progress: 100,
    nextClass: null,
    pendingGrades: false,
    pendingAttendance: false,
  },
];

export default function MyCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    career: "",
    semester: "",
  });

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
    const matchesSemester = filters.semester
      ? course.semester.toString() === filters.semester
      : true;

    return matchesSearch && matchesStatus && matchesCareer && matchesSemester;
  });

  // Group courses by status
  const activeCourses = filteredCourses.filter(
    (course) => course.status === "active"
  );
  const upcomingCourses = filteredCourses.filter(
    (course) => course.status === "upcoming"
  );
  const finishedCourses = filteredCourses.filter(
    (course) => course.status === "finished"
  );

  const resetFilters = () => {
    setFilters({
      status: "",
      career: "",
      semester: "",
    });
    setFilterSheetOpen(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No programada";

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Mis Cursos</h1>
          <p className="text-muted-foreground">
            Administra los cursos que impartes
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => toast.success("Reporte generado")}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar reporte
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
                {(filters.status || filters.career || filters.semester) && (
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total de Cursos
            </CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{courses.length}</div>
            <p className="text-muted-foreground text-xs">
              {activeCourses.length} activos, {upcomingCourses.length} próximos,{" "}
              {finishedCourses.length} finalizados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total de Estudiantes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {courses.reduce((total, course) => total + course.students, 0)}
            </div>
            <p className="text-muted-foreground text-xs">En todos los cursos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Notas Pendientes
            </CardTitle>
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {courses.filter((course) => course.pendingGrades).length}
            </div>
            <p className="text-muted-foreground text-xs">
              Cursos con notas por cargar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Próxima Clase</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-sm">
              {courses
                .filter((course) => course.nextClass)
                .sort(
                  (a, b) =>
                    new Date(a.nextClass!).getTime() -
                    new Date(b.nextClass!).getTime()
                )[0]?.name || "No hay clases programadas"}
            </div>
            <p className="text-muted-foreground text-xs">
              {courses
                .filter((course) => course.nextClass)
                .sort(
                  (a, b) =>
                    new Date(a.nextClass!).getTime() -
                    new Date(b.nextClass!).getTime()
                )[0]?.nextClass
                ? new Date(
                    courses
                      .filter((course) => course.nextClass)
                      .sort(
                        (a, b) =>
                          new Date(a.nextClass!).getTime() -
                          new Date(b.nextClass!).getTime()
                      )[0].nextClass!
                  ).toLocaleDateString("es-ES", {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Sin clases programadas"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            En curso ({activeCourses.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Próximos ({upcomingCourses.length})
          </TabsTrigger>
          <TabsTrigger value="finished">
            Finalizados ({finishedCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>
                          {course.code} - {course.career}
                        </CardDescription>
                      </div>
                      <Badge>En curso</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso:</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Estudiantes:
                          </span>
                          <span className="ml-1">{course.students}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Ubicación:
                          </span>
                          <span className="ml-1">{course.location}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Horario:</span>
                        <span className="ml-1">{course.schedule}</span>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Próxima clase:
                        </span>
                        <span className="ml-1">
                          {formatDate(course.nextClass).split(",")[0]}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <div className="flex gap-1">
                      {course.pendingGrades && (
                        <Badge
                          variant="outline"
                          className="border-amber-500 text-amber-500"
                        >
                          Notas pendientes
                        </Badge>
                      )}
                      {course.pendingAttendance && (
                        <Badge
                          variant="outline"
                          className="border-blue-500 text-blue-500"
                        >
                          Asistencia pendiente
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/my-courses/${course.id}`}>
                        Ver detalles
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                No hay cursos en progreso que coincidan con los criterios
                seleccionados.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>
                          {course.code} - {course.career}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Próximo</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Estudiantes:
                          </span>
                          <span className="ml-1">{course.students}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Ubicación:
                          </span>
                          <span className="ml-1">{course.location}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Horario:</span>
                        <span className="ml-1">{course.schedule}</span>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Año/Semestre:
                        </span>
                        <span className="ml-1">
                          {course.year}° año, {course.semester}° semestre
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <div></div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/my-courses/${course.id}`}>
                        Ver detalles
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                No hay cursos próximos que coincidan con los criterios
                seleccionados.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="finished" className="space-y-4">
          {finishedCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {finishedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>
                          {course.code} - {course.career}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Finalizado</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso:</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Estudiantes:
                          </span>
                          <span className="ml-1">{course.students}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Ubicación:
                          </span>
                          <span className="ml-1">{course.location}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Horario:</span>
                        <span className="ml-1">{course.schedule}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-3">
                    <div></div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/my-courses/${course.id}`}>
                        Ver detalles
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                No hay cursos finalizados que coincidan con los criterios
                seleccionados.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
