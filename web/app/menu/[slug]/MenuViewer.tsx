'use client';

import React, { useEffect, useState } from 'react';
import { Container, Center, Loader, Text, Paper, Button, Stack, Group, ThemeIcon, Divider, Box } from '@mantine/core';
import { IconDownload, IconArrowLeft, IconFileTypePdf, IconQrcode, IconMenu2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Menu {
    id: string;
    name: string;
    url: string;
    created_at: string;
}

export default function MenuViewer({ params }: { params: Promise<{ slug: string }> }) {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState(true);
    const [iframeLoading, setIframeLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const awaitedParams = await params;
                const id = awaitedParams.slug; // URL'deki slug aslında ID
                
                const response = await fetch(`/api/menu/public/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMenu(data);
                } else if (response.status === 404) {
                    setError('Menü bulunamadı');
                } else {
                    setError('Menü yüklenirken bir hata oluştu');
                }
            } catch (error) {
                console.error('Error fetching menu:', error);
                setError('Menü yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [params]);

    const handleDownload = async () => {
        if (!menu) return;
        
        try {
            const response = await fetch(menu.url, {
                method: 'GET',
                mode: 'cors',
            });

            if (!response.ok) throw new Error('Dosya indirilemiyor');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${menu.name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Menu download error:', error);
        }
    };

    if (loading) {
        return (
            <Container size="lg" py="xl">
                <Center style={{ height: '50vh' }}>
                    <Stack align="center" gap="md">
                        <Loader size="lg" color="#fab005" />
                        <Text c="dimmed" size="lg">Menü Yükleniyor...</Text>
                    </Stack>
                </Center>
            </Container>
        );
    }

    if (error || !menu) {
        return (
            <Container size="lg" py="xl">
                <Center style={{ height: '50vh' }}>
                    <Stack align="center" gap="md">
                        <ThemeIcon size={64} radius="xl" color="red" variant="light">
                            <IconFileTypePdf size={32} />
                        </ThemeIcon>
                        <Text size="lg" c="red" fw={600}>{error || 'Menü bulunamadı'}</Text>
                        <Button 
                            variant="light" 
                            leftSection={<IconArrowLeft size={16} />}
                            onClick={() => router.back()}
                        >
                            Geri Dön
                        </Button>
                    </Stack>
                </Center>
            </Container>
        );
    }

    return (
        <Container size="lg" py="xl">
            {/* Header */}
            <Paper 
                radius="lg" 
                p="sm" 
                mb="xl"
                style={{
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                }}
            >
                <Stack gap="sm">
                    <Group justify="space-between" align="center">
                        <Group gap="sm" align="center">
                            <ThemeIcon size={28} radius="xl" color="#fab005" variant="light">
                                <IconMenu2 size={16} />
                            </ThemeIcon>
                            <Text size="lg" fw={600} c="dark.8">{menu.name}</Text>
                        </Group>
                        <Group gap="xs">
                            <Button
                                variant="light"
                                color="blue"
                                size="xs"
                                onClick={() => window.open(menu.url, '_blank')}
                                leftSection={<IconFileTypePdf size={12} />}
                            >
                                PDF'i Aç
                            </Button>
                            <Button
                                size="xs"
                                leftSection={<IconDownload size={12} />}
                                onClick={handleDownload}
                                color="#fab005"
                            >
                                PDF İndir
                            </Button>
                        </Group>
                    </Group>
                </Stack>
            </Paper>

            {/* PDF Viewer */}
            <Paper 
                withBorder 
                radius="lg" 
                p="md" 
                mb="xl"
                style={{
                    background: '#fff',
                    border: '1px solid #e9ecef'
                }}
            >
                <div style={{ 
                    width: '100%', 
                    height: '80vh', 
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #e9ecef',
                    position: 'relative',
                    background: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9fa 75%), linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}>
                    <iframe
                        src={menu.url}
                        width="100%"
                        height="100%"
                        style={{ 
                            border: 'none',
                            background: 'transparent'
                        }}
                        title={menu.name}
                        onLoad={() => {
                            setIframeLoading(false);
                        }}
                    />
                    {/* Loading overlay */}
                    {iframeLoading && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                            transition: 'opacity 0.3s ease'
                        }}>
                            <Stack align="center" gap="md">
                                <Loader size="lg" color="#fab005" />
                                <Text size="sm" c="dimmed">PDF Yükleniyor...</Text>
                            </Stack>
                        </div>
                    )}
                </div>
            </Paper>

            {/* Footer */}
            <Paper 
                withBorder 
                radius="lg" 
                p="sm"
                style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
                    border: '1px solid #e9ecef'
                }}
            >
                <Stack gap="xs" align="center">
                    <Divider w="100%" />
                    <Text size="sm" c="dimmed" ta="center">
                        Bu menü <Link href="https://vunqr.com" style={{ color: '#228be6', textDecoration: 'none', fontWeight: 600 }}>VunQR</Link> ile oluşturuldu
                    </Text>
                    <Text size="xs" c="dimmed" ta="center">
                        Dijital menü yönetimi için VunQR'ı kullanın
                    </Text>
                </Stack>
            </Paper>
        </Container>
    );
} 