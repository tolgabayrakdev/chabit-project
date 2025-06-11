'use client';

import React, { useState } from 'react';
import { Container, Title, Paper, TextInput, Textarea, Button, Stack, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export default function SMSQRPage() {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            label: '',
            number: '',
            sms: '',
        },
        validate: {
            label: (value) => (value.length < 1 ? 'QR kod ismi gerekli' : null),
            number: (value) => {
                // Remove any non-digit characters for validation
                const cleanNumber = value.replace(/\D/g, '');
                if (cleanNumber.length < 10) return 'Geçerli bir telefon numarası giriniz';
                if (cleanNumber.length > 15) return 'Telefon numarası çok uzun';
                return null;
            },
            sms: (value) => (value.length > 160 ? 'SMS mesajı 160 karakterden uzun olamaz' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            // Clean phone number before sending
            const cleanNumber = values.number.replace(/\D/g, '');
            
            const response = await fetch('http://localhost:1234/api/qr/sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    label: values.label,
                    number: cleanNumber,
                    sms: values.sms,
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
            <Title order={2} mb="xl">SMS QR Kod Oluştur</Title>
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
                        <TextInput
                            label="Telefon Numarası"
                            placeholder="+90 5XX XXX XX XX"
                            required
                            description="Uluslararası format ile giriniz (örn: +90)"
                            {...form.getInputProps('number')}
                        />
                        <Textarea
                            label="SMS Mesajı"
                            placeholder="Göndermek istediğiniz mesajı yazın"
                            description="Maksimum 160 karakter"
                            minRows={4}
                            maxLength={160}
                            {...form.getInputProps('sms')}
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