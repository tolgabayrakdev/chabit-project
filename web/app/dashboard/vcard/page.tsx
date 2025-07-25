'use client';

import React, { useState } from 'react';
import { TextInput, Button, Stack, Group, ColorInput, Select, Grid } from '@mantine/core';
import { IconAddressBook, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { QrFormLayout } from '@/components/QrFormLayout';

export default function VCardPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const router = useRouter();
    const [logo, setLogo] = useState<File | null>(null);
    const [designOptions, setDesignOptions] = useState({ style: 'dot', darkColor: '#7950f2' });
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    React.useEffect(() => {
        if (logo) {
            const url = URL.createObjectURL(logo);
            setLogoUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setLogoUrl(null);
        }
    }, [logo]);

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
            email: (value) => (value && !/^\S+@\S+$/.test(value) ? 'Geçerli bir email adresi giriniz' : null),
            phone: (value) => (value && value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null),
            website: (value) => (value && !/^https?:\/\//.test(value) ? 'Geçerli bir website adresi giriniz' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus('loading');
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            formData.append('designOptions', JSON.stringify(designOptions));
            if (logo) {
                formData.append('logo', logo);
            }

            const response = await fetch('/api/qr/vcard', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                setTimeout(() => {
                    setStatus('success');
                    setLoading(false);
                    router.push('/dashboard/qr-codes');
                }, 5000);
            } else {
                setStatus('idle');
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'QR kod oluşturulurken bir hata oluştu',
                    color: 'red',
                });
            }
        } catch (error) {
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

    const qrValue = `BEGIN:VCARD\nVERSION:3.0\nN:${form.values.lastName};${form.values.firstName};;;\nFN:${form.values.firstName} ${form.values.lastName}\nORG:${form.values.company}\nTITLE:${form.values.title}\nEMAIL:${form.values.email}\nTEL:${form.values.phone}\nURL:${form.values.website}\nADR:${form.values.address}\nEND:VCARD`;

    return (
        <QrFormLayout
            title="vCard QR Kod Oluştur"
            description="Oluşturduğunuz bu QR kodunu okutan kişi, iletişim bilgilerinizi (isim, telefon, e-posta, adres vb.) tek tıkla rehberine kaydedebilir. Dijital kartvizit paylaşımı için en pratik yoldur."
            icon={<IconAddressBook size={24} />}
            themeColor="violet"
            gradientFrom="#f3f0ff"
            gradientTo="#f8f9fa"
            status={status}
            qrValue={qrValue}
            logoUrl={logoUrl}
            designOptions={designOptions}
            onNewQr={handleNewQr}
        >
            <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }} encType="multipart/form-data">
                <Stack gap="xs">
                    <TextInput
                        label="QR Kod İsmi"
                        placeholder="QR kodunuz için bir isim girin"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('label')}
                    />
                    <Grid gutter="xs">
                        <Grid.Col span={6}>
                            <TextInput
                                label="Ad"
                                placeholder="Adınızı girin"
                                required
                                radius="sm"
                                size="sm"
                                styles={{
                                    label: { fontSize: '13px', marginBottom: 4 },
                                    input: { minHeight: '34px', lineHeight: '34px' }
                                }}
                                {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Soyad"
                                placeholder="Soyadınızı girin"
                                required
                                radius="sm"
                                size="sm"
                                styles={{
                                    label: { fontSize: '13px', marginBottom: 4 },
                                    input: { minHeight: '34px', lineHeight: '34px' }
                                }}
                                {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter="xs">
                        <Grid.Col span={6}>
                            <TextInput
                                label="Şirket"
                                placeholder="Şirket adını girin"
                                radius="sm"
                                size="sm"
                                styles={{
                                    label: { fontSize: '13px', marginBottom: 4 },
                                    input: { minHeight: '34px', lineHeight: '34px' }
                                }}
                                {...form.getInputProps('company')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Ünvan"
                                placeholder="Ünvanınızı girin"
                                radius="sm"
                                size="sm"
                                styles={{
                                    label: { fontSize: '13px', marginBottom: 4 },
                                    input: { minHeight: '34px', lineHeight: '34px' }
                                }}
                                {...form.getInputProps('title')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter="xs">
                        <Grid.Col span={6}>
                            <TextInput
                                label="E-posta Adresi"
                                placeholder="ornek@email.com"
                                radius="sm"
                                size="sm"
                                styles={{
                                    label: { fontSize: '13px', marginBottom: 4 },
                                    input: { minHeight: '34px', lineHeight: '34px' }
                                }}
                                {...form.getInputProps('email')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Telefon Numarası"
                                placeholder="+90 5XX XXX XX XX"
                                radius="sm"
                                size="sm"
                                styles={{
                                    label: { fontSize: '13px', marginBottom: 4 },
                                    input: { minHeight: '34px', lineHeight: '34px' }
                                }}
                                {...form.getInputProps('phone')}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        label="Website"
                        placeholder="https://www.example.com"
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('website')}
                    />
                    <TextInput
                        label="Adres"
                        placeholder="Adresinizi girin"
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('address')}
                    />
                    <Group grow gap="xs">
                        <Select
                            label="QR Stil"
                            data={[
                                { value: 'dot', label: 'Nokta' },
                                { value: 'square', label: 'Kare' },
                                { value: 'rounded', label: 'Yuvarlak' },
                                { value: 'diamond', label: 'Elmas' },
                                { value: 'triangle', label: 'Üçgen' },
                            ]}
                            value={designOptions.style}
                            onChange={(value) => setDesignOptions((prev) => ({ ...prev, style: value || 'dot' }))}
                            required
                            size="sm"
                            radius="sm"
                            styles={{
                                label: { fontSize: '13px', marginBottom: 4 },
                                input: { minHeight: '34px', lineHeight: '34px' }
                            }}
                        />
                        <ColorInput
                            label="QR Renk"
                            value={designOptions.darkColor}
                            onChange={(color) => setDesignOptions((prev) => ({ ...prev, darkColor: color }))}
                            required
                            size="sm"
                            radius="sm"
                            styles={{
                                label: { fontSize: '13px', marginBottom: 4 },
                                input: { minHeight: '34px', lineHeight: '34px' }
                            }}
                        />
                    </Group>
                    <TextInput
                        label="Logo (PNG/JPG/SVG)"
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setLogo(e.target.files[0]);
                            } else {
                                setLogo(null);
                            }
                        }}
                        size="sm"
                        radius="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                    />
                    <Button
                        type="submit"
                        loading={loading}
                        radius="sm"
                        size="sm"
                        leftSection={<IconQrcode size={16} />}
                        mt={4}
                        style={{
                            background: 'linear-gradient(45deg, #7950f2 0%, #9775fa 100%)',
                            transition: 'transform 0.2s',
                            height: '34px',
                            '&:hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        QR Kod Oluştur
                    </Button>
                </Stack>
            </form>
        </QrFormLayout>
    );
} 