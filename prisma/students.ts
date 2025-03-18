import type { StudentWithRelations } from "@/types";
import { type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los estudiantes con filtros opcionales
type StudentFilter = Prisma.StudentWhereInput;
export const getStudents = async (
  filter?: StudentFilter
): Promise<StudentWithRelations[]> => {
  try {
    return prisma.student.findMany({
      where: filter,
      include: {
        user: true,
        subjectRecords: {
          include: {
            subject: true,
          },
        },
        academicRecord: true,
        schedule: true,
        career: true,
        examRecords: true,
      },
    });
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw new Error("No se pudieron obtener los estudiantes");
  }
};

// Obtener un estudiante por ID con sus relaciones
export const getStudentById = async (
  id: string
): Promise<StudentWithRelations | null> => {
  try {
    return prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        subjectRecords: {
          include: {
            subject: true,
          },
        },
        academicRecord: true,
        schedule: true,
        career: true,
        examRecords: true,
      },
    });
  } catch (error) {
    console.error(`Error al obtener estudiante con ID ${id}:`, error);
    throw new Error("No se pudo obtener el estudiante");
  }
};

// Crear un estudiante
export const createStudent = async (data: Prisma.StudentCreateInput) => {
  try {
    return prisma.student.create({
      data,
    });
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw new Error("No se pudo crear el estudiante");
  }
};

// Actualizar un estudiante
export const updateStudent = async (
  id: string,
  data: Omit<Partial<Prisma.StudentUpdateInput>, "id">
) => {
  try {
    return prisma.student.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Error al actualizar estudiante con ID ${id}:`, error);
    throw new Error("No se pudo actualizar el estudiante");
  }
};

// Eliminar un estudiante
export const deleteStudent = async (id: string) => {
  try {
    return prisma.student.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error al eliminar estudiante con ID ${id}:`, error);
    throw new Error("No se pudo eliminar el estudiante");
  }
};
