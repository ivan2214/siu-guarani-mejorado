import { type Prisma, PrismaClient } from "@prisma/client";
import type { UserWithRelations } from "@/types";

const prisma = new PrismaClient();

// Obtener todos los usuarios con filtros opcionales
type UserFilter = Prisma.UserWhereInput;
export const getUsers = async (
  filter?: UserFilter
): Promise<UserWithRelations[]> => {
  return await prisma.user.findMany({
    where: filter,
    include: {
      messages: true,
      student: {
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
          academicRecord: true,
        },
      },
      professor: {
        include: {
          departments: true,
          courses: true,
        },
      },
      replies: true,
      notifications: true,
    },
  });
};

// Obtener un usuario por ID con sus relaciones
export const getUserById = async (
  id: string
): Promise<UserWithRelations | null> => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      messages: true,
      student: {
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
          academicRecord: true,
        },
      },
      professor: {
        include: {
          departments: true,
          courses: true,
        },
      },
      replies: true,
      notifications: true,
    },
  });
};

// Crear un usuario
export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<UserWithRelations> => {
  return await prisma.user.create({
    data,
    include: {
      messages: true,
      student: {
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
          academicRecord: true,
        },
      },
      professor: {
        include: {
          departments: true,
          courses: true,
        },
      },
      replies: true,
      notifications: true,
    },
  });
};

// Actualizar un usuario
export const updateUser = async (
  id: string,
  data: Partial<Prisma.UserUpdateInput>
): Promise<UserWithRelations | null> => {
  return await prisma.user.update({
    where: { id },
    data,
    include: {
      messages: true,
      student: {
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
          academicRecord: true,
        },
      },
      professor: {
        include: {
          departments: true,
          courses: true,
        },
      },
      replies: true,
      notifications: true,
    },
  });
};

// Eliminar un usuario
export const deleteUser = async (
  id: string
): Promise<UserWithRelations | null> => {
  return await prisma.user.delete({
    where: { id },
    include: {
      messages: true,
      student: {
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
          academicRecord: true,
        },
      },
      professor: {
        include: {
          departments: true,
          courses: true,
        },
      },
      replies: true,
      notifications: true,
    },
  });
};
