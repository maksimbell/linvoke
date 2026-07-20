import LoginForm from "@/app/ui/auth/login";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12 text-zinc-950">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-medium text-zinc-500">linvoke</p>
          <h1 className="text-4xl font-semibold tracking-normal">
            Log in to your account
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="inline-flex whitespace-nowrap font-semibold text-zinc-950 underline-offset-4 transition hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
