'use client';

import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Stack, Group, ColorInput, Select, Checkbox } from '@mantine/core';
import { IconWifi, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { QrFormLayout } from '@/components/QrFormLayout';

export default function WifiPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const router = useRouter();
    const [logo, setLogo] = useState<File | null>(null);
    const [designOptions, setDesignOptions] = useState({ style: 'dot', darkColor: '#40c057' });
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
            ssid: '',
            password: '',
            encryption: 'WPA',
            hidden: false,
        },
        validate: {
            label: (value) => (value.length < 3 ? 'QR kod ismi en az 3 karakter olmalıdır' : null),
            ssid: (value) => (value.length < 1 ? 'SSID gerekli' : null),
            password: (value) => (value.length < 8 ? 'Şifre en az 8 karakter olmalıdır' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus('loading');
        try {
            const formData = new FormData();
            formData.append('label', values.label);
            formData.append('ssid', values.ssid);
            formData.append('password', values.password);
            formData.append('encryption', values.encryption);
            formData.append('hidden', values.hidden ? 'true' : 'false');
            formData.append('designOptions', JSON.stringify(designOptions));
            if (logo) {
                formData.append('logo', logo);
            }

            const response = await fetch('/api/qr/wifi', {
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

    const qrValue = `WIFI:T:${form.values.encryption};S:${form.values.ssid};P:${form.values.password};${form.values.hidden ? 'H:true;' : ''};`;

    return (
        <QrFormLayout
            title="WiFi QR Kod Oluştur"
            description="Oluşturduğunuz bu QR kodunu müşterileriniz veya misafirleriniz telefonlarının kamerasıyla okuttuğunda, WiFi ağına otomatik olarak bağlanabilirler. Şifre girmeye gerek kalmaz, hızlı ve güvenli bağlantı sağlar."
            icon={<IconWifi size={24} />}
            themeColor="green"
            gradientFrom="#e6fcf5"
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
                        placeholder="Örn: Ev WiFi"
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
                        label="SSID"
                        placeholder="WiFi ağ adı"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('ssid')}
                    />
                    <PasswordInput
                        label="Şifre"
                        placeholder="WiFi şifresi"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
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
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps('encryption')}
                    />
                    <Checkbox
                        label="Gizli Ağ"
                        styles={{
                            label: { fontSize: '13px' }
                        }}
                        {...form.getInputProps('hidden', { type: 'checkbox' })}
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
                            background: 'linear-gradient(45deg, #40c057 0%, #69db7c 100%)',
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