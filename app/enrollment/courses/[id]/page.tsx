"use client";

import {
  ArrowLeft,
  Check,
  Clock,
  Download,
  FileText,
  MapPin,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample course data
const coursesData = [
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
    description:
      "Esta materia proporciona los conocimientos fundamentales sobre cálculo avanzado, incluyendo integrales múltiples, ecuaciones diferenciales y series de Fourier. Los estudiantes aprenderán conceptos teóricos y prácticos aplicables en el campo profesional.",
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
      "2 exámenes parciales (30% cada uno)",
      "Trabajos prácticos (20%)",
      "Examen final (20%)",
    ],
    bibliography: [
      "Cálculo de varias variables, James Stewart",
      "Ecuaciones diferenciales, Dennis G. Zill",
      "Análisis de Fourier, E. Kreyszig",
    ],
    schedule_details: [
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
    description:
      "Esta materia profundiza en los conceptos de programación orientada a objetos y estructuras de datos avanzadas. Los estudiantes aprenderán a diseñar e implementar soluciones de software eficientes y escalables.",
    objectives: [
      "Dominar los conceptos de programación orientada a objetos",
      "Implementar y utilizar estructuras de datos avanzadas",
      "Aplicar patrones de diseño básicos",
      "Desarrollar aplicaciones con interfaces gráficas",
    ],
    syllabus: [
      {
        unit: "Unidad 1: Programación orientada a objetos avanzada",
        topics: [
          "Herencia y polimorfismo",
          "Interfaces y clases abstractas",
          "Genéricos y colecciones",
        ],
      },
      {
        unit: "Unidad 2: Estructuras de datos",
        topics: ["Listas enlazadas", "Árboles y grafos", "Tablas hash"],
      },
      {
        unit: "Unidad 3: Patrones de diseño",
        topics: [
          "Patrones creacionales",
          "Patrones estructurales",
          "Patrones de comportamiento",
        ],
      },
      {
        unit: "Unidad 4: Interfaces gráficas",
        topics: [
          "Componentes básicos",
          "Manejo de eventos",
          "Arquitectura MVC",
        ],
      },
    ],
    evaluation: [
      "2 exámenes parciales (25% cada uno)",
      "Trabajo práctico integrador (30%)",
      "Examen final (20%)",
    ],
    bibliography: [
      "Thinking in Java, Bruce Eckel",
      "Effective Java, Joshua Bloch",
      "Design Patterns, Erich Gamma et al.",
    ],
    schedule_details: [
      {
        day: "Martes",
        time: "14:00-16:00",
        type: "Teórica",
        location: "Laboratorio 2",
      },
      {
        day: "Jueves",
        time: "14:00-16:00",
        type: "Práctica",
        location: "Laboratorio 2",
      },
    ],
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);

  // Find course by id
  const courseId = Number(params.id);
  const course = coursesData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="mb-4 font-bold text-2xl">Materia no encontrada</h1>
        <p className="mb-6 text-muted-foreground">
          La materia que estás buscando no existe o ha sido eliminada.
        </p>
        <Button onClick={() => router.push("/enrollment/courses")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la lista de materias
        </Button>
      </div>
    );
  }

  const handleEnrollment = () => {
    toast.success(`Te has inscrito a la materia ${course.name}`);
    setIsEnrollDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/enrollment/courses")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h1 className="font-bold text-3xl tracking-tight">{course.name}</h1>
        <Badge variant="outline">{course.code}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="syllabus">Programa</TabsTrigger>
              <TabsTrigger value="schedule">Horarios</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluación</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción de la materia</CardTitle>
                  <CardDescription>
                    Información general sobre {course.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{course.description}</p>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-sm">Objetivos</h3>
                    <ul className="space-y-1">
                      {course.objectives.map((objective, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 text-primary" />
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
                  <ul className="space-y-2">
                    {course.bibliography.map((book, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{book}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="prerequisites">
                  <AccordionTrigger>Requisitos previos</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {course.prerequisites.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="syllabus" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Programa de la materia</CardTitle>
                  <CardDescription>
                    Contenido detallado de {course.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {course.syllabus.map((unit, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-sm">{unit.unit}</h3>
                      <ul className="space-y-1 pl-5">
                        {unit.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="list-disc text-sm">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast.success("Programa descargado")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar programa completo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Horarios de cursada</CardTitle>
                  <CardDescription>
                    Días y horarios de las clases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.schedule_details.map((schedule, index) => (
                      <div
                        key={index}
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
                          <p className="text-muted-foreground text-sm">
                            {schedule.type} - {schedule.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          {schedule.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
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
                  <div>
                    <h3 className="mb-2 font-medium text-sm">Evaluaciones</h3>
                    <ul className="space-y-1">
                      {course.evaluation.map((evaluation) => (
                        <li
                          key={evaluation}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{evaluation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-sm">
                      Criterios de aprobación
                    </h3>
                    <p className="text-sm">
                      Para aprobar la materia, el estudiante deberá:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 text-primary" />
                        <span>
                          Obtener un promedio mínimo de 6 (seis) en los exámenes
                          parciales
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 text-primary" />
                        <span>
                          Aprobar el examen final con una nota mínima de 4
                          (cuatro)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 text-primary" />
                        <span>
                          Cumplir con el 75% de asistencia a clases prácticas
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
              <CardDescription>Datos básicos de la materia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Código:</span>
                <span>{course.code}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Créditos:</span>
                <span>{course.credits}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Año:</span>
                <span>{course.year}° año</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Semestre:</span>
                <span>{course.semester}° semestre</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Departamento:</span>
                <span>{course.department}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Profesor:</span>
                <span>{course.professor}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado de la materia</CardTitle>
              <CardDescription>
                Información sobre cupos y estado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Estado:</span>
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
                    Disponible
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Cupos:</span>
                <span>
                  {course.enrolled}/{course.quota}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Cupos disponibles:</span>
                <span>{course.quota - course.enrolled}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog
                open={isEnrollDialogOpen}
                onOpenChange={setIsEnrollDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    disabled={course.status === "full"}
                  >
                    Inscribirse a la materia
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar inscripción</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de que deseas inscribirte a la materia{" "}
                      {course.name}?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <p className="font-medium text-sm">
                        Detalles de la materia:
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Profesor: {course.professor}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Horario: {course.schedule}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Ubicación: {course.location}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm">
                        Al inscribirte, confirmas que cumples con todos los
                        requisitos necesarios para cursar esta materia.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEnrollDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleEnrollment}>
                      Confirmar inscripción
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
