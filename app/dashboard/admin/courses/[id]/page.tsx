"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Calendar,
  Check,
  Clock,
  Download,
  Edit,
  FileText,
  MapPin,
  Plus,
  Save,
  Search,
  Trash2,
  User,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";

// Sample course data
const courseData = {
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
  createdAt: "2018-03-15",
  updatedAt: "2022-11-10",
  description:
    "Cálculo avanzado, integrales múltiples y ecuaciones diferenciales. Esta materia proporciona los conocimientos fundamentales sobre cálculo avanzado, incluyendo integrales múltiples, ecuaciones diferenciales y series de Fourier. Los estudiantes aprenderán conceptos teóricos y prácticos aplicables en el campo profesional.",
  objectives: [
    "Comprender y aplicar los conceptos de integrales múltiples",
    "Resolver ecuaciones diferenciales ordinarias y parciales",
    "Analizar y aplicar series de Fourier",
    "Desarrollar habilidades para modelar problemas matemáticos complejos",
  ],
  syllabus: [
    {
      unit: "Unidad 1: Integrales múltiples",
      topics: [
        "Integrales dobles y triples",
        "Cambio de variables",
        "Aplicaciones físicas y geométricas",
      ],
    },
    {
      unit: "Unidad 2: Ecuaciones diferenciales",
      topics: [
        "Ecuaciones diferenciales ordinarias",
        "Métodos de resolución",
        "Aplicaciones en física e ingeniería",
      ],
    },
    {
      unit: "Unidad 3: Series de Fourier",
      topics: [
        "Funciones periódicas",
        "Coeficientes de Fourier",
        "Convergencia y aplicaciones",
      ],
    },
    {
      unit: "Unidad 4: Transformadas",
      topics: [
        "Transformada de Laplace",
        "Transformada de Fourier",
        "Aplicaciones",
      ],
    },
  ],
  evaluation: [
    { name: "Primer Parcial", weight: 30, date: "2023-04-15" },
    { name: "Segundo Parcial", weight: 30, date: "2023-06-10" },
    { name: "Trabajos Prácticos", weight: 20, date: "Continua" },
    { name: "Examen Final", weight: 20, date: "2023-07-05" },
  ],
  schedule: [
    {
      day: "Lunes",
      time: "10:00-12:00",
      type: "Teórica",
      location: "Aula 305",
    },
    {
      day: "Miércoles",
      time: "10:00-12:00",
      type: "Práctica",
      location: "Aula 305",
    },
  ],
  bibliography: [
    {
      title: "Cálculo de varias variables",
      author: "James Stewart",
      year: 2018,
    },
    { title: "Ecuaciones diferenciales", author: "Dennis G. Zill", year: 2017 },
    { title: "Análisis de Fourier", author: "E. Kreyszig", year: 2015 },
  ],
  students: [
    {
      id: 1,
      name: "Juan Pérez",
      legajo: "12345",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "regular",
      attendance: 85,
    },
    {
      id: 2,
      name: "María López",
      legajo: "12346",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "regular",
      attendance: 90,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      legajo: "12347",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "regular",
      attendance: 75,
    },
    {
      id: 4,
      name: "Ana Fernández",
      legajo: "12348",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "regular",
      attendance: 95,
    },
    {
      id: 5,
      name: "Pedro Gómez",
      legajo: "12349",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "regular",
      attendance: 80,
    },
  ],
};

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

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [course, setCourse] = useState(courseData);
  const [editedCourse, setEditedCourse] = useState(courseData);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on search term
  const filteredStudents = course.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.legajo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveChanges = () => {
    setCourse(editedCourse);
    setIsEditing(false);
    toast.success("Cambios guardados correctamente");
  };

  const handleDeleteCourse = () => {
    toast.success("Materia eliminada correctamente");
    setIsDeleteDialogOpen(false);
    router.push("/manage/courses");
  };

  const handleAddStudent = () => {
    toast.success("Estudiante agregado correctamente");
    setIsAddStudentDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">{course.name}</h1>
          <Badge variant={course.status === "active" ? "outline" : "secondary"}>
            {course.status === "active" ? "Activa" : "Inactiva"}
          </Badge>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
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
                    <DialogTitle>Eliminar materia</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de que deseas eliminar la materia{" "}
                      {course.name}?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-muted-foreground text-sm">
                      Esta acción no se puede deshacer. Se eliminará la materia
                      y todos sus datos asociados.
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
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="syllabus">Programa</TabsTrigger>
          <TabsTrigger value="schedule">Horarios</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluación</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Información de la materia</CardTitle>
                <CardDescription>
                  Edita los datos básicos de la materia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la materia</Label>
                    <Input
                      id="name"
                      value={editedCourse.name}
                      onChange={(e) =>
                        setEditedCourse({
                          ...editedCourse,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      value={editedCourse.code}
                      onChange={(e) =>
                        setEditedCourse({
                          ...editedCourse,
                          code: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="career">Carrera</Label>
                    <Select
                      value={editedCourse.career}
                      onValueChange={(value) =>
                        setEditedCourse({ ...editedCourse, career: value })
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
                      value={editedCourse.department}
                      onValueChange={(value) =>
                        setEditedCourse({ ...editedCourse, department: value })
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
                  <div className="space-y-2">
                    <Label htmlFor="professor">Profesor</Label>
                    <Select
                      value={editedCourse.professor}
                      onValueChange={(value) =>
                        setEditedCourse({ ...editedCourse, professor: value })
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
                  <div className="space-y-2">
                    <Label htmlFor="credits">Créditos</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="1"
                      max="10"
                      value={editedCourse.credits}
                      onChange={(e) =>
                        setEditedCourse({
                          ...editedCourse,
                          credits: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Año</Label>
                    <Select
                      value={String(editedCourse.year)}
                      onValueChange={(value) =>
                        setEditedCourse({
                          ...editedCourse,
                          year: Number(value),
                        })
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
                      value={String(editedCourse.semester)}
                      onValueChange={(value) =>
                        setEditedCourse({
                          ...editedCourse,
                          semester: Number(value),
                        })
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={editedCourse.description}
                    onChange={(e) =>
                      setEditedCourse({
                        ...editedCourse,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Objetivos</Label>
                  <div className="space-y-2">
                    {editedCourse.objectives.map((objective, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={objective}
                          onChange={(e) => {
                            const newObjectives = [...editedCourse.objectives];
                            newObjectives[index] = e.target.value;
                            setEditedCourse({
                              ...editedCourse,
                              objectives: newObjectives,
                            });
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newObjectives =
                              editedCourse.objectives.filter(
                                (_, i) => i !== index
                              );
                            setEditedCourse({
                              ...editedCourse,
                              objectives: newObjectives,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditedCourse({
                          ...editedCourse,
                          objectives: [...editedCourse.objectives, ""],
                        });
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar objetivo
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Estado</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status" className="text-sm">
                      {editedCourse.status === "active" ? "Activa" : "Inactiva"}
                    </Label>
                    <Switch
                      id="status"
                      checked={editedCourse.status === "active"}
                      onCheckedChange={(checked) =>
                        setEditedCourse({
                          ...editedCourse,
                          status: checked ? "active" : "inactive",
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de la materia</CardTitle>
                    <CardDescription>
                      Datos básicos de la materia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">Descripción</h3>
                      <p className="text-sm">{course.description}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">Objetivos</h3>
                      <ul className="space-y-1">
                        {course.objectives.map((objective, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                              <Book className="h-3 w-3 text-primary" />
                            </div>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bibliografía</CardTitle>
                    <CardDescription>
                      Material de estudio recomendado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.bibliography.map((book, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md border p-2"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">
                                {book.title}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {book.author} ({book.year})
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.success("Referencia copiada")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span className="sr-only">Copiar referencia</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Código:</span>
                      <span>{course.code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Carrera:</span>
                      <span>{course.career}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Departamento:</span>
                      <span>{course.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Profesor:</span>
                      <span>{course.professor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Año/Semestre:</span>
                      <span>
                        {course.year}° año, {course.semester}° semestre
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Créditos:</span>
                      <span>{course.credits}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Estudiantes:</span>
                      <span>{course.students.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Creada:</span>
                      <span>
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        Última actualización:
                      </span>
                      <span>
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Acciones rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => toast.success("Reporte generado")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Exportar datos
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/manage/courses/${params.id}/edit-syllabus`}>
                        <Book className="mr-2 h-4 w-4" />
                        Editar programa
                      </Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/manage/courses/${params.id}/students`}>
                        <Users className="mr-2 h-4 w-4" />
                        Ver estudiantes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Programa de la materia</CardTitle>
                <CardDescription>
                  Contenido detallado de {course.name}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => toast.success("Programa descargado")}
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar programa
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {course.syllabus.map((unit, index) => (
                  <div key={unit.unit} className="space-y-2">
                    <h3 className="font-medium text-lg">{unit.unit}</h3>
                    <ul className="space-y-1 pl-5">
                      {unit.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="list-disc text-sm">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Horarios de cursada</CardTitle>
              <CardDescription>Días y horarios de las clases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.schedule.map((schedule, index) => (
                  <div
                    key={schedule.day}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {schedule.type === "Teórica" ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {schedule.day} - {schedule.time}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{schedule.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {schedule.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/manage/schedules?course=${course.id}`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Administrar horarios
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Estudiantes</CardTitle>
                <CardDescription>
                  Listado de estudiantes inscriptos en la materia
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar estudiante..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog
                  open={isAddStudentDialogOpen}
                  onOpenChange={setIsAddStudentDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar estudiante
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar estudiante</DialogTitle>
                      <DialogDescription>
                        Busca y agrega un estudiante a la materia
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-search">
                          Buscar estudiante
                        </Label>
                        <div className="relative">
                          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="student-search"
                            placeholder="Nombre o legajo..."
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <div className="rounded-md border">
                        <div className="flex cursor-pointer items-center gap-2 p-2 hover:bg-muted">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Avatar"
                            />
                            <AvatarFallback>LM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              Laura Martínez
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Legajo: 12350
                            </p>
                          </div>
                          <Checkbox className="ml-auto" />
                        </div>
                        <div className="flex cursor-pointer items-center gap-2 p-2 hover:bg-muted">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Avatar"
                            />
                            <AvatarFallback>RG</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              Roberto García
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Legajo: 12351
                            </p>
                          </div>
                          <Checkbox className="ml-auto" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddStudentDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button onClick={handleAddStudent}>
                        Agregar seleccionados
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Legajo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
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
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/manage/users/${student.id}`}>
                              Ver perfil
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Users className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            No se encontraron estudiantes con los criterios
                            seleccionados.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-muted-foreground text-sm">
                Mostrando {filteredStudents.length} de {course.students.length}{" "}
                estudiantes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de evaluación</CardTitle>
              <CardDescription>
                Criterios de evaluación y aprobación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Evaluaciones</h3>
                <div className="space-y-2">
                  {course.evaluation.map((evaluation, index) => (
                    <div
                      key={evaluation.name}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{evaluation.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {evaluation.date === "Continua"
                              ? "Evaluación continua"
                              : new Date(evaluation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{evaluation.weight}%</Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/grades?course=${course.id}&evaluation=${index}`}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Cargar notas
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium text-sm">Criterios de aprobación</h3>
                <p className="text-sm">
                  Para aprobar la materia, el estudiante deberá:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>
                      Obtener un promedio mínimo de 6 (seis) en los exámenes
                      parciales
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>
                      Aprobar el examen final con una nota mínima de 4 (cuatro)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>
                      Cumplir con el 75% de asistencia a clases prácticas
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/grades?course=${course.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Ver planilla de notas
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
