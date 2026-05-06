export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://williamarmstrong.dev";

export const siteUrl = (path = "") => new URL(path, SITE_URL).toString();
