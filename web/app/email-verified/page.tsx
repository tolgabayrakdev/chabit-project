'use client';
import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Container, Text, Box, Stack, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmailVerificationPage() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const form = useForm({
    initialValues: {
      verificationCode: '',
    },
    validate: {
      verificationCode: (value) => (value.length !== 6 ? 'Doğrulama kodu 6 haneli olmalıdır' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`https://chabit-project.onrender.com/api/auth/verify-email?email=${encodeURIComponent(email || '')}&code=${values.verificationCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSuccess('Email adresiniz başarıyla doğrulandı! Giriş yapabilirsiniz.');
        setTimeout(() => {
          setLoading(false);
          router.push('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Doğrulama başarısız oldu');
        setLoading(false);
      }
    } catch (error) {
      setError('Bir hata oluştu');
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`https://chabit-project.onrender.com/api/auth/resend-verification-email?email=${encodeURIComponent(email || '')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSuccess('Yeni doğrulama kodu email adresinize gönderildi!');
      } else {
        const data = await response.json();
        setError(data.message || 'Kod gönderilemedi');
      }
    } catch (error) {
      setError('Bir hata oluştu');
    } finally {
      setResendLoading(false);
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
            Email Doğrulama
          </Title>
          <Text 
            size="sm" 
            style={{ 
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            {email} adresine gönderilen 6 haneli doğrulama kodunu giriniz
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
            {success && (
              <Text color="green" size="sm" mb="md" style={{ textAlign: 'center' }}>
                {success}
              </Text>
            )}
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Doğrulama Kodu"
                  placeholder="6 haneli kodu giriniz"
                  required
                  radius="md"
                  size="md"
                  maxLength={6}
                  {...form.getInputProps('verificationCode')}
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
                  Doğrula
                </Button>
                <Button
                  variant="subtle"
                  loading={resendLoading}
                  onClick={handleResendCode}
                  fullWidth
                  radius="xl"
                  size="md"
                >
                  Yeni Kod Gönder
                </Button>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
