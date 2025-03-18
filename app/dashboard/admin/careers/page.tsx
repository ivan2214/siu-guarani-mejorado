"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  ChevronRight,
  Download,
  Edit,
  Filter,
  GraduationCap,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

// Sample careers data
const careers = [
  {
    id: 1,
    name: "Ingeniería en Sistemas",
    code: "IS-2018",
    department: "Informática",
    director: "Dr. Juan Martínez",
    duration: 5,
    credits: 240,
    status: "active",
    students: 120,
    description:
      "Carrera orientada al desarrollo de software, sistemas informáticos y tecnologías de la información.",
  },
  {
    id: 2,
    name: "Ingeniería Civil",
    code: "IC-2019",
    department: "Construcción",
    director: "Ing. María López",
    duration: 5,
    credits: 250,
    status: "active",
    students: 95,
    description:
      "Carrera enfocada en el diseño, construcción y mantenimiento de infraestructuras.",
  },
  {
    id: 3,
    name: "Ingeniería Industrial",
    code: "II-2017",
    department: "Producción",
    director: "Dr. Roberto García",
    duration: 5,
    credits: 245,
    status: "active",
    students: 110,
    description:
      "Carrera centrada en la optimización de procesos productivos y gestión de recursos.",
  },
  {
    id: 4,
    name: "Medicina",
    code: "MED-2020",
    department: "Ciencias de la Salud",
    director: "Dra. Ana Fernández",
    duration: 6,
    credits: 360,
    status: "active",
    students: 150,
    description:
      "Carrera dedicada al estudio de la salud humana, diagnóstico y tratamiento de enfermedades.",
  },
  {
    id: 5,
    name: "Derecho",
    code: "DER-2018",
    department: "Ciencias Jurídicas",
    director: "Dr. Carlos Pérez",
    duration: 5,
    credits: 300,
    status: "active",
    students: 130,
    description:
      "Carrera enfocada en el estudio de las leyes, normativas y sistemas jurídicos.",
  },
  {
    id: 6,
    name: "Arquitectura",
    code: "ARQ-2019",
    department: "Diseño",
    director: "Arq. Laura Martínez",
    duration: 5,
    credits: 280,
    status: "inactive",
    students: 0,
    description:
      "Carrera orientada al diseño y planificación de espacios y edificaciones.",
  },
];

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

