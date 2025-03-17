import {
  PrismaClient,
  Rol,
  Genero,
  EstadoMateria,
  EstadoTramite,
  ProcedureType,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const generatedDNIs = new Set<string>();
const generatedEmails = new Set<string>();

function generarDNI(): string {
  let dni: string;
  do {
    dni = faker.number.int({ min: 10000000, max: 99999999 }).toString();
  } while (generatedDNIs.has(dni));
  generatedDNIs.add(dni);
  return dni;
}

function generarEmail(): string {
  let email: string;
  do {
    email = faker.internet.email().toLowerCase();
  } while (generatedEmails.has(email));
  generatedEmails.add(email);
  return email;
}

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  // Crear Administrativos
  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      dni: generarDNI(),
      email: "admin@example.com",
      password: passwordHash,
      birthDate: new Date("1980-01-01"),
      genero: Genero.MASCULINO,
      role: Rol.ADMINISTRATIVO,
    },
  });

  // Crear Docentes
  const docentes = await prisma.user.createMany({
    data: Array.from({ length: 5 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dni: generarDNI(),
      email: generarEmail(),
      password: passwordHash,
      birthDate: faker.date.past({ years: 40 }),
      genero: faker.helpers.arrayElement([
        Genero.MASCULINO,
        Genero.FEMENINO,
        Genero.OTRO,
      ]),
      role: Rol.DOCENTE,
    })),
  });

  // Crear Estudiantes
  const estudiantes = await prisma.user.createMany({
    data: Array.from({ length: 20 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dni: generarDNI(),
      email: generarEmail(),
      password: passwordHash,
      birthDate: faker.date.past({ years: 20 }),
      genero: faker.helpers.arrayElement([
        Genero.MASCULINO,
        Genero.FEMENINO,
        Genero.OTRO,
      ]),
      role: Rol.ESTUDIANTE,
    })),
  });

  // Obtener los estudiantes creados
  const estudiantesDB = await prisma.user.findMany({
    where: { role: Rol.ESTUDIANTE },
  });

  // Crear Plan de Estudios
  const plan = await prisma.studyPlan.create({
    data: {
      name: "Plan de Estudios 2025",
    },
  });

  // Crear Materias
  const materias = await prisma.subject.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      name: `Materia ${i + 1}`,
      code: `MAT${i + 1}`,
      capacity: faker.number.int({ min: 20, max: 40 }),
      description: faker.lorem.sentence(),
    })),
  });

  // Obtener materias creadas
  const materiasDB = await prisma.subject.findMany();

  // Asociar Materias al Plan de Estudios
  for (const materia of materiasDB) {
    await prisma.studyPlanSubject.create({
      data: {
        studyPlanId: plan.id,
        subjectId: materia.id,
      },
    });
  }

  // Inscribir estudiantes en materias
  for (const estudiante of estudiantesDB) {
    const materiasAleatorias = faker.helpers.arrayElements(materiasDB, 3);
    for (const materia of materiasAleatorias) {
      await prisma.enrollment.create({
        data: {
          studentId: estudiante.id,
          subjectId: materia.id,
        },
      });
    }
  }

  // Crear Mesas de Examen
  const examenes = await prisma.examSession.createMany({
    data: materiasDB.map((materia) => ({
      subjectId: materia.id,
      date: faker.date.future(),
      capacity: faker.number.int({ min: 5, max: 15 }),
    })),
  });

  // Obtener mesas de examen creadas
  const examenesDB = await prisma.examSession.findMany();

  // Inscribir estudiantes a exámenes
  for (const estudiante of estudiantesDB) {
    const examenesAleatorios = faker.helpers.arrayElements(examenesDB, 2);
    for (const examen of examenesAleatorios) {
      await prisma.examRegistration.create({
        data: {
          studentId: estudiante.id,
          examSessionId: examen.id,
        },
      });
    }
  }

  // Registrar Asistencias
  for (const estudiante of estudiantesDB) {
    const materiasAleatorias = faker.helpers.arrayElements(materiasDB, 3);
    for (const materia of materiasAleatorias) {
      await prisma.attendance.create({
        data: {
          studentId: estudiante.id,
          subjectId: materia.id,
          date: faker.date.recent(),
          status: faker.helpers.arrayElement(["presente", "ausente"]),
        },
      });
    }
  }

  // Historial Académico
  for (const estudiante of estudiantesDB) {
    const materiasAleatorias = faker.helpers.arrayElements(materiasDB, 2);
    for (const materia of materiasAleatorias) {
      await prisma.academicRecord.create({
        data: {
          studentId: estudiante.id,
          subjectId: materia.id,
          partialGrade: faker.number.float({ min: 4, max: 10 }),
          finalGrade: faker.number.float({ min: 4, max: 10 }),
          status: faker.helpers.arrayElement([
            EstadoMateria.REGULAR,
            EstadoMateria.APROBADO,
            EstadoMateria.LIBRE,
          ]),
        },
      });
    }
  }

  // Solicitudes de Trámites
  for (const estudiante of estudiantesDB) {
    await prisma.procedureRequest.create({
      data: {
        userId: estudiante.id,
        type: ProcedureType.CERTIFICADO_DIGITAL,
        status: faker.helpers.arrayElement([
          EstadoTramite.PENDIENTE,
          EstadoTramite.APROBADO,
          EstadoTramite.RECHAZADO,
        ]),
        details: {},
      },
    });
  }

  // Notificaciones
  for (const estudiante of estudiantesDB) {
    await prisma.notification.create({
      data: {
        userId: estudiante.id,
        message: faker.lorem.sentence(),
      },
    });
  }

  // Mensajes entre usuarios
  const estudiantesAleatorios = faker.helpers.arrayElements(estudiantesDB, 5);
  for (const sender of estudiantesAleatorios) {
    const receiver = faker.helpers.arrayElement(
      estudiantesDB.filter((e) => e.id !== sender.id)
    );
    await prisma.message.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        content: faker.lorem.sentence(),
      },
    });
  }

  // Logs de actividad
  for (const estudiante of estudiantesDB) {
    await prisma.activityLog.create({
      data: {
        userId: estudiante.id,
        activity: faker.helpers.arrayElement([
          "Inicio de sesión",
          "Inscripción a materia",
          "Solicitud de trámite",
        ]),
      },
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
