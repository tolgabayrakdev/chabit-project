'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Textarea, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Loader } from '@mantine/core';
import { IconMessage, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export default function SMSPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            label: '',
            phone: '',
            message: '',
        },
        validate: {
            label: (value) => (value.length < 3 ? 'QR kod ismi en az 3 karakter olmalıdır' : null),
            phone: (value) => (value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null),
            message: (value) => (value.length < 1 ? 'Mesaj gerekli' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setShowAnimation(true);
        try {
            const response = await fetch(`${apiUrl}/api/qr/sms`, {
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
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'QR kod oluşturulurken bir hata oluştu',
                    color: 'red',
                });
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
            <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                    background: 'linear-gradient(90deg, #fff0f0 0%, #f8f9fa 100%)',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                }}
            >
                <ThemeIcon color="red" size={40} radius="xl" variant="light">
                    <IconMessage size={24} />
                </ThemeIcon>
                <div>
                    <Text size="lg" fw={600} c="red.8">SMS QR kodu nedir?</Text>
                    <Text size="sm" c="red.8">
                        Oluşturduğunuz bu QR kodunu okutan kişinin telefonunda, belirttiğiniz numaraya ve mesajla yeni bir SMS gönderme ekranı açılır. Hızlıca SMS ile iletişim kurmak için idealdir.
                    </Text>
                </div>
            </Paper>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <div>
                    <Title order={2} mb="xl">SMS QR Kod Oluştur</Title>
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
                                    placeholder="Örn: İletişim SMS"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('label')}
                                />
                                <TextInput
                                    label="Telefon Numarası"
                                    placeholder="5XX XXX XX XX"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('phone')}
                                />
                                <Textarea
                                    label="Mesaj"
                                    placeholder="SMS mesajı"
                                    required
                                    radius="md"
                                    size="md"
                                    minRows={4}
                                    {...form.getInputProps('message')}
                                />
                                <Button
                                    type="submit"
                                    loading={loading}
                                    radius="xl"
                                    size="md"
                                    leftSection={<IconQrcode size={20} />}
                                    style={{
                                        background: 'linear-gradient(45deg, #fa5252 0%, #ff6b6b 100%)',
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
                        height: '100%',
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
                                color="red"
                                style={{
                                    animation: 'pulse 2s infinite',
                                }}
                            >
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Stack align="center" gap="xs">
                                <Title order={3} ta="center">QR Kodunuz Oluşturuluyor</Title>
                                <Text c="dimmed" ta="center" size="lg">
                                    SMS QR kodunuz hazırlanıyor...
                                </Text>
                            </Stack>
                            <Loader size="lg" color="red" />
                        </Stack>
                    ) : (
                        <Stack align="center" gap="xl">
                            <ThemeIcon size={120} radius="xl" color="red">
                                <IconMessage size={60} />
                            </ThemeIcon>
                            <Stack align="center" gap="xs">
                                <Title order={3} ta="center">SMS QR Kod Oluştur</Title>
                                <Text c="dimmed" ta="center" size="lg">
                                    SMS QR kodunuzu oluşturmak için formu doldurun
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