import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="absolute left-0 top-0 w-full px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-zinc-950 transition hover:text-zinc-700 sm:text-3xl">
          linvoke
        </Link>
      </header>
      {children}
    </div>
  );
}
