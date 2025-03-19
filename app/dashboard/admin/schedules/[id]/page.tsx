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
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	Clock,
	Edit,
	MapPin,
	School,
	Users,
} from "lucide-react";
import Link from "next/link";

// Mock schedule data
const schedule = {
	id: "1",
	courseCode: "CS101",
	courseName: "Introduction to Programming",
	instructor: "Dr. John Smith",
	instructorEmail: "john.smith@university.edu",
	room: "A-101",
	building: "Science Building",
	days: ["Monday", "Wednesday"],
	startTime: "09:00",
	endTime: "10:30",
	semester: "Fall 2023",
	startDate: "2023-09-01",
	endDate: "2023-12-15",
	status: "Active",
	capacity: 30,
	enrolled: 25,
	waitlist: 3,
	description:
		"An introduction to programming concepts and techniques using Python. Topics include variables, data types, control structures, functions, and basic algorithms.",
	prerequisites: ["None"],
	department: "Computer Science",
	credits: 3,
	students: [
		{
			id: "1",
			name: "Alice Johnson",
			email: "alice.j@university.edu",
			status: "Enrolled",
		},
		{
			id: "2",
			name: "Bob Smith",
			email: "bob.s@university.edu",
			status: "Enrolled",
		},
		{
			id: "3",
			name: "Charlie Brown",
			email: "charlie.b@university.edu",
			status: "Waitlisted",
		},
		// More students...
	],
	sessions: [
		{ date: "2023-09-04", topic: "Introduction to Python", attendance: 23 },
		{ date: "2023-09-06", topic: "Variables and Data Types", attendance: 24 },
		{ date: "2023-09-11", topic: "Control Structures", attendance: 22 },
		{ date: "2023-09-13", topic: "Functions", attendance: 25 },
		// More sessions...
	],
};

