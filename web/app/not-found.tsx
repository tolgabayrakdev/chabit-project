"use client"
import { useRouter } from 'next/navigation';
import { Box, Container, Title, Text, Button, Stack, rem } from '@mantine/core';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: rem(20) }}>
      <Container size="xs">
        <Stack align="center" gap="xl">
          <Title order={1} style={{ fontWeight: 900, fontSize: rem(40), textAlign: 'center', color: '#228be6' }}>
            404 - Sayfa Bulunamadı
          </Title>
          <Text size="lg" c="dimmed" ta="center">
            Üzgünüz, aradığınız sayfa bulunamadı veya kaldırılmış olabilir.<br />
            Geri dönerek devam edebilirsiniz.
          </Text>
          <Button
            onClick={() => router.back()}
            size="lg"
            radius="xl"
            style={{ background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)', color: 'white', fontWeight: 600 }}
          >
            Geri Dön
          </Button>
        </Stack>
      </Container>
    </Box>
  );
} 