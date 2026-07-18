"use client";

import { createLink } from "@/app/lib/actions";

type TProps = {
  onCreate(slug: string): void;
};

export default function Form({ onCreate }: TProps) {
  const handleCreateLink = async (formdata: FormData) => {
    const slug = await createLink(formdata);
    onCreate(slug);
  };

  return (
    <form
      className="mx-auto mt-10 w-full max-w-xl text-left"
      action={handleCreateLink}>
      <div className="flex flex-col gap-3 border border-zinc-200 bg-white p-2 shadow-sm transition focus-within:border-zinc-300 sm:flex-row">
        <input
          name="url"
          type="url"
          placeholder="https://example.com/very-long-link"
          className="min-h-12 flex-1 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
          required
        />
        <button
          type="submit"
          className="min-h-12 bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 sm:w-32">
          Transform
        </button>
      </div>
    </form>
  );
}
