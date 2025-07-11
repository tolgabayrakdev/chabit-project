'use client';
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Şifreler eşleşmiyor' : null,
      acceptTerms: (value) => (!value ? 'Kullanım şartlarını ve gizlilik politikasını kabul etmelisiniz' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.status === 201) {
        setSuccess(true);
        setRegisteredEmail(values.email);
        form.reset();
      } else {
        const data = await response.json();
        form.setErrors({ email: data.message || 'Kayıt işlemi başarısız oldu' });
      }
    } catch (error) {
      form.setErrors({ email: 'Bir hata oluştu' });
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
            Hesap Oluştur
          </Title>
          <Text
            size="sm"
            style={{
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Zaten hesabınız var mı?{' '}
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
                  Kayıt işlemi başarılı!
                </Text>
                <Text size="sm" ta="center">
                  {registeredEmail} adresine bir doğrulama emaili gönderdik. Lütfen emailinizi kontrol edin ve hesabınızı doğrulamak için emaildeki linke tıklayın.
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
                  <TextInput
                    label="Email"
                    placeholder="ornek@email.com"
                    required
                    radius="md"
                    size="md"
                    {...form.getInputProps('email')}
                  />
                  {form.errors.email && (
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
                      {form.errors.email}
                    </div>
                  )}
                  <PasswordInput
                    label="Şifre"
                    placeholder="Şifrenizi giriniz"
                    required
                    radius="md"
                    size="md"
                    {...form.getInputProps('password')}
                  />
                  <PasswordInput
                    label="Şifre Tekrar"
                    placeholder="Şifrenizi tekrar giriniz"
                    required
                    radius="md"
                    size="md"
                    {...form.getInputProps('confirmPassword')}
                  />
                  <Checkbox
                    label={
                      <Text size="sm">
                        <Anchor component={Link} href="/terms" target="_blank" style={{ color: '#228be6' }}>
                          Kullanım Şartları
                        </Anchor>
                        {' '}ve{' '}
                        <Anchor component={Link} href="/privacy" target="_blank" style={{ color: '#228be6' }}>
                          Gizlilik Politikası
                        </Anchor>
                        'nı kabul ediyorum
                      </Text>
                    }
                    {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
                  />
                  {form.errors.acceptTerms && (
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
                      {form.errors.acceptTerms}
                    </div>
                  )}
                  <Button
                    loading={loading}
                    fullWidth
                    mt="md"
                    type="submit"
                    radius="md"
                    size="md"
                    style={{
                      background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Kayıt Ol
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