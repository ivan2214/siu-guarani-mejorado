import type { ScheduleWithRelations } from "@/types";
import { type Prisma, PrismaClient, type Schedule } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los horarios con filtro opcional
export const getSchedules = async (
  filter?: Prisma.ScheduleWhereInput
): Promise<ScheduleWithRelations[]> => {
  return await prisma.schedule.findMany({
    where: filter,
    include: {
      subject: true,
      prerequisites: true,
      professor: true,
      sessions: true,
      students: true,
    },
  });
};

// Obtener un horario por ID
export const getScheduleById = async (
  id: string
): Promise<ScheduleWithRelations | null> => {
  return await prisma.schedule.findUnique({
    where: { id },
    include: {
      subject: true,
      prerequisites: true,
      professor: true,
      sessions: true,
      students: true,
    },
  });
};

// Crear un horario
export const createSchedule = async (
  data: Prisma.ScheduleCreateInput
): Promise<Schedule> => {
  return await prisma.schedule.create({
    data,
  });
};

// Actualizar un horario
export const updateSchedule = async (
  id: string,
  data: Prisma.ScheduleUpdateInput
): Promise<Schedule | null> => {
  return await prisma.schedule.update({
    where: { id },
    data,
  });
};

// Eliminar un horario
export const deleteSchedule = async (id: string): Promise<Schedule | null> => {
  return await prisma.schedule.delete({
    where: { id },
  });
};
