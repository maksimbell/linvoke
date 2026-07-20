"use client";

import { logout } from "@/app/lib/actions";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
};

export default function UserMenu({ name }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-10 w-48 items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50">
        <span
          aria-hidden="true"
          className="size-7 rounded-full border border-zinc-200 bg-zinc-100"
        />
        <span className="min-w-0 flex-1 truncate text-left">{name}</span>
        <span
          aria-hidden="true"
          className={`size-1.5 rotate-45 border-b border-r border-zinc-500 transition ${
            isOpen ? "-translate-y-0.5 rotate-[225deg]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-48 rounded-md border border-zinc-200 bg-white p-1.5 text-sm font-medium text-zinc-700 shadow-lg shadow-zinc-950/10">
          <Link
            href="/profile"
            role="menuitem"
            className="flex w-full items-center rounded px-3 py-2 text-left transition hover:bg-zinc-100 hover:text-zinc-950">
            Profile
          </Link>
          <Link
            href="/dashboard"
            role="menuitem"
            className="flex w-full items-center rounded px-3 py-2 text-left transition hover:bg-zinc-100 hover:text-zinc-950">
            Dashboard
          </Link>
          <div className="my-1 h-px bg-zinc-200" />
          <form action={logout}>
            <button
              type="submit"
              role="menuitem"
              className="flex w-full items-center rounded px-3 py-2 text-left text-red-600 transition hover:bg-red-50 hover:text-red-700">
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
