"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@lib/pixel";

const CONTACT = /^(tel:|viber:|whatsapp:)|wa\.me\/|api\.whatsapp\.com|t\.me\/|telegram\.me\//i;

// Contact — клик по телефону и мессенджерам на любой странице; PageView — при переходе без перезагрузки
const PixelEvents = () => {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    track("PageView");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      if (CONTACT.test(href)) {
        const channel = href.startsWith("tel:") ? "phone" : /viber/i.test(href) ? "viber" : /t\.me|telegram/i.test(href) ? "telegram" : "whatsapp";
        track("Contact", { content_category: channel });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};

export default PixelEvents;
