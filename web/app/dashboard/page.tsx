'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconDownload, IconTrash, IconFileTypePng, IconFileTypeJpg, IconFileTypeSvg } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface QRCode {
    id: string;
    type: string;
    label: string | null;
    created_at: string;
    qr_code_image: string;
}

const getTypeColor = (type: string) => {
    switch (type) {
        case 'wifi':
            return '#40c057'; // Yeşil
        case 'mail':
            return '#fd7e14'; // Turuncu
        case 'sms':
            return '#fa5252'; // Kırmızı
        case 'vcard':
            return '#7950f2'; // Mor
        case 'url':
            return '#228be6'; // Mavi
        default:
            return 'gray';
    }
};

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
    const [selectedQR, setSelectedQR] = useState<QRCode | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        const fetchQRCodes = async () => {
            try {
                const response = await fetch('http://localhost:1234/api/qr', {
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

    const handleDownload = async (qrCode: QRCode, format: 'png' | 'jpg' | 'svg') => {
        try {
            // QR kod görselini indir
            const response = await fetch(`http://localhost:1234${qrCode.qr_code_image}?format=${format}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': `image/${format}`,
                },
            });
            const blob = await response.blob();
            
            // İndirme bağlantısı oluştur
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Dosya adını oluştur
            const fileName = `${qrCode.label || qrCode.type}_${new Date().getTime()}.${format}`;
            link.download = fileName;
            
            // İndirmeyi başlat
            document.body.appendChild(link);
            link.click();
            
            // Temizlik
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('QR kod indirme hatası:', error);
        }
    };

    const handleDelete = async (qrCode: QRCode) => {
        setSelectedQR(qrCode);
        open();
    };

    const confirmDelete = async () => {
        if (!selectedQR) return;

        try {
            const response = await fetch(`http://localhost:1234/api/qr/${selectedQR.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setQRCodes(qrCodes.filter(qr => qr.id !== selectedQR.id));
                close();
            } else {
                console.error('QR kod silme hatası:', await response.text());
            }
        } catch (error) {
            console.error('QR kod silme hatası:', error);
        }
    };

    return (
        <Container size="lg">
            <Title order={2} mb="xl">QR Kodlarım</Title>

            <Modal opened={opened} onClose={close} title="QR Kodu Sil" centered>
                <Text>Bu QR kodu silmek istediğinizden emin misiniz?</Text>
                <Text size="sm" c="dimmed" mt="xs">
                    {selectedQR?.label || getTypeLabel(selectedQR?.type || '')}
                </Text>
                <Group justify="flex-end" mt="xl">
                    <Button variant="default" onClick={close}>İptal</Button>
                    <Button color="red" onClick={confirmDelete}>Sil</Button>
                </Group>
            </Modal>

            {loading ? (
                <Text>Yükleniyor...</Text>
            ) : qrCodes.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
                    {qrCodes.map((qr) => (
                        <Card key={qr.id} padding="lg" radius="md" withBorder>
                            <Card.Section p="md">
                                <Group justify="space-between">
                                    <Badge 
                                        color={getTypeColor(qr.type)}
                                        style={{ 
                                            backgroundColor: getTypeColor(qr.type),
                                            color: 'white'
                                        }}
                                    >
                                        {getTypeLabel(qr.type)}
                                    </Badge>
                                    <Text size="sm" c="dimmed">
                                        {new Date(qr.created_at).toLocaleDateString('tr-TR')}
                                    </Text>
                                </Group>
                            </Card.Section>

                            <Stack align="center" mt="md">
                                <Image
                                    src={`http://localhost:1234${qr.qr_code_image}`}
                                    alt={qr.label || qr.type}
                                    width={200}
                                    height={200}
                                    fit="contain"
                                />
                                <Text fw={500} size="lg">
                                    {qr.label || getTypeLabel(qr.type)}
                                </Text>
                                <Group mt="md" w="100%">
                                    <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                            <Button
                                                variant="light"
                                                leftSection={<IconDownload size={20} />}
                                                fullWidth
                                            >
                                                İndir
                                            </Button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                leftSection={<IconFileTypePng size={20} />}
                                                onClick={() => handleDownload(qr, 'png')}
                                            >
                                                PNG olarak indir
                                            </Menu.Item>
                                            <Menu.Item
                                                leftSection={<IconFileTypeJpg size={20} />}
                                                onClick={() => handleDownload(qr, 'jpg')}
                                            >
                                                JPG olarak indir
                                            </Menu.Item>
                                            <Menu.Item
                                                leftSection={<IconFileTypeSvg size={20} />}
                                                onClick={() => handleDownload(qr, 'svg')}
                                            >
                                                SVG olarak indir
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                    <Button
                                        variant="light"
                                        color="red"
                                        leftSection={<IconTrash size={20} />}
                                        onClick={() => handleDelete(qr)}
                                        fullWidth
                                    >
                                        Sil
                                    </Button>
                                </Group>
                            </Stack>
                        </Card>
                    ))}
                </SimpleGrid>
            ) : (
                <Card withBorder p="xl" radius="md">
                    <Stack align="center" py="xl">
                        <IconQrcode size={48} stroke={1.5} color="gray" />
                        <Text size="lg" fw={500}>
                            Henüz QR kodunuz yok
                        </Text>
                        <Text c="dimmed" ta="center">
                            Sol menüden yeni bir QR kod oluşturabilirsiniz
                        </Text>
                    </Stack>
                </Card>
            )}
        </Container>
    );
}
