'use client';

import React, { useState } from 'react';
import { TextInput, Textarea, Button, Stack, Group, ColorInput, Select } from '@mantine/core';
import { IconMail, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { QrFormLayout } from '@/components/QrFormLayout';

export default function EmailPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const router = useRouter();
    const [logo, setLogo] = useState<File | null>(null);
    const [designOptions, setDesignOptions] = useState({ style: 'dot', darkColor: '#fd7e14' });
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
            email: '',
            subject: '',
            body: '',
        },
        validate: {
            label: (value) => (value.length < 3 ? 'QR kod ismi en az 3 karakter olmalıdır' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
            subject: (value) => (value.length < 1 ? 'Konu gerekli' : null),
            body: (value) => (value.length < 1 ? 'Mesaj gerekli' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus('loading');
        try {
            const formData = new FormData();
            formData.append('label', values.label);
            formData.append('email', values.email);
            formData.append('subject', values.subject);
            formData.append('body', values.body);
            formData.append('designOptions', JSON.stringify(designOptions));
            if (logo) {
                formData.append('logo', logo);
            }

            const response = await fetch('/api/qr/mail', {
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

    const qrValue = `mailto:${form.values.email}?subject=${encodeURIComponent(form.values.subject)}&body=${encodeURIComponent(form.values.body)}`;

    return (
        <QrFormLayout
            title="E-posta QR Kod Oluştur"
            description="Oluşturduğunuz bu QR kodunu okutan kişi, otomatik olarak belirttiğiniz e-posta adresine, konu ve mesaj ile yeni bir e-posta göndermek üzere yönlendirilir. Hızlı iletişim ve kolay geri bildirim sağlar."
            icon={<IconMail size={24} />}
            themeColor="orange"
            gradientFrom="#fff3e6"
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
                        placeholder="Örn: İletişim E-postası"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('label')}
                    />
                    <TextInput
                        label="E-posta Adresi"
                        placeholder="ornek@email.com"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        label="Konu"
                        placeholder="E-posta konusu"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('subject')}
                    />
                    <Textarea
                        label="Mesaj"
                        placeholder="E-posta mesajı"
                        required
                        radius="sm"
                        size="sm"
                        minRows={3}
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '80px' }
                        }}
                        {...form.getInputProps('body')}
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
                            background: 'linear-gradient(45deg, #fd7e14 0%, #ffa94d 100%)',
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