import { ReactNode } from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import getRequestConfig from "@i18n/request";
import { notFound } from "next/navigation";
import { CartProvider } from "@components/CartPage/CartContext";
import { ToastProvider } from "@app/[locale]/ToastProvider";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isRo = locale === "ro";

  const baseTitle = isRo
    ? "AquaViina — filtre de apă în Moldova"
    : "AquaViina — фильтры для воды в Молдове";
  const baseDescription = isRo
    ? "Filtre de apă, cartușe și osmoză inversă în Moldova. Livrare în Chișinău și în toată țara."
    : "Фильтры для воды, картриджи и обратный осмос в Молдове. Доставка по Кишиневу и стране.";

  return {
    metadataBase: new URL("https://aquaviina.md"),
    title: {
      default: baseTitle,
      template: "%s — AquaViina",
    },
    description: baseDescription,
    alternates: {
      languages: {
        ru: "https://aquaviina.md/ru",
        ro: "https://aquaviina.md/ro",
        "x-default": "https://aquaviina.md/ro",
      },
    },
    openGraph: {
      type: "website",
      siteName: "AquaViina",
      images: ["/images/home-image.jpg"],
      locale: isRo ? "ro_MD" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/home-image.jpg"],
    },
    verification: {
      google: "tBQCnfa7dmLgkogvoSqXPCW9uS5NOcI_XTQvEwMC2Cg",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

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
    <div
      data-scroll-behavior="smooth"
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "AquaViina",
            description:
              locale === "ro"
                ? "Filtre de apă, cartușe și sisteme de osmoză inversă în Moldova."
                : "Фильтры для воды, картриджи и системы обратного осмоса в Молдове.",
            url: "https://aquaviina.md",
            telephone: "+37367177889",
            areaServed: "MD",
            address: {
              "@type": "PostalAddress",
              addressCountry: "MD",
            },
            sameAs: ["https://www.instagram.com/aqua_viina/"],
          }),
        }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ToastProvider />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </NextIntlClientProvider>
    </div>
  );
}
