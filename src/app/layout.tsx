import { ReactNode } from "react";
import Providers from "./providers";
import "./globals.scss";

type RootLayoutProps = {
  children: ReactNode;
  params?: {
    locale?: string;
  };
};

const SUPPORTED_LANGS = new Set(["ru", "ro"]);

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale =
    params?.locale && SUPPORTED_LANGS.has(params.locale) ? params.locale : "ru";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
