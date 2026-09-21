export interface SiteConfig {
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  url: string;
  supportEmail: string;
  gameUrl?: string;
  heroVideoId?: string;
  social?: {
    discord?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  locales: readonly string[];
  defaultLocale: string;
}

export const siteConfig: SiteConfig = {
  name: "Rocket Arena Wiki",
  shortName: "Rocket Arena",
  logoText: "RA",
  tagline: "Heroes, Builds & Guides",
  description: "Rocket Arena Wiki provides hero guides, gameplay tips, abilities, builds, maps, and competitive strategies to help players master EA's rocket combat arena shooter.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rocketarena.top",
  supportEmail: "support@rocketarena.top",
  gameUrl: "https://www.ea.com/games/rocket-arena",
  heroVideoId: "jq1IWop3xbQ",
  social: {
    discord: "https://answers.ea.com/",
    youtube: "https://www.youtube.com/watch?v=jq1IWop3xbQ",
  },
  locales: ["en", "de", "fr", "es"],
  defaultLocale: "en",
};
