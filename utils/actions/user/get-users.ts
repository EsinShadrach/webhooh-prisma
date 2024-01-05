"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log("============ users ============");
    console.log(users);
    return users;
  } catch (err) {
    const error = err as Error;
    console.log("============ error ============");
    console.log(error.message);
  } finally {
    prisma.$disconnect();
  }
}
