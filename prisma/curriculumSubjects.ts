import {
  type Prisma,
  PrismaClient,
  type CurriculumSubject,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getCurriculumSubjects = async (
  filter?: Prisma.CurriculumSubjectWhereInput
): Promise<CurriculumSubject[]> => {
  return await prisma.curriculumSubject.findMany({
    where: filter,
    include: {
      curriculum: true,
    },
  });
};
