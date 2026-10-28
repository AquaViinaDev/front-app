// События пикселя Meta (28.10.2026): Contact, ViewContent, Lead. PageView — в layout + при переходах (PixelEvents).
type Fbq = (...args: unknown[]) => void;

export const track = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
};