export default function ScheduleDetailPage({
	params,
}: {
	params: { id: string };
}) {
	console.log("params", params);

	return (
		<div className="container mx-auto space-y-6 py-6">
			<div className="flex items-center gap-2">
				<Link href="/dashboard/admin/schedules">
					<Button variant="ghost" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="font-bold text-3xl">Schedule Details</h1>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card className="md:col-span-1">
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div className="text-center">
								<h2 className="font-bold text-2xl">{schedule.courseCode}</h2>
								<p className="mb-2 text-lg text-muted-foreground">
									{schedule.courseName}
								</p>
								<Badge
									variant={
										schedule.status === "Active" ? "success" : "destructive"
									}
									className="mb-4"
								>
									{schedule.status}
								</Badge>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Schedule Information</h3>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">{schedule.days.join(", ")}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										{schedule.startTime} - {schedule.endTime}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										{schedule.room}, {schedule.building}
									</span>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Course Information</h3>
								<div className="flex items-center gap-2">
									<BookOpen className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">Credits: {schedule.credits}</span>
								</div>
								<div className="flex items-center gap-2">
									<School className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Department: {schedule.department}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Capacity: {schedule.enrolled}/{schedule.capacity} (Waitlist:{" "}
										{schedule.waitlist})
									</span>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Instructor</h3>
								<div className="text-sm">
									<p className="font-medium">{schedule.instructor}</p>
									<p className="text-muted-foreground">
										{schedule.instructorEmail}
									</p>
								</div>
							</div>

							<Separator />

							<Button className="w-full">
								<Edit className="mr-2 h-4 w-4" />
								Edit Schedule
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6 md:col-span-2">
					<Tabs defaultValue="overview" className="w-full">
						<TabsList className="mb-4 grid grid-cols-4">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="students">Students</TabsTrigger>
							<TabsTrigger value="sessions">Sessions</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="overview" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Course Description</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{schedule.description}</p>
								</CardContent>
							</Card>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Prerequisites</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="list-disc space-y-1 pl-5">
											{schedule.prerequisites.map((prereq) => (
												<li key={prereq}>{prereq}</li>
											))}
										</ul>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Semester Information</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Semester:</span>
												<span>{schedule.semester}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">
													Start Date:
												</span>
												<span>
													{new Date(schedule.startDate).toLocaleDateString()}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">End Date:</span>
												<span>
													{new Date(schedule.endDate).toLocaleDateString()}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							<Card>
								<CardHeader>
									<CardTitle>Enrollment Statistics</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="rounded-lg bg-primary/10 p-4 text-center">
											<h3 className="font-medium text-lg">Capacity</h3>
											<p className="font-bold text-3xl">{schedule.capacity}</p>
										</div>
										<div className="rounded-lg bg-primary/10 p-4 text-center">
											<h3 className="font-medium text-lg">Enrolled</h3>
											<p className="font-bold text-3xl">{schedule.enrolled}</p>
										</div>
										<div className="rounded-lg bg-primary/10 p-4 text-center">
											<h3 className="font-medium text-lg">Waitlisted</h3>
											<p className="font-bold text-3xl">{schedule.waitlist}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="students" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Enrolled Students</CardTitle>
									<CardDescription>
										Students currently enrolled in this course
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="overflow-hidden rounded-md border">
										<table className="min-w-full divide-y divide-border">
											<thead>
												<tr className="bg-muted/50">
													<th className="px-4 py-2 text-left font-medium text-sm">
														Student Name
													</th>
													<th className="px-4 py-2 text-left font-medium text-sm">
														Email
													</th>
													<th className="px-4 py-2 text-left font-medium text-sm">
														Status
													</th>
													<th className="px-4 py-2 text-right font-medium text-sm">
														Actions
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border">
												{schedule.students.map((student) => (
													<tr key={student.id}>
														<td className="px-4 py-2 text-sm">
															{student.name}
														</td>
														<td className="px-4 py-2 text-sm">
															{student.email}
														</td>
														<td className="px-4 py-2 text-sm">
															<Badge
																variant={
																	student.status === "Enrolled"
																		? "success"
																		: "outline"
																}
															>
																{student.status}
															</Badge>
														</td>
														<td className="px-4 py-2 text-right text-sm">
															<Button variant="ghost" size="sm">
																View
															</Button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="sessions" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Class Sessions</CardTitle>
									<CardDescription>
										Individual class sessions and attendance
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="overflow-hidden rounded-md border">
										<table className="min-w-full divide-y divide-border">
											<thead>
												<tr className="bg-muted/50">
													<th className="px-4 py-2 text-left font-medium text-sm">
														Date
													</th>
													<th className="px-4 py-2 text-left font-medium text-sm">
														Topic
													</th>
													<th className="px-4 py-2 text-left font-medium text-sm">
														Attendance
													</th>
													<th className="px-4 py-2 text-right font-medium text-sm">
														Actions
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border">
												{schedule.sessions.map((session) => (
													<tr key={new Date(session.date).toLocaleDateString()}>
														<td className="px-4 py-2 text-sm">
															{new Date(session.date).toLocaleDateString()}
														</td>
														<td className="px-4 py-2 text-sm">
															{session.topic}
														</td>
														<td className="px-4 py-2 text-sm">
															{session.attendance}/{schedule.enrolled}
														</td>
														<td className="px-4 py-2 text-right text-sm">
															<Button variant="ghost" size="sm">
																Details
															</Button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="settings" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Schedule Settings</CardTitle>
									<CardDescription>
										Manage schedule settings and options
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium">Schedule Status</h3>
												<p className="text-muted-foreground text-sm">
													Enable or disable this schedule
												</p>
											</div>
											<Badge
												variant={
													schedule.status === "Active"
														? "success"
														: "destructive"
												}
											>
												{schedule.status}
											</Badge>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium">Enrollment Management</h3>
												<p className="text-muted-foreground text-sm">
													Manage student enrollment
												</p>
											</div>
											<Button variant="outline" size="sm">
												Manage Enrollment
											</Button>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium">Delete Schedule</h3>
												<p className="text-muted-foreground text-sm">
													Permanently delete this schedule
												</p>
											</div>
											<Button variant="destructive" size="sm">
												Delete
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
