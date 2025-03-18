"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  Download,
  Edit,
  FileText,
  GraduationCap,
  Plus,
  Save,
  Search,
  Trash2,
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

// Sample career data
const careerData = {
  id: 1,
  name: "Ingeniería en Sistemas",
  code: "IS-2018",
  department: "Informática",
  director: "Dr. Juan Martínez",
  duration: 5,
  credits: 240,
  status: "active",
  createdAt: "2018-03-15",
  updatedAt: "2022-11-10",
  description:
    "Carrera orientada al desarrollo de software, sistemas informáticos y tecnologías de la información. Forma profesionales capaces de diseñar, implementar y mantener soluciones tecnológicas para diversos sectores.",
  objectives: [
    "Formar profesionales con sólidos conocimientos en programación y desarrollo de software",
    "Desarrollar habilidades para el diseño y gestión de sistemas informáticos",
    "Capacitar en tecnologías emergentes y su aplicación en entornos empresariales",
    "Fomentar el pensamiento crítico y la resolución de problemas complejos",
  ],
  curriculum: [
    {
      year: 1,
      semester: 1,
      subjects: [
        { id: 1, code: "MAT101", name: "Matemática I", credits: 6 },
        { id: 2, code: "PRG101", name: "Programación I", credits: 8 },
        { id: 3, code: "FIS101", name: "Física I", credits: 6 },
        { id: 4, code: "QUI101", name: "Química", credits: 4 },
      ],
    },
    {
      year: 1,
      semester: 2,
      subjects: [
        { id: 5, code: "MAT201", name: "Matemática II", credits: 6 },
        { id: 6, code: "PRG102", name: "Programación II", credits: 8 },
        { id: 7, code: "FIS201", name: "Física II", credits: 6 },
        { id: 8, code: "ALG101", name: "Álgebra", credits: 4 },
      ],
    },
    {
      year: 2,
      semester: 1,
      subjects: [
        { id: 9, code: "MAT301", name: "Matemática III", credits: 6 },
        { id: 10, code: "PRG201", name: "Programación III", credits: 8 },
        { id: 11, code: "EST101", name: "Estadística", credits: 4 },
        { id: 12, code: "ING101", name: "Inglés Técnico", credits: 2 },
      ],
    },
  ],
  students: [
    {
      id: 1,
      name: "Juan Pérez",
      legajo: "12345",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      year: 2,
    },
    {
      id: 2,
      name: "María López",
      legajo: "12346",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      year: 3,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      legajo: "12347",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      year: 1,
    },
    {
      id: 4,
      name: "Ana Fernández",
      legajo: "12348",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "graduated",
      year: 5,
    },
    {
      id: 5,
      name: "Pedro Gómez",
      legajo: "12349",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      year: 4,
    },
  ],
};

