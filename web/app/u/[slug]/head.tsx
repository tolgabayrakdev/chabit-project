import { Metadata } from 'next';

// Next.js otomatik olarak params.slug'u route'dan alır
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const username = params.slug;
  return {
    title: `${username} | VunQR`,
    description: `${username} link in bio sayfasıdır`,
  };
} 