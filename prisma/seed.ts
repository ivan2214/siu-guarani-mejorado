import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// crear un admin siempre qq no este creado
	const admin = await prisma.user.findUnique({
		where: {
			email: "admin@admin.com",
		},
	});

	if (!admin) {
		await prisma.user.create({
			data: {
				email: "admin@admin.com",
				name: "Admin",
				password: "admin123",
				role: "ADMIN",
				dni: "12345678",
				address: "Bartolome Mitre Mza C Lt 14",
				phone: "987654321",
				userStatus: "ACTIVO",
			},
		});
	}
}

main()
	.catch(async (error) => {
		console.error("Error en el seed:", error); // <-- Agrega esto para ver el error real
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
