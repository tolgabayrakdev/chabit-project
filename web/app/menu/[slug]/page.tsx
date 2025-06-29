import React from 'react';
import { Metadata } from 'next';
import MenuViewer from './MenuViewer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  
  // Menü verilerini çek
  let menuName = 'Menü';
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1234';
    const response = await fetch(`${baseUrl}/api/menu/public/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const menuData = await response.json();
      menuName = menuData.name;
    }
  } catch (error) {
    console.error('Error fetching menu for metadata:', error);
  }

  return {
    title: `${menuName} | VunQR`,
    description: `${menuName} menüsünü görüntüleyin.`,
    openGraph: {
      title: `${menuName} | VunQR`,
      description: `${menuName} menüsünü görüntüleyin.`,
      url: `https://vunqr.com/menu/${slug}`,
      images: [
        {
          url: "https://vunqr.com/icon.png",
          width: 400,
          height: 400,
          alt: `${menuName} - VunQR Menu`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${menuName} | VunQR`,
      description: `${menuName} menüsünü görüntüleyin.`,
      images: ["https://vunqr.com/icon.png"],
    },
  };
}

export default function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  return <MenuViewer params={params} />;
} 