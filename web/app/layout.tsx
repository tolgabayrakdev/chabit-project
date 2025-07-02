import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
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
  description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin.",
  keywords: "QR kod, WiFi paylaşımı, dijital iletişim, vCard, SMS gönderimi, e-posta gönderimi, PDF menü, Link in Bio, Google Yorum, Google Review, restoran menü, biyografi linki",
  authors: [{ name: "VunQR" }],
  creator: "VunQR",
  publisher: "VunQR",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://vunqr.com",
    title: "Dijital İletişim Çözümleri | VunQR",
    description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin.",
    siteName: "VunQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital İletişim Çözümleri | VunQR",
    description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle işletmenizin dijital varlığını güçlendirin.",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
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
