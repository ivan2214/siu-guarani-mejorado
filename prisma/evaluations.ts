import { type Prisma, PrismaClient, type Evaluation } from "@prisma/client";

const prisma = new PrismaClient();

export const getEvaluations = async (
  filter?: Prisma.EvaluationWhereInput
): Promise<Evaluation[]> => {
  return await prisma.evaluation.findMany({
    where: filter,
    include: {
      course: true,
    },
  });
};
