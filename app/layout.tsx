import type { Metadata, Viewport } from "next";
import { Zen_Old_Mincho, EB_Garamond, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/header";
import { FixedReserve } from "@/components/fixed-reserve";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-zen-old-mincho",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-garamond",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} ${siteConfig.nameEn} | 鹿児島 天文館`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} ${siteConfig.nameEn}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/images/hero.jpg", width: 2400, height: 1600 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} ${siteConfig.nameEn}`,
    description: siteConfig.description,
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1a17",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  servesCuisine: "Japanese",
  priceRange: "¥¥¥",
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "鹿児島市",
    addressRegion: "鹿児島県",
    addressCountry: "JP",
  },
  url: siteConfig.url,
  image: `${siteConfig.url}/images/hero.jpg`,
  sameAs: [siteConfig.instagram.url],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${zenOldMincho.variable} ${ebGaramond.variable} ${notoSansJP.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <FixedReserve />
      </body>
    </html>
  );
}
