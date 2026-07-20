"use client";

import { login } from "@/app/lib/actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      action={action}
      className="border border-zinc-200 bg-white p-5 text-left shadow-sm">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Email"
            className="min-h-12 w-full border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
          />
          {state?.errors?.email && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {state.errors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="min-h-12 w-full border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
          />
          {state?.message && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {state.message}
            </p>
          )}
        </div>
      </div>
      <button
        disabled={pending}
        type="submit"
        className="mt-6 min-h-12 w-full bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-400">
        {pending ? "Entering..." : "Log In"}
      </button>
    </form>
  );
}
