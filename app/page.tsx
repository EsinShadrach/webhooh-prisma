import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { PageProps } from "~/.next/types/app/page";
import { getUsers } from "~/utils/actions/user/get-users";
import { Dialog } from "./Dialog";

export default async function Home({ searchParams }: PageProps) {
  const modal = searchParams.modal;
  const presentUser = await currentUser();
  const hasUser = presentUser !== null;
  const users = await getUsers();
  const openModal = modal === "edit" || modal === "delete";

  return (
    <section className="container p-3 mx-auto space-y-4">
      <Dialog open={openModal} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-center">All users</h1>
        <div className="relative flex items-center p-3 cursor-pointer group transition-all duration-300 hover:bg-gray-300/30 gap-2 rounded-md">
          <div className="absolute hidden p-1 px-3 text-xs bg-gray-400 -left-10 whitespace-nowrap group-hover:block -bottom-5 rounded-md">
            {hasUser
              ? `You're signed in as ${presentUser.username}`
              : "Sign in"}
          </div>
          <Indicator hasUser={hasUser} />
          <div className="text-xs">
            {hasUser ? presentUser.username : "No user"}
          </div>
        </div>
        <div>
          <SignedIn>
            <SignOutButton>
              <button className="px-5 py-2 text-sm font-semibold active:scale-95 transition-all duration-300 hover:bg-indigo-300 text-indigo-950 rounded-md">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <button className="px-5 py-2 text-sm font-semibold bg-indigo-300 active:scale-95 transition-all duration-300 text-indigo-950 rounded-md hover:bg-indigo-400">
                Sign In
              </button>
            </Link>
          </SignedOut>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 sm:grid-cols-1">
        {users.map((user, index) => (
          <Link
            key={index}
            href={"?modal=edit"}
            className="w-full max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between w-full max-w-lg px-2 py-4 mx-auto font-medium bg-indigo-200 space-y-3 transition-all duration-300 hover:bg-indigo-300 rounded-md active:scale-95">
              <div className="space-y-2">
                <div>{user.name}</div>
                <div>Clerk UID</div>
                <div>Prisma Id</div>
              </div>
              <div className="space-y-2">
                <div>==&gt;</div>
                <div>==&gt;</div>
                <div>==&gt;</div>
              </div>
              <div className="space-y-2">
                <div>{user.email}</div>
                <div>{user.clerkUid}</div>
                <div>{user.id}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Indicator({ hasUser }: { hasUser: boolean }) {
  return (
    <div
      className={`h-1 w-1 rounded-full ${
        hasUser ? "bg-green-500" : "bg-red-500"
      }`}
    />
  );
}
