'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu, Center, Loader } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconFileTypePng, IconFileTypeJpg, IconFileTypeSvg, IconLink, IconSettings, IconClock } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface QRCode {
    id: string;
    type: string;
    label: string | null;
    created_at: string;
    qr_code_image: string;
}


const getTypeLabel = (type: string) => {
    switch (type) {
        case 'wifi':
            return 'WiFi';
        case 'mail':
            return 'E-posta';
        case 'sms':
            return 'SMS';
        case 'vcard':
            return 'vCard';
        case 'url':
            return 'URL';
        default:
            return type;
    }
};

export default function DashboardPage() {
    const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [historyOpened, { open: openHistory, close: closeHistory }] = useDisclosure(false);

    useEffect(() => {
        const fetchQRCodes = async () => {
            try {
                const response = await fetch(`/api/qr`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setQRCodes(data);
                }
            } catch (error) {
                console.error('Error fetching QR codes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQRCodes();
    }, []);


    return (
        <Container size="lg">
            <Title order={2} mb="xl">Dashboard</Title>
            <Card withBorder p="xl" radius="lg" mb="xl" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(34, 139, 230, 0.08)', border: '1px solid #e3e8ee' }}>
                <Group justify="space-between" align="center" mb="xl">
                    <div>
                        <Title order={3} mb={4} style={{ fontWeight: 700, fontSize: 28 }}>İstatistikler</Title>
                        <Text c="dimmed" size="md" style={{ fontWeight: 500 }}>Hesabınıza ait özet bilgiler</Text>
                    </div>
                    <Button variant="light" color="blue" size="sm" onClick={openHistory}>Daha Fazla</Button>
                </Group>
                <Group gap="xl" mb="md" style={{ justifyContent: 'center' }}>
                    <Card withBorder radius="lg" p="lg" style={{ minWidth: 200, minHeight: 140, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(34, 139, 230, 0.06)' }}>
                        <IconQrcode size={36} color="#228be6" style={{ marginBottom: 8 }} />
                        <Text size="xs" c="dimmed" mb={4}>Toplam QR Kod</Text>
                        {loading ? (
                            <Center style={{ minHeight: 40 }}><Loader size="sm" /></Center>
                        ) : (
                            <Title order={2}>{qrCodes.length}</Title>
                        )}
                    </Card>
                    <Card withBorder radius="lg" p="lg" style={{ minWidth: 200, minHeight: 140, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(34, 139, 230, 0.06)' }}>
                        <IconClock size={36} color="#fd7e14" style={{ marginBottom: 8 }} />
                        <Text size="xs" c="dimmed" mb={4}>Son Oluşturulan QR</Text>
                        {loading ? (
                            <Center style={{ minHeight: 40 }}><Loader size="sm" /></Center>
                        ) : (
                            <Title order={2}>{qrCodes[0]?.label || 'Yok'}</Title>
                        )}
                    </Card>
                    <Card withBorder radius="lg" p="lg" style={{ minWidth: 200, minHeight: 140, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(34, 139, 230, 0.06)' }}>
                        <IconSettings size={36} color="#40c057" style={{ marginBottom: 8 }} />
                        <Text size="xs" c="dimmed" mb={4}>Aktif Özellikler</Text>
                        {loading ? (
                            <Center style={{ minHeight: 40 }}><Loader size="sm" /></Center>
                        ) : (
                            <Title order={2}>7</Title>
                        )}
                    </Card>
                </Group>
                <Group mt="md">
                    <Card withBorder radius="md" p="md" style={{ minWidth: 380, minHeight: 120, flex: 1, background: '#f1f3f5' }}>
                        <Text c="dimmed" size="sm" ta="center" mt={30}>
                            (Buraya yakında grafik ve gelişmiş istatistikler eklenecek)
                        </Text>
                    </Card>
                </Group>
            </Card>
            <Card withBorder p="xl" radius="md" mt="xl">
                <Title order={4} mb="md">Aktif Özellikler</Title>
                <Stack gap="sm">
                    <Group>
                        <Badge color="blue" leftSection={<IconQrcode size={16} />}>QR Kod Oluşturma</Badge>
                        <Badge color="cyan" leftSection={<IconLink size={16} />}>Link in Bio</Badge>
                        <Badge color="yellow" leftSection={<IconSettings size={16} />}>Menü Oluşturma</Badge>
                    </Group>
                    <Group>
                        <Badge color="green" leftSection={<IconWifi size={16} />}>WiFi QR Kod</Badge>
                        <Badge color="orange" leftSection={<IconMail size={16} />}>E-posta QR Kod</Badge>
                        <Badge color="red" leftSection={<IconMessage size={16} />}>SMS QR Kod</Badge>
                        <Badge color="grape" leftSection={<IconAddressBook size={16} />}>vCard QR Kod</Badge>
                        <Badge color="teal" leftSection={<IconLink size={16} />}>URL QR Kod</Badge>
                    </Group>
                </Stack>
            </Card>
            <Modal opened={historyOpened} onClose={closeHistory} title="QR Kod Geçmişi" size="lg" centered>
                {loading ? (
                    <Center style={{ minHeight: 120 }}><Loader size="md" /></Center>
                ) : qrCodes.length === 0 ? (
                    <Text c="dimmed">Henüz QR kodu oluşturulmamış.</Text>
                ) : (
                    <Stack>
                        {qrCodes.map(qr => (
                            <Group key={qr.id} align="center" gap={6} style={{ borderBottom: '1px solid #f3f4f6', padding: '2px 0' }}>
                                <Image src={qr.qr_code_image} alt={qr.label || qr.type} style={{ width: 180, height: 180 }} radius="xl" />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text fw={500} size="sm">{qr.label || 'Etiket Yok'}</Text>
                                    <Text size="xs" c="dimmed">{getTypeLabel(qr.type)} • {new Date(qr.created_at).toLocaleString('tr-TR')}</Text>
                                </div>
                            </Group>
                        ))}
                    </Stack>
                )}
            </Modal>
        </Container>
    );
}
