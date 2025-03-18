-- CreateEnum
CREATE TYPE "TypeCommunication" AS ENUM ('ANUNCIO', 'NOTIFICACION');

-- CreateEnum
CREATE TYPE "StatusCommunication" AS ENUM ('ENVIADO', 'BORRADOR');

-- CreateEnum
CREATE TYPE "PriorityCommunication" AS ENUM ('BAJO', 'MEDIO', 'ALTO', 'URGENTE');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "type" "TypeCommunication" NOT NULL,
    "status" "StatusCommunication" NOT NULL,
    "priority" "PriorityCommunication" NOT NULL,
    "senderId" TEXT NOT NULL,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudienceCommunication" (
    "id" SERIAL NOT NULL,
    "careerId" TEXT NOT NULL,
    "communicationId" INTEGER,

    CONSTRAINT "AudienceCommunication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE INDEX "Communication_senderId_idx" ON "Communication"("senderId");

-- CreateIndex
CREATE INDEX "AudienceCommunication_careerId_idx" ON "AudienceCommunication"("careerId");

-- CreateIndex
CREATE INDEX "AudienceCommunication_communicationId_idx" ON "AudienceCommunication"("communicationId");
