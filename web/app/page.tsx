import React from 'react';
import { Container, Title, Text, Button, Group, Card, SimpleGrid, rem } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: IconQrcode,
      title: 'QR Kod Oluşturma',
      description: 'Hızlı ve kolay bir şekilde özelleştirilebilir QR kodlar oluşturun.',
    },
    {
      icon: IconWifi,
      title: 'WiFi Paylaşımı',
      description: 'WiFi ağlarınızı QR kod ile güvenli bir şekilde paylaşın.',
    },
    {
      icon: IconMail,
      title: 'E-posta Gönderimi',
      description: 'Toplu e-posta gönderimi ve e-posta şablonları ile iletişiminizi kolaylaştırın.',
    },
    {
      icon: IconMessage,
      title: 'SMS Gönderimi',
      description: 'Toplu SMS gönderimi ve otomatik mesaj şablonları ile müşterilerinizle iletişimde kalın.',
    },
    {
      icon: IconAddressBook,
      title: 'vCard Yönetimi',
      description: 'Dijital kartvizitlerinizi oluşturun ve paylaşın.',
    },
  ];

  return (
    <Container size="lg" py="xl">
      <div style={{ textAlign: 'center', marginBottom: rem(60) }}>
        <Title order={1} size={rem(48)} mb="md">
          Dijital İletişim Çözümleri
        </Title>
        <Text size="lg" c="dimmed" maw={rem(580)} mx="auto">
          QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi gibi özelliklerle
          işletmenizin dijital varlığını güçlendirin.
        </Text>
        <Group justify="center" mt="xl">
          <Button size="lg" component={Link} href="/register">
            Hemen Başla
          </Button>
          <Button size="lg" variant="outline" component={Link} href="/login">
            Giriş Yap
          </Button>
        </Group>
    </div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {features.map((feature) => (
          <Card key={feature.title} padding="xl" radius="md" withBorder>
            <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            <Text size="lg" fw={500} mt="md">
              {feature.title}
            </Text>
            <Text size="sm" c="dimmed" mt="sm">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
