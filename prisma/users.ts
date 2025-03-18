import { type Prisma, PrismaClient } from "@prisma/client";
import type { UserWithRelations } from "@/types";

const prisma = new PrismaClient();

// Obtener todos los usuarios con filtros opcionales
type UserFilter = Prisma.UserWhereInput;
export const getUsers = async (
  filter?: UserFilter
): Promise<UserWithRelations[]> => {
  try {
    return prisma.user.findMany({
      where: filter,
      include: {
        messages: true,
        student: {
          include: {
            subjectRecords: {
              include: {
                subject: true,
              },
            },
            academicRecord: true,
          },
        },
        professor: {
          include: {
            departments: true,
            subjects: true,
          },
        },
        replies: true,
        notifications: true,
      },
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw new Error("No se pudieron obtener los usuarios");
  }
};

// Obtener un usuario por ID con sus relaciones
export const getUserById = async (
  id: string
): Promise<UserWithRelations | null> => {
  try {
    return prisma.user.findUnique({
      where: { id },
      include: {
        messages: true,
        student: {
          include: {
            subjectRecords: {
              include: {
                subject: true,
              },
            },
            academicRecord: true,
          },
        },
        professor: {
          include: {
            departments: true,
            subjects: true,
          },
        },
        replies: true,
        notifications: true,
      },
    });
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw new Error("No se pudo obtener el usuario");
  }
};

// Crear un usuario
export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<UserWithRelations> => {
  try {
    return prisma.user.create({
      data,
      include: {
        messages: true,
        student: {
          include: {
            subjectRecords: {
              include: {
                subject: true,
              },
            },
            academicRecord: true,
          },
        },
        professor: {
          include: {
            departments: true,
            subjects: true,
          },
        },
        replies: true,
        notifications: true,
      },
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("No se pudo crear el usuario");
  }
};

// Actualizar un usuario
export const updateUser = async (
  id: string,
  data: Omit<Partial<Prisma.UserUpdateInput>, "id">
): Promise<UserWithRelations | null> => {
  try {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        messages: true,
        student: {
          include: {
            subjectRecords: {
              include: {
                subject: true,
              },
            },
            academicRecord: true,
          },
        },
        professor: {
          include: {
            departments: true,
            subjects: true,
          },
        },
        replies: true,
        notifications: true,
      },
    });
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw new Error("No se pudo actualizar el usuario");
  }
};

// Eliminar un usuario
export const deleteUser = async (
  id: string
): Promise<UserWithRelations | null> => {
  try {
    return prisma.user.delete({
      where: { id },
      include: {
        messages: true,
        student: {
          include: {
            subjectRecords: {
              include: {
                subject: true,
              },
            },
            academicRecord: true,
          },
        },
        professor: {
          include: {
            departments: true,
            subjects: true,
          },
        },
        replies: true,
        notifications: true,
      },
    });
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw new Error("No se pudo eliminar el usuario");
  }
};
