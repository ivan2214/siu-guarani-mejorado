import type { SubjectWithRelations } from "@/types";
import { PrismaClient, type Subject, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los cursos con filtros opcionales

export const getSubjects = async (
  filter?: Prisma.SubjectWhereInput
): Promise<SubjectWithRelations[]> => {
  return await prisma.subject.findMany({
    where: filter,
    include: {
      career: true,
      department: true,
      professors: true,
      students: {
        include: {
          student: true,
        },
      },
      exams: true,
    },
  });
};

// Obtener un curso por ID
export const getSubjectById = async (
  id: string
): Promise<SubjectWithRelations | null> => {
  return await prisma.subject.findUnique({
    where: { id },
    include: {
      career: true,
      department: true,
      professors: true,
      students: {
        include: {
          student: true,
        },
      },
      exams: true,
    },
  });
};

// Crear un curso

export const createSubject = async (
  data: Prisma.SubjectCreateInput
): Promise<Subject> => {
  return await prisma.subject.create({
    data,
  });
};

// Actualizar un curso
export const updateSubject = async (
  id: string,
  data: Prisma.SubjectUpdateInput
): Promise<Subject | null> => {
  return await prisma.subject.update({
    where: { id },
    data,
  });
};

// Eliminar un curso
export const deleteSubject = async (id: string): Promise<Subject | null> => {
  return await prisma.subject.delete({
    where: { id },
  });
};
