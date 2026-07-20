import SignupForm from "@/app/ui/auth/signup";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12 text-zinc-950">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-medium text-zinc-500">linvoke</p>
          <h1 className="text-4xl font-semibold tracking-normal">
            Create your account
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Save links, manage them later, and unlock analytics when they are
            ready.
          </p>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
