import type { ExamWithRelations } from "@/types";
import { type Prisma, PrismaClient, type Exam } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las evaluaciones con filtro opcional
export const getExams = async (
  filter?: Prisma.ExamWhereInput
): Promise<ExamWithRelations[]> => {
  return await prisma.exam.findMany({
    where: filter,
    include: {
      studentsEnrolled: true,
      subject: true,
    },
  });
};

// Obtener una evaluación por ID
export const getExamById = async (
  id: string
): Promise<ExamWithRelations | null> => {
  return await prisma.exam.findUnique({
    where: { id },
    include: {
      studentsEnrolled: true,
      subject: true,
    },
  });
};

// Crear una evaluación
export const createExam = async (
  data: Prisma.ExamCreateInput
): Promise<Exam> => {
  return await prisma.exam.create({
    data,
  });
};

// Actualizar una evaluación
export const updateExam = async (
  id: string,
  data: Prisma.ExamUpdateInput
): Promise<Exam | null> => {
  return await prisma.exam.update({
    where: { id },
    data,
  });
};

// Eliminar una evaluación
export const deleteExam = async (id: string): Promise<Exam | null> => {
  return await prisma.exam.delete({
    where: { id },
  });
};
