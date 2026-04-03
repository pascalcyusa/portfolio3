import type { MetadataRoute } from "next";
import { toMediaUrl } from "@/utils/media";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyWebSite",
    short_name: "MySite",
    icons: [
      {
        src: toMediaUrl("/web-app-manifest-192x192.webp"),
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable",
      },
      {
        src: toMediaUrl("/web-app-manifest-512x512.webp"),
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
