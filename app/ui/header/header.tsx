import Link from "next/link";
import { getUser } from "@/app/lib/dal";
import UserMenu from "./user-menu";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-stone-50/90 px-6 py-4 text-zinc-950 backdrop-blur sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-normal transition hover:text-zinc-700">
          linvoke
        </Link>

        {user ? (
          <UserMenu name={user.name} />
        ) : (
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link
              href="/login"
              className="inline-flex min-h-10 items-center whitespace-nowrap rounded-md px-4 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950">
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex min-h-10 items-center whitespace-nowrap rounded-md bg-zinc-950 px-5 font-semibold text-white shadow-sm transition hover:bg-zinc-800 hover:shadow">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
