import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./sessions";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import { User } from "./definitions";

const sql = neon(`${process.env.DATABASE_URL}`);

type VerifiedSession = {
  userId: string;
};

const verifySession = cache(async (): Promise<VerifiedSession | null> => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.sessionId) {
    return null;
  }

  try {
    const data = await sql`SELECT id, user_id, created_at, expires_at
    FROM sessions
    WHERE id = ${session.sessionId}
    AND expires_at > now()
    LIMIT 1`;

    if (!data[0]) {
      return null;
    }

    const userId = data[0].user_id;
    return { userId };
  } catch {
    console.log("Failed to fetch user session");
    return null;
  }
});

export const getUser = cache(async (): Promise<User | null> => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await sql`SELECT id, name, email, created_at
    FROM users
    WHERE id = ${session.userId}
    LIMIT 1`;

    const user = data[0];

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    };
  } catch {
    console.log("Failed to fetch user");
    return null;
  }
});

export const requireUser = cache(async (): Promise<User> => {
  const user = await getUser();

  if (!user) redirect("/login");

  return user;
});