export default function ManageCareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isAddCareerOpen, setIsAddCareerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [newCareer, setNewCareer] = useState({
    name: "",
    code: "",
    department: "",
    director: "",
    duration: 5,
    credits: 240,
    status: "active",
    description: "",
  });

  // Filter careers based on search term and filters
  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = filters.department
      ? career.department === filters.department
      : true;
    const matchesStatus = filters.status
      ? career.status === filters.status
      : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Sort careers
  const sortedCareers = [...filteredCareers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b] ? 1 : -1;
    } else {
      return a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b] ? 1 : -1;
    }
  });

  const resetFilters = () => {
    setFilters({
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

  const handleAddCareer = () => {
    toast.success("Carrera agregada correctamente");
    setIsAddCareerOpen(false);
    setNewCareer({
      name: "",
      code: "",
      department: "",
      director: "",
      duration: 5,
      credits: 240,
      status: "active",
      description: "",
    });
  };

  const handleEditCareer = (career: any) => {
    setSelectedCareer(career);
    setNewCareer({
      name: career.name,
      code: career.code,
      department: career.department,
      director: career.director,
      duration: career.duration,
      credits: career.credits,
      status: career.status,
      description: career.description,
    });
    setIsAddCareerOpen(true);
  };

  const handleDeleteCareer = () => {
    toast.success("Carrera eliminada correctamente");
    setIsDeleteDialogOpen(false);
    setSelectedCareer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Gestión de Carreras
          </h1>
          <p className="text-muted-foreground">
            Administra las carreras de la institución
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
          <Dialog open={isAddCareerOpen} onOpenChange={setIsAddCareerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva carrera
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedCareer ? "Editar carrera" : "Agregar nueva carrera"}
                </DialogTitle>
                <DialogDescription>
                  {selectedCareer
                    ? "Modifica los datos de la carrera seleccionada"
                    : "Completa los datos para crear una nueva carrera"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la carrera</Label>
                    <Input
                      id="name"
                      value={newCareer.name}
                      onChange={(e) =>
                        setNewCareer({ ...newCareer, name: e.target.value })
                      }
                      placeholder="Ej: Ingeniería en Sistemas"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      value={newCareer.code}
                      onChange={(e) =>
                        setNewCareer({ ...newCareer, code: e.target.value })
                      }
                      placeholder="Ej: IS-2023"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Select
                      value={newCareer.department}
                      onValueChange={(value) =>
                        setNewCareer({ ...newCareer, department: value })
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
                      value={newCareer.director}
                      onChange={(e) =>
                        setNewCareer({ ...newCareer, director: e.target.value })
                      }
                      placeholder="Ej: Dr. Juan Martínez"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración (años)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="10"
                      value={newCareer.duration}
                      onChange={(e) =>
                        setNewCareer({
                          ...newCareer,
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
                      value={newCareer.credits}
                      onChange={(e) =>
                        setNewCareer({
                          ...newCareer,
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
                    value={newCareer.description}
                    onChange={(e) =>
                      setNewCareer({
                        ...newCareer,
                        description: e.target.value,
                      })
                    }
                    placeholder="Breve descripción de la carrera"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Estado</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status" className="text-sm">
                      {newCareer.status === "active" ? "Activa" : "Inactiva"}
                    </Label>
                    <Switch
                      id="status"
                      checked={newCareer.status === "active"}
                      onCheckedChange={(checked) =>
                        setNewCareer({
                          ...newCareer,
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
                    setIsAddCareerOpen(false);
                    setSelectedCareer(null);
                    setNewCareer({
                      name: "",
                      code: "",
                      department: "",
                      director: "",
                      duration: 5,
                      credits: 240,
                      status: "active",
                      description: "",
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddCareer}>
                  {selectedCareer ? "Guardar cambios" : "Agregar carrera"}
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
            placeholder="Buscar por nombre, código o departamento..."
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
                {(filters.department || filters.status) && (
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
                  Filtra las carreras según tus preferencias
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
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
                      <SelectItem value="all">
                        Todos los departamentos
                      </SelectItem>
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
                      <SelectItem value="all">Todos los estados</SelectItem>
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
          <CardTitle>Listado de Carreras</CardTitle>
          <CardDescription>
            Total: {sortedCareers.length} carreras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>
                  <div
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => handleSort("name")}
                  >
                    Nombre
                    {sortBy === "name" && <ArrowUpDown className="h-4 w-4" />}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => handleSort("code")}
                  >
                    Código
                    {sortBy === "code" && <ArrowUpDown className="h-4 w-4" />}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => handleSort("department")}
                  >
                    Departamento
                    {sortBy === "department" && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => handleSort("duration")}
                  >
                    Duración
                    {sortBy === "duration" && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex cursor-pointer items-center gap-1"
                    onClick={() => handleSort("students")}
                  >
                    Estudiantes
                    {sortBy === "students" && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCareers.length > 0 ? (
                sortedCareers.map((career, index) => (
                  <TableRow key={career.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{career.name}</TableCell>
                    <TableCell>{career.code}</TableCell>
                    <TableCell>{career.department}</TableCell>
                    <TableCell>{career.duration} años</TableCell>
                    <TableCell>{career.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          career.status === "active" ? "outline" : "secondary"
                        }
                      >
                        {career.status === "active" ? "Activa" : "Inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
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
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditCareer(career)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCareer(career);
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
                              href={`/dashboard/admin/careers/${career.id}`}
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
                      <GraduationCap className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No se encontraron carreras con los criterios
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
            <DialogTitle>Eliminar carrera</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la carrera{" "}
              {selectedCareer?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground text-sm">
              Esta acción no se puede deshacer. Se eliminará la carrera y todos
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
            <Button variant="destructive" onClick={handleDeleteCareer}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
