'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu, Center, Loader, Divider } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconFileTypePng, IconFileTypeJpg, IconFileTypeSvg, IconLink, IconSettings, IconClock, IconFileTypePdf } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface QRCode {
    id: string;
    type: string;
    label: string | null;
    created_at: string;
    qr_code_image: string;
}

interface LinkInBioProfile {
    id: string;
    username: string;
    created_at: string;
}

interface Menu {
    id: string;
    name: string;
    created_at: string;
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
    const [linkInBioProfiles, setLinkInBioProfiles] = useState<LinkInBioProfile[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingLinkInBio, setLoadingLinkInBio] = useState(true);
    const [loadingMenus, setLoadingMenus] = useState(true);
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

        // Fetch Link in Bio profiles
        const fetchLinkInBioProfiles = async () => {
            try {
                const response = await fetch('/api/link-in-bio/all', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setLinkInBioProfiles(data);
                }
            } catch (error) {
                setLinkInBioProfiles([]);
            } finally {
                setLoadingLinkInBio(false);
            }
        };
        fetchLinkInBioProfiles();

        // Fetch Menus
        const fetchMenus = async () => {
            try {
                const response = await fetch('/api/menu', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setMenus(data);
                }
            } catch (error) {
                setMenus([]);
            } finally {
                setLoadingMenus(false);
            }
        };
        fetchMenus();
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
                            <Title order={2}>9</Title>
                        )}
                    </Card>
                </Group>
            </Card>
           
            <Card withBorder p="xl" radius="lg" mb="xl" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(34, 139, 230, 0.08)', border: '1px solid #e3e8ee' }}>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                    {/* Link in Bio Widget */}
                    <Card withBorder radius="lg" p="xl" style={{ minWidth: 0, background: '#fff', boxShadow: '0 4px 24px rgba(230, 73, 128, 0.08)', border: '1px solid #f3d9e3' }}>
                        <Group gap="sm" align="center" mb="md">
                            <IconLink size={32} color="#e64980" />
                            <Title order={4} style={{ color: '#e64980', fontWeight: 700 }}>Link in Bio</Title>
                        </Group>
                        {loadingLinkInBio ? (
                            <Center style={{ minHeight: 80 }}><Loader size="md" color="pink" /></Center>
                        ) : linkInBioProfiles.length > 0 ? (
                            (() => {
                                const latest = [...linkInBioProfiles].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                                return (
                                    <Stack gap="xs">
                                        <Group align="center" gap="xs">
                                            <Text size="sm" c="dimmed">Toplam:</Text>
                                            <Title order={3} c="#e64980">{linkInBioProfiles.length}</Title>
                                        </Group>
                                        <Divider my="xs" />
                                        <Text size="sm" c="dimmed">Son Oluşturulan:</Text>
                                        <Text size="lg" fw={600}>@{latest.username}</Text>
                                        <Text size="sm" c="dimmed">Oluşturulma: {new Date(latest.created_at).toLocaleString('tr-TR')}</Text>
                                        <Button component="a" href={`/u/${latest.username}`} target="_blank" color="pink" variant="light" size="sm" mt="xs">
                                            Profili Görüntüle
                                        </Button>
                                    </Stack>
                                );
                            })()
                        ) : (
                            <Text c="dimmed">Henüz Link in Bio oluşturulmamış.</Text>
                        )}
                    </Card>
                    {/* Menü Widget */}
                    <Card withBorder radius="lg" p="xl" style={{ minWidth: 0, background: '#fff', boxShadow: '0 4px 24px rgba(250, 176, 5, 0.08)', border: '1px solid #ffe066' }}>
                        <Group gap="sm" align="center" mb="md">
                            <IconFileTypePdf size={32} color="#fab005" />
                            <Title order={4} style={{ color: '#fab005', fontWeight: 700 }}>Menü</Title>
                        </Group>
                        {loadingMenus ? (
                            <Center style={{ minHeight: 80 }}><Loader size="md" color="yellow" /></Center>
                        ) : menus.length > 0 ? (
                            (() => {
                                const latest = [...menus].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                                return (
                                    <Stack gap="xs">
                                        <Group align="center" gap="xs">
                                            <Text size="sm" c="dimmed">Toplam:</Text>
                                            <Title order={3} c="#fab005">{menus.length}</Title>
                                        </Group>
                                        <Divider my="xs" />
                                        <Text size="sm" c="dimmed">Son Oluşturulan:</Text>
                                        <Text size="lg" fw={600}>{latest.name}</Text>
                                        <Text size="sm" c="dimmed">Oluşturulma: {new Date(latest.created_at).toLocaleString('tr-TR')}</Text>
                                        <Button component="a" href={`/menu/${latest.id}`} target="_blank" color="yellow" variant="light" size="sm" mt="xs">
                                            Menüyü Görüntüle
                                        </Button>
                                    </Stack>
                                );
                            })()
                        ) : (
                            <Text c="dimmed">Henüz menü oluşturulmamış.</Text>
                        )}
                    </Card>
                </SimpleGrid>
            </Card>
            <Card withBorder p="xl" radius="md" mt="xl">
                <Title order={4} mb="md">Aktif Özellikler</Title>
                <Stack gap="sm">
                    <Group>
                        <Badge color="blue" leftSection={<IconQrcode size={16} />}>QR Kod Oluşturma</Badge>
                        <Badge color="cyan" leftSection={<IconLink size={16} />}>Link in Bio</Badge>
                        <Badge color="yellow" leftSection={<IconSettings size={16} />}>Menü Oluşturma</Badge>
                        <Badge color="indigo" leftSection={<IconFileTypePdf size={16} />}>PDF Menü</Badge>
                    </Group>
                    <Group>
                        <Badge color="green" leftSection={<IconWifi size={16} />}>WiFi QR Kod</Badge>
                        <Badge color="orange" leftSection={<IconMail size={16} />}>E-posta QR Kod</Badge>
                        <Badge color="red" leftSection={<IconMessage size={16} />}>SMS QR Kod</Badge>
                        <Badge color="grape" leftSection={<IconAddressBook size={16} />}>vCard QR Kod</Badge>
                        <Badge color="teal" leftSection={<IconLink size={16} />}>URL QR Kod</Badge>
                        <Badge color="lime" leftSection={<IconFileTypePdf size={16} />}>Google Yorum QR Kod</Badge>
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
