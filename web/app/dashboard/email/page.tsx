'use client';

import React, { useState } from 'react';
import { Container, Title, Paper, TextInput, Textarea, Button, Stack, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export default function EmailQRPage() {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            label: '',
            email: '',
            subject: '',
            body: '',
        },
        validate: {
            label: (value) => (value.length < 1 ? 'QR kod ismi gerekli' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
            subject: (value) => (value.length > 100 ? 'Konu 100 karakterden uzun olamaz' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:1234/api/qr/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    label: values.label,
                    email: values.email,
                    subject: values.subject,
                    body: values.body,
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
            <Title order={2} mb="xl">E-posta QR Kod Oluştur</Title>
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
                            label="E-posta Adresi"
                            placeholder="ornek@email.com"
                            required
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label="Konu"
                            placeholder="E-posta konusu"
                            maxLength={100}
                            description="Maksimum 100 karakter"
                            {...form.getInputProps('subject')}
                        />
                        <Textarea
                            label="Mesaj"
                            placeholder="E-posta içeriği"
                            minRows={4}
                            {...form.getInputProps('body')}
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