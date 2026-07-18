"use client";

import Form from "@/app/ui/form";
import { useState } from "react";

export default function Shortener() {
  const [slug, setSlug] = useState<string | null>(null);

  const handleCreate = (slug: string) => {
    setSlug(slug);
  };

  const shortUrl =
    slug && typeof window !== "undefined"
      ? `${window.location.origin}/${slug}`
      : null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <Form onCreate={handleCreate} />
      {shortUrl && (
        <div className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-left shadow-sm">
          <p className="text-sm font-medium text-emerald-800">
            Your link is ready
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block truncate text-sm font-semibold text-zinc-950 underline-offset-4 hover:underline">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
