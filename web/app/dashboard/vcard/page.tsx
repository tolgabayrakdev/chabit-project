'use client';

import React, { useState } from 'react';
import { Container, Title, Paper, TextInput, Button, Stack, Grid, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export default function VCardQRPage() {
    const [loading, setLoading] = useState(false);
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
            firstName: (value) => (value.length < 2 ? 'İsim en az 2 karakter olmalıdır' : null),
            lastName: (value) => (value.length < 2 ? 'Soyisim en az 2 karakter olmalıdır' : null),
            email: (value) => (value ? (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz') : null),
            phone: (value) => (value ? (value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null) : null),
            website: (value) => {
                if (!value) return null;
                try {
                    new URL(value);
                    return null;
                } catch {
                    return 'Geçerli bir website adresi giriniz';
                }
            },
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            // Clean phone number before sending
            const cleanPhone = values.phone ? values.phone.replace(/\D/g, '') : '';

            const response = await fetch('http://localhost:1234/api/qr/vcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    label: values.label,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: cleanPhone,
                    email: values.email,
                    company: values.company,
                    title: values.title,
                    website: values.website,
                    address: values.address,
                }),
            });

            if (response.ok) {
                await response.json();
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
        <Container size="sm">
            <Title order={2} mb="xl">vCard QR Kod Oluştur</Title>
            <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                    loaderProps={{ type: 'dots' }}
                />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="QR Kod İsmi"
                            placeholder="QR kodunuz için bir isim girin"
                            required
                            {...form.getInputProps('label')}
                        />
                        <Grid>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="İsim"
                                    placeholder="İsminiz"
                                    required
                                    {...form.getInputProps('firstName')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Soyisim"
                                    placeholder="Soyisminiz"
                                    required
                                    {...form.getInputProps('lastName')}
                                />
                            </Grid.Col>
                        </Grid>
                        <TextInput
                            label="Şirket"
                            placeholder="Şirket adı"
                            {...form.getInputProps('company')}
                        />
                        <TextInput
                            label="Ünvan"
                            placeholder="İş ünvanınız"
                            {...form.getInputProps('title')}
                        />
                        <TextInput
                            label="E-posta"
                            placeholder="ornek@email.com"
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label="Telefon"
                            placeholder="+90 5XX XXX XX XX"
                            description="Uluslararası format ile giriniz (örn: +90)"
                            {...form.getInputProps('phone')}
                        />
                        <TextInput
                            label="Website"
                            placeholder="https://www.example.com"
                            {...form.getInputProps('website')}
                        />
                        <TextInput
                            label="Adres"
                            placeholder="Adresiniz"
                            {...form.getInputProps('address')}
                        />
                        <Button type="submit" fullWidth mt="xl">
                            QR Kod Oluştur
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
} 