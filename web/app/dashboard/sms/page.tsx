'use client';

import React from 'react';
import { Container, Title, Paper, TextInput, Textarea, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function SMSQRPage() {
    const form = useForm({
        initialValues: {
            phoneNumber: '',
            message: '',
        },
        validate: {
            phoneNumber: (value) => (value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        // Burada QR kod oluşturma işlemi yapılacak
    };

    return (
        <Container size="sm">
            <Title order={2} mb="xl">SMS QR Kod Oluştur</Title>
            <Paper withBorder shadow="md" p={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="Telefon Numarası"
                            placeholder="+90 5XX XXX XX XX"
                            required
                            {...form.getInputProps('phoneNumber')}
                        />
                        <Textarea
                            label="SMS Mesajı"
                            placeholder="Göndermek istediğiniz mesajı yazın"
                            minRows={4}
                            {...form.getInputProps('message')}
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