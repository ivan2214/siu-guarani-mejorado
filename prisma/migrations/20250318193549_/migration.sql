-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('ACTIVO', 'CANCELADO', 'COMPLETADO');

-- CreateEnum
CREATE TYPE "TypeSchedule" AS ENUM ('TEORICA', 'PRACTICA', 'LABORATORIO', 'OTRO');

-- AlterTable
ALTER TABLE "CorrelativeSubject" ADD COLUMN     "scheduleId" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "scheduleId" TEXT;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "days" TEXT[],
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "enrolled" INTEGER NOT NULL,
    "waitlist" INTEGER,
    "description" TEXT,
    "typeSchedule" "TypeSchedule" NOT NULL DEFAULT 'TEORICA',
    "status" "ScheduleStatus" NOT NULL DEFAULT 'ACTIVO',
    "subjectId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "topic" TEXT NOT NULL,
    "attendance" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schedule_subjectId_idx" ON "Schedule"("subjectId");

-- CreateIndex
CREATE INDEX "Schedule_professorId_idx" ON "Schedule"("professorId");

-- CreateIndex
CREATE INDEX "Session_scheduleId_idx" ON "Session"("scheduleId");

-- CreateIndex
CREATE INDEX "CorrelativeSubject_scheduleId_idx" ON "CorrelativeSubject"("scheduleId");

-- CreateIndex
CREATE INDEX "Student_scheduleId_idx" ON "Student"("scheduleId");
