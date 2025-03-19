"use client";

import type React from "react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
	BellOff,
	Check,
	CheckCheck,
	Ellipsis,
	File,
	Paperclip,
	Plus,
	Search,
	Send,
	User,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

// Sample contacts data
const contacts = [
	{
		id: 1,
		name: "Dr. Juan Martínez",
		role: "Profesor",
		avatar: "/placeholder.svg?height=40&width=40",
		status: "online",
		lastMessage: "Recuerden entregar el trabajo práctico antes del viernes.",
		lastMessageTime: "10:30",
		unread: 2,
	},
	{
		id: 2,
		name: "Ing. María López",
		role: "Profesora",
		avatar: "/placeholder.svg?height=40&width=40",
		status: "offline",
		lastMessage: "Las notas del parcial ya están disponibles.",
		lastMessageTime: "Ayer",
		unread: 0,
	},
	{
		id: 3,
		name: "Pedro Gómez",
		role: "Estudiante",
		avatar: "/placeholder.svg?height=40&width=40",
		status: "online",
		lastMessage: "¿Pudiste resolver el ejercicio 5?",
		lastMessageTime: "Ayer",
		unread: 0,
	},
	{
		id: 4,
		name: "Laura Fernández",
		role: "Estudiante",
		avatar: "/placeholder.svg?height=40&width=40",
		status: "offline",
		lastMessage: "Gracias por la ayuda con el trabajo práctico.",
		lastMessageTime: "Lun",
		unread: 0,
	},
	{
		id: 5,
		name: "Carlos Rodríguez",
		role: "Estudiante",
		avatar: "/placeholder.svg?height=40&width=40",
		status: "online",
		lastMessage: "¿Alguien tiene los apuntes de la clase pasada?",
		lastMessageTime: "Dom",
		unread: 0,
	},
];

// Sample messages for a conversation
const sampleMessages = [
	{
		id: 1,
		senderId: 1,
		text: "Hola, quería recordarles que el trabajo práctico debe ser entregado antes del viernes.",
		timestamp: "2023-06-10T10:30:00",
		status: "read",
	},
	{
		id: 2,
		senderId: "me",
		text: "Gracias por el recordatorio, profesor. ¿Podría aclarar algunos puntos sobre el formato de entrega?",
		timestamp: "2023-06-10T10:35:00",
		status: "read",
	},
	{
		id: 3,
		senderId: 1,
		text: "Claro, el trabajo debe ser entregado en formato PDF a través del campus virtual. Recuerden incluir portada con nombres y legajos.",
		timestamp: "2023-06-10T10:40:00",
		status: "read",
	},
	{
		id: 4,
		senderId: "me",
		text: "Perfecto, muchas gracias por la aclaración.",
		timestamp: "2023-06-10T10:42:00",
		status: "read",
	},
	{
		id: 5,
		senderId: 1,
		text: "No hay problema. Si tienen más dudas, no duden en consultarme.",
		timestamp: "2023-06-10T10:45:00",
		status: "read",
	},
	{
		id: 6,
		senderId: 1,
		text: "También quería informarles que la próxima semana tendremos una clase especial con un invitado de la industria.",
		timestamp: "2023-06-10T11:00:00",
		status: "read",
	},
];

