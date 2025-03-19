"use client";

import {
	ArrowLeft,
	Calendar,
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

// Sample exam data
const examsData = [
	{
		id: 1,
		code: "MAT301-F",
		subject: "Matemática III",
		date: "2023-06-15",
		time: "10:00 - 12:00",
		location: "Aula 305",
		professor: "Dr. Juan Martínez",
		quota: 40,
		enrolled: 25,
		status: "available",
		type: "final",
		requirements: [
			"Matemática II aprobada",
			"75% de asistencia a clases prácticas",
		],
		description:
			"Examen final de la materia Matemática III. Se evaluarán todos los temas vistos durante el curso, con énfasis en integrales múltiples y ecuaciones diferenciales.",
		topics: [
			"Integrales múltiples",
			"Ecuaciones diferenciales ordinarias",
			"Series de Fourier",
			"Transformadas de Laplace",
			"Cálculo vectorial",
		],
		materials: [
			"Calculadora científica (no programable)",
			"Tabla de integrales (provista por la cátedra)",
			"Elementos de escritura",
		],
		previousExams: [
			{ name: "Final Matemática III - Dic 2022", url: "#" },
			{ name: "Final Matemática III - Jul 2022", url: "#" },
		],
	},
	{
		id: 2,
		code: "PRG202-F",
		subject: "Programación II",
		date: "2023-06-22",
		time: "14:00 - 16:00",
		location: "Laboratorio 2",
		professor: "Ing. María López",
		quota: 30,
		enrolled: 28,
		status: "available",
		type: "final",
		requirements: [
			"Programación I aprobada",
			"Trabajo práctico integrador entregado",
		],
		description:
			"Examen final de la materia Programación II. Consistirá en una parte teórica y una parte práctica donde se deberá resolver problemas de programación.",
		topics: [
			"Programación orientada a objetos",
			"Estructuras de datos avanzadas",
			"Algoritmos de ordenamiento y búsqueda",
			"Patrones de diseño básicos",
			"Manejo de excepciones",
		],
		materials: [
			"No se permite el uso de dispositivos electrónicos",
			"Se proveerá papel para pseudocódigo",
		],
		previousExams: [
			{ name: "Final Programación II - Dic 2022", url: "#" },
			{ name: "Final Programación II - Jul 2022", url: "#" },
		],
	},
	{
		id: 3,
		code: "FIS201-F",
		subject: "Física II",
		date: "2023-06-29",
		time: "09:00 - 11:00",
		location: "Aula 201",
		professor: "Dr. Roberto García",
		quota: 45,
		enrolled: 30,
		status: "available",
		type: "final",
		requirements: ["Física I aprobada", "Matemática I aprobada"],
		description:
			"Examen final de Física II. Se evaluarán conceptos de electromagnetismo, ondas y óptica.",
		topics: [
			"Electrostática",
			"Magnetismo",
			"Circuitos eléctricos",
			"Ondas electromagnéticas",
			"Óptica física y geométrica",
		],
		materials: [
			"Calculadora científica",
			"Tabla de constantes físicas (provista por la cátedra)",
			"Regla y elementos de escritura",
		],
		previousExams: [
			{ name: "Final Física II - Dic 2022", url: "#" },
			{ name: "Final Física II - Jul 2022", url: "#" },
		],
	},
];

export default function ExamDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);

	// Find exam by id
	const examId = Number(params.id);
	const exam = examsData.find((e) => e.id === examId);

	if (!exam) {
		return (
			<div className="flex min-h-[60vh] flex-col items-center justify-center">
				<h1 className="mb-4 font-bold text-2xl">Examen no encontrado</h1>
				<p className="mb-6 text-muted-foreground">
					El examen que estás buscando no existe o ha sido eliminado.
				</p>
				<Button onClick={() => router.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Volver a la lista de exámenes
				</Button>
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString("es-ES", options);
	};

	const handleEnrollment = () => {
		toast.success(`Te has inscrito al examen de ${exam.subject}`);
		setIsEnrollDialogOpen(false);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" onClick={() => router.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Volver
				</Button>
				<h1 className="font-bold text-3xl tracking-tight">{exam.subject}</h1>
				<Badge variant={exam.type === "final" ? "default" : "secondary"}>
					{exam.type === "final" ? "Final" : "Parcial"}
				</Badge>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="space-y-6 md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Información del examen</CardTitle>
							<CardDescription>
								Detalles sobre el examen de {exam.subject}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<Calendar className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium text-sm">Fecha</p>
										<p className="text-muted-foreground text-sm">
											{formatDate(exam.date)}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<Clock className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium text-sm">Horario</p>
										<p className="text-muted-foreground text-sm">{exam.time}</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<MapPin className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium text-sm">Ubicación</p>
										<p className="text-muted-foreground text-sm">
											{exam.location}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
										<User className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium text-sm">Profesor</p>
										<p className="text-muted-foreground text-sm">
											{exam.professor}
										</p>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h3 className="mb-2 font-medium text-sm">Descripción</h3>
								<p className="text-muted-foreground text-sm">
									{exam.description}
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Temario y materiales</CardTitle>
							<CardDescription>
								Temas a evaluar y materiales permitidos
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="mb-2 font-medium text-sm">Temas a evaluar</h3>
								<ul className="space-y-1">
									{exam.topics.map((topic, index) => (
										<li key={index} className="flex items-start gap-2 text-sm">
											<Check className="mt-0.5 h-4 w-4 text-primary" />
											<span>{topic}</span>
										</li>
									))}
								</ul>
							</div>

							<Separator />

							<div>
								<h3 className="mb-2 font-medium text-sm">
									Materiales permitidos
								</h3>
								<ul className="space-y-1">
									{exam.materials.map((material, index) => (
										<li key={index} className="flex items-start gap-2 text-sm">
											<Check className="mt-0.5 h-4 w-4 text-primary" />
											<span>{material}</span>
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Exámenes anteriores</CardTitle>
							<CardDescription>
								Modelos de exámenes de años anteriores
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								{exam.previousExams.map((prevExam, index) => (
									<div
										key={index}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-2">
											<FileText className="h-4 w-4 text-muted-foreground" />
											<span className="text-sm">{prevExam.name}</span>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => toast.success("Examen descargado")}
										>
											<Download className="h-4 w-4" />
											<span className="sr-only">Descargar</span>
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="requirements">
							<AccordionTrigger>Requisitos para inscripción</AccordionTrigger>
							<AccordionContent>
								<ul className="space-y-2">
									{exam.requirements.map((req, index) => (
										<li key={index} className="flex items-start gap-2">
											<Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
											<span>{req}</span>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Estado del examen</CardTitle>
							<CardDescription>
								Información sobre cupos y estado
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="font-medium text-sm">Estado:</span>
								{exam.status === "full" ? (
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
									{exam.enrolled}/{exam.quota}
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="font-medium text-sm">Cupos disponibles:</span>
								<span>{exam.quota - exam.enrolled}</span>
							</div>
						</CardContent>
						<CardFooter>
							<Dialog
								open={isEnrollDialogOpen}
								onOpenChange={setIsEnrollDialogOpen}
							>
								<DialogTrigger asChild>
									<Button className="w-full" disabled={exam.status === "full"}>
										Inscribirse al examen
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Confirmar inscripción</DialogTitle>
										<DialogDescription>
											¿Estás seguro de que deseas inscribirte al examen de{" "}
											{exam.subject}?
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4 py-4">
										<div className="space-y-2">
											<p className="font-medium text-sm">
												Detalles del examen:
											</p>
											<ul className="space-y-1 text-sm">
												<li className="flex items-center gap-2">
													<Calendar className="h-4 w-4 text-muted-foreground" />
													<span>{formatDate(exam.date)}</span>
												</li>
												<li className="flex items-center gap-2">
													<Clock className="h-4 w-4 text-muted-foreground" />
													<span>{exam.time}</span>
												</li>
												<li className="flex items-center gap-2">
													<MapPin className="h-4 w-4 text-muted-foreground" />
													<span>{exam.location}</span>
												</li>
											</ul>
										</div>

										<div className="rounded-md bg-muted p-4">
											<p className="text-sm">
												Al inscribirte, confirmas que cumples con todos los
												requisitos necesarios para rendir este examen.
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

					<Card>
						<CardHeader>
							<CardTitle>Información adicional</CardTitle>
							<CardDescription>
								Datos importantes sobre el examen
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<p className="font-medium text-sm">Código del examen:</p>
								<p className="text-sm">{exam.code}</p>
							</div>

							<div className="space-y-2">
								<p className="font-medium text-sm">Tipo de examen:</p>
								<p className="text-sm">
									{exam.type === "final" ? "Final" : "Parcial"}
								</p>
							</div>

							<div className="space-y-2">
								<p className="font-medium text-sm">Duración:</p>
								<p className="text-sm">2 horas</p>
							</div>

							<div className="space-y-2">
								<p className="font-medium text-sm">Modalidad:</p>
								<p className="text-sm">Presencial</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
