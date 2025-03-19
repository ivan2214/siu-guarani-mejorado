"use client";

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
import {} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountStatus, Role } from "@prisma/client";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddUserFormSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	dni: z.string().min(1),
	phone: z.string().min(1),
	address: z.string().min(1),
	password: z.string().min(1),
	confirmPassword: z.string().min(1),
	role: z.enum([Role.ESTUDIANTE, Role.PROFESOR, Role.ADMIN]),
	accountStatus: z.enum([
		AccountStatus.ACTIVA,
		AccountStatus.BANEADA,
		AccountStatus.ELIMINADA,
		AccountStatus.INACTIVA,
		AccountStatus.SUSPENDIDA,
	]),
});

export const DialogAddUser = () => {
	const [selectedRol, setSelectedRol] = useState<Role>(Role.ESTUDIANTE);

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const initialFormData = {
		name: "",
		email: "",
		dni: "",
		phone: "",
		address: "",
		password: "",
		confirmPassword: "",
		role: Role.ESTUDIANTE,
		accountStatus: AccountStatus.ACTIVA,
	};

	const form = useForm<z.infer<typeof AddUserFormSchema>>({
		resolver: zodResolver(AddUserFormSchema),
		defaultValues: initialFormData,
	});

	function onSubmit(values: z.infer<typeof AddUserFormSchema>) {
		console.log(values);
	}

	console.log("Form Data", form.getValues());

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<UserPlus className="mr-2 h-4 w-4" />
					Agregar Usuario
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Agregar Usuario</DialogTitle>
					<DialogDescription>
						Completa los datos para registrar un nuevo usuario en el sistema
						académico.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4 py-4"
					>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre</FormLabel>
											<FormControl>
												<Input placeholder="Ej: Juan Pérez" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Correo</FormLabel>
											<FormControl>
												<Input placeholder="Ej: juan@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="dni"
									render={({ field }) => (
										<FormItem>
											<FormLabel>DNI</FormLabel>
											<FormControl>
												<Input placeholder="Ej: 45.678.901" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Telefono</FormLabel>
											<FormControl>
												<Input
													type="tel"
													placeholder="Ej: 987654321"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dirección</FormLabel>
										<FormControl>
											<Input placeholder="Ej: Calle 123, Ciudad" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<div className="flex items-center gap-x-4">
											<Input
												id="password"
												type={isPasswordVisible ? "text" : "password"}
												placeholder="********"
												autoComplete="off"
												{...field}
											/>
											{isPasswordVisible ? (
												<EyeOff
													className="h-6 w-6 cursor-pointer"
													onClick={() =>
														setIsPasswordVisible(!isPasswordVisible)
													}
												/>
											) : (
												<Eye
													className="h-6 w-6 cursor-pointer"
													onClick={() =>
														setIsPasswordVisible(!isPasswordVisible)
													}
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Confirmar Contraseña</FormLabel>
									<FormControl>
										<div className="flex items-center gap-x-4">
											<Input
												id="confirmPassword"
												type={isConfirmPasswordVisible ? "text" : "password"}
												placeholder="********"
												autoComplete="off"
												{...field}
											/>
											{isConfirmPasswordVisible ? (
												<EyeOff
													className="h-6 w-6 cursor-pointer"
													onClick={() =>
														setIsConfirmPasswordVisible(
															!isConfirmPasswordVisible,
														)
													}
												/>
											) : (
												<Eye
													className="h-6 w-6 cursor-pointer"
													onClick={() =>
														setIsConfirmPasswordVisible(
															!isConfirmPasswordVisible,
														)
													}
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rol del usuario</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Seleccione un rol" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{[Role.ADMIN, Role.PROFESOR, Role.ESTUDIANTE].map(
												(role) => (
													<SelectItem key={role} value={role}>
														{role}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="accountStatus"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estado de la cuenta</FormLabel>
									<FormControl>
										<div className="flex items-center space-x-2">
											<Switch
												checked={field.value === AccountStatus.ACTIVA}
												onCheckedChange={(checked) => {
													field.onChange(
														checked
															? AccountStatus.ACTIVA
															: AccountStatus.INACTIVA,
													);
												}}
											/>
											<Badge
												variant={
													field.value === AccountStatus.ACTIVA
														? "success"
														: "destructive"
												}
											>
												{field.value === AccountStatus.ACTIVA
													? "Activa"
													: "Inactiva"}
											</Badge>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								variant="outline"
								type="reset"
								onClick={() => {
									setIsOpen(false);
									form.reset();
								}}
							>
								Cancelar
							</Button>
							<Button type="submit">Guardar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
