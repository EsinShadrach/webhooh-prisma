"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function updateUsername(body: FormData) {
  const user = await currentUser();
  if (user) {
    console.log("===================== update-user.ts =====================");
    const username = body.get("username");
    await clerkClient.users.updateUser(user.id, {
      username: username as string,
    });
  }
  revalidatePath("/");
}
