'use client';
import React, { useState } from 'react';
import { Title, Container, Text, Box, Stack, Button, PasswordInput, Paper, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResetPasswordContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
      confirmPassword: (value, values) => value !== values.newPassword ? 'Şifreler eşleşmiyor' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) {
      setStatus('error');
      setMessage('Geçersiz veya eksik token.');
      return;
    }
    setLoading(true);
    setStatus('idle');
    setMessage('');
    try {
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: values.newPassword,
        }),
      });
      if (response.ok) {
        setStatus('success');
        setMessage('Şifreniz başarıyla sıfırlandı! Giriş yapabilirsiniz.');
        form.reset();
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.message || 'Şifre sıfırlama başarısız oldu.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

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
            Şifre Sıfırla
          </Title>
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="lg"
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {status === 'success' ? (
              <Stack gap="md">
                <Text size="lg" ta="center" c="green">
                  {message}
                </Text>
                <Button
                  onClick={() => router.push('/login')}
                  fullWidth
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
            ) : (
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                  <PasswordInput
                    label="Yeni Şifre"
                    placeholder="Yeni şifrenizi girin"
                    required
                    radius="md"
                    size="md"
                    {...form.getInputProps('newPassword')}
                  />
                  <PasswordInput
                    label="Yeni Şifre Tekrar"
                    placeholder="Yeni şifrenizi tekrar girin"
                    required
                    radius="md"
                    size="md"
                    {...form.getInputProps('confirmPassword')}
                  />
                  {status === 'error' && (
                    <div
                      style={{
                        background: 'rgba(255, 77, 77, 0.08)',
                        color: '#e03131',
                        borderRadius: 8,
                        padding: '10px 0',
                        marginBottom: 16,
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.1,
                        border: '1px solid #ffe3e3'
                      }}
                    >
                      {message}
                    </div>
                  )}
                  <Button
                    type="submit"
                    loading={loading}
                    fullWidth
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
                    Şifreyi Sıfırla
                  </Button>
                </Stack>
              </form>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  );
}
