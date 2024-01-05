import { revalidatePath } from "next/cache";
import prisma from "~/utils/prisma";

type UserParams = {
  email: string;
  name: string;
  clerkUid: string;
};

export async function createUser({ email, name, clerkUid }: UserParams) {
  console.log("============ creating user ============");
  if (prisma) {
    console.log("============ Create If Block ============");

    const user = await prisma.user.create({
      data: {
        email,
        name,
        clerkUid,
      },
    });

    revalidatePath("/", "page");
    console.log("============ Created User ============");
    console.log(user);
    return user;
  }
  return null;
}
