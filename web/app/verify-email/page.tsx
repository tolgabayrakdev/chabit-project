'use client';
import React, { useEffect, useState } from 'react';
import { Title, Container, Text, Box, Stack, Button, rem } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        setMessage('Geçersiz doğrulama linki');
        return;
      }

      try {
        const response = await fetch(`https://vunqr-backend-production.up.railway.app/api/auth/verify-email?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setVerificationStatus('success');
          setMessage('Email adresiniz başarıyla doğrulandı! Giriş yapabilirsiniz.');
        } else {
          const data = await response.json();
          setVerificationStatus('error');
          setMessage(data.message || 'Doğrulama başarısız oldu');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage('Bir hata oluştu');
      }
    };

    verifyEmail();
  }, [token]);

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
            {verificationStatus === 'loading' && 'Email doğrulanıyor...'}
            {verificationStatus === 'success' && message}
            {verificationStatus === 'error' && message}
          </Text>
          {verificationStatus !== 'loading' && (
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
          )}
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
