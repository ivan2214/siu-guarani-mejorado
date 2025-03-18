import { type Prisma, PrismaClient, type Evaluation } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las evaluaciones con filtro opcional
export const getEvaluations = async (
  filter?: Prisma.EvaluationWhereInput
): Promise<Evaluation[]> => {
  return await prisma.evaluation.findMany({
    where: filter,
    include: {
      course: {
        include: {
          students: true,
          professor: true,
        },
      },
    },
  });
};

// Obtener una evaluación por ID
export const getEvaluationById = async (
  id: string
): Promise<Evaluation | null> => {
  return await prisma.evaluation.findUnique({
    where: { id },
    include: {
      course: {
        include: {
          students: true,
          professor: true,
        },
      },
    },
  });
};

// Crear una evaluación
export const createEvaluation = async (
  data: Prisma.EvaluationCreateInput
): Promise<Evaluation> => {
  return await prisma.evaluation.create({
    data,
  });
};

// Actualizar una evaluación
export const updateEvaluation = async (
  id: string,
  data: Prisma.EvaluationUpdateInput
): Promise<Evaluation | null> => {
  return await prisma.evaluation.update({
    where: { id },
    data,
  });
};

// Eliminar una evaluación
export const deleteEvaluation = async (
  id: string
): Promise<Evaluation | null> => {
  return await prisma.evaluation.delete({
    where: { id },
  });
};
