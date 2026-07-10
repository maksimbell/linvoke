# Linvoke MVP Plan

1. Build the home page with a URL input, submit button, loading state, errors, and copyable result.
2. Add link persistence with `slug`, `originalUrl`, and `createdAt`.
3. Create the server endpoint that validates URLs, generates a unique slug, stores the link, and returns the short URL.
4. Add the `/{slug}` redirect route for existing links.
5. Add a clear not-found state for missing or expired slugs.
6. Keep MVP limits explicit: no accounts, no analytics, no custom aliases, no link editing.
7. Add basic protections: URL length limit, valid URL checks, collision handling, and simple abuse guardrails.
8. Verify the core flow: create link, copy link, redirect, invalid URL, and unknown slug.
