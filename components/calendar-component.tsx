"use client";

import { addMonths, format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

// Sample events data
const events = [
	{ date: new Date(2023, 5, 15), title: "Examen Matemática III", type: "exam" },
	{
		date: new Date(2023, 5, 22),
		title: "Examen Programación II",
		type: "exam",
	},
	{ date: new Date(2023, 5, 29), title: "Examen Física II", type: "exam" },
	{
		date: new Date(2023, 5, 10),
		title: "Entrega TP Estadística",
		type: "assignment",
	},
	{
		date: new Date(2023, 5, 5),
		title: "Inicio inscripción a materias",
		type: "enrollment",
	},
	{
		date: new Date(2023, 5, 20),
		title: "Fin inscripción a materias",
		type: "enrollment",
	},
];

export function CalendarComponent() {
	const [date, setDate] = useState<Date>(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		new Date(),
	);

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
					event.date.getFullYear() === selectedDate.getFullYear(),
			)
		: [];

	// Function to get event type badge
	const getEventBadge = (type: string) => {
		switch (type) {
			case "exam":
				return <Badge variant="destructive">Examen</Badge>;
			case "assignment":
				return <Badge variant="secondary">Entrega</Badge>;
			case "enrollment":
				return <Badge variant="outline">Inscripción</Badge>;
			default:
				return <Badge>Evento</Badge>;
		}
	};

	return (
		<div className="flex flex-col gap-6 md:flex-row">
			<div className="md:w-auto">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="font-semibold text-lg">
						{format(date, "MMMM yyyy", { locale: es })}
					</h2>
					<div className="flex items-center gap-1">
						<Button variant="outline" size="icon" onClick={handlePreviousMonth}>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Mes anterior</span>
						</Button>
						<Button variant="outline" size="icon" onClick={handleNextMonth}>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Mes siguiente</span>
						</Button>
					</div>
				</div>
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
							events.some(
								(event) =>
									event.date.getDate() === date.getDate() &&
									event.date.getMonth() === date.getMonth() &&
									event.date.getFullYear() === date.getFullYear(),
							),
					}}
					modifiersClassNames={{
						event: "bg-primary/10 font-bold text-primary",
					}}
				/>
			</div>

			<div className="flex-1">
				<div className="mb-4 flex items-center">
					<CalendarIcon className="mr-2 h-5 w-5" />
					<h2 className="font-semibold text-lg">
						{selectedDate
							? format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", {
									locale: es,
								})
							: "Selecciona una fecha"}
					</h2>
				</div>

				{selectedDateEvents.length > 0 ? (
					<div className="space-y-4">
						{selectedDateEvents.map((event, index) => (
							<Card key={index} className="p-4">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="font-medium">{event.title}</h3>
										<p className="text-muted-foreground text-sm">
											{format(event.date, "HH:mm", { locale: es })} hs
										</p>
									</div>
									{getEventBadge(event.type)}
								</div>
							</Card>
						))}
					</div>
				) : (
					<p className="text-muted-foreground">
						No hay eventos para esta fecha.
					</p>
				)}
			</div>
		</div>
	);
}
