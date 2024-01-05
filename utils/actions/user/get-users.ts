"use server";
import prisma from "~/utils/prisma";

export async function getUsers() {
  if (prisma) {
    console.log("============ getting users ============");
    const users = await prisma.user.findMany();
    return users;
  }
  return [];
}
