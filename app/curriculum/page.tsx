"use client";

import {
	Check,
	Download,
	ExternalLink,
	FileText,
	Info,
	Search,
} from "lucide-react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample curriculum data
const curriculum = {
	name: "Ingeniería en Sistemas",
	code: "IS-2018",
	totalCredits: 240,
	completedCredits: 80,
	years: [
		{
			year: 1,
			semesters: [
				{
					semester: 1,
					subjects: [
						{
							id: 1,
							code: "MAT101",
							name: "Matemática I",
							credits: 6,
							status: "approved",
							grade: 8,
							type: "mandatory",
							correlatives: [],
						},
						{
							id: 2,
							code: "PRG101",
							name: "Programación I",
							credits: 8,
							status: "approved",
							grade: 9,
							type: "mandatory",
							correlatives: [],
						},
						{
							id: 3,
							code: "FIS101",
							name: "Física I",
							credits: 6,
							status: "approved",
							grade: 7,
							type: "mandatory",
							correlatives: [],
						},
						{
							id: 4,
							code: "QUI101",
							name: "Química",
							credits: 4,
							status: "approved",
							grade: 6,
							type: "mandatory",
							correlatives: [],
						},
					],
				},
				{
					semester: 2,
					subjects: [
						{
							id: 5,
							code: "MAT201",
							name: "Matemática II",
							credits: 6,
							status: "approved",
							grade: 8,
							type: "mandatory",
							correlatives: ["MAT101"],
						},
						{
							id: 6,
							code: "PRG102",
							name: "Programación II",
							credits: 8,
							status: "approved",
							grade: 10,
							type: "mandatory",
							correlatives: ["PRG101"],
						},
						{
							id: 7,
							code: "FIS201",
							name: "Física II",
							credits: 6,
							status: "approved",
							grade: 8,
							type: "mandatory",
							correlatives: ["FIS101", "MAT101"],
						},
						{
							id: 8,
							code: "ALG101",
							name: "Álgebra",
							credits: 4,
							status: "approved",
							grade: 7,
							type: "mandatory",
							correlatives: [],
						},
					],
				},
			],
		},
		{
			year: 2,
			semesters: [
				{
					semester: 1,
					subjects: [
						{
							id: 9,
							code: "MAT301",
							name: "Matemática III",
							credits: 6,
							status: "in_progress",
							grade: null,
							type: "mandatory",
							correlatives: ["MAT201"],
						},
						{
							id: 10,
							code: "PRG201",
							name: "Programación III",
							credits: 8,
							status: "in_progress",
							grade: null,
							type: "mandatory",
							correlatives: ["PRG102"],
						},
						{
							id: 11,
							code: "EST101",
							name: "Estadística",
							credits: 4,
							status: "in_progress",
							grade: null,
							type: "mandatory",
							correlatives: ["MAT201"],
						},
						{
							id: 12,
							code: "ING101",
							name: "Inglés Técnico",
							credits: 2,
							status: "in_progress",
							grade: null,
							type: "mandatory",
							correlatives: [],
						},
					],
				},
				{
					semester: 2,
					subjects: [
						{
							id: 13,
							code: "BD101",
							name: "Bases de Datos",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["PRG102"],
						},
						{
							id: 14,
							code: "SO101",
							name: "Sistemas Operativos",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["PRG102"],
						},
						{
							id: 15,
							code: "RED101",
							name: "Redes de Computadoras",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["FIS201"],
						},
						{
							id: 16,
							code: "ALG201",
							name: "Algoritmos Avanzados",
							credits: 4,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["PRG102", "ALG101"],
						},
					],
				},
			],
		},
		{
			year: 3,
			semesters: [
				{
					semester: 1,
					subjects: [
						{
							id: 17,
							code: "IS101",
							name: "Ingeniería de Software",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["PRG201", "BD101"],
						},
						{
							id: 18,
							code: "ARQ101",
							name: "Arquitectura de Computadoras",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["SO101"],
						},
						{
							id: 19,
							code: "OPT101",
							name: "Optativa I",
							credits: 4,
							status: "pending",
							grade: null,
							type: "optional",
							correlatives: [],
						},
						{
							id: 20,
							code: "PRO101",
							name: "Proyecto I",
							credits: 4,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["PRG201"],
						},
					],
				},
				{
					semester: 2,
					subjects: [
						{
							id: 21,
							code: "IS201",
							name: "Ingeniería de Software II",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["IS101"],
						},
						{
							id: 22,
							code: "SEG101",
							name: "Seguridad Informática",
							credits: 4,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["RED101", "SO101"],
						},
						{
							id: 23,
							code: "OPT102",
							name: "Optativa II",
							credits: 4,
							status: "pending",
							grade: null,
							type: "optional",
							correlatives: [],
						},
						{
							id: 24,
							code: "PRO201",
							name: "Proyecto II",
							credits: 6,
							status: "pending",
							grade: null,
							type: "mandatory",
							correlatives: ["PRO101", "IS101"],
						},
					],
				},
			],
		},
	],
	optionalSubjects: [
		{
			id: 101,
			code: "IA101",
			name: "Inteligencia Artificial",
			credits: 4,
			status: "pending",
			grade: null,
			type: "optional",
			correlatives: ["ALG201", "EST101"],
		},
		{
			id: 102,
			code: "ML101",
			name: "Machine Learning",
			credits: 4,
			status: "pending",
			grade: null,
			type: "optional",
			correlatives: ["ALG201", "EST101"],
		},
		{
			id: 103,
			code: "MOV101",
			name: "Desarrollo Móvil",
			credits: 4,
			status: "pending",
			grade: null,
			type: "optional",
			correlatives: ["PRG201"],
		},
		{
			id: 104,
			code: "WEB101",
			name: "Desarrollo Web",
			credits: 4,
			status: "pending",
			grade: null,
			type: "optional",
			correlatives: ["PRG201"],
		},
		{
			id: 105,
			code: "IOT101",
			name: "Internet de las Cosas",
			credits: 4,
			status: "pending",
			grade: null,
			type: "optional",
			correlatives: ["RED101", "ARQ101"],
		},
		{
			id: 106,
			code: "CLOUD101",
			name: "Computación en la Nube",
			credits: 4,
			status: "pending",
			grade: null,
			type: "optional",
			correlatives: ["RED101", "SO101"],
		},
	],
};