// Sample departments data
const departments = [
  { id: 1, name: "Informática" },
  { id: 2, name: "Construcción" },
  { id: 3, name: "Producción" },
  { id: 4, name: "Ciencias de la Salud" },
  { id: 5, name: "Ciencias Jurídicas" },
  { id: 6, name: "Diseño" },
  { id: 7, name: "Ciencias Económicas" },
  { id: 8, name: "Humanidades" },
];

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
  const [career, setCareer] = useState(careerData);
  const [editedCareer, setEditedCareer] = useState(careerData);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on search term
  const filteredStudents = career.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.legajo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveChanges = () => {
    setCareer(editedCareer);
    setIsEditing(false);
    toast.success("Cambios guardados correctamente");
  };

  const handleDeleteCareer = () => {
    toast.success("Carrera eliminada correctamente");
    setIsDeleteDialogOpen(false);
    router.push("/dashboard/admin/careers");
  };

  const handleAddSubject = () => {
    toast.success("Materia agregada correctamente");
    setIsAddSubjectDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">{career.name}</h1>
          <Badge variant={career.status === "active" ? "outline" : "secondary"}>
            {career.status === "active" ? "Activa" : "Inactiva"}
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
                    <DialogTitle>Eliminar carrera</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de que deseas eliminar la carrera{" "}
                      {career.name}?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-muted-foreground text-sm">
                      Esta acción no se puede deshacer. Se eliminará la carrera
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
                    <Button variant="destructive" onClick={handleDeleteCareer}>
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
          <TabsTrigger value="curriculum">Plan de Estudios</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Información de la carrera</CardTitle>
                <CardDescription>
                  Edita los datos básicos de la carrera
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la carrera</Label>
                    <Input
                      id="name"
                      value={editedCareer.name}
                      onChange={(e) =>
                        setEditedCareer({
                          ...editedCareer,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      value={editedCareer.code}
                      onChange={(e) =>
                        setEditedCareer({
                          ...editedCareer,
                          code: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Select
                      value={editedCareer.department}
                      onValueChange={(value) =>
                        setEditedCareer({ ...editedCareer, department: value })
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
                    <Label htmlFor="director">Director/a</Label>
                    <Input
                      id="director"
                      value={editedCareer.director}
                      onChange={(e) =>
                        setEditedCareer({
                          ...editedCareer,
                          director: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración (años)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="10"
                      value={editedCareer.duration}
                      onChange={(e) =>
                        setEditedCareer({
                          ...editedCareer,
                          duration: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Créditos totales</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="1"
                      value={editedCareer.credits}
                      onChange={(e) =>
                        setEditedCareer({
                          ...editedCareer,
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
                    value={editedCareer.description}
                    onChange={(e) =>
                      setEditedCareer({
                        ...editedCareer,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Objetivos</Label>
                  <div className="space-y-2">
                    {editedCareer.objectives.map((objective, index) => (
                      <div key={objective} className="flex gap-2">
                        <Input
                          value={objective}
                          onChange={(e) => {
                            const newObjectives = [...editedCareer.objectives];
                            newObjectives[index] = e.target.value;
                            setEditedCareer({
                              ...editedCareer,
                              objectives: newObjectives,
                            });
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newObjectives =
                              editedCareer.objectives.filter(
                                (_, i) => i !== index
                              );
                            setEditedCareer({
                              ...editedCareer,
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
                        setEditedCareer({
                          ...editedCareer,
                          objectives: [...editedCareer.objectives, ""],
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
                      {editedCareer.status === "active" ? "Activa" : "Inactiva"}
                    </Label>
                    <Switch
                      id="status"
                      checked={editedCareer.status === "active"}
                      onCheckedChange={(checked) =>
                        setEditedCareer({
                          ...editedCareer,
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
                    <CardTitle>Información de la carrera</CardTitle>
                    <CardDescription>
                      Datos básicos de la carrera
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">Descripción</h3>
                      <p className="text-sm">{career.description}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">Objetivos</h3>
                      <ul className="space-y-1">
                        {career.objectives.map((objective) => (
                          <li
                            key={objective}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                              <GraduationCap className="h-3 w-3 text-primary" />
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
                    <CardTitle>Documentación</CardTitle>
                    <CardDescription>
                      Documentos relacionados con la carrera
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Plan de estudios completo
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.success("Documento descargado")}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Reglamento de la carrera
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.success("Documento descargado")}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Perfil del egresado</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.success("Documento descargado")}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                      </div>
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
                      <span>{career.code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Departamento:</span>
                      <span>{career.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Director/a:</span>
                      <span>{career.director}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Duración:</span>
                      <span>{career.duration} años</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        Créditos totales:
                      </span>
                      <span>{career.credits}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Estudiantes:</span>
                      <span>{career.students.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Creada:</span>
                      <span>
                        {new Date(career.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        Última actualización:
                      </span>
                      <span>
                        {new Date(career.updatedAt).toLocaleDateString()}
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
                      <Link
                        href={`/dashboard/admin/careers/${params.id}/edit-curriculum`}
                      >
                        <Book className="mr-2 h-4 w-4" />
                        Editar plan de estudios
                      </Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link
                        href={`/dashboard/admin/careers/${params.id}/students`}
                      >
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

        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Plan de Estudios</CardTitle>
                <CardDescription>Materias por año y semestre</CardDescription>
              </div>
              <Dialog
                open={isAddSubjectDialogOpen}
                onOpenChange={setIsAddSubjectDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar materia
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar materia al plan</DialogTitle>
                    <DialogDescription>
                      Completa los datos para agregar una nueva materia al plan
                      de estudios
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject-name">
                          Nombre de la materia
                        </Label>
                        <Input
                          id="subject-name"
                          placeholder="Ej: Matemática IV"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-code">Código</Label>
                        <Input id="subject-code" placeholder="Ej: MAT401" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject-year">Año</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="subject-year">
                            <SelectValue placeholder="Año" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1° año</SelectItem>
                            <SelectItem value="2">2° año</SelectItem>
                            <SelectItem value="3">3° año</SelectItem>
                            <SelectItem value="4">4° año</SelectItem>
                            <SelectItem value="5">5° año</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-semester">Semestre</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="subject-semester">
                            <SelectValue placeholder="Semestre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1° semestre</SelectItem>
                            <SelectItem value="2">2° semestre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-credits">Créditos</Label>
                        <Input
                          id="subject-credits"
                          type="number"
                          min="1"
                          max="10"
                          defaultValue="4"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject-correlatives">Correlativas</Label>
                      <Select>
                        <SelectTrigger id="subject-correlatives">
                          <SelectValue placeholder="Seleccionar materias correlativas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mat101">Matemática I</SelectItem>
                          <SelectItem value="mat201">Matemática II</SelectItem>
                          <SelectItem value="prg101">Programación I</SelectItem>
                          <SelectItem value="prg102">
                            Programación II
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddSubjectDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddSubject}>Agregar materia</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {career.curriculum.map((yearData) => (
                  <div
                    key={`${yearData.year}-${yearData.semester}`}
                    className="space-y-2"
                  >
                    <h3 className="font-medium text-lg">
                      {yearData.year}° Año - {yearData.semester}° Semestre
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Créditos</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {yearData.subjects.map((subject) => (
                          <TableRow key={subject.id}>
                            <TableCell className="font-medium">
                              {subject.code}
                            </TableCell>
                            <TableCell>{subject.name}</TableCell>
                            <TableCell>{subject.credits}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link
                                  href={`/dashboard/admin/courses/${subject.id}`}
                                >
                                  Ver detalles
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toast.success("Plan de estudios descargado")}
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar plan de estudios completo
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
                  Listado de estudiantes inscriptos en la carrera
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
                <Button
                  variant="outline"
                  onClick={() => toast.success("Reporte descargado")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Legajo</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Estado</TableHead>
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
                        <TableCell>{student.year}° año</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === "active"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {student.status === "active"
                              ? "Activo"
                              : "Graduado"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/admin/users/${student.id}`}>
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
                Mostrando {filteredStudents.length} de {career.students.length}{" "}
                estudiantes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas generales</CardTitle>
                <CardDescription>
                  Datos estadísticos de la carrera
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      Total de estudiantes:
                    </span>
                    <span>{career.students.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      Estudiantes activos:
                    </span>
                    <span>
                      {
                        career.students.filter((s) => s.status === "active")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Graduados:</span>
                    <span>
                      {
                        career.students.filter((s) => s.status === "graduated")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      Tasa de graduación:
                    </span>
                    <span>
                      {Math.round(
                        (career.students.filter((s) => s.status === "graduated")
                          .length /
                          career.students.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      Duración promedio:
                    </span>
                    <span>5.2 años</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por año</CardTitle>
                <CardDescription>
                  Cantidad de estudiantes por año de cursada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((year) => {
                    const count = career.students.filter(
                      (s) => s.year === year && s.status === "active"
                    ).length;
                    const percentage = Math.round(
                      (count /
                        career.students.filter((s) => s.status === "active")
                          .length) *
                        100
                    );

                    return (
                      <div key={year} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {year}° Año:
                          </span>
                          <span>
                            {count} estudiantes ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
