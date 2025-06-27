'use client';
import React, { useState, useEffect } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
    },
  });

  useEffect(() => {
    // Giriş kontrolü
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          router.replace('/dashboard');
        } else {
          setCheckingAuth(false);
        }
      })
      .catch(() => setCheckingAuth(false));
  }, [router]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Giriş yapılamadı');
        setLoading(false);
      }
    } catch (error) {
      setError('Bir hata oluştu');
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Yükleniyor...</Text>
      </Box>
    );
  }

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
        <Stack align="center" gap="xs">
          <Text size="xs" style={{ color: 'white', textAlign: 'center', background: 'rgba(0,0,0,0.10)', borderRadius: 8, padding: '6px 12px', marginBottom: 4, maxWidth: 340 }}>
            En iyi deneyim için Chrome ve Opera gibi modern tarayıcılardan giriş yapmanızı öneririz.
          </Text>
          <Title
            order={2}
            style={{
              color: 'white',
              fontSize: rem(36),
              fontWeight: 900,
              textAlign: 'center'
            }}
          >
            Hoş Geldiniz!
          </Title>
          <Text
            size="sm"
            style={{
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Hesabınız yok mu?{' '}
            <Anchor component={Link} href="/register" style={{ color: 'white', textDecoration: 'underline' }}>
              Kayıt Ol
            </Anchor>
          </Text>

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
            {error && (
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
                {error}
              </div>
            )}
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="ornek@email.com"
                  required
                  radius="md"
                  size="md"
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  label="Şifre"
                  placeholder="Şifrenizi giriniz"
                  required
                  radius="md"
                  size="md"
                  {...form.getInputProps('password')}
                />
                <Anchor component={Link} href="/forgot-password" style={{ color: '#228be6', textAlign: 'right', display: 'block', marginBottom: 4, fontSize: 14, textDecoration: 'underline' }}>
                  Şifremi Unuttum?
                </Anchor>
                <Button
                  loading={loading}
                  fullWidth
                  type="submit"
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
                  Giriş Yap
                </Button>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
} 