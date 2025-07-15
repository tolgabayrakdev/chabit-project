import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/carousel/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Notifications } from "@mantine/notifications";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dijital İletişim Çözümleri | VunQR",
  description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin. Türkiye'nin en kapsamlı dijital iletişim platformu.",
  keywords: [
    "QR kod",
    "QR code generator",
    "WiFi paylaşımı",
    "dijital iletişim",
    "vCard",
    "SMS gönderimi",
    "e-posta gönderimi",
    "PDF menü",
    "Link in Bio",
    "Google Yorum",
    "Google Review",
    "restoran menü",
    "biyografi linki",
    "dijital menü",
    "QR kod oluşturucu",
    "işletme dijitalleşme",
    "müşteri iletişimi",
    "dijital pazarlama",
    "restoran teknolojisi",
    "hızlı QR kod"
  ].join(", "),
  authors: [{ name: "VunQR", url: "https://vunqr.com" }],
  creator: "VunQR",
  publisher: "VunQR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://vunqr.com",
    languages: {
      'tr-TR': 'https://vunqr.com',
      'en-US': 'https://vunqr.com/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://vunqr.com",
    title: "Dijital İletişim Çözümleri | VunQR",
    description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin.",
    siteName: "VunQR",
    images: [
      {
        url: "https://vunqr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VunQR - Dijital İletişim Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital İletişim Çözümleri | VunQR",
    description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin.",
    creator: "@vunqr",
    site: "@vunqr",
    images: ["https://vunqr.com/twitter-image.jpg"],
  },
  category: "technology",
  classification: "Business Software",
  other: {
    "application-name": "VunQR",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "VunQR",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#ffffff",
    "msapplication-tap-highlight": "no",
    "theme-color": "#ffffff",
    "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
  },
  verification: {
    google: "yvbf8qdokpIVSyJ4Z5zIs5zHWr136R8yD7z8_UMPGlk",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta name="google-site-verification" content="yvbf8qdokpIVSyJ4Z5zIs5zHWr136R8yD7z8_UMPGlk" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VunQR" />
        <meta name="application-name" content="VunQR" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "VunQR",
              "description": "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin.",
              "url": "https://vunqr.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY"
              },
              "author": {
                "@type": "Organization",
                "name": "VunQR",
                "url": "https://vunqr.com"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />
        
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
