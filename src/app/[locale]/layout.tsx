import { ReactNode } from "react";
import "./globals.css";
import "../globals.scss";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import getRequestConfig from "@i18n/request";
import { notFound } from "next/navigation";
import { CartProvider } from "@components/CartPage/CartContext";
import { ToastProvider } from "@app/[locale]/ToastProvider";
import { Metadata } from "next";
import Providers from "../providers";

const META_PIXEL_ID = "1438410677693811";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isRo = locale === "ro";

  const baseTitle = isRo
    ? "Aqua Viina — filtre de apă în Moldova"
    : "Aqua Viina — фильтры для воды в Молдове";
  const baseDescription = isRo
    ? "Aqua Viina: filtre de apă, cartușe și osmoză inversă în Moldova. Livrare în Chișinău și în toată țara."
    : "Aqua Viina: фильтры для воды, картриджи и обратный осмос в Молдове. Доставка по Кишиневу и стране.";
  const xDefault = "https://aquaviina.md/ro";

  return {
    metadataBase: new URL("https://aquaviina.md"),
    applicationName: "Aqua Viina",
    authors: [{ name: "Aqua Viina", url: "https://aquaviina.md" }],
    creator: "Aqua Viina",
    publisher: "Aqua Viina",
    title: {
      default: baseTitle,
      template: "%s",
    },
    description: baseDescription,
    alternates: {
      languages: {
        "ru-MD": "https://aquaviina.md/ru",
        "ro-MD": "https://aquaviina.md/ro",
        ru: "https://aquaviina.md/ru",
        ro: "https://aquaviina.md/ro",
        "x-default": xDefault,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Aqua Viina",
      images: ["/images/home-image.jpg"],
      locale: isRo ? "ro_MD" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/home-image.jpg"],
    },
    verification: {
      google: "uG9xJSgdzZUOz2gm_PeQYQSGqdVHM-tsMdeQQNM7RZw",
      yandex: "cb9ffd70bf88210d",
      other: {
        "msvalidate.01": "F146DA38CA9262959FE12B8B6E56B19B",
      },
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content="uG9xJSgdzZUOz2gm_PeQYQSGqdVHM-tsMdeQQNM7RZw"
        />
      </head>
      <body suppressHydrationWarning>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
        <Script id="creators-signature" strategy="afterInteractive">
          {`console.info('%cCreated by Cavliuc Igor & Bondarenco Nicolai', 'color:#38bdf8;font-weight:700;');`}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />`,
          }}
        />
        <Providers>
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
                  "@id": "https://aquaviina.md/#business",
                  name: "Aqua Viina",
                  alternateName: "AquaViina",
                  description:
                    locale === "ro"
                      ? "Filtre de apă, cartușe și sisteme de osmoză inversă în Moldova."
                      : "Фильтры для воды, картриджи и системы обратного осмоса в Молдове.",
                  url: "https://aquaviina.md",
                  logo: "https://aquaviina.md/logo.svg",
                  image: "https://aquaviina.md/logo.svg",
                  telephone: "+373 67 177 889",
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
        </Providers>
      </body>
    </html>
  );
}
