/*
  Warnings:

  - You are about to drop the column `gpa` on the `AcademicRecord` table. All the data in the column will be lost.
  - You are about to drop the column `progressPercent` on the `AcademicRecord` table. All the data in the column will be lost.
  - You are about to drop the column `bibliography` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `syllabus` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `communicationId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Communication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Curriculum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurriculumSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamRegistration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `AcademicRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userStatus` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- DropIndex
DROP INDEX "Course_professorId_idx";

-- DropIndex
DROP INDEX "Professor_departmentId_idx";

-- DropIndex
DROP INDEX "Reply_communicationId_idx";

-- DropIndex
DROP INDEX "User_professorId_key";

-- DropIndex
DROP INDEX "User_studentId_key";

-- AlterTable
ALTER TABLE "AcademicRecord" DROP COLUMN "gpa",
DROP COLUMN "progressPercent",
ADD COLUMN     "coursesEnrolled" INTEGER,
ADD COLUMN     "progressPercentCarrer" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "bibliography",
DROP COLUMN "credits",
DROP COLUMN "professorId",
DROP COLUMN "status",
DROP COLUMN "syllabus";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "grade" DOUBLE PRECISION,
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "published",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "departmentId",
DROP COLUMN "title",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "communicationId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "status",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "professorId",
DROP COLUMN "studentId",
ADD COLUMN     "userStatus" "UserStatus" NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "Communication";

-- DropTable
DROP TABLE "Curriculum";

-- DropTable
DROP TABLE "CurriculumSubject";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "ExamRegistration";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "StudentCourse";

-- CreateTable
CREATE TABLE "_CourseToProfessor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CourseToProfessor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DepartmentToProfessor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DepartmentToProfessor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseToProfessor_B_index" ON "_CourseToProfessor"("B");

-- CreateIndex
CREATE INDEX "_DepartmentToProfessor_B_index" ON "_DepartmentToProfessor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicRecord_studentId_key" ON "AcademicRecord"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_userId_key" ON "Professor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
