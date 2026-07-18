"use server";

import { neon } from "@neondatabase/serverless";
import { generateSlug } from "./slug";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function createLink(formdata: FormData): Promise<string> {
  const original_url = formdata.get("url");
  const slug = generateSlug();

  await sql`INSERT INTO links (slug, original_url, expires_at)
            VALUES (${slug}, ${original_url}, now() + interval '30 days')`;

  return slug;
}
