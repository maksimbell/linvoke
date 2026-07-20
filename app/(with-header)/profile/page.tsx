import { requireUser } from "@/app/lib/dal";

export default async function Page() {
  const user = await requireUser();

  return (
    <main className="flex h-full items-center justify-center px-6 text-zinc-950">
      <section className="w-full max-w-xl rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">Profile</p>
        <h1 className="mt-2 text-2xl font-semibold">{user.name}</h1>
        <p className="mt-2 text-sm text-zinc-600">{user.email}</p>
      </section>
    </main>
  );
}
