import { type Prisma, PrismaClient, type Department } from "@prisma/client";

const prisma = new PrismaClient();

export const getDepartments = async (
  filter?: Prisma.DepartmentWhereInput
): Promise<Department[]> => {
  return await prisma.department.findMany({
    where: filter,
    include: {
      courses: true,
      professors: true,
    },
  });
};

export const getDepartmentById = async (
  id: string
): Promise<Department | null> => {
  return await prisma.department.findUnique({
    where: { id },
  });
};
