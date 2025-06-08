'use client';

import React from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconDownload, IconTrash } from '@tabler/icons-react';

// Örnek QR kod verileri (daha sonra veritabanından gelecek)
const sampleQRCodes = [
    {
        id: 1,
        type: 'wifi',
        title: 'Ev WiFi',
        data: { ssid: 'Ev_WiFi', encryption: 'WPA' },
        createdAt: '2024-03-20',
        qrCodeUrl: '/sample-qr.png', // Örnek QR kod görseli
    },
    {
        id: 2,
        type: 'email',
        title: 'İş E-postası',
        data: { email: 'is@email.com', subject: 'İş Görüşmesi' },
        createdAt: '2024-03-19',
        qrCodeUrl: '/sample-qr.png',
    },
    {
        id: 3,
        type: 'vcard',
        title: 'Kişisel Kartvizit',
        data: { name: 'Ahmet Yılmaz', company: 'ABC Ltd.' },
        createdAt: '2024-03-18',
        qrCodeUrl: '/sample-qr.png',
    },
];

const getTypeColor = (type: string) => {
    switch (type) {
        case 'wifi':
            return 'blue';
        case 'email':
            return 'green';
        case 'sms':
            return 'orange';
        case 'vcard':
            return 'violet';
        default:
            return 'gray';
    }
};

const getTypeLabel = (type: string) => {
    switch (type) {
        case 'wifi':
            return 'WiFi';
        case 'email':
            return 'E-posta';
        case 'sms':
            return 'SMS';
        case 'vcard':
            return 'vCard';
        default:
            return type;
    }
};

export default function DashboardPage() {
    const handleDownload = (qrCode: typeof sampleQRCodes[0]) => {
        // QR kodu indirme işlemi
        console.log('İndiriliyor:', qrCode.title);
    };

    const handleDelete = (qrCode: typeof sampleQRCodes[0]) => {
        // QR kodu silme işlemi
        console.log('Siliniyor:', qrCode.title);
    };

    return (
        <Container size="lg">
            <Title order={2} mb="xl">QR Kodlarım</Title>

            {sampleQRCodes.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
                    {sampleQRCodes.map((qr) => (
                        <Card key={qr.id} padding="lg" radius="md" withBorder>
                            <Card.Section p="md">
                                <Group justify="space-between">
                                    <Badge color={getTypeColor(qr.type)}>
                                        {getTypeLabel(qr.type)}
                                    </Badge>
                                    <Text size="sm" c="dimmed">
                                        {qr.createdAt}
                                    </Text>
                                </Group>
                            </Card.Section>

                            <Stack align="center" mt="md">
                                <Image
                                    src={qr.qrCodeUrl}
                                    alt={qr.title}
                                    width={200}
                                    height={200}
                                    fit="contain"
                                />
                                <Text fw={500} size="lg">
                                    {qr.title}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    {qr.type === 'wifi' && `SSID: ${qr.data.ssid}`}
                                    {qr.type === 'email' && `E-posta: ${qr.data.email}`}
                                    {qr.type === 'vcard' && `${qr.data.name} - ${qr.data.company}`}
                                </Text>
                                <Group mt="md" w="100%">
                                    <Button
                                        variant="light"
                                        leftSection={<IconDownload size={20} />}
                                        onClick={() => handleDownload(qr)}
                                        fullWidth
                                    >
                                        İndir
                                    </Button>
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
