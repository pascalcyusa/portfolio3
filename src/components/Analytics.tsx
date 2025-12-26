"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (gaId && typeof window !== "undefined" && window.gtag) {
      window.gtag("config", gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  return null;
}
