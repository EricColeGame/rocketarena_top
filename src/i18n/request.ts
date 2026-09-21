import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";
import en from "@/locales/en.json";

type Messages = typeof en;

const messagesMap: Record<Locale, () => Promise<{ default: Partial<Messages> }>> = {
  "en": () => import("@/locales/en.json"),
  "de": () => import("@/locales/de.json"),
  "fr": () => import("@/locales/fr.json"),
  "es": () => import("@/locales/es.json"),
};

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (
    typeof base !== "object" ||
    base === null ||
    typeof override !== "object" ||
    override === null
  ) {
    return (override as T) ?? base;
  }

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (overrideValue === undefined) continue;
    result[key] = deepMerge(baseValue as never, overrideValue as never);
  }

  return result as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? (requested as Locale)
    : (routing.defaultLocale as Locale);

  let localeMessages: Partial<Messages> = {};
  if (locale !== "en" && messagesMap[locale]) {
    try {
      const imported = await messagesMap[locale]();
      localeMessages = imported.default || imported;
    } catch {
      // Fallback cleanly to en if locale json doesn't exist yet
      localeMessages = {};
    }
  }

  const messages = deepMerge(en, localeMessages);
  return { locale, messages };
});
