import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "~/utils/actions/user/create-user";
import prisma from "~/utils/prisma";

export async function POST(req: Request) {
  console.log("============== Calling Webhook ==============");
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    console.log("==============  User Created Webhook ==============");
    createUser({
      name: evt.data.username!,
      email: evt.data.email_addresses[0].email_address,
      clerkUid: evt.data.id,
    });
  }

  if (eventType === "user.deleted") {
    // Delete user from database
    // Add a feild where we can have clerkUid
    if (prisma) {
      console.log("==============  User Deleted Webhook ==============");
      const user = await prisma.user.delete({
        where: {
          clerkUid: evt.data.id,
        },
      });
      console.log("==============  User Deleted Success End ==============");
      console.log(user);
    }
  }

  if (eventType === "user.updated") {
    console.log("==============  User Update Webhook ==============");
    const user = await prisma.user.update({
      where: {
        clerkUid: evt.data.id,
      },
      data: {
        name: evt.data.username!,
      },
    });
    console.log("==============  User Update Success End ==============");
    console.log(user);
  }

  return new Response("", { status: 200 });
}

export async function GET() {
  return new Response("GET to Clerk Endpoint", { status: 200 });
}
