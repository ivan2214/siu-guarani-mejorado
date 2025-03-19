import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserById } from "@/prisma/users";
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	Clock,
	Edit,
	Mail,
	MapPin,
	Phone,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function UserDetailPage({ params }: { params: Params }) {
	const { id } = await params;

	const user = await getUserById(id);

	if (!user) {
		return notFound();
	}

	return (
		<div className="container mx-auto space-y-6 py-6">
			<div className="flex items-center gap-2">
				<Link href="/dashboard/admin/users">
					<Button variant="ghost" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="font-bold text-3xl">User Details</h1>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card className="md:col-span-1">
					<CardContent className="pt-6">
						<div className="flex flex-col items-center text-center">
							<Avatar className="mb-4 h-32 w-32">
								<AvatarImage src={user.avatar || ""} alt={user.name} />
								<AvatarFallback>
									{user.name.substring(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<h2 className="font-bold text-2xl">{user.name}</h2>
							<p className="mb-2 text-muted-foreground">{user.id}</p>
							<Badge
								variant={
									user.role === "ADMIN"
										? "default"
										: user.role === "PROFESOR"
											? "outline"
											: "secondary"
								}
								className="mb-4"
							>
								{user.role}
							</Badge>
							<div className="w-full space-y-3">
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">{user.email}</span>
								</div>
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">{user.phone}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">{user.address}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Joined
										{new Date(user.createdAt).toLocaleDateString()}
									</span>
								</div>
							</div>
							<Separator className="my-4" />
							<Button className="w-full">
								<Edit className="mr-2 h-4 w-4" />
								Edit Profile
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6 md:col-span-2">
					<Tabs defaultValue="overview" className="w-full">
						<TabsList className="mb-4 grid grid-cols-4">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="academic">Academic</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="overview" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>User Information</CardTitle>
									<CardDescription>
										Basic information about the user
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
										<div className="space-y-1">
											<p className="font-medium text-sm">Full Name</p>
											<p className="text-muted-foreground text-sm">
												{user.name}
											</p>
										</div>
										<div className="space-y-1">
											<p className="font-medium text-sm">Email</p>
											<p className="text-muted-foreground text-sm">
												{user.email}
											</p>
										</div>
										<div className="space-y-1">
											<p className="font-medium text-sm">Phone</p>
											<p className="text-muted-foreground text-sm">
												{user.phone}
											</p>
										</div>
										<div className="space-y-1">
											<p className="font-medium text-sm">Address</p>
											<p className="text-muted-foreground text-sm">
												{user.address}
											</p>
										</div>
										<div className="space-y-1">
											<p className="font-medium text-sm">Role</p>
											<p className="text-muted-foreground text-sm">
												{user.role}
											</p>
										</div>
										<div className="space-y-1">
											<p className="font-medium text-sm">Status</p>
											<p className="text-muted-foreground text-sm">
												{user.userStatus}
											</p>
										</div>
										<div className="space-y-1">
											<p className="font-medium text-sm">Enrollment Date</p>
											<p className="text-muted-foreground text-sm">
												{new Date(user.createdAt).toLocaleDateString()}
											</p>
										</div>
										{user.lastLogin && (
											<div className="space-y-1">
												<p className="font-medium text-sm">Last Login</p>
												<p className="text-muted-foreground text-sm">
													{new Date(user.lastLogin).toLocaleDateString()} at{" "}
													{new Date(user.lastLogin).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit",
													})}
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								{user.student && (
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="font-medium text-sm">
												Program
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="flex items-center">
												<BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
												<span>{user.student.career.map((c) => c.name)}</span>
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						</TabsContent>

						<TabsContent value="academic" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Academic Information</CardTitle>
									<CardDescription>
										Courses, grades, and academic progress
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<h3 className="mb-2 font-medium text-lg">
												Current Courses
											</h3>
											<div className="overflow-hidden rounded-md border">
												<table className="min-w-full divide-y divide-border">
													<thead>
														<tr className="bg-muted/50">
															<th className="px-4 py-2 text-left font-medium text-sm">
																Course Code
															</th>
															<th className="px-4 py-2 text-left font-medium text-sm">
																Course Name
															</th>
															<th className="px-4 py-2 text-left font-medium text-sm">
																Grade
															</th>
														</tr>
													</thead>
													<tbody className="divide-y divide-border">
														{user.student?.subjectRecords.map((record) => (
															<tr key={record.id}>
																<td className="px-4 py-2 text-sm">
																	{record.id}
																</td>
																<td className="px-4 py-2 text-sm">
																	{record.subject.name}
																</td>
																<td className="px-4 py-2 text-sm">
																	{record.grade}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="activity" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Recent Activity</CardTitle>
									<CardDescription>
										User's recent actions and system interactions
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{user.recentActivity.map((activity) => (
											<div
												key={activity.id}
												className="flex items-start gap-4 border-b pb-4 last:border-0"
											>
												<div className="rounded-full bg-primary/10 p-2">
													<Clock className="h-4 w-4 text-primary" />
												</div>
												<div>
													<p className="text-sm">{activity.action}</p>
													<p className="text-muted-foreground text-xs">
														{new Date(activity.date).toLocaleDateString()} at{" "}
														{new Date(activity.date).toLocaleTimeString([], {
															hour: "2-digit",
															minute: "2-digit",
														})}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="settings" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Account Settings</CardTitle>
									<CardDescription>
										Manage user account settings and permissions
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium">Account Status</h3>
												<p className="text-muted-foreground text-sm">
													Enable or disable user account
												</p>
											</div>
											<Badge
												variant={
													user.accountStatus === "ACTIVA"
														? "success"
														: "destructive"
												}
											>
												{user.accountStatus}
											</Badge>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium">Role Management</h3>
												<p className="text-muted-foreground text-sm">
													Change user role and permissions
												</p>
											</div>
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
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium">Reset Password</h3>
												<p className="text-muted-foreground text-sm">
													Send password reset link to user
												</p>
											</div>
											<Button variant="outline" size="sm">
												Send Reset Link
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
