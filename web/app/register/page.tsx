"use client";
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Şifreler eşleşmiyor' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await fetch('https://chabit-project.onrender.com/api/auth/register', {
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
        setTimeout(() => {
          setLoading(false);
          router.push('/login');
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
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
                <PasswordInput
                  label="Şifre Tekrar"
                  placeholder="Şifrenizi tekrar giriniz"
                  required
                  radius="md"
                  size="md"
                  {...form.getInputProps('confirmPassword')}
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
                  Kayıt Ol
                </Button>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
