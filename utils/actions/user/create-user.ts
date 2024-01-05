"use server";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

type UserParams = {
  email: string;
  name: string;
};

export async function createUser({ email, name }: UserParams) {
  console.log("============ creating user ============");
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    console.log("============ user created ============");
    console.log(user);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  } finally {
    await prisma.$disconnect();
  }
}
