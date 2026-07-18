import Shortener from "@/app/ui/shortener/shortener";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12 text-zinc-950">
      <section className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-semibold tracking-normal sm:text-6xl">
          Simplify your links
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-600">
          Paste a long URL and get a clean Linvoke short link
        </p>
        <Shortener />
      </section>
    </main>
  );
}
