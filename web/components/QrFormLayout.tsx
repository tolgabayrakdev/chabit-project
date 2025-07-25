import React, { useState } from 'react';
import { Container, Title, Text, Button, Paper, Stack, ThemeIcon, Loader, Group, Modal, Box, rem } from '@mantine/core';
import { IconQrcode, IconDeviceMobile, IconEye } from '@tabler/icons-react';
import { QrPreview } from './QrPreview';
import '../app/dashboard/styles/qr-form.css';
import { useMediaQuery } from '@mantine/hooks';

interface QrFormLayoutProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    themeColor: string;
    gradientFrom: string;
    gradientTo: string;
    children: React.ReactNode;
    status: 'idle' | 'loading' | 'success';
    qrValue: string;
    logoUrl: string | null;
    designOptions: {
        style: string;
        darkColor: string;
    };
    onNewQr: () => void;
}

export function QrFormLayout({
    title,
    description,
    icon,
    themeColor,
    gradientFrom,
    gradientTo,
    children,
    status,
    qrValue,
    logoUrl,
    designOptions,
    onNewQr
}: QrFormLayoutProps) {
    const [previewModalOpened, setPreviewModalOpened] = useState(false);
    const isMobile = useMediaQuery('(max-width: 48em)');

    return (
        <Container size="lg">
            <Paper
                p="sm"
                radius="md"
                withBorder
                className="qr-info-paper"
                style={{
                    background: `linear-gradient(90deg, ${gradientFrom} 0%, #f8f9fa 100%)`,
                    marginBottom: '1rem',
                }}
            >
                <ThemeIcon color={themeColor} size={32} radius="xl" variant="light">
                    {icon}
                </ThemeIcon>
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={600} c={`${themeColor}.8`}>{title}</Text>
                    <Text size="xs" c={`${themeColor}.8`} style={{ lineHeight: 1.4 }}>{description}</Text>
                </div>
            </Paper>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <Paper withBorder radius="md" p="md" className="qr-form-container">
                    <Title order={3} mb="md" ta="center" style={{ fontSize: '1.5rem' }}>{title}</Title>

                    {status === 'idle' && (
                        <Group align="flex-start" gap={60}>
                            <div style={{ flex: 1, maxWidth: '500px' }}>
                                <Stack gap="xs">
                                    {children}
                                    {isMobile && (
                                        <Button
                                            onClick={() => setPreviewModalOpened(true)}
                                            variant="default"
                                            color={themeColor}
                                            fullWidth
                                            leftSection={<IconEye size={16} />}
                                            style={{ height: '34px', marginTop: 4 }}
                                        >
                                            QR Kodu Önizle
                                        </Button>
                                    )}
                                </Stack>
                            </div>
                            {!isMobile && (
                                <div className="qr-preview-section">
                                    <Text fw={500} size="sm" mb="xs" ta="center">QR Kod Önizleme</Text>
                                    <div className="iphone-frame">
                                        <div className="iphone-notch"></div>
                                        <div className="iphone-screen">
                                            <div className="qr-preview-container">
                                                <QrPreview
                                                    value={qrValue}
                                                    size={140}
                                                    style={designOptions.style}
                                                    darkColor={designOptions.darkColor}
                                                    lightColor="#fff"
                                                    logoUrl={logoUrl}
                                                />
                                            </div>
                                            <Text size="xs" c="dimmed" mt="xs" ta="center">
                                                QR kodu telefonunuzla tarayın
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Group>
                    )}

                    {status === 'loading' && (
                        <Stack align="center" gap="md" my="md">
                            <ThemeIcon size={80} radius="xl" color={themeColor} style={{ animation: 'pulse 2s infinite' }}>
                                <IconQrcode size={40} />
                            </ThemeIcon>
                            <Title order={4} ta="center">QR Kodunuz Oluşturuluyor</Title>
                            <Text c="dimmed" ta="center" size="sm">{title} QR kodunuz hazırlanıyor...</Text>
                            <Loader size="md" color={themeColor} />
                        </Stack>
                    )}

                    {status === 'success' && (
                        <Stack align="center" gap="md" my="md">
                            <ThemeIcon size={80} radius="xl" color={themeColor}>
                                <IconQrcode size={40} />
                            </ThemeIcon>
                            <Title order={4} ta="center">QR Kodunuz Başarıyla Oluşturuldu!</Title>
                            <Button onClick={onNewQr} radius="xl" size="sm" variant="outline" color={themeColor}>
                                Yeni QR Kod Oluştur
                            </Button>
                        </Stack>
                    )}
                </Paper>
            </div>

            <Modal
                opened={previewModalOpened}
                onClose={() => setPreviewModalOpened(false)}
                title={
                    <Group gap="xs">
                        <IconDeviceMobile size={20} />
                        <Text fw={600}>QR Kod Önizleme</Text>
                    </Group>
                }
                centered
                size="sm"
                padding="xl"
                styles={{
                    title: {
                        fontSize: rem(16),
                    },
                    header: {
                        marginBottom: rem(8)
                    }
                }}
            >
                <Stack align="center">
                    <Box py="md">
                        <div className="iphone-frame" style={{ margin: '0 auto' }}>
                            <div className="iphone-notch"></div>
                            <div className="iphone-screen">
                                <div className="qr-preview-container">
                                    <QrPreview
                                        value={qrValue}
                                        size={140}
                                        style={designOptions.style}
                                        darkColor={designOptions.darkColor}
                                        lightColor="#fff"
                                        logoUrl={logoUrl}
                                    />
                                </div>
                                <Text size="xs" c="dimmed" mt="xs" ta="center">
                                    QR kodu telefonunuzla tarayın
                                </Text>
                            </div>
                        </div>
                    </Box>
                    <Button
                        onClick={() => setPreviewModalOpened(false)}
                        variant="light"
                        color={themeColor}
                        size="sm"
                        radius="md"
                        style={{ marginTop: rem(8) }}
                    >
                        Önizlemeyi Kapat
                    </Button>
                </Stack>
            </Modal>
        </Container>
    );
} 