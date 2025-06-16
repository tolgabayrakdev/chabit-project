'use client';
import React from 'react';
import { Title, Container, Text, Box, Stack, Button, rem } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <Box 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: rem(20)
      }}
    >
      <Container size={420} style={{ width: '100%' }}>
        <Stack align="center" gap="xl">
          <Title 
            order={2} 
            style={{ 
              color: 'white',
              fontSize: rem(36),
              fontWeight: 900,
              textAlign: 'center'
            }}
          >
            Email Doğrulama
          </Title>
          <Text 
            size="lg" 
            style={{ 
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            {email} adresine bir doğrulama emaili gönderdik. Lütfen emailinizi kontrol edin ve hesabınızı doğrulamak için emaildeki linke tıklayın.
          </Text>
          <Button
            onClick={() => router.push('/login')}
            radius="xl"
            size="md"
            style={{
              background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            Giriş Sayfasına Dön
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={
      <Box 
        style={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: rem(20)
        }}
      >
        <Container size={420} style={{ width: '100%' }}>
          <Text color="white" size="lg" ta="center">Loading...</Text>
        </Container>
      </Box>
    }>
      <EmailVerificationContent />
    </Suspense>
  );
}
