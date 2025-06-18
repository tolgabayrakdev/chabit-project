'use client';
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setLoading(false);
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
              <Text color="red" size="sm" mb="md" style={{ textAlign: 'center' }}>
                {error}
              </Text>
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
                <Button
                  loading={loading}
                  fullWidth
                  mt="xl"
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
