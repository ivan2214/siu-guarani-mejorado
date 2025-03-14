"use client";

import {
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  LineChart,
  ListChecks,
  X,
} from "lucide-react";
import { useState } from "react";

import { CalendarComponent } from "@/components/calendar-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema académico. Aquí encontrarás un resumen de tu
          información académica.
        </p>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">
                  Materias Inscriptas
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">5</div>
                <p className="text-muted-foreground text-xs">Semestre actual</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">
                  Exámenes Próximos
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">3</div>
                <p className="text-muted-foreground text-xs">
                  Próximos 30 días
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">
                  Promedio General
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">8.5</div>
                <p className="text-muted-foreground text-xs">Escala 1-10</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium text-sm">
                  Avance de Carrera
                </CardTitle>
                <ListChecks className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">65%</div>
                <Progress value={65} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Materias Actuales</CardTitle>
                <CardDescription>
                  Materias en las que estás inscripto este semestre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Matemática III",
                      progress: 75,
                      status: "En curso",
                    },
                    {
                      name: "Programación II",
                      progress: 60,
                      status: "En curso",
                    },
                    { name: "Física II", progress: 80, status: "En curso" },
                    { name: "Estadística", progress: 45, status: "En curso" },
                    {
                      name: "Inglés Técnico",
                      progress: 90,
                      status: "En curso",
                    },
                  ].map((subject) => (
                    <div key={subject.name} className="flex items-center">
                      <div className="mr-4 w-full">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {subject.name}
                          </span>
                          <Badge variant="outline">{subject.status}</Badge>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Próximos Exámenes</CardTitle>
                <CardDescription>
                  Exámenes programados para los próximos días
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Matemática III",
                      date: "15/06/2023",
                      time: "10:00",
                    },
                    {
                      name: "Programación II",
                      date: "22/06/2023",
                      time: "14:00",
                    },
                    { name: "Física II", date: "29/06/2023", time: "09:00" },
                  ].map((exam) => (
                    <div key={exam.name} className="flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm leading-none">
                          {exam.name}
                        </p>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Calendar className="mr-1 h-3 w-3" />
                          {exam.date}
                          <Clock className="mr-1 ml-2 h-3 w-3" />
                          {exam.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendario Académico</CardTitle>
              <CardDescription>
                Visualiza tus exámenes, clases y eventos académicos
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <CalendarComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Mantente al día con tus notificaciones académicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Inscripción a examen confirmada",
                    description:
                      "Tu inscripción al examen de Matemática III ha sido confirmada",
                    date: "Hoy, 10:30",
                  },
                  {
                    title: "Nota publicada: Programación I",
                    description:
                      "Se ha publicado tu nota del examen final de Programación I",
                    date: "Ayer, 15:45",
                  },
                  {
                    title: "Recordatorio: Examen en 2 días",
                    description: "Tienes un examen de Física II en 2 días",
                    date: "Ayer, 09:15",
                  },
                  {
                    title: "Cambio de aula",
                    description:
                      "La clase de Estadística se trasladará al Aula 305",
                    date: "12/06/2023, 14:20",
                  },
                  {
                    title: "Inscripción a materias abierta",
                    description:
                      "Ya puedes inscribirte a las materias del próximo semestre",
                    date: "10/06/2023, 08:00",
                  },
                ].map((notification) => (
                  <div
                    key={notification.date}
                    className="flex items-start space-x-4 rounded-md border p-4"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm leading-none">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {notification.description}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {notification.date}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="sr-only">Marcar como leída</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
