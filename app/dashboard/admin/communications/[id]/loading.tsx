import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommunicationDetailLoading() {
	return (
		<div className="container mx-auto space-y-6 py-6">
			<div className="flex items-center gap-2">
				<Skeleton className="h-10 w-10" />
				<Skeleton className="h-10 w-[250px]" />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<Card className="md:col-span-1">
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div>
								<div className="mb-2 flex gap-2">
									<Skeleton className="h-6 w-[100px]" />
									<Skeleton className="h-6 w-[80px]" />
								</div>
								<Skeleton className="h-8 w-full" />
							</div>

							<Separator />

							<div className="space-y-3">
								<Skeleton className="h-5 w-[150px]" />
								{Array(3)
									.fill(null)
									.map((_, i) => (
										<div key={i} className="flex items-center gap-2">
											<Skeleton className="h-4 w-4" />
											<Skeleton className="h-4 w-full" />
										</div>
									))}
							</div>

							<Separator />

							<div className="space-y-3">
								<Skeleton className="h-5 w-[100px]" />
								<div className="flex items-center gap-3">
									<Skeleton className="h-10 w-10 rounded-full" />
									<div>
										<Skeleton className="h-5 w-[150px]" />
										<Skeleton className="h-4 w-[200px]" />
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<Skeleton className="h-5 w-[80px]" />
								<div className="flex flex-wrap gap-2">
									{Array(3)
										.fill(null)
										.map((_, i) => (
											<Skeleton key={i} className="h-6 w-[80px]" />
										))}
								</div>
							</div>

							<Separator />

							<div className="flex gap-2">
								<Skeleton className="h-10 flex-1" />
								<Skeleton className="h-10 flex-1" />
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6 md:col-span-2">
					<div className="space-y-4">
						<div className="mb-4 flex gap-2">
							{Array(3)
								.fill(null)
								.map((_, i) => (
									<Skeleton key={i} className="h-10 w-full" />
								))}
						</div>

						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-[150px]" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-40 w-full" />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
