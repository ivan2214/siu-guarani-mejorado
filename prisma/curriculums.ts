import { type Prisma, PrismaClient, type Curriculum } from "@prisma/client";

const prisma = new PrismaClient();

export const getCurriculums = async (
  filter?: Prisma.CurriculumWhereInput
): Promise<Curriculum[]> => {
  return await prisma.curriculum.findMany({
    where: filter,
    include: {
      career: true,
      subjects: true,
    },
  });
};

export const getCurriculumById = async (
  id: string
): Promise<Curriculum | null> => {
  return await prisma.curriculum.findUnique({
    where: { id },
    include: {
      career: true,
      subjects: true,
    },
  });
};

export const createCurriculum = async (
  data: Prisma.CurriculumCreateInput
): Promise<Curriculum> => {
  return await prisma.curriculum.create({
    data,
  });
};

export const updateCurriculum = async (
  id: string,
  data: Prisma.CurriculumUpdateInput
): Promise<Curriculum | null> => {
  return await prisma.curriculum.update({
    where: { id },
    data,
  });
};

export const deleteCurriculum = async (
  id: string
): Promise<Curriculum | null> => {
  return await prisma.curriculum.delete({
    where: { id },
  });
};
