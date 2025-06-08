'use client';

import React from 'react';
import { Container, Title, Paper, TextInput, Textarea, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function EmailQRPage() {
    const form = useForm({
        initialValues: {
            email: '',
            subject: '',
            body: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        // Burada QR kod oluşturma işlemi yapılacak
    };

    return (
        <Container size="sm">
            <Title order={2} mb="xl">E-posta QR Kod Oluştur</Title>
            <Paper withBorder shadow="md" p={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="E-posta Adresi"
                            placeholder="ornek@email.com"
                            required
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label="Konu"
                            placeholder="E-posta konusu"
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