import { type Message, type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los mensajes con filtro opcional
export const getMessages = async (
	filter?: Prisma.MessageWhereInput,
): Promise<Message[]> => {
	return await prisma.message.findMany({
		where: filter,
		include: {
			sender: true,
		},
	});
};

// Obtener un mensaje por ID
export const getMessageById = async (id: string): Promise<Message | null> => {
	return await prisma.message.findUnique({
		where: { id },
		include: {
			sender: true,
		},
	});
};

// Crear un mensaje
export const createMessage = async (
	data: Prisma.MessageCreateInput,
): Promise<Message> => {
	return await prisma.message.create({
		data,
	});
};

// Actualizar un mensaje
export const updateMessage = async (
	id: string,
	data: Prisma.MessageUpdateInput,
): Promise<Message | null> => {
	return await prisma.message.update({
		where: { id },
		data,
	});
};

// Eliminar un mensaje
export const deleteMessage = async (id: string): Promise<Message | null> => {
	return await prisma.message.delete({
		where: { id },
	});
};
