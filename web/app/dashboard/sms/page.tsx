'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, Textarea, Button, Paper, Stack, Group, rem, ThemeIcon, SimpleGrid, Loader, ColorInput, Select } from '@mantine/core';
import { IconMessage, IconQrcode } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
// @ts-expect-error qrcode modülü için types yok
import QRCodeLib from 'qrcode';

const QRCode = dynamic(() => import('react-qr-code').then(mod => mod.default), { ssr: false });

interface QrPreviewProps {
    value: string;
    size?: number;
    style?: string; // string olarak al
    darkColor?: string;
    lightColor?: string;
    logoUrl?: string | null;
}

function QrPreview({ value, size = 180, style = 'square', darkColor = '#000000', lightColor = '#ffffff', logoUrl }: QrPreviewProps) {
    const [modules, setModules] = React.useState<any>(null);
    React.useEffect(() => {
        let cancelled = false;
        async function generate() {
            try {
                const qr = await QRCodeLib.create(value, { errorCorrectionLevel: 'H' });
                if (!cancelled) setModules(qr.modules);
            } catch (err) {
                if (!cancelled) setModules(null);
            }
        }
        generate();
        return () => { cancelled = true; };
    }, [value]);
    if (!modules) return <div style={{ width: size, height: size, background: lightColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>;
    const moduleCount = modules.size;
    const moduleSize = size / moduleCount;
    // Marker alanı (köşe büyük kareler)
    const isInMarkerArea = (x: number, y: number) => {
        const inTopLeft = x < 7 && y < 7;
        const inTopRight = x >= moduleCount - 7 && y < 7;
        const inBottomLeft = x < 7 && y >= moduleCount - 7;
        return inTopLeft || inTopRight || inBottomLeft;
    };
    // Modül çizimi
    const drawModule = (x: number, y: number) => {
        const px = x * moduleSize;
        const py = y * moduleSize;
        switch (style) {
            case 'dot':
                return <circle key={x + '-' + y} cx={px + moduleSize / 2} cy={py + moduleSize / 2} r={moduleSize * 0.4} fill={darkColor} />;
            case 'diamond':
                return <polygon key={x + '-' + y} points={`
                    ${px + moduleSize / 2},${py}
                    ${px + moduleSize},${py + moduleSize / 2}
                    ${px + moduleSize / 2},${py + moduleSize}
                    ${px},${py + moduleSize / 2}
                `} fill={darkColor} />;
            case 'triangle':
                return <polygon key={x + '-' + y} points={`
                    ${px + moduleSize / 2},${py}
                    ${px + moduleSize},${py + moduleSize}
                    ${px},${py + moduleSize}
                `} fill={darkColor} />;
            case 'rounded':
                return <rect key={x + '-' + y} x={px} y={py} width={moduleSize} height={moduleSize} rx={moduleSize * 0.3} fill={darkColor} />;
            default:
                return <rect key={x + '-' + y} x={px} y={py} width={moduleSize} height={moduleSize} fill={darkColor} />;
        }
    };
    // SVG modülleri
    const modulesSvg = [];
    for (let y = 0; y < moduleCount; y++) {
        for (let x = 0; x < moduleCount; x++) {
            if (modules.get(x, y)) {
                if (isInMarkerArea(x, y)) {
                    // Markerlar her zaman kare
                    const px = x * moduleSize;
                    const py = y * moduleSize;
                    modulesSvg.push(<rect key={'m-' + x + '-' + y} x={px} y={py} width={moduleSize} height={moduleSize} fill={darkColor} />);
                } else {
                    modulesSvg.push(drawModule(x, y));
                }
            }
        }
    }
    // Logo
    let logoElem = null;
    if (logoUrl) {
        const logoSize = size * 0.2;
        logoElem = <image href={logoUrl} x={(size - logoSize) / 2} y={(size - logoSize) / 2} width={logoSize} height={logoSize} style={{ borderRadius: 12, background: '#fff' }} />;
    }
    return (
        <svg width={size} height={size} style={{ background: lightColor, borderRadius: 16, boxShadow: '0 2px 8px #0001' }}>
            {modulesSvg}
            {logoElem}
        </svg>
    );
}

export default function SMSPage() {
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const router = useRouter();
    const [logo, setLogo] = useState<File | null>(null);
    const [designOptions, setDesignOptions] = useState({ style: 'dot', darkColor: '#000000' });

    const form = useForm({
        initialValues: {
            label: '',
            phone: '',
            message: '',
        },
        validate: {
            label: (value) => (value.length < 3 ? 'QR kod ismi en az 3 karakter olmalıdır' : null),
            phone: (value) => (value.length < 10 ? 'Geçerli bir telefon numarası giriniz' : null),
            message: (value) => (value.length < 1 ? 'Mesaj gerekli' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus('loading');
        setShowAnimation(true);
        try {
            const formData = new FormData();
            formData.append('label', values.label);
            formData.append('number', values.phone);
            formData.append('sms', values.message);
            formData.append('designOptions', JSON.stringify(designOptions));
            if (logo) {
                formData.append('logo', logo);
            }
            const response = await fetch(`/api/qr/sms`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                setTimeout(() => {
                    setShowAnimation(false);
                    setStatus('success');
                    setLoading(false);
                    router.push('/dashboard');
                }, 5000);
            } else {
                setShowAnimation(false);
                setStatus('idle');
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'QR kod oluşturulurken bir hata oluştu',
                    color: 'red',
                });
            }
        } catch (error) {
            setShowAnimation(false);
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

    // Stil için border-radius belirle
    const getBorderRadius = () => {
        if (designOptions.style === 'dot') return '50%';
        if (designOptions.style === 'rounded') return '20%';
        return '0';
    };
    // QR value
    const qrValue = `sms:${form.values.phone}?body=${encodeURIComponent(form.values.message)}`;
    // Logo önizleme url
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

    return (
        <Container size="lg">
            <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                    background: 'linear-gradient(90deg, #fff0f0 0%, #f8f9fa 100%)',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    flexDirection: 'row',
                }}
                className="qr-info-paper"
            >
                <ThemeIcon color="red" size={40} radius="xl" variant="light">
                    <IconMessage size={24} />
                </ThemeIcon>
                <div>
                    <Text size="lg" fw={600} c="red.8">SMS QR kodu nedir?</Text>
                    <Text size="sm" c="red.8">
                        Oluşturduğunuz bu QR kodunu okutan kişinin telefonunda, belirttiğiniz numaraya ve mesajla yeni bir SMS gönderme ekranı açılır. Hızlıca SMS ile iletişim kurmak için idealdir.
                    </Text>
                </div>
            </Paper>
            <Container size="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Paper withBorder radius="lg" p={32} style={{ width: '100%', maxWidth: 800, marginTop: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Title order={2} mb="xl" ta="center">SMS QR Kod Oluştur</Title>
                    {status === 'idle' && (
                        <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }} encType="multipart/form-data">
                            <Stack gap="md" style={{ width: '100%' }}>
                                <TextInput
                                    label="QR Kod İsmi"
                                    placeholder="Örn: İletişim SMS"
                                    required
                                    radius="md"
                                    size="md"
                                    style={{ width: '100%' }}
                                    {...form.getInputProps('label')}
                                />
                                <TextInput
                                    label="Telefon Numarası"
                                    placeholder="5XX XXX XX XX"
                                    required
                                    radius="md"
                                    size="md"
                                    style={{ width: '100%' }}
                                    {...form.getInputProps('phone')}
                                />
                                <Textarea
                                    label="Mesaj"
                                    placeholder="SMS mesajı"
                                    required
                                    radius="md"
                                    size="md"
                                    minRows={4}
                                    style={{ width: '100%' }}
                                    {...form.getInputProps('message')}
                                />
                                <Group grow>
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
                                    />
                                    <ColorInput
                                        label="QR Renk"
                                        value={designOptions.darkColor}
                                        onChange={(color) => setDesignOptions((prev) => ({ ...prev, darkColor: color }))}
                                        required
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
                                />
                                <Button
                                    type="submit"
                                    loading={loading}
                                    radius="md"
                                    size="md"
                                    leftSection={<IconQrcode size={20} />}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(45deg, #fa5252 0%, #ff6b6b 100%)',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    QR Kod Oluştur
                                </Button>
                            </Stack>
                        </form>
                    )}
                    {/* QR Kod Önizleme */}
                    {status === 'idle' && (
                        <Stack align="center" mt="xl" gap={4}>
                            <Text fw={600} size="md">QR Kod Önizleme</Text>
                            <div style={{ position: 'relative', display: 'inline-block', background: '#fff', padding: 16, borderRadius: getBorderRadius(), boxShadow: '0 2px 8px #0001' }}>
                                <QrPreview
                                    value={qrValue}
                                    size={180}
                                    style={designOptions.style}
                                    darkColor={designOptions.darkColor}
                                    lightColor="#fff"
                                    logoUrl={logoUrl}
                                />
                            </div>
                        </Stack>
                    )}
                    {status === 'loading' && (
                        <Stack align="center" gap="xl" mt="xl">
                            <ThemeIcon size={120} radius="xl" color="red" style={{ animation: 'pulse 2s infinite' }}>
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Title order={3} ta="center">QR Kodunuz Oluşturuluyor</Title>
                            <Text c="dimmed" ta="center" size="lg">SMS QR kodunuz hazırlanıyor...</Text>
                            <Loader size="lg" color="red" />
                        </Stack>
                    )}
                    {status === 'success' && (
                        <Stack align="center" gap="xl" mt="xl">
                            <ThemeIcon size={120} radius="xl" color="red">
                                <IconQrcode size={60} />
                            </ThemeIcon>
                            <Title order={3} ta="center">QR Kodunuz Başarıyla Oluşturuldu!</Title>
                            <Button onClick={handleNewQr} radius="xl" size="md" variant="outline" color="red">
                                Yeni QR Kod Oluştur
                            </Button>
                        </Stack>
                    )}
                </Paper>
            </Container>
            <style jsx global>{`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @media (max-width: 600px) {
                  .qr-info-paper {
                    flex-direction: column !important;
                    gap: 8px !important;
                    text-align: center;
                    padding: 12px !important;
                  }
                  .qr-info-paper .mantine-ThemeIcon-root {
                    margin-bottom: 4px;
                  }
                  .qr-info-paper .mantine-Text-root {
                    font-size: 15px !important;
                  }
                  /* Mobil için form düzenlemeleri */
                  .mantine-Container-root {
                    padding: 0 8px !important;
                  }
                  .mantine-Paper-root {
                    padding: 16px !important;
                    margin: 8px 0 !important;
                  }
                  .mantine-TextInput-root,
                  .mantine-Textarea-root {
                    margin-bottom: 12px !important;
                  }
                  .mantine-TextInput-label,
                  .mantine-Textarea-label {
                    font-size: 14px !important;
                    margin-bottom: 4px !important;
                  }
                  .mantine-TextInput-input,
                  .mantine-Textarea-input {
                    font-size: 16px !important;
                    padding: 8px 12px !important;
                    min-height: 44px !important;
                  }
                  .mantine-Stack-root {
                    gap: 8px !important;
                  }
                  .mantine-Button-root {
                    min-height: 44px !important;
                    font-size: 16px !important;
                  }
                  .mantine-Title-root {
                    font-size: 20px !important;
                    margin-bottom: 16px !important;
                  }
                }
                @media (max-width: 480px) {
                  .mantine-Container-root {
                    padding: 0 4px !important;
                  }
                  .mantine-Paper-root {
                    padding: 12px !important;
                  }
                  .mantine-TextInput-input,
                  .mantine-Textarea-input {
                    font-size: 16px !important;
                    padding: 10px 12px !important;
                  }
                }
            `}</style>
        </Container>
    );
}