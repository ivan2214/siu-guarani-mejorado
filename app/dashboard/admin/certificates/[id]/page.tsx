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
import {
	ArrowLeft,
	Award,
	Calendar,
	CheckCircle,
	Download,
	Edit,
	FileText,
	XCircle,
} from "lucide-react";
import Link from "next/link";

// Mock certificate data
const certificate = {
	id: "1",
	title: "Bachelor of Science in Computer Science",
	type: "Degree",
	status: "Issued",
	issueDate: "2023-06-15",
	expiryDate: null,
	certificateNumber: "CERT-2023-0012345",
	student: {
		id: "STU2019001",
		name: "John Doe",
		email: "john.doe@university.edu",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	issuer: {
		name: "University of Technology",
		department: "School of Computer Science",
		signature: "Dr. Robert Johnson, Dean",
		logo: "/placeholder.svg?height=80&width=80",
	},
	verificationStatus: "Verified",
	verificationDate: "2023-06-16",
	verificationCode: "VC-2023-0012345",
	description:
		"This certifies that the above-named student has successfully completed all requirements for the degree of Bachelor of Science in Computer Science, with a cumulative GPA of 3.8.",
	achievements: [
		"Magna Cum Laude",
		"Dean's List (8 semesters)",
		"Outstanding Senior Project Award",
	],
	courses: [
		{ code: "CS101", name: "Introduction to Programming", grade: "A" },
		{ code: "CS201", name: "Data Structures and Algorithms", grade: "A" },
		{ code: "CS301", name: "Database Systems", grade: "A-" },
		{ code: "CS401", name: "Software Engineering", grade: "A" },
		{ code: "MATH201", name: "Calculus II", grade: "B+" },
		// More courses...
	],
	verificationHistory: [
		{
			date: "2023-06-16",
			status: "Verified",
			verifier: "Academic Records Office",
		},
		{ date: "2023-06-15", status: "Issued", verifier: "Registrar's Office" },
	],
};

export default function CertificateDetailPage({
	params,
}: {
	params: { id: string };
}) {
	console.log("params", params);

	return (
		<div className="container mx-auto space-y-6 py-6">
			<div className="flex items-center gap-2">
				<Link href="/dashboard/admin/certificates">
					<Button variant="ghost" size="icon">
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</Link>
				<h1 className="font-bold text-3xl">Certificate Details</h1>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card className="md:col-span-1">
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div>
								<Badge
									variant={
										certificate.status === "Issued"
											? "success"
											: certificate.status === "Pending"
												? "outline"
												: "secondary"
									}
									className="mb-2"
								>
									{certificate.status}
								</Badge>
								<Badge
									variant={
										certificate.verificationStatus === "Verified"
											? "success"
											: "destructive"
									}
									className="mb-2 ml-2"
								>
									{certificate.verificationStatus}
								</Badge>
								<h2 className="font-bold text-xl">{certificate.title}</h2>
								<p className="text-muted-foreground text-sm">
									Certificate #{certificate.certificateNumber}
								</p>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Certificate Details</h3>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">Type: {certificate.type}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Issued:{" "}
										{new Date(certificate.issueDate).toLocaleDateString()}
									</span>
								</div>
								{certificate.expiryDate && (
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">
											Expires:{" "}
											{new Date(certificate.expiryDate).toLocaleDateString()}
										</span>
									</div>
								)}
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Student Information</h3>
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarImage
											src={certificate.student.avatar}
											alt={certificate.student.name}
										/>
										<AvatarFallback>
											{certificate.student.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">{certificate.student.name}</p>
										<p className="text-muted-foreground text-sm">
											{certificate.student.id}
										</p>
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<h3 className="font-medium">Issuer</h3>
								<div>
									<p className="font-medium">{certificate.issuer.name}</p>
									<p className="text-muted-foreground text-sm">
										{certificate.issuer.department}
									</p>
									<p className="mt-1 text-sm">
										Signed by: {certificate.issuer.signature}
									</p>
								</div>
							</div>

							<Separator />

							<div className="flex gap-2">
								<Button className="flex-1">
									<Download className="mr-2 h-4 w-4" />
									Download
								</Button>
								<Button className="flex-1" variant="outline">
									<Edit className="mr-2 h-4 w-4" />
									Edit
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6 md:col-span-2">
					<Tabs defaultValue="preview" className="w-full">
						<TabsList className="mb-4 grid grid-cols-4">
							<TabsTrigger value="preview">Preview</TabsTrigger>
							<TabsTrigger value="achievements">Achievements</TabsTrigger>
							<TabsTrigger value="courses">Courses</TabsTrigger>
							<TabsTrigger value="verification">Verification</TabsTrigger>
						</TabsList>

						<TabsContent value="preview" className="space-y-4">
							<Card>
								<CardContent className="pt-6">
									<div className="space-y-6 rounded-md border bg-muted/30 p-6 text-center">
										<div className="mb-4 flex justify-center">
											<img
												src={certificate.issuer.logo || "/placeholder.svg"}
												alt="University Logo"
												className="h-20"
											/>
										</div>
										<h2 className="font-bold text-2xl uppercase">
											{certificate.issuer.name}
										</h2>
										<h3 className="text-xl">{certificate.issuer.department}</h3>
										<p className="text-lg">This certifies that</p>
										<h2 className="font-bold text-3xl">
											{certificate.student.name}
										</h2>
										<p className="text-lg">
											has successfully completed all requirements for the
										</p>
										<h2 className="font-bold text-2xl">{certificate.title}</h2>
										<p className="text-md">{certificate.description}</p>
										<div className="mt-8 flex items-center justify-between border-t pt-8">
											<div className="text-left">
												<p>
													Date:{" "}
													{new Date(certificate.issueDate).toLocaleDateString()}
												</p>
												<p>Certificate #: {certificate.certificateNumber}</p>
											</div>
											<div className="text-right">
												<p className="font-medium">
													{certificate.issuer.signature}
												</p>
												<p>Authorized Signature</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="achievements" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Academic Achievements</CardTitle>
									<CardDescription>
										Honors and awards earned by the student
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										{certificate.achievements.map((achievement) => (
											<li key={achievement} className="flex items-center gap-2">
												<Award className="h-5 w-5 text-primary" />
												<span>{achievement}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="courses" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Completed Courses</CardTitle>
									<CardDescription>
										Courses completed as part of the program
									</CardDescription>
								</CardHeader>
								<CardContent>
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
												{certificate.courses.map((course) => (
													<tr key={course.code}>
														<td className="px-4 py-2 text-sm">{course.code}</td>
														<td className="px-4 py-2 text-sm">{course.name}</td>
														<td className="px-4 py-2 text-sm">
															{course.grade}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="verification" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Verification Status</CardTitle>
									<CardDescription>
										Certificate verification information
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-4 flex items-center gap-4 rounded-md bg-muted/30 p-4">
										{certificate.verificationStatus === "Verified" ? (
											<CheckCircle className="h-8 w-8 text-green-500" />
										) : (
											<XCircle className="h-8 w-8 text-red-500" />
										)}
										<div>
											<h3 className="font-medium text-lg">
												{certificate.verificationStatus === "Verified"
													? "Certificate Verified"
													: "Certificate Not Verified"}
											</h3>
											<p className="text-muted-foreground">
												{certificate.verificationStatus === "Verified"
													? `This certificate was verified on ${new Date(
															certificate.verificationDate,
														).toLocaleDateString()}`
													: "This certificate has not been verified"}
											</p>
										</div>
									</div>

									<div className="space-y-4">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<div className="space-y-1">
												<p className="font-medium text-sm">Verification Code</p>
												<p className="text-muted-foreground text-sm">
													{certificate.verificationCode}
												</p>
											</div>
											<div className="space-y-1">
												<p className="font-medium text-sm">Last Verified</p>
												<p className="text-muted-foreground text-sm">
													{new Date(
														certificate.verificationDate,
													).toLocaleDateString()}
												</p>
											</div>
										</div>

										<h3 className="mt-4 font-medium">Verification History</h3>
										<div className="overflow-hidden rounded-md border">
											<table className="min-w-full divide-y divide-border">
												<thead>
													<tr className="bg-muted/50">
														<th className="px-4 py-2 text-left font-medium text-sm">
															Date
														</th>
														<th className="px-4 py-2 text-left font-medium text-sm">
															Status
														</th>
														<th className="px-4 py-2 text-left font-medium text-sm">
															Verifier
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-border">
													{certificate.verificationHistory.map((history) => (
														<tr key={history.verifier}>
															<td className="px-4 py-2 text-sm">
																{new Date(history.date).toLocaleDateString()}
															</td>
															<td className="px-4 py-2 text-sm">
																<Badge
																	variant={
																		history.status === "Verified"
																			? "success"
																			: "secondary"
																	}
																>
																	{history.status}
																</Badge>
															</td>
															<td className="px-4 py-2 text-sm">
																{history.verifier}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Verify Certificate</CardTitle>
									<CardDescription>
										Manually verify this certificate
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<Button className="w-full">
											Verify Certificate Authenticity
										</Button>
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
