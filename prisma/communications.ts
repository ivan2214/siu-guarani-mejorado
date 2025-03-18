import { type Prisma, PrismaClient, type Communication } from "@prisma/client";

const prisma = new PrismaClient();

export const getCommunications = async (
  filter?: Prisma.CommunicationWhereInput
): Promise<Communication[]> => {
  return await prisma.communication.findMany({
    where: filter,
    include: {
      audience: true,
      sender: true,
    },
  });
};

export const getCommunicationById = async (
  id: number
): Promise<Communication | null> => {
  return await prisma.communication.findUnique({
    where: { id },
    include: {
      audience: true,
      sender: true,
    },
  });
};

export const createCommunication = async (
  data: Prisma.CommunicationCreateInput
): Promise<Communication> => {
  return await prisma.communication.create({
    data,
  });
};

export const updateCommunication = async (
  id: number,
  data: Prisma.CommunicationUpdateInput
): Promise<Communication | null> => {
  return await prisma.communication.update({
    where: { id },
    data,
  });
};

export const deleteCommunication = async (
  id: number
): Promise<Communication | null> => {
  return await prisma.communication.delete({
    where: { id },
  });
};
