import { randomBytes } from "node:crypto";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function generateSlug(length = 8) {
  const bytes = randomBytes(length);

  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += alphabet[bytes[i] % alphabet.length];
  }

  return slug;
}
