import type { ProfessorWithRelations } from "@/types";
import { type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los profesores con filtros opcionales

export const getProfessors = async (
  filter?: Prisma.ProfessorWhereInput
): Promise<ProfessorWithRelations[]> => {
  return await prisma.professor.findMany({
    where: filter,
    include: {
      user: true,
      departments: true,
      subjects: true,
      schedules: true,
    },
  });
};

// Obtener un profesor por ID
export const getProfessorById = async (
  id: string
): Promise<ProfessorWithRelations | null> => {
  return await prisma.professor.findUnique({
    where: { id },
    include: {
      user: true,
      departments: true,
      subjects: true,
      schedules: true,
    },
  });
};

// Crear un profesor

export const createProfessor = async (data: Prisma.ProfessorCreateInput) => {
  return await prisma.professor.create({
    data,
  });
};

// Actualizar un profesor
export const updateProfessor = async (
  id: string,
  data: Prisma.ProfessorUpdateInput
) => {
  return await prisma.professor.update({
    where: { id },
    data,
  });
};

// Eliminar un profesor
export const deleteProfessor = async (id: string) => {
  return await prisma.professor.delete({
    where: { id },
  });
};
