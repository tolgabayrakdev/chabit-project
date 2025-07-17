import React from 'react';
import { Box, Container, SimpleGrid, Stack, Text, Anchor, Group, Divider } from '@mantine/core';
import { IconQrcode, IconBrandInstagram, IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
        color: 'white',
        padding: '90px 0 30px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <Box style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
      }} />

      {/* Floating QR code icons */}
      <Box style={{
        position: 'absolute',
        top: '15%',
        left: '15%',
        opacity: 0.1,
        transform: 'rotate(-15deg)',
      }}>
        <IconQrcode size={50} color="white" />
      </Box>
      <Box style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        opacity: 0.1,
        transform: 'rotate(15deg)',
      }}>
        <IconQrcode size={60} color="white" />
      </Box>
      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          <Stack gap={4}>
            <Text fw={700} size="md">Hakkımızda</Text>
            <Text size="xs" c="white" opacity={0.8}>
              Dijital iletişim çözümleri sunan modern ve kullanıcı dostu bir platform.
            </Text>
            <Text size="xs" c="white" opacity={0.8}>
              İletişim: <a href="mailto:vunqrdotcom@gmail.com" style={{ color: 'white', textDecoration: 'underline' }}>vunqrdotcom@gmail.com</a>
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text fw={700} size="md">Hızlı Bağlantılar</Text>
            <Anchor component={Link} href="/login" c="white" opacity={0.8}>Giriş Yap</Anchor>
            <Anchor component={Link} href="/register" c="white" opacity={0.8}>Kayıt Ol</Anchor>
            <Anchor component={Link} href="/dashboard" c="white" opacity={0.8}>Dashboard</Anchor>
            <Anchor component={Link} href="/examples" c="white" opacity={0.8}>Tasarımlar</Anchor>
            <Anchor component={Link} href="/blogs" c="white" opacity={0.8}>Blog</Anchor>
            <Anchor component={Link} href="/faq" c="white" opacity={0.8}>Sıkça Sorulan Sorular</Anchor>
            <Anchor component={Link} href="/testimonials" c="white" opacity={0.8}>Kullanıcı Yorumları</Anchor>
            <Anchor component={Link} href="/terms" c="white" opacity={0.8}>Kullanım Şartları</Anchor>
            <Anchor component={Link} href="/privacy" c="white" opacity={0.8}>Gizlilik Politikası</Anchor>
          </Stack>
          <Stack gap={4}>
            <Text fw={700} size="md">Özellikler</Text>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>QR Kod Oluşturma</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>WiFi Paylaşımı</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>E-posta Gönderimi</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>SMS Gönderimi</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>vCard Yönetimi</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>URL QR Kod</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>PDF Menü Yönetimi</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>Google Yorumlar</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>Link in Bio</Anchor>
            <Anchor component={Link} href="#features" c="white" opacity={0.8}>Kampanya Yönetimi (PRO)</Anchor>
          </Stack>
          <Stack gap={4}>
            <Text fw={700} size="md">Bizi Takip Edin</Text>
            <Group gap={4}>
              <Anchor href="https://instagram.com/vunqrdotcom" target="_blank" c="white" opacity={0.8}>
                <IconBrandInstagram size={20} />
              </Anchor>
              <Anchor href="https://twitter.com" target="_blank" c="white" opacity={0.8}>
                <IconBrandTwitter size={20} />
              </Anchor>
              <Anchor href="https://linkedin.com" target="_blank" c="white" opacity={0.8}>
                <IconBrandLinkedin size={20} />
              </Anchor>
            </Group>
          </Stack>
        </SimpleGrid>
        <Divider my={32} color="white" opacity={0.2} />
        <Text ta="center" size="xs" c="white" opacity={0.8}>
          © 2025 VunQR - Dijital İletişim Çözümleri. Tüm hakları saklıdır.
        </Text>
      </Container>
    </Box>
  );
} 