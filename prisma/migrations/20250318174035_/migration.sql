/*
  Warnings:

  - You are about to drop the column `attendance` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `legajo` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_legajo_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "attendance",
DROP COLUMN "legajo";

-- CreateTable
CREATE TABLE "AcademicRecord" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "averageGrade" DOUBLE PRECISION,
    "progressPercent" DOUBLE PRECISION,
    "gpa" DOUBLE PRECISION,
    "completedCourses" INTEGER,

    CONSTRAINT "AcademicRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamRegistration" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "finalGrade" DOUBLE PRECISION,

    CONSTRAINT "ExamRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AcademicRecord_studentId_idx" ON "AcademicRecord"("studentId");

-- CreateIndex
CREATE INDEX "Enrollment_courseId_idx" ON "Enrollment"("courseId");

-- CreateIndex
CREATE INDEX "Enrollment_studentId_idx" ON "Enrollment"("studentId");

-- CreateIndex
CREATE INDEX "Exam_courseId_idx" ON "Exam"("courseId");

-- CreateIndex
CREATE INDEX "ExamRegistration_studentId_idx" ON "ExamRegistration"("studentId");

-- CreateIndex
CREATE INDEX "ExamRegistration_examId_idx" ON "ExamRegistration"("examId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
