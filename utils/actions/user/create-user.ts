import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/", "page");
    console.log("============ user created ============");
    console.log(user);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  } finally {
    await prisma.$disconnect();
  }
}
