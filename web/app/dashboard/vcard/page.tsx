'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Grid } from '@mantine/core';
import { IconAddressBook, IconDownload, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export default function VCardPage() {
    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);

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
            company: (value) => (value.length < 1 ? 'Şirket adı gerekli' : null),
            title: (value) => (value.length < 1 ? 'Ünvan gerekli' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
            phone: (value) => (value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null),
            website: (value) => (value.length > 0 && !/^https?:\/\//.test(value) ? 'Geçerli bir website adresi giriniz' : null),
            address: (value) => (value.length < 1 ? 'Adres gerekli' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:1234/api/qr/vcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                setQrCode(data.qrCode);
                notifications.show({
                    title: 'Başarılı',
                    message: 'QR kodunuz başarıyla oluşturuldu',
                    color: 'green',
                });
                form.reset();
            } else {
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
            <Stack gap="xl">
                <div>
                    <Title order={2} mb="md">vCard QR Kod Oluştur</Title>
                    <Text c="dimmed">Dijital kartvizitinizi QR kod ile paylaşın.</Text>
                </div>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
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
                                            required
                                            radius="md"
                                            size="md"
                                            {...form.getInputProps('company')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Ünvan"
                                            placeholder="Ünvanınızı girin"
                                            required
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
                                            required
                                            radius="md"
                                            size="md"
                                            {...form.getInputProps('email')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="Telefon Numarası"
                                            placeholder="+90 5XX XXX XX XX"
                                            required
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
                                    required
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

                    <Paper 
                        p="xl" 
                        radius="lg" 
                        withBorder
                        style={{
                            background: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '300px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            }
                        }}
                    >
                        {qrCode ? (
                            <Stack align="center" gap="md">
                                <img src={qrCode} alt="vCard QR Code" style={{ maxWidth: '200px' }} />
                                <Button
                                    variant="light"
                                    color="violet"
                                    leftSection={<IconDownload size={20} />}
                                    radius="xl"
                                    size="md"
                                    style={{
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    İndir
                                </Button>
                            </Stack>
                        ) : (
                            <Stack align="center" gap="md">
                                <ThemeIcon size={80} radius="lg" color="violet" variant="light">
                                    <IconAddressBook style={{ width: rem(40), height: rem(40) }} stroke={1.5} />
                                </ThemeIcon>
                                <Text c="dimmed" ta="center">
                                    QR kod oluşturmak için formu doldurun
                                </Text>
                            </Stack>
                        )}
                    </Paper>
                </SimpleGrid>
            </Stack>
        </Container>
    );
} 