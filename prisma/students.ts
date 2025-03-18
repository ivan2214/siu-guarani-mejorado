import { type Prisma, PrismaClient, type Professor } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los profesores con filtros opcionales

export const getProfessors = async (
  filter?: Prisma.ProfessorWhereInput
): Promise<Professor[]> => {
  return await prisma.professor.findMany({
    where: filter,
    include: {
      user: true,
      department: true,
      courses: true,
    },
  });
};

// Obtener un profesor por ID
export const getProfessorById = async (
  id: string
): Promise<Professor | null> => {
  return await prisma.professor.findUnique({
    where: { id },
    include: {
      user: true,
      department: true,
      courses: true,
    },
  });
};

// Crear un profesor

export const createProfessor = async (
  data: Prisma.ProfessorCreateInput
): Promise<Professor> => {
  return await prisma.professor.create({
    data,
    include: {
      user: true,
      department: true,
    },
  });
};

// Actualizar un profesor
export const updateProfessor = async (
  id: string,
  data: Prisma.ProfessorUpdateInput
): Promise<Professor | null> => {
  return await prisma.professor.update({
    where: { id },
    data,
    include: {
      user: true,
      department: true,
    },
  });
};

// Eliminar un profesor
export const deleteProfessor = async (
  id: string
): Promise<Professor | null> => {
  return await prisma.professor.delete({
    where: { id },
    include: {
      user: true,
      department: true,
    },
  });
};
