import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { getUsers } from "~/utils/actions/user/get-users";

export default async function Home() {
  const presentUser = await currentUser();
  const users = await getUsers();
  if (!users || users.length === 0) {
    return (
      <section className="container p-3 mx-auto">
        <Link
          href={"/sign-in"}
          className="p-2 px-6 bg-blue-300 text-blue-950 rounded-md"
        >
          Sign in
        </Link>
        <br />
        No Users yet!
      </section>
    );
  }

  return (
    <section className="container p-3 mx-auto">
      Present user: {presentUser?.username}
      <br />
      <br />
      <SignedOut>
        <Link
          href={"/sign-in"}
          className="p-2 px-6 bg-blue-300 text-blue-950 rounded-md"
        >
          Sign in
        </Link>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <button className="p-2 px-6 bg-blue-300 text-blue-950 rounded-md">
            Sign in
          </button>
        </SignOutButton>
      </SignedIn>
      <br />
      <br />
      Render list of users here
      <div>
        {users.map((user, index) => (
          <div key={index}>{user.email}</div>
        ))}
      </div>
    </section>
  );
}
