import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed `middleware` → `proxy`. next-intl's middleware handles
// locale detection, the `/` → default-locale rewrite, and cookie persistence.
export default createMiddleware(routing);

export const config = {
  // Match everything except API routes, Next internals and static files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
