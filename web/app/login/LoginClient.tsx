'use client';
import React, { useState, useEffect } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconQrcode, IconShield, IconBrandChrome, IconBrandOpera } from '@tabler/icons-react';

export default function LoginClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [captchaNumbers, setCaptchaNumbers] = useState({ num1: 0, num2: 0 });
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      captchaAnswer: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
    },
  });

  // Captcha sayılarını oluştur
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaNumbers({ num1, num2 });
    form.setFieldValue('captchaAnswer', '');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          captchaAnswer: parseInt(values.captchaAnswer),
          captchaSum: captchaNumbers.num1 + captchaNumbers.num2
        }),
      })

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Giriş yapılamadı');
        setLoading(false);
        // Hata durumunda yeni captcha oluştur
        generateCaptcha();
      }
    } catch (error) {
      setError('Bir hata oluştu');
      setLoading(false);
      generateCaptcha();
    }
  };

  if (checkingAuth) {
    return (
      <Box style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
        }} />
        <Stack align="center" gap="md">
          <IconQrcode size={48} color="white" />
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>VunQR Yükleniyor...</Text>
        </Stack>
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
        padding: rem(20),
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <Box style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
      }} />

      {/* Floating QR code icons */}
      <Box style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        opacity: 0.1,
        transform: 'rotate(-15deg)',
      }}>
        <IconQrcode size={60} color="white" />
      </Box>
      <Box style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        opacity: 0.1,
        transform: 'rotate(15deg)',
      }}>
        <IconQrcode size={80} color="white" />
      </Box>

      <Container size={isMobile ? "xs" : "md"} style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        {isMobile ? (
          // Mobile Layout
          <Stack align="center" gap="lg">
            <Stack align="center" gap="xs">
              <IconQrcode size={48} color="white" />
              <Title
                order={1}
                style={{
                  color: 'white',
                  fontSize: rem(32),
                  fontWeight: 900,
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                VunQR
              </Title>
              <Text
                size="sm"
                style={{
                  color: 'white',
                  textAlign: 'center',
                  opacity: 0.9,
                  maxWidth: 280
                }}
              >
                QR kod çözümleri ile işinizi büyütün
              </Text>
            </Stack>

            <Paper
              withBorder
              shadow="lg"
              p={24}
              radius="lg"
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Stack gap="md">
                <Text size="lg" fw={700} ta="center" c="dark.8">
                  Hoş Geldiniz!
                </Text>

                {error && (
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                      color: '#dc2626',
                      borderRadius: 10,
                      padding: '12px 16px',
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: 500,
                      border: '1px solid #fecaca'
                    }}
                  >
                    {error}
                  </Box>
                )}

                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Stack gap="md">
                    <TextInput
                      label="Email"
                      placeholder="ornek@email.com"
                      required
                      radius="md"
                      size="md"
                      styles={{
                        input: { border: '2px solid #e5e7eb' },
                        label: { fontWeight: 600, color: '#374151' }
                      }}
                      {...form.getInputProps('email')}
                    />
                    <PasswordInput
                      label="Şifre"
                      placeholder="Şifrenizi giriniz"
                      required
                      radius="md"
                      size="md"
                      styles={{
                        input: { border: '2px solid #e5e7eb' },
                        label: { fontWeight: 600, color: '#374151' }
                      }}
                      {...form.getInputProps('password')}
                    />

                    {/* Mobile Captcha */}
                    <Box style={{
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      borderRadius: 10,
                      padding: 16,
                      border: '2px solid #bfdbfe'
                    }}>
                      <Stack gap="xs">
                        <Text size="sm" fw={600} c="blue.7">
                          <IconShield size={16} style={{ marginRight: 8 }} />
                          Güvenlik Doğrulaması
                        </Text>
                        <Text size="sm" c="gray.7" ta="center">
                          {captchaNumbers.num1} + {captchaNumbers.num2} = ?
                        </Text>
                        <TextInput
                          placeholder="Sonucu giriniz"
                          required
                          radius="md"
                          size="md"
                          type="number"
                          styles={{
                            input: { border: '2px solid #bfdbfe', textAlign: 'center' }
                          }}
                          {...form.getInputProps('captchaAnswer')}
                        />
                        <Button
                          type="button"
                          variant="subtle"
                          size="xs"
                          c="blue.7"
                          onClick={generateCaptcha}
                        >
                          Yeni Soru
                        </Button>
                      </Stack>
                    </Box>

                    <Anchor
                      component={Link}
                      href="/forgot-password"
                      style={{
                        color: '#3b82f6',
                        textAlign: 'center',
                        fontSize: 14,
                        textDecoration: 'underline',
                        fontWeight: 500
                      }}
                    >
                      Şifremi Unuttum?
                    </Anchor>

                    <Button
                      loading={loading}
                      fullWidth
                      type="submit"
                      radius="md"
                      size="lg"
                      fw={600}
                      style={{
                        background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)'
                        }
                      }}
                    >
                      Giriş Yap
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Paper>

            <Text
              size="sm"
              style={{
                color: 'white',
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              Hesabınız yok mu?{' '}
              <Anchor component={Link} href="/register" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
                Kayıt Ol
              </Anchor>
            </Text>
          </Stack>
        ) : (
          // Desktop Layout
          <Box style={{ display: 'flex', gap: rem(60), alignItems: 'center', maxWidth: 1000 }}>
            {/* Left side - Branding */}
            <Box style={{ flex: 1, color: 'white' }}>
              <Stack gap="xl">
                <Stack gap="md">
                  <Box style={{ display: 'flex', alignItems: 'center', gap: rem(16) }}>
                    <IconQrcode size={64} color="white" />
                    <Title
                      order={1}
                      style={{
                        color: 'white',
                        fontSize: rem(48),
                        fontWeight: 900,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      VunQR
                    </Title>
                  </Box>
                  <Title
                    order={2}
                    style={{
                      color: 'white',
                      fontSize: rem(32),
                      fontWeight: 700,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    QR Kod Çözümleri ile<br />
                    İşinizi Büyütün
                  </Title>
                </Stack>

                <Stack gap="md">
                  <Text size="lg" style={{ opacity: 0.98, lineHeight: 1.5, fontWeight: 600, fontSize: 22 }}>
                    Tekrar hoş geldin! <span role="img" aria-label="smile">😊</span> Senin için her zaman buradayız.
                  </Text>

                  <Box style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 12,
                    padding: 16,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Text size="sm" style={{ color: 'white', opacity: 0.9 }}>
                      En iyi deneyim için Chrome ve Opera gibi modern tarayıcıları kullanmanızı öneririz.
                    </Text>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {/* Right side - Login Form */}
            <Paper
              withBorder
              shadow="lg"
              p={40}
              radius="lg"
              style={{
                width: 420,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Stack gap="lg">
                <Stack gap="xs">
                  <Title order={2} ta="center" c="dark.8" fw={700}>
                    Hoş Geldiniz!
                  </Title>
                  <Text size="sm" ta="center" c="gray.6">
                    Hesabınız yok mu?{' '}
                    <Anchor component={Link} href="/register" style={{ color: '#3b82f6', fontWeight: 600 }}>
                      Kayıt Ol
                    </Anchor>
                  </Text>
                </Stack>

                {error && (
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                      color: '#dc2626',
                      borderRadius: 12,
                      padding: '16px 20px',
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: 500,
                      border: '1px solid #fecaca'
                    }}
                  >
                    {error}
                  </Box>
                )}

                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Stack gap="lg">
                    <TextInput
                      label="Email"
                      placeholder="ornek@email.com"
                      required
                      radius="md"
                      size="md"
                      styles={{
                        input: { border: '2px solid #e5e7eb', fontSize: 16 },
                        label: { fontWeight: 600, color: '#374151', marginBottom: 8 }
                      }}
                      {...form.getInputProps('email')}
                    />
                    <PasswordInput
                      label="Şifre"
                      placeholder="Şifrenizi giriniz"
                      required
                      radius="md"
                      size="md"
                      styles={{
                        input: { border: '2px solid #e5e7eb', fontSize: 16 },
                        label: { fontWeight: 600, color: '#374151', marginBottom: 8 }
                      }}
                      {...form.getInputProps('password')}
                    />

                    {/* Desktop Captcha */}
                    <Box style={{
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      borderRadius: 10,
                      padding: 20,
                      border: '2px solid #bfdbfe'
                    }}>
                      <Stack gap="md">
                        <Text size="sm" fw={600} c="blue.7" style={{ display: 'flex', alignItems: 'center' }}>
                          <IconShield size={18} style={{ marginRight: 8 }} />
                          Güvenlik Doğrulaması
                        </Text>
                        <Text size="md" c="gray.7" ta="center" fw={500}>
                          {captchaNumbers.num1} + {captchaNumbers.num2} = ?
                        </Text>
                        <TextInput
                          placeholder="Toplamı giriniz"
                          required
                          radius="md"
                          size="md"
                          type="number"
                          styles={{
                            input: { border: '2px solid #bfdbfe', textAlign: 'center', fontSize: 16 }
                          }}
                          {...form.getInputProps('captchaAnswer')}
                        />
                        <Button
                          type="button"
                          variant="subtle"
                          size="sm"
                          c="blue.7"
                          onClick={generateCaptcha}
                        >
                          Yeni Soru
                        </Button>
                      </Stack>
                    </Box>

                    <Anchor
                      component={Link}
                      href="/forgot-password"
                      style={{
                        color: '#3b82f6',
                        textAlign: 'right',
                        fontSize: 14,
                        textDecoration: 'underline',
                        fontWeight: 500
                      }}
                    >
                      Şifremi Unuttum?
                    </Anchor>

                    <Button
                      loading={loading}
                      fullWidth
                      type="submit"
                      radius="md"
                      size="lg"
                      fw={600}
                      style={{
                        background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)'
                        }
                      }}
                    >
                      Giriş Yap
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
} 