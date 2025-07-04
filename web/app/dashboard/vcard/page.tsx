'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Grid, Loader } from '@mantine/core';
import { IconAddressBook, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export default function VCardPage() {
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const router = useRouter();

    const form = useForm({
        initialValues: {
            label: '',
            firstName: '',
            lastName: '',
            company: '',
            title: '',
            email: '',
            phone: '',
            website: '',
            address: '',
        },
        validate: {
            label: (value) => (value.length < 1 ? 'QR kod ismi gerekli' : null),
            firstName: (value) => (value.length < 1 ? 'Ad gerekli' : null),
            lastName: (value) => (value.length < 1 ? 'Soyad gerekli' : null),
            email: (value) => (value && !/^\S+@\S+$/.test(value) ? 'Geçerli bir email adresi giriniz' : null),
            phone: (value) => (value && value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null),
            website: (value) => (value && !/^https?:\/\//.test(value) ? 'Geçerli bir website adresi giriniz' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus('loading');
        setShowAnimation(true);
        try {
            const response = await fetch(`/api/qr/vcard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(values),
            });

            if (response.ok) {
                setTimeout(() => {
                    setShowAnimation(false);
                    setStatus('success');
                    setLoading(false);
                    router.push('/dashboard');
                }, 5000);
            } else {
                setShowAnimation(false);
                setStatus('idle');
                const errorData = await response.json();
                if (response.status === 429) {
                    notifications.show({
                        title: 'Limit Aşıldı',
                        message: 'Free kullanıcılar günde en fazla 3 QR kodu oluşturabilir.',
                        color: 'yellow',
                    });
                } else {
                    notifications.show({
                        title: 'Hata',
                        message: errorData.message || 'QR kod oluşturulurken bir hata oluştu',
                        color: 'red',
                    });
                }
            }
        } catch (error) {
            setShowAnimation(false);
            setStatus('idle');
            notifications.show({
                title: 'Hata',
                message: 'QR kod oluşturulurken bir hata oluştu',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNewQr = () => {
        setStatus('idle');
        form.reset();
    };

    return (
        <Container size="lg">
            <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                    background: 'linear-gradient(90deg, #f3f0ff 0%, #f8f9fa 100%)',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    flexDirection: 'row',
                }}
                className="qr-info-paper"
            >
                <ThemeIcon color="violet" size={40} radius="xl" variant="light">
                    <IconAddressBook size={24} />
                </ThemeIcon>
                <div>
                    <Text size="lg" fw={600} c="violet.8">vCard QR kodu nedir?</Text>
                    <Text size="sm" c="violet.8">
                        Oluşturduğunuz bu QR kodunu okutan kişi, iletişim bilgilerinizi (isim, telefon, e-posta, adres vb.) tek tıkla rehberine kaydedebilir. Dijital kartvizit paylaşımı için en pratik yoldur.
                    </Text>
                </div>
            </Paper>
            <Container size="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Paper withBorder radius="lg" p={24} style={{ width: '100%', maxWidth: 800, marginTop: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Title order={2} mb="xl" ta="center">vCard QR Kod Oluştur</Title>
                    {status === 'idle' && (
                        <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
                            <Stack gap="sm" style={{ width: '100%' }}>
                                <TextInput
                                    label="QR Kod İsmi"
                                    placeholder="QR kodunuz için bir isim girin"
                                    required
                                    radius="md"
                                    size="md"
                                    style={{ width: '100%' }}
                                    {...form.getInputProps('label')}
                                />
                                <Grid gutter="sm">
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Ad"
                                            placeholder="Adınızı girin"
                                            required
                                            radius="md"
                                            size="md"
                                            style={{ width: '100%' }}
                                            {...form.getInputProps('firstName')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Soyad"
                                            placeholder="Soyadınızı girin"
                                            required
                                            radius="md"
                                            size="md"
                                            style={{ width: '100%' }}
                                            {...form.getInputProps('lastName')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Grid gutter="sm">
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Şirket"
                                            placeholder="Şirket adını girin"
                                            radius="md"
                                            size="md"
                                            style={{ width: '100%' }}
                                            {...form.getInputProps('company')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Ünvan"
                                            placeholder="Ünvanınızı girin"
                                            radius="md"
                                            size="md"
                                            style={{ width: '100%' }}
                                            {...form.getInputProps('title')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Grid gutter="sm">
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="E-posta Adresi"
                                            placeholder="ornek@email.com"
                                            radius="md"
                                            size="md"
                                            style={{ width: '100%' }}
                                            {...form.getInputProps('email')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Telefon Numarası"
                                            placeholder="+90 5XX XXX XX XX"
                                            radius="md"
                                            size="md"
                                            style={{ width: '100%' }}
                                            {...form.getInputProps('phone')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <TextInput
                                    label="Website"
                                    placeholder="https://www.example.com"
                                    radius="md"
                                    size="md"
                                    style={{ width: '100%' }}
                                    {...form.getInputProps('website')}
                                />
                                <TextInput
                                    label="Adres"
                                    placeholder="Adresinizi girin"
                                    radius="md"
                                    size="md"
                                    style={{ width: '100%' }}
                                    {...form.getInputProps('address')}
                                />
                                <Button
                                    type="submit"
                                    loading={loading}
                                    radius="md"
                                    size="md"
                                    leftSection={<IconQrcode size={20} />}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(45deg, #7950f2 0%, #9775fa 100%)',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    QR Kod Oluştur
                                </Button>
                            </Stack>
                        </form>
                    )}
                    {status === 'loading' && (
                        <Stack align="center" gap="xl" mt="xl">
                            <ThemeIcon size={120} radius="xl" color="violet" style={{ animation: 'pulse 2s infinite' }}>
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Title order={3} ta="center">QR Kodunuz Oluşturuluyor</Title>
                            <Text c="dimmed" ta="center" size="lg">vCard QR kodunuz hazırlanıyor...</Text>
                            <Loader size="lg" color="violet" />
                        </Stack>
                    )}
                    {status === 'success' && (
                        <Stack align="center" gap="xl" mt="xl">
                            <ThemeIcon size={120} radius="xl" color="violet">
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Title order={3} ta="center">QR Kodunuz Başarıyla Oluşturuldu!</Title>
                            <Button onClick={handleNewQr} radius="xl" size="md" variant="outline" color="violet">
                                Yeni QR Kod Oluştur
                            </Button>
                        </Stack>
                    )}
                </Paper>
            </Container>

            <style jsx global>{`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @media (max-width: 600px) {
                  .qr-info-paper {
                    flex-direction: column !important;
                    gap: 8px !important;
                    text-align: center;
                    padding: 12px !important;
                  }
                  .qr-info-paper .mantine-ThemeIcon-root {
                    margin-bottom: 4px;
                  }
                  .qr-info-paper .mantine-Text-root {
                    font-size: 15px !important;
                  }
                  
                  /* Mobil için form düzenlemeleri */
                  .mantine-Container-root {
                    padding: 0 8px !important;
                  }
                  
                  .mantine-Paper-root {
                    padding: 16px !important;
                    margin: 8px 0 !important;
                  }
                  
                  .mantine-TextInput-root {
                    margin-bottom: 12px !important;
                  }
                  
                  .mantine-TextInput-label {
                    font-size: 14px !important;
                    margin-bottom: 4px !important;
                  }
                  
                  .mantine-TextInput-input {
                    font-size: 16px !important;
                    padding: 8px 12px !important;
                    min-height: 44px !important;
                  }
                  
                  .mantine-Grid-root {
                    margin: 0 !important;
                  }
                  
                  .mantine-Grid-col {
                    padding: 0 4px !important;
                  }
                  
                  .mantine-Stack-root {
                    gap: 8px !important;
                  }
                  
                  .mantine-Button-root {
                    min-height: 44px !important;
                    font-size: 16px !important;
                  }
                  
                  .mantine-Title-root {
                    font-size: 20px !important;
                    margin-bottom: 16px !important;
                  }
                }
                
                @media (max-width: 480px) {
                  .mantine-Container-root {
                    padding: 0 4px !important;
                  }
                  
                  .mantine-Paper-root {
                    padding: 12px !important;
                  }
                  
                  .mantine-Grid-col {
                    padding: 0 2px !important;
                  }
                  
                  .mantine-TextInput-input {
                    font-size: 16px !important;
                    padding: 10px 12px !important;
                  }
                }
            `}</style>
        </Container>
    );
} 