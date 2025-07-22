'use client';
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem, useMantineTheme, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';
import { IconQrcode, IconCheck, IconBrandChrome, IconBrandOpera, IconShield } from '@tabler/icons-react';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

function CustomerCarousel() {
  const comments = [
    {
      name: 'Ayşe K.',
      comment: 'VunQR ile menümüzü dijitalleştirdik, müşterilerimiz çok memnun!',
      title: 'Restoran Sahibi',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      name: 'Mehmet D.',
      comment: 'QR kod ile wifi paylaşımı çok pratik, müşterilerimiz için harika bir deneyim.',
      title: 'Kafe İşletmecisi',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    {
      name: 'Elif S.',
      comment: 'Google yorum ile QR kodları birleştirdik, harika oldu!',
      title: 'Kafe Sahibi',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    {
      name: 'Burak T.',
      comment: 'Otelimizde QR ile oda servisi menüsüne geçtik, misafirlerimiz çok memnun.',
      title: 'Otel Müdürü',
      avatar: 'https://i.pravatar.cc/150?img=17',
    },
    {
      name: 'Zeynep Y.',
      comment: 'Kuaför salonumuzda kampanya QR kodları ile müşteri dönüşü arttı.',
      title: 'Kuaför Sahibi',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
  ];
  return (
    <Carousel
      slideSize="100%"
      height={180}
      slideGap="md"
      styles={{ indicator: { background: '#2563eb' } }}
      draggable
      controlSize={24}
      style={{ maxWidth: 380, margin: '0 auto' }}
    >
      {comments.map((item, idx) => (
        <Carousel.Slide key={idx}>
          <div style={{ textAlign: 'center', padding: 12, minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <img src={item.avatar} alt={item.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 12 }}>
              {[...Array(5)].map((_, i) => (
                <IconStarFilled key={i} size={18} color="#facc15" />
              ))}
            </div>
            <div style={{ fontStyle: 'italic', color: '#fff', fontSize: 16, marginTop: 8, marginBottom: 4, minHeight: 44, lineHeight: 1.3 }}>
              "{item.comment}"
            </div>
            <div style={{ marginTop: 4, fontWeight: 600, color: '#fff' }}>
              {item.name} <span style={{ color: '#cbd5e1', fontWeight: 400 }}>- {item.title}</span>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default function RegisterClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

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
        top: '15%',
        right: '15%',
        opacity: 0.1,
        transform: 'rotate(15deg)',
      }}>
        <IconQrcode size={70} color="white" />
      </Box>
      <Box style={{
        position: 'absolute',
        bottom: '10%',
        left: '15%',
        opacity: 0.1,
        transform: 'rotate(-15deg)',
      }}>
        <IconQrcode size={90} color="white" />
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
              {success ? (
                <Stack gap="lg" align="center">
                  <Box style={{
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #22c55e'
                  }}>
                    <IconCheck size={40} color="#16a34a" />
                  </Box>
                  <Stack gap="xs" align="center">
                    <Title order={3} c="green.7" fw={700}>
                      Kayıt Başarılı!
                    </Title>
                    <Text size="sm" ta="center" c="gray.7">
                      {registeredEmail} adresine doğrulama emaili gönderdik.
                    </Text>
                    <Text size="xs" ta="center" c="gray.6">
                      Lütfen emailinizi kontrol edin ve hesabınızı doğrulamak için linke tıklayın.
                    </Text>
                  </Stack>
                  <Button
                    onClick={() => router.push('/login')}
                    fullWidth
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
                    Giriş Sayfasına Dön
                  </Button>
                </Stack>
              ) : (
                <Stack gap="md">
                  <Text size="lg" fw={700} ta="center" c="dark.8">
                    Hesap Oluştur
                  </Text>

                  {form.errors.email && (
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
                      {form.errors.email}
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
                      <PasswordInput
                        label="Şifre Tekrar"
                        placeholder="Şifrenizi tekrar giriniz"
                        required
                        radius="md"
                        size="md"
                        styles={{
                          input: { border: '2px solid #e5e7eb' },
                          label: { fontWeight: 600, color: '#374151' }
                        }}
                        {...form.getInputProps('confirmPassword')}
                      />

                      <Checkbox
                        label={
                          <Text size="sm">
                            <Anchor component={Link} href="/terms" target="_blank" style={{ color: '#3b82f6', fontWeight: 600 }}>
                              Kullanım Şartları
                            </Anchor>
                            {' '}ve{' '}
                            <Anchor component={Link} href="/privacy" target="_blank" style={{ color: '#3b82f6', fontWeight: 600 }}>
                              Gizlilik Politikası
                            </Anchor>
                            'nı kabul ediyorum
                          </Text>
                        }
                        {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
                      />
                      {form.errors.acceptTerms && (
                        <Box
                          style={{
                            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                            color: '#dc2626',
                            borderRadius: 12,
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: 500,
                            border: '1px solid #fecaca'
                          }}
                        >
                          {form.errors.acceptTerms}
                        </Box>
                      )}

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
                        Kayıt Ol
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              )}
            </Paper>

            <Text
              size="sm"
              style={{
                color: 'white',
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              Zaten hesabınız var mı?{' '}
              <Anchor component={Link} href="/login" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
                Giriş Yap
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
                  <Text size="lg" style={{ opacity: 0.95, lineHeight: 1.6 }}>
                    • Dinamik QR kodlar oluşturun ve yönetin<br />
                    • Müşteri etkileşimini artırın<br />
                    • Detaylı analitikler ile performansınızı takip edin<br />
                    • Menü, WiFi, vCard ve daha fazlası
                  </Text>

                  <Box style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 12,
                    padding: 16,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Text size="sm" style={{ color: 'white', opacity: 0.9, fontWeight: 600, marginBottom: 8 }}>
                      Kullanıcı Yorumları
                    </Text>
                    <CustomerCarousel />
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {/* Right side - Register Form */}
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
              {success ? (
                <Stack gap="xl" align="center">
                  <Box style={{
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    borderRadius: '50%',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '4px solid #22c55e'
                  }}>
                    <IconCheck size={50} color="#16a34a" />
                  </Box>
                  <Stack gap="md" align="center">
                    <Title order={2} c="green.7" fw={700} ta="center">
                      Kayıt İşlemi Başarılı!
                    </Title>
                    <Text size="md" ta="center" c="gray.7">
                      {registeredEmail} adresine doğrulama emaili gönderdik.
                    </Text>
                    <Text size="sm" ta="center" c="gray.6">
                      Lütfen emailinizi kontrol edin ve hesabınızı doğrulamak için emaildeki linke tıklayın.
                    </Text>
                  </Stack>
                  <Button
                    onClick={() => router.push('/login')}
                    fullWidth
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
                    Giriş Sayfasına Dön
                  </Button>
                </Stack>
              ) : (
                <Stack gap="lg">
                  <Stack gap="xs">
                    <Title order={2} ta="center" c="dark.8" fw={700}>
                      Hesap Oluştur
                    </Title>
                    <Text size="sm" ta="center" c="gray.6">
                      Zaten hesabınız var mı?{' '}
                      <Anchor component={Link} href="/login" style={{ color: '#3b82f6', fontWeight: 600 }}>
                        Giriş Yap
                      </Anchor>
                    </Text>
                  </Stack>

                  {form.errors.email && (
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
                      {form.errors.email}
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
                      <PasswordInput
                        label="Şifre Tekrar"
                        placeholder="Şifrenizi tekrar giriniz"
                        required
                        radius="md"
                        size="md"
                        styles={{
                          input: { border: '2px solid #e5e7eb', fontSize: 16 },
                          label: { fontWeight: 600, color: '#374151', marginBottom: 8 }
                        }}
                        {...form.getInputProps('confirmPassword')}
                      />

                      <Checkbox
                        label={
                          <Text size="sm">
                            <Anchor component={Link} href="/terms" target="_blank" style={{ color: '#3b82f6', fontWeight: 600 }}>
                              Kullanım Şartları
                            </Anchor>
                            {' '}ve{' '}
                            <Anchor component={Link} href="/privacy" target="_blank" style={{ color: '#3b82f6', fontWeight: 600 }}>
                              Gizlilik Politikası
                            </Anchor>
                            'nı kabul ediyorum
                          </Text>
                        }
                        {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
                      />
                      {form.errors.acceptTerms && (
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
                          {form.errors.acceptTerms}
                        </Box>
                      )}

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
                        Kayıt Ol
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              )}
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
} 