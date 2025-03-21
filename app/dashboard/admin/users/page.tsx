import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsers } from "@/prisma/users";
import { Search } from "lucide-react";
import Link from "next/link";
import { DialogAddUser } from "./components/dialog-add-user";

export default async function UsersPage() {
	const users = await getUsers();

	return (
		<div className="container mx-auto space-y-6 py-6">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl">User Management</h1>
				<DialogAddUser />
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<CardTitle>Users</CardTitle>
						<div className="flex flex-col gap-2 md:flex-row">
							<div className="relative">
								<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search users..."
									className="w-full pl-8 md:w-[250px]"
								/>
							</div>
							<Select defaultValue="all-roles">
								<SelectTrigger className="w-full md:w-[180px]">
									<SelectValue placeholder="Filter by role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all-roles">All Roles</SelectItem>
									<SelectItem value="student">Student</SelectItem>
									<SelectItem value="teacher">Teacher</SelectItem>
									<SelectItem value="admin">Admin</SelectItem>
								</SelectContent>
							</Select>
							<Select defaultValue="all-status">
								<SelectTrigger className="w-full md:w-[180px]">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all-status">All Status</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="all" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="all">All Users</TabsTrigger>
							<TabsTrigger value="students">Students</TabsTrigger>
							<TabsTrigger value="teachers">Teachers</TabsTrigger>
							<TabsTrigger value="admins">Administrators</TabsTrigger>
						</TabsList>
						<TabsContent value="all" className="space-y-4">
							<div className="overflow-hidden rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>User</TableHead>
											<TableHead>Role</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Last Login</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{users.map((user) => (
											<TableRow key={user.id}>
												<TableCell>
													<div className="flex items-center gap-3">
														<Avatar>
															<AvatarImage
																src={user.avatar || ""}
																alt={user.name}
															/>
															<AvatarFallback>
																{user.name.substring(0, 2).toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<div>
															<div className="font-medium">{user.name}</div>
															<div className="text-muted-foreground text-sm">
																{user.email}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant={
															user.role === "ADMIN"
																? "default"
																: user.role === "PROFESOR"
																	? "outline"
																	: "secondary"
														}
													>
														{user.role}
													</Badge>
												</TableCell>
												<TableCell>
													<Badge
														variant={
															user.userStatus === "ACTIVO"
																? "success"
																: "destructive"
														}
													>
														{user.userStatus}
													</Badge>
												</TableCell>
												{user.lastLogin && (
													<TableCell>
														{new Date(user.lastLogin).toLocaleDateString()} at{" "}
														{new Date(user.lastLogin).toLocaleTimeString([], {
															hour: "2-digit",
															minute: "2-digit",
														})}
													</TableCell>
												)}
												<TableCell className="text-right">
													<Link href={`/dashboard/admin/users/${user.id}`}>
														<Button variant="ghost" size="sm">
															View
														</Button>
													</Link>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#" isActive>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">2</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</TabsContent>
						<TabsContent value="students">
							{/* Similar content for students tab */}
							<div className="py-10 text-center text-muted-foreground">
								Filter applied for students
							</div>
						</TabsContent>
						<TabsContent value="teachers">
							{/* Similar content for teachers tab */}
							<div className="py-10 text-center text-muted-foreground">
								Filter applied for teachers
							</div>
						</TabsContent>
						<TabsContent value="admins">
							{/* Similar content for admins tab */}
							<div className="py-10 text-center text-muted-foreground">
								Filter applied for administrators
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
