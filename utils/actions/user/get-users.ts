"use server";
import prisma from "~/utils/prisma";

export async function getUsers() {
  // console.log(prisma);
  if (prisma) {
    console.log("============ getting users ============");
    const users = await prisma.user.findMany();
    return users;
  }
  return [];
}
