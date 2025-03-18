import type { ReplyWithRelations } from "@/types";
import { type Prisma, PrismaClient, type Reply } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las respuestas con filtro opcional
export const getReplies = async (
  filter?: Prisma.ReplyWhereInput
): Promise<ReplyWithRelations[]> => {
  return await prisma.reply.findMany({
    where: filter,
    include: {
      user: {
        include: {
          student: true,
          professor: true,
        },
      },
    },
  });
};

// Obtener una respuesta por ID
export const getReplyById = async (
  id: string
): Promise<ReplyWithRelations | null> => {
  return await prisma.reply.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          student: true,
          professor: true,
        },
      },
    },
  });
};

// Crear una respuesta
export const createReply = async (
  data: Prisma.ReplyCreateInput
): Promise<Reply> => {
  return await prisma.reply.create({
    data,
  });
};

// Actualizar una respuesta
export const updateReply = async (
  id: string,
  data: Prisma.ReplyUpdateInput
): Promise<Reply | null> => {
  return await prisma.reply.update({
    where: { id },
    data,
  });
};

// Eliminar una respuesta
export const deleteReply = async (id: string): Promise<Reply | null> => {
  return await prisma.reply.delete({
    where: { id },
  });
};
