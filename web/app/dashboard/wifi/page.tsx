'use client';

import React from 'react';
import { Container, Title, Paper, TextInput, PasswordInput, Button, Select, Stack, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

export default function WifiQRPage() {
    const form = useForm({
        initialValues: {
            ssid: '',
            password: '',
            encryption: 'WPA',
            hidden: false,
            label: '',
        },
        validate: {
            ssid: (value) => (value.length < 1 ? 'SSID gerekli' : null),
            password: (value) => (value.length < 8 ? 'Şifre en az 8 karakter olmalıdır' : null),
            label: (value) => (value.length < 1 ? 'QR kod ismi gerekli' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const response = await fetch('http://localhost:1234/api/qr/wifi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(values),
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
            console.error('QR kod oluşturma hatası:', error);
        }
    };

    return (
        <Container size="sm">
            <Title order={2} mb="xl">WiFi QR Kod Oluştur</Title>
            <Paper withBorder shadow="md" p={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="QR Kod İsmi"
                            placeholder="QR kodunuz için bir isim girin"
                            required
                            {...form.getInputProps('label')}
                        />
                        <TextInput
                            label="SSID (Ağ Adı)"
                            placeholder="WiFi ağınızın adını girin"
                            required
                            {...form.getInputProps('ssid')}
                        />
                        <PasswordInput
                            label="Şifre"
                            placeholder="WiFi şifrenizi girin"
                            required
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
                            {...form.getInputProps('encryption')}
                        />
                        <Checkbox
                            label="Gizli Ağ"
                            {...form.getInputProps('hidden', { type: 'checkbox' })}
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