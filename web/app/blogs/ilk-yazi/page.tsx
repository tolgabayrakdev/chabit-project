"use client";

import Link from 'next/link';
import { Box, Container, Title, Text, Button, Image } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

const bannerText = {
  title: 'Vunqr Blog',
  desc: 'Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.'
};

function getTodayTR() {
  return new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost() {
  return (
    <Box>
      {/* Blue Banner */}
      <Box style={{ background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)', color: 'white', padding: '2.5rem 0 2rem 0', textAlign: 'center', marginBottom: '2.5rem' }}>
        <Title order={1} style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1px', marginBottom: 8 }}>
          {bannerText.title}
        </Title>
        <Text size="lg" style={{ opacity: 0.92, maxWidth: 600, margin: '0 auto' }}>
          {bannerText.desc}
        </Text>
      </Box>
      <Container size="sm" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
        <Button
          component={Link}
          href="/blogs"
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          size="md"
          style={{ alignSelf: 'flex-start', marginBottom: '2rem', color: '#228be6', fontWeight: 600 }}
        >
          Yazılara Geri Dön
        </Button>
        <Title order={2} style={{ fontWeight: 700, fontSize: '2rem', color: '#222', marginBottom: '0.5rem' }}>
          Büyük Başlık: İlk Blog Yazısı
        </Title>
        <Text size="xs" style={{ color: '#4a5568', marginBottom: '1.5rem', fontWeight: 500 }}>
          {getTodayTR()}
        </Text>
        <Image
          src="/examples/ornek-1.png"
          alt="Örnek Blog Görseli"
          width={500}
          height={300}
          style={{ borderRadius: 12, margin: '0 auto 2rem auto', maxWidth: '100%' }}
        />
        <Text size="md" style={{ color: '#444', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Bu, ilk blog yazınızın basit bir örneğidir. Modern ve sade bir tasarımla, okuyucularınıza odaklanmış bir deneyim sunabilirsiniz. Vunqr ile içerikleriniz hem görsel hem de işlevsel açıdan mükemmel olacak.
        </Text>
        <Text size="md" style={{ color: '#444', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Blog yazılarında <Link href="https://vunqr.com" style={{ color: '#228be6', textDecoration: 'underline' }}>bağlantılar</Link> ekleyerek okuyuculara daha fazla kaynak sunabilirsiniz. Ayrıca, görsellerle içeriği zenginleştirmek de mümkündür.
        </Text>
        <Title order={3} style={{ fontWeight: 600, fontSize: '1.2rem', color: '#228be6', margin: '2rem 0 1rem 0' }}>
          Alt Başlık: Blog Yazısı Yazmanın İpuçları
        </Title>
        <Text size="md" style={{ color: '#444', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          - Kısa ve öz başlıklar kullanın.<br />
          - Okuyucunun ilgisini çekecek görseller ekleyin.<br />
          - Paragrafları bölerek okunabilirliği artırın.<br />
          - Önemli noktaları vurgulayın.
        </Text>
        <Title order={3} style={{ fontWeight: 600, fontSize: '1.2rem', color: '#228be6', margin: '2rem 0 1rem 0' }}>
          Sonuç
        </Title>
        <Text size="md" style={{ color: '#444', lineHeight: 1.7, marginBottom: '2rem' }}>
          Artık blog yazılarınızda modern ve sade bir tasarım ile hem okunabilirliği hem de kullanıcı deneyimini artırabilirsiniz. Vunqr ile içeriklerinizi kolayca paylaşın!
        </Text>
        <Box style={{ flex: 1 }} />
      </Container>
    </Box>
  );
}