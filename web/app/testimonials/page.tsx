import React from 'react';
import { Box, Container, Title, Text, Paper, Group, Avatar, rem, Badge, SimpleGrid, Button } from '@mantine/core';
import { IconStarFilled, IconQuote, IconQrcode } from '@tabler/icons-react';
import Footer from '../components/Footer';
import Link from 'next/link';

const testimonialsData = [
  {
    name: 'Ahmet Yılmaz',
    comment: 'VunQR sayesinde müşterilerimle iletişimim çok daha kolaylaştı. QR kodlar harika çalışıyor!',
    avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz'
  },
  {
    name: 'Elif Demir',
    comment: 'PDF menü özelliği restoranımızda çok işimize yaradı. Kullanımı çok pratik.',
    avatar: 'https://ui-avatars.com/api/?name=Elif+Demir'
  },
  {
    name: 'Mehmet Kaya',
    comment: 'Google yorum QR kodu ile müşteri geri dönüşlerimiz arttı. Tavsiye ederim!',
    avatar: 'https://ui-avatars.com/api/?name=Mehmet+Kaya'
  },
  {
    name: 'Zeynep Çelik',
    comment: 'Kendi logomuzu QR kodlara ekleyebilmek markamız için çok değerli.',
    avatar: 'https://ui-avatars.com/api/?name=Zeynep+Çelik'
  }
];

export const metadata = {
  title: 'Kullanıcı Yorumları | VunQR',
  description: 'VunQR kullanıcılarının kişisel veya kurumsal deneyimlerini ve yorumlarını okuyun. QR kod, dijital menü ve daha fazlası hakkında gerçek kullanıcı görüşleri. VunQR hem bireyler hem de işletmeler için dijital iletişimin akıllı yoludur.',
  alternates: {
    canonical: '/testimonials',
  },
  openGraph: {
    title: 'Kullanıcı Yorumları | VunQR',
    description: 'VunQR kullanıcılarının kişisel veya kurumsal deneyimlerini ve yorumlarını okuyun. QR kod, dijital menü ve daha fazlası hakkında gerçek kullanıcı görüşleri. VunQR hem bireyler hem de işletmeler için dijital iletişimin akıllı yoludur.',
    url: '/testimonials',
    type: 'website',
    images: [
      {
        url: 'https://vunqr.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VunQR - Dijital İletişim Çözümleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kullanıcı Yorumları | VunQR',
    description: 'VunQR kullanıcılarının kişisel veya kurumsal deneyimlerini ve yorumlarını okuyun. QR kod, dijital menü ve daha fazlası hakkında gerçek kullanıcı görüşleri. VunQR hem bireyler hem de işletmeler için dijital iletişimin akıllı yoludur.',
    images: ['https://vunqr.com/twitter-image.jpg'],
  },
  other: {
    'script:type': 'application/ld+json',
    'script:dangerouslySetInnerHTML': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Review',
      'itemReviewed': {
        '@type': 'Product',
        'name': 'VunQR',
        'description': 'VunQR, kişisel veya kurumsal kullanım için dijital iletişimin akıllı yoludur. Bireyler ve işletmeler için gelişmiş QR kod çözümleri sunar.'
      },
      'review': testimonialsData.map(testimonial => ({
        '@type': 'Review',
        'author': {
          '@type': 'Person',
          'name': testimonial.name
        },
        'reviewBody': testimonial.comment
      }))
    })
  }
};

export default function TestimonialsPage() {
  return (
    <>
      <style>{`
        .testimonial-card {
          transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 0;
          max-width: 480px;
          padding: 32px 28px;
          margin-left: auto;
          margin-right: auto;
        }
        .testimonial-card:hover {
          transform: scale(1.035) translateY(-4px);
          box-shadow: 0 12px 36px rgba(34,139,230,0.16);
        }
        .testimonial-comment {
          min-height: 0;
          max-height: none;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          overflow: visible;
          text-overflow: unset;
          text-align: center;
          padding: 0 8px;
        }
        .vunqr-link {
          display: inline-block;
          margin-top: 24px;
          color: white;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 1px;
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: border 0.2s;
        }
        .vunqr-link:hover {
          border-bottom: 2px solid #fff;
        }
      `}</style>
      <Box>
        {/* Mavi Banner */}
        <Box style={{ background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)', color: 'white', padding: '2.5rem 0 2rem 0', textAlign: 'center', marginBottom: '2.5rem', boxShadow: '0 8px 32px rgba(34,139,230,0.10)' }}>
          <Title order={1} style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1px', marginBottom: 8 }}>
            Kullanıcı Yorumları
          </Title>
          <Text size="lg" style={{ opacity: 0.92, maxWidth: 600, margin: '0 auto' }}>
            VunQR kullanıcılarının kişisel veya kurumsal deneyimlerini ve görüşlerini burada bulabilirsiniz. Gerçek kullanıcı yorumları ile VunQR hakkında daha fazla bilgi edinin.
          </Text>
         <Link href="/" className="vunqr-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
            <IconQrcode size={22} color="white" style={{ flexShrink: 0 }} />
            VunQR
          </Link>
        </Box>
        <Container size="md" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '36px' }}>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2, lg: 2 }}
            spacing={{ base: 20, sm: 24, lg: 32 }}
            style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}
          >
            {testimonialsData.map((testimonial, idx) => (
              <Paper
                key={idx}
                shadow="md"
                radius="xl"
                p="xl"
                withBorder
                className="testimonial-card"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid #e3e8ee',
                  boxShadow: '0 8px 32px rgba(34,139,230,0.10)',
                }}
              >
                <Avatar src={testimonial.avatar} alt={testimonial.name} radius="xl" size={68} style={{ marginBottom: 8, border: '2.5px solid #228be6', boxShadow: '0 2px 8px #228be62a' }} />
                <Group gap={2} style={{ marginBottom: 10, justifyContent: 'center', width: '100%' }}>
                  {[...Array(5)].map((_, i) => (
                    <IconStarFilled key={i} size={20} color="#facc15" style={{ filter: 'drop-shadow(0 1px 2px #facc1533)', transition: 'transform 0.2s', transform: `scale(${1 + 0.08 * Math.sin((idx + 1) * (i + 1))})` }} />
                  ))}
                </Group>
                <Group align="center" style={{ width: '100%', justifyContent: 'center', marginBottom: 0 }}>
                  <IconQuote size={32} color="#2563eb" style={{ opacity: 0.18, marginRight: 4, marginTop: -8 }} />
                  <Text
                    size="lg"
                    className="testimonial-comment"
                    style={{
                      fontStyle: 'italic',
                      color: '#2563eb',
                      fontWeight: 500,
                      letterSpacing: '-0.5px',
                      flex: 1,
                      textAlign: 'center',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '48px',
                    }}
                  >
                    "{testimonial.comment}"
                  </Text>
                  <IconQuote size={32} color="#2563eb" style={{ opacity: 0.18, marginLeft: 4, marginTop: 8, transform: 'scaleX(-1)' }} />
                </Group>
                <Text fw={700} size="md" style={{ color: '#222', marginTop: 8, letterSpacing: '-0.2px', textAlign: 'center', width: '100%' }}>
                  {testimonial.name}
                </Text>
                <Badge color="blue" variant="light" size="sm" style={{ marginTop: 2, opacity: 0.85, letterSpacing: '0.1em', textAlign: 'center', width: '100%', display: 'block' }}>
                  VunQR Kullanıcısı
                </Badge>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}