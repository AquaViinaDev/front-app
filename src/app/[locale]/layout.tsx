import { ReactNode } from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import getRequestConfig from "../../../i18n/request";
import { notFound } from "next/navigation";
import { CartProvider } from "@/components/CartPage/CartContext";
import { ToastProvider } from "@/app/[locale]/ToastProvider";

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale: localeFromUrl } = await params;

  const { locale, messages } = await getRequestConfig({
    requestLocale: Promise.resolve(localeFromUrl),
  });

  if (!messages) notFound();

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={montserrat.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider />
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
