'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Grid, Loader } from '@mantine/core';
import { IconAddressBook, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export default function VCardPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
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
        setShowAnimation(true);
        try {
            const response = await fetch(`${apiUrl}/api/qr/vcard`, {
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
                    router.push('/dashboard');
                }, 5000);
            } else {
                setShowAnimation(false);
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
            notifications.show({
                title: 'Hata',
                message: 'QR kod oluşturulurken bir hata oluştu',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="lg">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <div>
                    <Title order={2} mb="xl">vCard QR Kod Oluştur</Title>
                    <Paper
                        p="xl"
                        radius="lg"
                        withBorder
                        style={{
                            background: 'white',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            }
                        }}
                    >
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Stack gap="md">
                                <TextInput
                                    label="QR Kod İsmi"
                                    placeholder="QR kodunuz için bir isim girin"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('label')}
                                />
                                <Grid>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Ad"
                                            placeholder="Adınızı girin"
                                            required
                                            radius="md"
                                            size="md"
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
                                            {...form.getInputProps('lastName')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Grid>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Şirket"
                                            placeholder="Şirket adını girin"
                                            radius="md"
                                            size="md"
                                            {...form.getInputProps('company')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Ünvan"
                                            placeholder="Ünvanınızı girin"
                                            radius="md"
                                            size="md"
                                            {...form.getInputProps('title')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Grid>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="E-posta Adresi"
                                            placeholder="ornek@email.com"
                                            radius="md"
                                            size="md"
                                            {...form.getInputProps('email')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Telefon Numarası"
                                            placeholder="+90 5XX XXX XX XX"
                                            radius="md"
                                            size="md"
                                            {...form.getInputProps('phone')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <TextInput
                                    label="Website"
                                    placeholder="https://www.example.com"
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('website')}
                                />
                                <TextInput
                                    label="Adres"
                                    placeholder="Adresinizi girin"
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('address')}
                                />
                                <Button
                                    type="submit"
                                    loading={loading}
                                    radius="xl"
                                    size="md"
                                    leftSection={<IconQrcode size={20} />}
                                    style={{
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
                    </Paper>
                </div>

                <Paper
                    p="xl"
                    radius="lg"
                    withBorder
                    style={{
                        background: 'white',
                        minHeight: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem'
                    }}
                >
                    {showAnimation ? (
                        <Stack align="center" gap="xl">
                            <ThemeIcon
                                size={120}
                                radius="xl"
                                color="violet"
                                style={{
                                    animation: 'pulse 2s infinite',
                                }}
                            >
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Stack align="center" gap="xs">
                                <Title order={3} ta="center">QR Kodunuz Oluşturuluyor</Title>
                                <Text c="dimmed" ta="center" size="lg">
                                    vCard QR kodunuz hazırlanıyor...
                                </Text>
                            </Stack>
                            <Loader size="lg" color="violet" />
                        </Stack>
                    ) : (
                        <Stack align="center" gap="xl">
                            <ThemeIcon size={120} radius="xl" color="violet">
                                <IconAddressBook size={60} />
                            </ThemeIcon>
                            <Stack align="center" gap="xs">
                                <Title order={3} ta="center">vCard QR Kod Oluştur</Title>
                                <Text c="dimmed" ta="center" size="lg">
                                    Dijital kartvizitinizi QR kod ile paylaşmak için formu doldurun
                                </Text>
                            </Stack>
                        </Stack>
                    )}
                </Paper>
            </SimpleGrid>

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
            `}</style>
        </Container>
    );
} 