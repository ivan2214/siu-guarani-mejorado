import { type Prisma, PrismaClient, type Department } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los departamentos con filtro opcional
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

// Obtener un departamento por ID
export const getDepartmentById = async (
  id: string
): Promise<Department | null> => {
  return await prisma.department.findUnique({
    where: { id },
    include: {
      courses: true,
      professors: true,
    },
  });
};

// Crear un departamento
export const createDepartment = async (
  data: Prisma.DepartmentCreateInput
): Promise<Department> => {
  return await prisma.department.create({
    data,
  });
};

// Actualizar un departamento
export const updateDepartment = async (
  id: string,
  data: Prisma.DepartmentUpdateInput
): Promise<Department | null> => {
  return await prisma.department.update({
    where: { id },
    data,
  });
};

// Eliminar un departamento
export const deleteDepartment = async (
  id: string
): Promise<Department | null> => {
  return await prisma.department.delete({
    where: { id },
  });
};
