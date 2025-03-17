"use client";

import { addMonths, format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";

// Sample events data
const events = [
  {
    id: 1,
    date: new Date(2023, 5, 15),
    title: "Examen Matemática III",
    type: "exam",
    time: "10:00 - 12:00",
    location: "Aula 305",
    description:
      "Examen final de Matemática III. Temas: Integrales múltiples, ecuaciones diferenciales.",
  },
  {
    id: 2,
    date: new Date(2023, 5, 22),
    title: "Examen Programación II",
    type: "exam",
    time: "14:00 - 16:00",
    location: "Laboratorio 2",
    description:
      "Examen final de Programación II. Temas: Estructuras de datos, algoritmos de ordenamiento.",
  },
  {
    id: 3,
    date: new Date(2023, 5, 29),
    title: "Examen Física II",
    type: "exam",
    time: "09:00 - 11:00",
    location: "Aula 201",
    description: "Examen final de Física II. Temas: Electromagnetismo, ondas.",
  },
  {
    id: 4,
    date: new Date(2023, 5, 10),
    title: "Entrega TP Estadística",
    type: "assignment",
    time: "23:59",
    location: "Campus Virtual",
    description:
      "Entrega del trabajo práctico de Estadística. Tema: Análisis de datos.",
  },
  {
    id: 5,
    date: new Date(2023, 5, 5),
    title: "Inicio inscripción a materias",
    type: "enrollment",
    time: "00:00",
    location: "Sistema Académico",
    description:
      "Inicio del período de inscripción a materias para el próximo semestre.",
  },
  {
    id: 6,
    date: new Date(2023, 5, 20),
    title: "Fin inscripción a materias",
    type: "enrollment",
    time: "23:59",
    location: "Sistema Académico",
    description:
      "Fin del período de inscripción a materias para el próximo semestre.",
  },
  {
    id: 7,
    date: new Date(2023, 5, 12),
    title: "Clase especial Programación II",
    type: "class",
    time: "14:00 - 16:00",
    location: "Aula 105",
    description:
      "Clase especial sobre patrones de diseño en programación orientada a objetos.",
  },
  {
    id: 8,
    date: new Date(2023, 5, 18),
    title: "Consulta Matemática III",
    type: "consultation",
    time: "16:00 - 18:00",
    location: "Aula 202",
    description: "Horario de consulta para el examen de Matemática III.",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedView, setSelectedView] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handlePreviousMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  // Get events for the selected date
  const selectedDateEvents = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Filter events based on type
  const filteredEvents =
    filter === "all" ? events : events.filter((event) => event.type === filter);

  // Function to get event type badge
  const getEventBadge = (type: string) => {
    switch (type) {
      case "exam":
        return <Badge variant="destructive">Examen</Badge>;
      case "assignment":
        return <Badge variant="secondary">Entrega</Badge>;
      case "enrollment":
        return <Badge variant="outline">Inscripción</Badge>;
      case "class":
        return <Badge variant="default">Clase</Badge>;
      case "consultation":
        return <Badge variant="default">Consulta</Badge>;
      default:
        return <Badge>Evento</Badge>;
    }
  };

  const handleAddEvent = () => {
    toast.success("Evento agregado al calendario");
    setIsAddEventOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Calendario Académico
          </h1>
          <p className="text-muted-foreground">
            Visualiza y administra tus eventos académicos.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los eventos</SelectItem>
              <SelectItem value="exam">Exámenes</SelectItem>
              <SelectItem value="assignment">Entregas</SelectItem>
              <SelectItem value="enrollment">Inscripciones</SelectItem>
              <SelectItem value="class">Clases</SelectItem>
              <SelectItem value="consultation">Consultas</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar evento</DialogTitle>
                <DialogDescription>
                  Crea un nuevo evento en tu calendario académico.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Título del evento" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <div className="relative">
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de evento</Label>
                  <Select defaultValue="class">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exam">Examen</SelectItem>
                      <SelectItem value="assignment">Entrega</SelectItem>
                      <SelectItem value="enrollment">Inscripción</SelectItem>
                      <SelectItem value="class">Clase</SelectItem>
                      <SelectItem value="consultation">Consulta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" placeholder="Ubicación del evento" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción del evento"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddEventOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddEvent}>Guardar evento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs
        defaultValue="month"
        value={selectedView}
        onValueChange={setSelectedView}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="month">Mes</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="day">Día</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Mes anterior</span>
            </Button>
            <Button variant="outline" onClick={() => setDate(new Date())}>
              Hoy
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Mes siguiente</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <TabsContent value="month" className="mt-0 flex-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">
                  {format(date, "MMMM yyyy", { locale: es })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={date}
                  onMonthChange={setDate}
                  className="rounded-md border"
                  locale={es}
                  modifiers={{
                    event: (date) =>
                      filteredEvents.some(
                        (event) =>
                          event.date.getDate() === date.getDate() &&
                          event.date.getMonth() === date.getMonth() &&
                          event.date.getFullYear() === date.getFullYear()
                      ),
                  }}
                  modifiersClassNames={{
                    event: "bg-primary/10 font-bold text-primary",
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="mt-0 flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Vista Semanal</CardTitle>
                <CardDescription>
                  Esta vista no está disponible en la versión actual.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground">
                  La vista semanal estará disponible próximamente.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="day" className="mt-0 flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Vista Diaria</CardTitle>
                <CardDescription>
                  Esta vista no está disponible en la versión actual.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground">
                  La vista diaria estará disponible próximamente.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-0 flex-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Lista de Eventos</CardTitle>
                  <CardDescription>
                    Todos los eventos programados
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex cursor-pointer items-start space-x-4 rounded-md border p-4 hover:bg-muted/50"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{event.title}</span>
                            {getEventBadge(event.type)}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {format(event.date, "dd MMMM yyyy", { locale: es })}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {event.time} - {event.location}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-muted-foreground">
                        No hay eventos para mostrar
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="w-full md:w-80">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })
                    : "Eventos"}
                </CardTitle>
                <CardDescription>
                  {selectedDate
                    ? "Eventos para la fecha seleccionada"
                    : "Selecciona una fecha para ver sus eventos"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="cursor-pointer rounded-lg border p-3 hover:bg-muted/50"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-muted-foreground text-sm">
                              {event.time}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {event.location}
                            </p>
                          </div>
                          {getEventBadge(event.type)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-muted-foreground">
                      No hay eventos para esta fecha
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>

      {/* Event details dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>Detalles del evento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="font-medium text-sm">Fecha y hora</p>
                <p className="text-muted-foreground text-sm">
                  {selectedEvent &&
                    format(selectedEvent.date, "EEEE, d 'de' MMMM 'de' yyyy", {
                      locale: es,
                    })}
                </p>
                <p className="text-muted-foreground text-sm">
                  {selectedEvent?.time}
                </p>
              </div>
              {selectedEvent && getEventBadge(selectedEvent.type)}
            </div>

            <div className="space-y-1">
              <p className="font-medium text-sm">Ubicación</p>
              <p className="text-muted-foreground text-sm">
                {selectedEvent?.location}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-sm">Descripción</p>
              <p className="text-muted-foreground text-sm">
                {selectedEvent?.description}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cerrar
            </Button>
            <Button
              onClick={() => {
                toast.success("Evento agregado a tu calendario personal");
                setSelectedEvent(null);
              }}
            >
              Agregar a mi calendario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
