import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function getOriginalUrlData(slug: string) {
  const data = await sql`SELECT original_url
              FROM links
              WHERE slug = ${slug}`;

  return data[0];
}
