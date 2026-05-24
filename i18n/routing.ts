import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "uz"],
  defaultLocale: "ru",
  // Russian (default) has no prefix; Uzbek lives under /uz/*
  localePrefix: "as-needed",
});