export default function MessagesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedContact, setSelectedContact] = useState(contacts[0]);
	const [messages, setMessages] = useState(sampleMessages);
	const [newMessage, setNewMessage] = useState("");
	const [isNewChatOpen, setIsNewChatOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Filter contacts based on search term
	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Scroll to bottom of messages when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = () => {
		if (!newMessage.trim()) return;

		const newMsg = {
			id: messages.length + 1,
			senderId: "me",
			text: newMessage,
			timestamp: new Date().toISOString(),
			status: "sent",
		};

		setMessages([...messages, newMsg]);
		setNewMessage("");

		// Simulate response after a delay
		setTimeout(() => {
			const responseMsg = {
				id: messages.length + 2,
				senderId: selectedContact.id,
				text: "Gracias por tu mensaje. Te responderé a la brevedad.",
				timestamp: new Date().toISOString(),
				status: "sent",
			};

			setMessages((prev) => [...prev, responseMsg]);
			toast.success("Nuevo mensaje recibido");
		}, 3000);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const formatMessageTime = (timestamp: string) => {
		const date = new Date(timestamp);
		const now = new Date();
		const isToday = date.toDateString() === now.toDateString();

		if (isToday) {
			return format(date, "HH:mm", { locale: es });
		}
		return format(date, "dd MMM, HH:mm", { locale: es });
	};

	const getMessageStatusIcon = (status: string) => {
		switch (status) {
			case "sent":
				return <Check className="h-3 w-3 text-muted-foreground" />;
			case "delivered":
				return <Check className="h-3 w-3 text-muted-foreground" />;
			case "read":
				return <CheckCheck className="h-3 w-3 text-primary" />;
			default:
				return null;
		}
	};

	return (
		<div className="h-[calc(100vh-8rem)]">
			<div className="flex h-full rounded-lg border">
				{/* Contacts sidebar */}
				<div className="h-full w-full border-r sm:w-80">
					<div className="border-b p-4">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="font-semibold text-lg">Mensajes</h2>
							<Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
								<DialogTrigger asChild>
									<Button variant="ghost" size="icon">
										<Plus className="h-4 w-4" />
										<span className="sr-only">Nuevo mensaje</span>
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Nuevo mensaje</DialogTitle>
										<DialogDescription>
											Inicia una nueva conversación con un profesor o compañero.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4 py-4">
										<div className="space-y-2">
											<label
												htmlFor="recipient"
												className="font-medium text-sm"
											>
												Destinatario
											</label>
											<div className="relative">
												<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
												<Input
													id="recipient"
													placeholder="Buscar contacto..."
													className="pl-8"
												/>
											</div>
										</div>
										<div className="space-y-2">
											<label htmlFor="message" className="font-medium text-sm">
												Mensaje
											</label>
											<Textarea
												id="message"
												placeholder="Escribe tu mensaje..."
												rows={4}
											/>
										</div>
									</div>
									<DialogFooter>
										<Button
											variant="outline"
											onClick={() => setIsNewChatOpen(false)}
										>
											Cancelar
										</Button>
										<Button
											onClick={() => {
												toast.success("Mensaje enviado");
												setIsNewChatOpen(false);
											}}
										>
											Enviar
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
						<div className="relative">
							<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Buscar conversación..."
								className="pl-8"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>
					<ScrollArea className="h-full">
						<div className="h-full space-y-1 p-2">
							{filteredContacts.length > 0 ? (
								filteredContacts.map((contact) => (
									<Button
										key={contact.id}
										className={`flex h-full w-full items-start gap-3 rounded-lg p-2 text-left ${
											selectedContact.id !== contact.id
												? "bg-muted"
												: "hover:bg-muted/50"
										}`}
										onClick={() => setSelectedContact(contact)}
									>
										<div className="relative">
											<Avatar>
												<AvatarImage src={contact.avatar} alt={contact.name} />
												<AvatarFallback>
													{contact.name.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<span
												className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-background ${
													contact.status === "online"
														? "bg-green-500"
														: "bg-gray-400"
												}`}
											/>
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex items-center justify-between">
												<span className="font-medium text-sm">
													{contact.name}
												</span>
												<span className="text-muted-foreground text-xs">
													{contact.lastMessageTime}
												</span>
											</div>
											<p className="line-clamp-4 text-muted-foreground text-xs">
												{contact.lastMessage}
											</p>
											<div className="mt-1 flex items-center">
												<span className="text-muted-foreground text-xs">
													{contact.role}
												</span>
												{contact.unread > 0 && (
													<Badge
														variant="default"
														className="ml-auto flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
													>
														{contact.unread}
													</Badge>
												)}
											</div>
										</div>
									</Button>
								))
							) : (
								<div className="py-4 text-center">
									<p className="text-muted-foreground text-sm">
										No se encontraron conversaciones
									</p>
								</div>
							)}
						</div>
					</ScrollArea>
				</div>

				{/* Chat area */}
				<div className="flex flex-1 flex-col">
					{/* Chat header */}
					<div className="flex items-center justify-between border-b p-4">
						<div className="flex items-center gap-3">
							<Avatar>
								<AvatarImage
									src={selectedContact.avatar}
									alt={selectedContact.name}
								/>
								<AvatarFallback>
									{selectedContact.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-medium">{selectedContact.name}</h3>
								<div className="flex items-center gap-1">
									<span
										className={`h-2 w-2 rounded-full ${
											selectedContact.status === "online"
												? "bg-green-500"
												: "bg-gray-400"
										}`}
									/>
									<span className="text-muted-foreground text-xs">
										{selectedContact.status === "online"
											? "En línea"
											: "Desconectado"}
									</span>
								</div>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<Ellipsis className="h-4 w-4" />
									<span className="sr-only">Más opciones</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>Ver perfil</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<File className="mr-2 h-4 w-4" />
									<span>Archivos compartidos</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<BellOff className="mr-2 h-4 w-4" />
									<span>Silenciar notificaciones</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="text-destructive">
									<X className="mr-2 h-4 w-4" />

									<span>Eliminar conversación</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Messages */}
					<ScrollArea className="flex-1 p-4">
						<div className="space-y-4">
							{messages.map((message) => {
								const isMe = message.senderId === "me";

								return (
									<div
										key={message.id}
										className={`flex ${isMe ? "justify-end" : "justify-start"}`}
									>
										<div
											className={`flex max-w-[80%] gap-2 ${
												isMe ? "flex-row-reverse" : ""
											}`}
										>
											{!isMe && (
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={selectedContact.avatar}
														alt={selectedContact.name}
													/>
													<AvatarFallback>
														{selectedContact.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
											)}
											<div>
												<div
													className={`rounded-lg p-3 ${
														isMe
															? "bg-primary text-primary-foreground"
															: "bg-muted"
													}`}
												>
													<p className="text-sm">{message.text}</p>
												</div>
												<div
													className={`mt-1 flex items-center gap-1 text-muted-foreground text-xs ${
														isMe ? "justify-end" : ""
													}`}
												>
													<span>{formatMessageTime(message.timestamp)}</span>
													{isMe && getMessageStatusIcon(message.status)}
												</div>
											</div>
										</div>
									</div>
								);
							})}
							<div ref={messagesEndRef} />
						</div>
					</ScrollArea>

					{/* Message input */}
					<div className="border-t p-4">
						<div className="flex items-end gap-2">
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 rounded-full"
							>
								<Paperclip className="h-4 w-4" />
								<span className="sr-only">Adjuntar archivo</span>
							</Button>
							<Textarea
								placeholder="Escribe un mensaje..."
								className="min-h-10 flex-1 resize-none"
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
							<Button
								size="icon"
								className="shrink-0 rounded-full"
								onClick={handleSendMessage}
								disabled={!newMessage.trim()}
							>
								<Send className="h-4 w-4" />
								<span className="sr-only">Enviar mensaje</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
