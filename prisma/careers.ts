import { type Career, type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las carreras

export const getCareers = async (
	filter?: Prisma.CareerWhereInput,
): Promise<Career[]> => {
	return await prisma.career.findMany({
		where: filter,
		include: {
			subjects: {
				include: {
					correlativeSubjects: true,
					schedules: true,
				},
			},
		},
	});
};

// Obtener una carrera por ID
export const getCareerById = async (id: string): Promise<Career | null> => {
	return await prisma.career.findUnique({
		where: { id },
		include: {
			subjects: {
				include: {
					correlativeSubjects: true,
					schedules: true,
				},
			},
		},
	});
};

// Crear una carrera

export const createCareer = async (
	data: Prisma.CareerCreateInput,
): Promise<Career> => {
	return await prisma.career.create({
		data,
		include: {
			subjects: {
				include: {
					correlativeSubjects: true,
					schedules: true,
				},
			},
		},
	});
};

// Actualizar una carrera
export const updateCareer = async (
	id: string,
	data: Prisma.CareerUpdateInput,
): Promise<Career | null> => {
	return await prisma.career.update({
		where: { id },
		data,
		include: {
			subjects: {
				include: {
					correlativeSubjects: true,
					schedules: true,
				},
			},
		},
	});
};

// Eliminar una carrera
export const deleteCareer = async (id: string): Promise<Career | null> => {
	return await prisma.career.delete({
		where: { id },
		include: {
			subjects: {
				include: {
					correlativeSubjects: true,
					schedules: true,
				},
			},
		},
	});
};
