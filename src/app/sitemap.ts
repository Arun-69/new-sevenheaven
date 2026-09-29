import { MetadataRoute } from "next";
import { galleries } from "@/data/galleries";
import { siteConfig } from "@/config/site";
import { getStories } from "@/lib/content";

const baseUrl = siteConfig.siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getStories();

  const staticRoutes = [
    "",
    "/stories",
    "/services",
    "/films",
    "/creative",
    "/about",
    "/contact",
    "/packages",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const storyRoutes = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: new Date(),
  }));

  const galleryRoutes = galleries.map((gallery) => ({
    url: `${baseUrl}/gallery/${gallery.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...storyRoutes, ...galleryRoutes];
}
