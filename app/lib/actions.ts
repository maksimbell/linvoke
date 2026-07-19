"use server";

import { neon } from "@neondatabase/serverless";
import { generateSlug } from "./slug";
import { FormState, SignupFormSchema } from "./definitions";
import { createSession } from "./sessions";
import bcrypt from "bcrypt";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function createLink(formdata: FormData): Promise<string> {
  const original_url = formdata.get("url");
  const slug = generateSlug();

  await sql`INSERT INTO links (slug, original_url, expires_at)
            VALUES (${slug}, ${original_url}, now() + interval '30 days')`;

  return slug;
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  let user = null;

  try {
    const data =
      await sql`INSERT INTO users (name, email, password_hash, created_at)
            VALUES (${name}, ${email}, ${hashedPassword}, now())
            RETURNING id, name, email, created_at`;

    user = data[0];
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return { errors: { email: ["Email is already is use"] } };
    }

    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);
}
