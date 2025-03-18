import { PrismaClient, type Course, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los cursos con filtros opcionales

export const getCourses = async (
  filter?: Prisma.CourseWhereInput
): Promise<Course[]> => {
  return await prisma.course.findMany({
    where: filter,
    include: {
      professor: {
        include: {
          user: true,
        },
      },
      students: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
};

// Obtener un curso por ID
export const getCourseById = async (id: string): Promise<Course | null> => {
  return await prisma.course.findUnique({
    where: { id },
    include: {
      professor: {
        include: {
          user: true,
        },
      },
      students: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
};

// Crear un curso

export const createCourse = async (
  data: Prisma.CourseCreateInput
): Promise<Course> => {
  return await prisma.course.create({
    data,
    include: {
      professor: {
        include: {
          user: true,
        },
      },
    },
  });
};

// Actualizar un curso
export const updateCourse = async (
  id: string,
  data: Prisma.CourseUpdateInput
): Promise<Course | null> => {
  return await prisma.course.update({
    where: { id },
    data,
    include: {
      professor: {
        include: {
          user: true,
        },
      },
    },
  });
};

// Eliminar un curso
export const deleteCourse = async (id: string): Promise<Course | null> => {
  return await prisma.course.delete({
    where: { id },
    include: {
      professor: {
        include: {
          user: true,
        },
      },
    },
  });
};
