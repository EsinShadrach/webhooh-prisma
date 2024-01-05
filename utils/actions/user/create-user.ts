import { revalidatePath } from "next/cache";
import prisma from "~/utils/prisma";

type UserParams = {
  email: string;
  name: string;
};

export async function createUser({ email, name }: UserParams) {
  console.log("============ creating user ============");
  if (prisma) {
    console.log("============ Create If Block ============");

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    revalidatePath("/", "page");
    console.log("============ Created User ============");
    console.log(user);
    return user;
  }
  return null;
}
