import { siteConfig } from "@/config/site";
import { getMediaOverrides, applyOverrides } from "@/lib/media";
import { DEFAULT_HERO_IMAGE } from "@/lib/hero-default";

export interface MediaSlot {
  key: string;
  label: string;
  group: string;
  currentUrl: string;
}

/**
 * Sitewide singleton images (logo, hero) that the /admin/media screen
 * lets you replace. Portfolio story cover photos and service images have
 * their own dedicated editors — see /admin/portfolio and /admin/services —
 * since those also need name/content fields, add and delete, not just images.
 */
export async function getEditableMediaSlots(): Promise<MediaSlot[]> {
  const overrides = await getMediaOverrides();

  const slots: MediaSlot[] = [
    {
      key: "logo",
      label: "Studio Logo",
      group: "Branding",
      currentUrl: applyOverrides(overrides, "logo", siteConfig.logo),
    },
    {
      key: "hero",
      label: "Homepage Hero Background",
      group: "Homepage",
      currentUrl: applyOverrides(overrides, "hero", DEFAULT_HERO_IMAGE),
    },
  ];


  return slots;
}