export default function CurriculumPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSubject, setSelectedSubject] = useState<any>(null);

	// Calculate progress
	const progress =
		(curriculum.completedCredits / curriculum.totalCredits) * 100;

	// Filter subjects based on search term
	const filterSubjects = (subjects: any[]) => {
		if (!searchTerm) return subjects;

		return subjects.filter(
			(subject) =>
				subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				subject.code.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	};

	// Get status badge
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "approved":
				return <Badge variant="success">Aprobada</Badge>;
			case "in_progress":
				return <Badge variant="outline">En curso</Badge>;
			case "pending":
				return <Badge variant="secondary">Pendiente</Badge>;
			default:
				return <Badge>Desconocido</Badge>;
		}
	};

	// Get type badge
	const getTypeBadge = (type: string) => {
		switch (type) {
			case "mandatory":
				return <Badge variant="default">Obligatoria</Badge>;
			case "optional":
				return <Badge variant="outline">Optativa</Badge>;
			default:
				return <Badge>Desconocido</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">
						Plan de Estudios
					</h1>
					<p className="text-muted-foreground">
						{curriculum.name} - {curriculum.code}
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Descargar PDF
					</Button>
					<Button variant="outline">
						<ExternalLink className="mr-2 h-4 w-4" />
						Ver en detalle
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Progreso de la carrera
						</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">{Math.round(progress)}%</div>
						<Progress value={progress} className="mt-2 h-2" />
						<p className="mt-2 text-muted-foreground text-xs">
							{curriculum.completedCredits} de {curriculum.totalCredits}{" "}
							créditos completados
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Materias Aprobadas
						</CardTitle>
						<Check className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">8</div>
						<p className="text-muted-foreground text-xs">
							De un total de 24 materias obligatorias
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Materias en Curso
						</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">4</div>
						<p className="text-muted-foreground text-xs">
							Actualmente cursando
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Promedio General
						</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">7.88</div>
						<p className="text-muted-foreground text-xs">Escala 1-10</p>
					</CardContent>
				</Card>
			</div>

			<div className="relative">
				<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Buscar materia por nombre o código..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Tabs defaultValue="curriculum" className="space-y-4">
				<TabsList>
					<TabsTrigger value="curriculum">Plan de Estudios</TabsTrigger>
					<TabsTrigger value="optionals">Materias Optativas</TabsTrigger>
					<TabsTrigger value="correlatives">Correlatividades</TabsTrigger>
				</TabsList>

				<TabsContent value="curriculum" className="space-y-4">
					<Accordion type="single" collapsible className="w-full">
						{curriculum.years.map((year) => (
							<AccordionItem key={year.year} value={`year-${year.year}`}>
								<AccordionTrigger>
									<span className="font-medium text-base">Año {year.year}</span>
								</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-4">
										{year.semesters.map((semester) => (
											<div key={semester.semester}>
												<h3 className="mb-2 font-medium text-sm">
													Semestre {semester.semester}
												</h3>
												<div className="space-y-2">
													{filterSubjects(semester.subjects).map((subject) => (
														<Card key={subject.id} className="overflow-hidden">
															<CardHeader className="p-4">
																<div className="flex items-start justify-between">
																	<div>
																		<CardTitle className="text-base">
																			{subject.name}
																		</CardTitle>
																		<CardDescription>
																			{subject.code} - {subject.credits}{" "}
																			créditos
																		</CardDescription>
																	</div>
																	<div className="flex flex-col items-end gap-1">
																		{getStatusBadge(subject.status)}
																		{getTypeBadge(subject.type)}
																	</div>
																</div>
															</CardHeader>
															<CardFooter className="flex justify-between p-4 pt-0">
																{subject.status === "approved" ? (
																	<div className="text-sm">
																		<span className="font-medium">Nota: </span>
																		{subject.grade}
																	</div>
																) : (
																	<div />
																)}
																<TooltipProvider>
																	<Tooltip>
																		<TooltipTrigger asChild>
																			<Button
																				variant="ghost"
																				size="sm"
																				onClick={() =>
																					setSelectedSubject(subject)
																				}
																			>
																				<Info className="h-4 w-4" />
																				<span className="sr-only">
																					Información
																				</span>
																			</Button>
																		</TooltipTrigger>
																		<TooltipContent>
																			<p>Ver detalles de la materia</p>
																		</TooltipContent>
																	</Tooltip>
																</TooltipProvider>
															</CardFooter>
														</Card>
													))}
												</div>
											</div>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</TabsContent>

				<TabsContent value="optionals" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Materias Optativas</CardTitle>
							<CardDescription>
								Debes completar al menos 8 créditos en materias optativas
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4 sm:grid-cols-2">
								{filterSubjects(curriculum.optionalSubjects).map((subject) => (
									<Card key={subject.id} className="overflow-hidden">
										<CardHeader className="p-4">
											<div className="flex items-start justify-between">
												<div>
													<CardTitle className="text-base">
														{subject.name}
													</CardTitle>
													<CardDescription>
														{subject.code} - {subject.credits} créditos
													</CardDescription>
												</div>
												<div className="flex flex-col items-end gap-1">
													{getStatusBadge(subject.status)}
													{getTypeBadge(subject.type)}
												</div>
											</div>
										</CardHeader>
										<CardFooter className="flex justify-between p-4 pt-0">
											<div className="text-sm">
												<span className="font-medium">Correlativas: </span>
												{subject.correlatives.length > 0
													? subject.correlatives.join(", ")
													: "Ninguna"}
											</div>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setSelectedSubject(subject)}
											>
												<Info className="h-4 w-4" />
												<span className="sr-only">Información</span>
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="correlatives" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Diagrama de Correlatividades</CardTitle>
							<CardDescription>
								Esta vista no está disponible en la versión actual.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex h-[400px] items-center justify-center">
							<p className="text-muted-foreground">
								El diagrama de correlatividades estará disponible próximamente.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Subject details dialog */}
			<Dialog
				open={!!selectedSubject}
				onOpenChange={(open) => !open && setSelectedSubject(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{selectedSubject?.name}</DialogTitle>
						<DialogDescription>
							{selectedSubject?.code} - {selectedSubject?.credits} créditos
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<p className="font-medium text-sm">Estado</p>
								<div>
									{selectedSubject && getStatusBadge(selectedSubject.status)}
								</div>
							</div>
							<div className="space-y-1 text-right">
								<p className="font-medium text-sm">Tipo</p>
								<div>
									{selectedSubject && getTypeBadge(selectedSubject.type)}
								</div>
							</div>
						</div>

						{selectedSubject?.status === "approved" && (
							<div className="space-y-1">
								<p className="font-medium text-sm">Nota</p>
								<p className="text-sm">{selectedSubject?.grade}</p>
							</div>
						)}

						<div className="space-y-1">
							<p className="font-medium text-sm">Correlativas</p>
							<p className="text-sm">
								{selectedSubject?.correlatives.length > 0
									? selectedSubject?.correlatives.join(", ")
									: "Ninguna"}
							</p>
						</div>

						<div className="space-y-1">
							<p className="font-medium text-sm">Descripción</p>
							<p className="text-muted-foreground text-sm">
								Esta materia proporciona los conocimientos fundamentales sobre{" "}
								{selectedSubject?.name.toLowerCase()}. Los estudiantes
								aprenderán conceptos teóricos y prácticos aplicables en el campo
								profesional.
							</p>
						</div>

						<Separator />

						<div className="space-y-1">
							<p className="font-medium text-sm">Programa de la materia</p>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-muted-foreground" />
									<p className="text-sm">
										Programa-{selectedSubject?.code}.pdf
									</p>
									<Button
										variant="ghost"
										size="sm"
										className="ml-auto"
										onClick={() => toast.success("Programa descargado")}
									>
										<Download className="h-4 w-4" />
										<span className="sr-only">Descargar</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setSelectedSubject(null)}>
							Cerrar
						</Button>
						{selectedSubject?.status === "pending" && (
							<Button
								onClick={() => {
									toast.success("Solicitud de inscripción enviada");
									setSelectedSubject(null);
								}}
							>
								Solicitar inscripción
							</Button>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
