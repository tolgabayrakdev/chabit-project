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
        <Container size={400} py={{ base: 'md', md: 'xl' }}>
            {/* Header */}
            <Paper 
                radius="lg" 
                p={{ base: 'xs', md: 'xs' }}
                mb={{ base: 'sm', md: 'md' }}
                style={{
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                }}
            >
                <Center>
                    <Text size="lg" fw={600} c="dark.8">{menu.name}</Text>
                </Center>
            </Paper>

            {/* PDF Viewer */}
            <Paper 
                withBorder 
                radius="md" 
                p={0}
                mb="xl"
                style={{
                    background: '#fff',
                    border: '1px solid #e9ecef'
                }}
            >
                <Box
                    style={{ 
                        width: '100%', 
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #e9ecef',
                        position: 'relative',
                        margin: '0 auto',
                        background: '#ffffff',
                        cursor: 'pointer'
                    }}
                    h={{ base: 'calc(100vh - 350px)', md: 'calc(100vh - 400px)' }}
                    mih={{ base: '200px', md: '250px' }}
                    mah={{ base: '500px', md: '600px' }}
                    onClick={() => window.open(menu.url, '_blank')}
                >
                    <iframe
                        src={`${menu.url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit&scrollbar=0&statusbar=0&messages=0&scrollbar=0&scrollbar=0&pagemode=none&viewrect=0,0,1000,800&bgcolor=ffffff&fgcolor=000000`}
                        width="100%"
                        height="100%"
                        style={{ 
                            border: 'none',
                            background: '#ffffff',
                            overflow: 'hidden',
                            pointerEvents: 'none'
                        }}
                        title={menu.name}
                        onLoad={() => {
                            setIframeLoading(false);
                        }}
                        scrolling="no"
                        frameBorder="0"
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
                </Box>
            </Paper>

            {/* PDF Actions */}
            <Paper 
                radius="lg" 
                p={{ base: 'xs', md: 'sm' }}
                mb={{ base: 'sm', md: 'md' }}
                style={{
                    background: 'transparent'
                }}
            >
                <Center>
                    <Group gap="md">
                        <Button
                            variant="light"
                            color="blue"
                            size="sm"
                            onClick={() => window.open(menu.url, '_blank')}
                            leftSection={<IconFileTypePdf size={16} />}
                        >
                            PDF'i Aç
                        </Button>
                        <Button
                            size="sm"
                            leftSection={<IconDownload size={16} />}
                            onClick={handleDownload}
                            color="#fab005"
                        >
                            PDF İndir
                        </Button>
                    </Group>
                </Center>
            </Paper>

            {/* Footer */}
            <Paper 
                withBorder 
                radius="md" 
                p={{ base: 'xs', md: 'xs' }}
                style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
                    border: '1px solid #e9ecef'
                }}
            >
                <Stack gap="xs" align="center">
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