'use client';

import React from 'react';
import { Container, Title, Paper, TextInput, PasswordInput, Button, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function WifiQRPage() {
    const form = useForm({
        initialValues: {
            ssid: '',
            password: '',
            encryption: 'WPA',
        },
        validate: {
            ssid: (value) => (value.length < 1 ? 'SSID gerekli' : null),
            password: (value) => (value.length < 8 ? 'Şifre en az 8 karakter olmalıdır' : null),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        // Burada QR kod oluşturma işlemi yapılacak
    };

    return (
        <Container size="sm">
            <Title order={2} mb="xl">WiFi QR Kod Oluştur</Title>
            <Paper withBorder shadow="md" p={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
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
                        <Button type="submit" fullWidth mt="xl">
                            QR Kod Oluştur
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
} 