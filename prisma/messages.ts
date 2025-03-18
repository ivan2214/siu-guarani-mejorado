import { PrismaClient, type Message } from "@prisma/client";

const prisma = new PrismaClient();

export const getMessages = async (): Promise<Message[]> => {
  return await prisma.message.findMany({
    include: {
      sender: true,
    },
  });
};
