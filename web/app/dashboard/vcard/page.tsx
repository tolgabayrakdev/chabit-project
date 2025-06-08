'use client';

import React from 'react';
import { Container, Title, Paper, TextInput, Button, Stack, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function VCardQRPage() {
    const form = useForm({
        initialValues: {
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
            firstName: (value) => (value.length < 2 ? 'İsim en az 2 karakter olmalıdır' : null),
            lastName: (value) => (value.length < 2 ? 'Soyisim en az 2 karakter olmalıdır' : null),
            email: (value) => (value ? (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz') : null),
            phone: (value) => (value ? (value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null) : null),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        // Burada QR kod oluşturma işlemi yapılacak
    };

    return (
        <Container size="sm">
            <Title order={2} mb="xl">vCard QR Kod Oluştur</Title>
            <Paper withBorder shadow="md" p={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
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