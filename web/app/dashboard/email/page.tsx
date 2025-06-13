'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Textarea, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Loader } from '@mantine/core';
import { IconMail, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export default function EmailPage() {
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            label: '',
            email: '',
            subject: '',
            body: '',
        },
        validate: {
            label: (value) => (value.length < 3 ? 'QR kod ismi en az 3 karakter olmalıdır' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
            subject: (value) => (value.length < 1 ? 'Konu gerekli' : null),
            body: (value) => (value.length < 1 ? 'Mesaj gerekli' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setShowAnimation(true);
        try {
            const response = await fetch('http://localhost:1234/api/qr/mail', {
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
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <div>
                    <Title order={2} mb="xl">E-posta QR Kod Oluştur</Title>
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
                                    placeholder="Örn: İletişim E-postası"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('label')}
                                />
                                <TextInput
                                    label="E-posta Adresi"
                                    placeholder="ornek@email.com"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('email')}
                                />
                                <TextInput
                                    label="Konu"
                                    placeholder="E-posta konusu"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('subject')}
                                />
                                <Textarea
                                    label="Mesaj"
                                    placeholder="E-posta mesajı"
                                    required
                                    radius="md"
                                    size="md"
                                    minRows={4}
                                    {...form.getInputProps('body')}
                                />
                                <Button 
                                    type="submit" 
                                    loading={loading}
                                    radius="xl"
                                    size="md"
                                    leftSection={<IconQrcode size={20} />}
                                    style={{
                                        background: 'linear-gradient(45deg, #fd7e14 0%, #ffa94d 100%)',
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
                                color="orange"
                                style={{
                                    animation: 'pulse 2s infinite',
                                }}
                            >
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Stack align="center" gap="xs">
                                <Title order={3} ta="center">QR Kodunuz Oluşturuluyor</Title>
                                <Text c="dimmed" ta="center" size="lg">
                                    E-posta QR kodunuz hazırlanıyor...
                                </Text>
                            </Stack>
                            <Loader size="lg" color="orange" />
                        </Stack>
                    ) : (
                        <Stack align="center" gap="xl">
                            <ThemeIcon size={120} radius="xl" color="orange">
                                <IconMail size={60} />
                            </ThemeIcon>
                            <Stack align="center" gap="xs">
                                <Title order={3} ta="center">E-posta QR Kod Oluştur</Title>
                                <Text c="dimmed" ta="center" size="lg">
                                    E-posta QR kodunuzu oluşturmak için formu doldurun
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