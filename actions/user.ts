"use server";

import { prisma } from "@/lib/prisma";
import type { ProcedureType, Rol } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Esquema de validación con Zod
const userSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  dni: z.string().min(7).max(10),
  email: z.string().email(),
  password: z.string().min(8),
  birthDate: z.string().transform((date) => new Date(date)),
  genero: z.enum(["MASCULINO", "FEMENINO", "OTRO"]),
  role: z.enum(["ESTUDIANTE", "DOCENTE", "ADMINISTRATIVO"]),
});

// Crear usuario (solo administrativos pueden hacerlo)
export async function createUser(adminId: number, data: unknown) {
  const result = userSchema.safeParse(data);
  if (!result.success)
    return { error: "Datos inválidos", details: result.error.format() };
  const userData = result.data;

  const adminUser = await prisma.user.findUnique({
    where: { id: adminId },
    select: { role: true },
  });
  if (!adminUser || adminUser.role !== "ADMINISTRATIVO")
    return { error: "No tienes permisos" };

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    return { success: "Usuario creado", userId: newUser.id };
  } catch (error) {
    return { error: "Error al registrar usuario", details: error };
  }
}

// Actualizar usuario (solo administrativos o el propio usuario)
export async function updateUser(userId: number, data: Partial<unknown>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return { success: "Usuario actualizado", updatedUser };
  } catch (error) {
    return { error: "Error al actualizar usuario", details: error };
  }
}

// Eliminar usuario (solo administrativos pueden hacerlo)
export async function deleteUser(adminId: number, userId: number) {
  const adminUser = await prisma.user.findUnique({
    where: { id: adminId },
    select: { role: true },
  });
  if (!adminUser || adminUser.role !== "ADMINISTRATIVO")
    return { error: "No tienes permisos" };

  try {
    await prisma.user.delete({ where: { id: userId } });
    return { success: "Usuario eliminado" };
  } catch (error) {
    return { error: "Error al eliminar usuario", details: error };
  }
}

// Obtener usuarios con filtros
export async function getUsers(
  filters?: Partial<{ role: Rol; dni: string; email: string }>
) {
  try {
    const users = await prisma.user.findMany({ where: { ...filters } });
    return { success: "Usuarios obtenidos", users };
  } catch (error) {
    return { error: "Error al obtener usuarios", details: error };
  }
}

// Inscribir estudiante en materia
export async function enrollStudent(studentId: number, subjectId: number) {
  try {
    const enrollment = await prisma.enrollment.create({
      data: { studentId, subjectId, enrollmentDate: new Date() },
    });
    return { success: "Inscripción realizada", enrollment };
  } catch (error) {
    return { error: "Error al inscribir estudiante", details: error };
  }
}

// Registrar estudiante en un examen
export async function registerExam(studentId: number, examSessionId: number) {
  try {
    const examRegistration = await prisma.examRegistration.create({
      data: { studentId, examSessionId, registrationDate: new Date() },
    });
    return { success: "Inscripción al examen realizada", examRegistration };
  } catch (error) {
    return { error: "Error al inscribir en examen", details: error };
  }
}

// Obtener historial académico de un estudiante
export async function getAcademicRecord(studentId: number) {
  try {
    const records = await prisma.academicRecord.findMany({
      where: { studentId },
    });
    return { success: "Historial académico obtenido", records };
  } catch (error) {
    return { error: "Error al obtener historial académico", details: error };
  }
}

// Solicitar trámite
export async function requestProcedure(userId: number, type: ProcedureType) {
  try {
    const procedure = await prisma.procedureRequest.create({
      data: { userId, type, status: "PENDIENTE", createdAt: new Date() },
    });
    return { success: "Trámite solicitado", procedure };
  } catch (error) {
    return { error: "Error al solicitar trámite", details: error };
  }
}

// Obtener trámites de un usuario
export async function getProcedures(userId: number) {
  try {
    const procedures = await prisma.procedureRequest.findMany({
      where: { userId },
    });
    return { success: "Trámites obtenidos", procedures };
  } catch (error) {
    return { error: "Error al obtener trámites", details: error };
  }
}
