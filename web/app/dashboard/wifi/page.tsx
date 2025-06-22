'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, PasswordInput, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Select, Checkbox, Loader } from '@mantine/core';
import { IconWifi, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export default function WifiPage() {
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const router = useRouter();

    const form = useForm({
        initialValues: {
            label: '',
            ssid: '',
            password: '',
            encryption: 'WPA',
            hidden: false,
        },
        validate: {
            label: (value) => (value.length < 3 ? 'QR kod ismi en az 3 karakter olmalıdır' : null),
            ssid: (value) => (value.length < 1 ? 'SSID gerekli' : null),
            password: (value) => (value.length < 8 ? 'Şifre en az 8 karakter olmalıdır' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus('loading');
        setShowAnimation(true);
        try {
            const response = await fetch(`/api/qr/wifi`, {
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
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'QR kod oluşturulurken bir hata oluştu',
                    color: 'red',
                });
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
                    background: 'linear-gradient(90deg, #e6fcf5 0%, #f8f9fa 100%)',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    flexDirection: 'row',
                }}
                className="qr-info-paper"
            >
                <ThemeIcon color="green" size={40} radius="xl" variant="light">
                    <IconWifi size={24} />
                </ThemeIcon>
                <div>
                    <Text size="lg" fw={600} c="green.8">WiFi QR kodu nedir?</Text>
                    <Text size="sm" c="green.8">
                        Oluşturduğunuz bu QR kodunu müşterileriniz veya misafirleriniz telefonlarının kamerasıyla okuttuğunda, WiFi ağına otomatik olarak bağlanabilirler. Şifre girmeye gerek kalmaz, hızlı ve güvenli bağlantı sağlar.
                    </Text>
                </div>
            </Paper>
            <Container size="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Paper withBorder radius="lg" p={32} style={{ width: '100%', maxWidth: 800, marginTop: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Title order={2} mb="xl" ta="center">WiFi QR Kod Oluştur</Title>
                    {status === 'idle' && (
                        <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
                            <Stack gap="md">
                                <TextInput
                                    label="QR Kod İsmi"
                                    placeholder="Örn: Ev WiFi"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('label')}
                                />
                                <TextInput
                                    label="SSID"
                                    placeholder="WiFi ağ adı"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('ssid')}
                                />
                                <PasswordInput
                                    label="Şifre"
                                    placeholder="WiFi şifresi"
                                    required
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('password')}
                                />
                                <Select
                                    label="Şifreleme Türü"
                                    placeholder="Şifreleme türünü seçin"
                                    data={[
                                        { value: 'WPA', label: 'WPA/WPA2' },
                                        { value: 'WEP', label: 'WEP' },
                                        { value: 'nopass', label: 'Şifresiz' },
                                    ]}
                                    radius="md"
                                    size="md"
                                    {...form.getInputProps('encryption')}
                                />
                                <Checkbox
                                    label="Gizli Ağ"
                                    {...form.getInputProps('hidden', { type: 'checkbox' })}
                                />
                                <Button
                                    type="submit"
                                    loading={loading}
                                    radius="xl"
                                    size="md"
                                    leftSection={<IconQrcode size={20} />}
                                    style={{
                                        background: 'linear-gradient(45deg, #40c057 0%, #69db7c 100%)',
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
                            <ThemeIcon size={120} radius="xl" color="green" style={{ animation: 'pulse 2s infinite' }}>
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Title order={3} ta="center">QR Kodunuz Oluşturuluyor</Title>
                            <Text c="dimmed" ta="center" size="lg">WiFi QR kodunuz hazırlanıyor...</Text>
                            <Loader size="lg" color="green" />
                        </Stack>
                    )}
                    {status === 'success' && (
                        <Stack align="center" gap="xl" mt="xl">
                            <ThemeIcon size={120} radius="xl" color="green">
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Title order={3} ta="center">QR Kodunuz Başarıyla Oluşturuldu!</Title>
                            <Button onClick={handleNewQr} radius="xl" size="md" variant="outline" color="green">
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
                }
            `}</style>
        </Container>
    );
} 