'use client';
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Box, Stack, Anchor, rem, Checkbox, Grid, Card, Group, Badge } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconQrcode, IconUsers, IconChartLine, IconShield } from '@tabler/icons-react';

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

  const features = [
    {
      icon: <IconQrcode size={24} />,
      title: 'QR Kod Oluşturma',
      description: 'Saniyeler içinde özel QR kodlarınızı oluşturun'
    },
    {
      icon: <IconUsers size={24} />,
      title: 'Müşteri Etkileşimi',
      description: 'Müşterilerinizle daha etkili iletişim kurun'
    },
    {
      icon: <IconChartLine size={24} />,
      title: 'Detaylı Analitik',
      description: 'QR kod performansınızı takip edin'
    },
    {
      icon: <IconShield size={24} />,
      title: 'Güvenli Altyapı',
      description: 'Verileriniz güvenle korunur'
    }
  ];

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: rem(20)
      }}
    >
      <Container size="lg" style={{ width: '100%' }}>
        <Grid gutter="xl" align="center">
          {/* Sol Taraf - Bilgi ve Özellikler */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl" style={{ color: 'white' }}>
              <div>
                <Badge 
                  size="lg" 
                  variant="light" 
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    marginBottom: rem(16)
                  }}
                >
                  VunQR Platformu
                </Badge>
                <Title
                  order={1}
                  style={{
                    fontSize: rem(48),
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: rem(16)
                  }}
                >
                  Dijital Dönüşümün
                  <Text
                    component="span"
                    style={{
                      background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block'
                    }}
                  >
                    Anahtarı
                  </Text>
                </Title>
                <Text
                  size="lg"
                  style={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    marginBottom: rem(32)
                  }}
                >
                  QR kod teknolojisi ile işletmenizi dijitalleştirin. 
                  Müşterilerinizle etkileşiminizi artırın ve satışlarınızı yükseltin.
                </Text>
              </div>

              <Grid gutter="md">
                {features.map((feature, index) => (
                  <Grid.Col span={6} key={index}>
                    <Card
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: rem(16)
                      }}
                      padding="md"
                    >
                      <Group gap="sm">
                        <div style={{ color: '#ffd700' }}>
                          {feature.icon}
                        </div>
                        <div>
                          <Text size="sm" fw={600} style={{ marginBottom: 4 }}>
                            {feature.title}
                          </Text>
                          <Text size="xs" style={{ opacity: 0.8 }}>
                            {feature.description}
                          </Text>
                        </div>
                      </Group>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>

              <Box style={{ 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: rem(16), 
                padding: rem(24),
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <Text size="sm" style={{ opacity: 0.9, lineHeight: 1.6 }}>
                  <strong>VunQR</strong> ile restoran menülerinizi, işletme bilgilerinizi ve 
                  özel kampanyalarınızı tek bir QR kod ile paylaşın. 
                  Müşterileriniz anında erişim sağlasın!
                </Text>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Sağ Taraf - Kayıt Formu */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              withBorder
              shadow="xl"
              p={40}
              radius="xl"
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              <Stack gap="lg" align="center">
                <div style={{ textAlign: 'center' }}>
                  <Title
                    order={2}
                    style={{
                      fontSize: rem(32),
                      fontWeight: 800,
                      marginBottom: rem(8)
                    }}
                  >
                    Hesap Oluştur
                  </Title>
                  <Text
                    size="sm"
                    style={{
                      color: '#666',
                      marginBottom: rem(24)
                    }}
                  >
                    Zaten hesabınız var mı?{' '}
                    <Anchor component={Link} href="/login" style={{ color: '#667eea', fontWeight: 600 }}>
                      Giriş Yap
                    </Anchor>
                  </Text>
                </div>

                {success ? (
                  <Stack gap="lg" style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #52c41a, #73d13d)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      marginBottom: rem(16)
                    }}>
                      <Text size="xl" style={{ color: 'white', fontWeight: 900 }}>✓</Text>
                    </div>
                    <Text size="lg" fw={600} c="green">
                      Kayıt işlemi başarılı!
                    </Text>
                    <Text size="sm" style={{ color: '#666', lineHeight: 1.6 }}>
                      {registeredEmail} adresine bir doğrulama emaili gönderdik. 
                      Lütfen emailinizi kontrol edin ve hesabınızı doğrulamak için 
                      emaildeki linke tıklayın.
                    </Text>
                    <Button
                      onClick={() => router.push('/login')}
                      fullWidth
                      radius="xl"
                      size="lg"
                      style={{
                        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                        }
                      }}
                    >
                      Giriş Sayfasına Dön
                    </Button>
                  </Stack>
                ) : (
                  <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
                    <Stack gap="lg">
                      <TextInput
                        label="Email Adresi"
                        placeholder="ornek@email.com"
                        required
                        radius="lg"
                        size="lg"
                        styles={{
                          input: {
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            '&:focus': {
                              borderColor: '#667eea',
                              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                            }
                          }
                        }}
                        {...form.getInputProps('email')}
                      />
                      {form.errors.email && (
                        <div
                          style={{
                            background: 'rgba(255, 77, 77, 0.08)',
                            color: '#e03131',
                            borderRadius: 12,
                            padding: '12px 16px',
                            fontSize: 14,
                            fontWeight: 500,
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
                        radius="lg"
                        size="lg"
                        styles={{
                          input: {
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            '&:focus': {
                              borderColor: '#667eea',
                              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                            }
                          }
                        }}
                        {...form.getInputProps('password')}
                      />
                      <PasswordInput
                        label="Şifre Tekrar"
                        placeholder="Şifrenizi tekrar giriniz"
                        required
                        radius="lg"
                        size="lg"
                        styles={{
                          input: {
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            '&:focus': {
                              borderColor: '#667eea',
                              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                            }
                          }
                        }}
                        {...form.getInputProps('confirmPassword')}
                      />
                      <Checkbox
                        label={
                          <Text size="sm">
                            <Anchor component={Link} href="/terms" target="_blank" style={{ color: '#667eea', fontWeight: 600 }}>
                              Kullanım Şartları
                            </Anchor>
                            {' '}ve{' '}
                            <Anchor component={Link} href="/privacy" target="_blank" style={{ color: '#667eea', fontWeight: 600 }}>
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
                            borderRadius: 12,
                            padding: '12px 16px',
                            fontSize: 14,
                            fontWeight: 500,
                            border: '1px solid #ffe3e3'
                          }}
                        >
                          {form.errors.acceptTerms}
                        </div>
                      )}
                      <Button
                        loading={loading}
                        fullWidth
                        type="submit"
                        radius="xl"
                        size="lg"
                        style={{
                          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                          transition: 'all 0.3s ease',
                          height: rem(56),
                          fontSize: rem(16),
                          fontWeight: 600,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                          }
                        }}
                      >
                        {loading ? 'Kayıt Oluşturuluyor...' : 'Hesap Oluştur'}
                      </Button>
                    </Stack>
                  </form>
                )}
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
} 