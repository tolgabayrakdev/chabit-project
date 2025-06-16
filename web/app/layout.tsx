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
  title: "VunQR - Dijital İletişim Çözümleri",
  description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi gibi özelliklerle işletmenizin dijital varlığını güçlendirin.",
  keywords: "QR kod, WiFi paylaşımı, dijital iletişim, vCard, SMS gönderimi, e-posta gönderimi",
  authors: [{ name: "VunQR" }],
  creator: "VunQR",
  publisher: "VunQR",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://vunqr.com",
    title: "VunQR - Dijital İletişim Çözümleri",
    description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi gibi özelliklerle işletmenizin dijital varlığını güçlendirin.",
    siteName: "VunQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "VunQR - Dijital İletişim Çözümleri",
    description: "QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi gibi özelliklerle işletmenizin dijital varlığını güçlendirin.",
  },
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "yvbf8qdokpIVSyJ4Z5zIs5zHWr136R8yD7z8_UMPGlk", // Google Search Console doğrulama kodunuzu buraya ekleyin
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
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
