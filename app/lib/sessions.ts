import { neon } from "@neondatabase/serverless";
import { jwtVerify, SignJWT } from "jose";
import { createHash, randomBytes } from "node:crypto";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";

export function generateSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Failed to verify session");
  }
}

const sql = neon(`${process.env.DATABASE_URL}`);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const hashedToken = hashSessionToken(generateSessionToken());
  const data = await sql`INSERT INTO sessions (user_id, token_hash, expires_at)
      VALUES (${userId}, ${hashedToken}, ${expiresAt})
      RETURNING id`;

  const sessionId = data[0].id;
  const session = await encrypt({ sessionId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
