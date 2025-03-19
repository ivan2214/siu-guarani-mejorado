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
import { ArrowLeft, Calendar, Edit, Mail, Send, Users } from "lucide-react";
import Link from "next/link";

// Mock communication data
const communication = {
	id: "1",
	title: "Important Announcement: Final Exam Schedule",
	content:
		"Dear Students,\n\nThe final exam schedule for the Fall 2023 semester has been published. Please check your student portal for your individual exam times and locations.\n\nRemember to bring your student ID and necessary materials to each exam. No electronic devices are allowed unless specifically permitted by your instructor.\n\nGood luck with your exams!\n\nBest regards,\nAcademic Affairs Office",
	sender: {
		name: "Academic Affairs Office",
		email: "academic.affairs@university.edu",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	type: "Announcement",
	status: "Sent",
	priority: "High",
	sentDate: "2023-11-15T10:30:00",
	recipients: {
		total: 1250,
		opened: 875,
		clicked: 430,
	},
	audience: "All Students",
	tags: ["Exams", "Important", "Academic"],
	replies: [
		{
			id: "r1",
			user: {
				name: "John Smith",
				email: "john.smith@university.edu",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			content:
				"Thank you for the information. Where can we find the room assignments for the exams?",
			date: "2023-11-15T11:45:00",
		},
		{
			id: "r2",
			user: {
				name: "Academic Affairs Office",
				email: "academic.affairs@university.edu",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			content:
				"Room assignments are listed in your student portal under 'Exam Schedule'. If you have any issues accessing this information, please visit our office in Building A, Room 101.",
			date: "2023-11-15T13:20:00",
		},
	],
};

export default function CommunicationDetailPage({
	params,
}: {
	params: { id: string };
}) {
	console.log("params: ", params);

	return (
		<div className="container mx-auto space-y-6 py-6">
			<div className="flex items-center gap-2">
				<Link href="/dashboard/admin/communications">
					<Button variant="ghost" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="font-bold text-3xl">Communication Details</h1>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card className="md:col-span-1">
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div>
								<Badge
									variant={
										communication.priority === "High"
											? "destructive"
											: communication.priority === "Medium"
												? "default"
												: "secondary"
									}
									className="mb-2"
								>
									{communication.priority} Priority
								</Badge>
								<Badge
									variant={
										communication.status === "Sent"
											? "success"
											: communication.status === "Draft"
												? "outline"
												: "secondary"
									}
									className="mb-2 ml-2"
								>
									{communication.status}
								</Badge>
								<h2 className="font-bold text-xl">{communication.title}</h2>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Communication Details</h3>
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">Type: {communication.type}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Sent:{" "}
										{new Date(communication.sentDate).toLocaleDateString()} at{" "}
										{new Date(communication.sentDate).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Audience: {communication.audience}
									</span>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Sender</h3>
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarImage
											src={communication.sender.avatar}
											alt={communication.sender.name}
										/>
										<AvatarFallback>
											{communication.sender.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">{communication.sender.name}</p>
										<p className="text-muted-foreground text-sm">
											{communication.sender.email}
										</p>
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Tags</h3>
								<div className="flex flex-wrap gap-2">
									{communication.tags.map((tag) => (
										<Badge key={tag} variant="outline">
											{tag}
										</Badge>
									))}
								</div>
							</div>

							<Separator />

							<div className="flex gap-2">
								<Button className="flex-1">
									<Edit className="mr-2 h-4 w-4" />
									Edit
								</Button>
								<Button className="flex-1" variant="outline">
									<Send className="mr-2 h-4 w-4" />
									Resend
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6 md:col-span-2">
					<Tabs defaultValue="content" className="w-full">
						<TabsList className="mb-4 grid grid-cols-3">
							<TabsTrigger value="content">Content</TabsTrigger>
							<TabsTrigger value="analytics">Analytics</TabsTrigger>
							<TabsTrigger value="replies">Replies</TabsTrigger>
						</TabsList>

						<TabsContent value="content" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Message Content</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="whitespace-pre-line rounded-md bg-muted/30 p-4">
										{communication.content}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="analytics" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Delivery Statistics</CardTitle>
									<CardDescription>
										Message delivery and engagement metrics
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div className="rounded-lg bg-primary/10 p-4 text-center">
											<h3 className="font-medium text-lg">Recipients</h3>
											<p className="font-bold text-3xl">
												{communication.recipients.total}
											</p>
										</div>
										<div className="rounded-lg bg-primary/10 p-4 text-center">
											<h3 className="font-medium text-lg">Opened</h3>
											<p className="font-bold text-3xl">
												{communication.recipients.opened}
											</p>
											<p className="text-muted-foreground text-sm">
												{Math.round(
													(communication.recipients.opened /
														communication.recipients.total) *
														100,
												)}
												%
											</p>
										</div>
										<div className="rounded-lg bg-primary/10 p-4 text-center">
											<h3 className="font-medium text-lg">Clicked</h3>
											<p className="font-bold text-3xl">
												{communication.recipients.clicked}
											</p>
											<p className="text-muted-foreground text-sm">
												{Math.round(
													(communication.recipients.clicked /
														communication.recipients.total) *
														100,
												)}
												%
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Recipient Breakdown</CardTitle>
									<CardDescription>
										Detailed recipient information
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="py-10 text-center text-muted-foreground">
										Detailed analytics would be displayed here
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="replies" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Message Replies</CardTitle>
									<CardDescription>
										Responses to this communication
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{communication.replies.map((reply) => (
											<div
												key={reply.id}
												className="flex gap-4 rounded-md border p-4"
											>
												<Avatar>
													<AvatarImage
														src={reply.user.avatar}
														alt={reply.user.name}
													/>
													<AvatarFallback>
														{reply.user.name.substring(0, 2).toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="mb-2 flex items-start justify-between">
														<div>
															<p className="font-medium">{reply.user.name}</p>
															<p className="text-muted-foreground text-sm">
																{reply.user.email}
															</p>
														</div>
														<p className="text-muted-foreground text-sm">
															{new Date(reply.date).toLocaleDateString()} at{" "}
															{new Date(reply.date).toLocaleTimeString([], {
																hour: "2-digit",
																minute: "2-digit",
															})}
														</p>
													</div>
													<p>{reply.content}</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Send Reply</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<textarea
											className="min-h-[100px] w-full rounded-md border p-2"
											placeholder="Type your reply here..."
										/>
										<div className="flex justify-end">
											<Button>
												<Send className="mr-2 h-4 w-4" />
												Send Reply
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
