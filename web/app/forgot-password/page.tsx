'use client';
import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';


export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: values.email }),
      });
      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        const data = await response.json();
        setError(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      setError('Bir hata oluştu');
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
            Şifre Sıfırlama
          </Title>
          <Text
            size="sm"
            style={{
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Hesabınızı hatırladınız mı?{' '}
            <Anchor component={Link} href="/login" style={{ color: 'white', textDecoration: 'underline' }}>
              Giriş Yap
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
            {success ? (
              <Stack gap="md">
                <Text size="lg" ta="center" c="green">
                  Şifre sıfırlama bağlantısı gönderildi!
                </Text>
                <Text size="sm" ta="center">
                  Email adresinizi kontrol edin ve gelen bağlantı ile şifrenizi sıfırlayın.
                </Text>
                <Button
                  component={Link}
                  href="/login"
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
                  <TextInput
                    label="Email"
                    placeholder="ornek@email.com"
                    required
                    radius="md"
                    size="md"
                    {...form.getInputProps('email')}
                  />
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
                    Sıfırlama Linki Gönder
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
