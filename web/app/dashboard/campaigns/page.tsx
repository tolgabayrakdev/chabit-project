'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu, Center, Loader, TextInput, Paper, Divider, ActionIcon, Tooltip, ThemeIcon, Textarea, NumberInput, Table, Popover } from '@mantine/core';

import { IconGift, IconUpload, IconTrash, IconEye, IconDownload, IconPlus, IconFile, IconEdit, IconExternalLink, IconQrcode, IconCopy, IconCheck, IconUsers, IconTrophy, IconCalendar, IconInfoCircle, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

interface Campaign {
    id: string;
    title: string;
    description: string;
    slug: string;
    start_date: string;
    end_date: string;
    thank_you_message: string;
    contact_email?: string;
    is_active?: boolean;
    created_at: string;
    entries_count?: number;
    winners?: Array<{
        id: string;
        name: string;
        email: string;
        phone?: string;
        rank: number;
    }>;
}

interface CampaignEntry {
    id: string;
    campaign_id: string;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
    is_winner?: boolean;
    winner?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
}

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
    const [successOpened, { open: openSuccess, close: closeSuccess }] = useDisclosure(false);
    const [entriesOpened, { open: openEntries, close: closeEntries }] = useDisclosure(false);
    const [winnerOpened, { open: openWinner, close: closeWinner }] = useDisclosure(false);
    const [newlyCreatedCampaign, setNewlyCreatedCampaign] = useState<Campaign | null>(null);
    const [copied, setCopied] = useState(false);
    const [copiedCampaignId, setCopiedCampaignId] = useState<string | null>(null);
    const [entries, setEntries] = useState<CampaignEntry[]>([]);
    const [entriesLoading, setEntriesLoading] = useState(false);
    const [winnerLoading, setWinnerLoading] = useState(false);
    const [userPlan, setUserPlan] = useState<string>('free');
    const [planLoading, setPlanLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        slug: '',
        start_date: '',
        end_date: '',
        thank_you_message: '',
        contact_email: ''
    });
    
    const [editFormData, setEditFormData] = useState({
        id: '',
        title: '',
        description: '',
        slug: '',
        start_date: '',
        end_date: '',
        thank_you_message: '',
        contact_email: ''
    });

    useEffect(() => {
        fetchUserPlan();
        fetchCampaigns();
    }, []);

    const fetchUserPlan = async () => {
        try {
            const response = await fetch(`/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUserPlan(data.user.plan || 'free');
            }
        } catch (error) {
            console.error('Error fetching user plan:', error);
        } finally {
            setPlanLoading(false);
        }
    };

    const fetchCampaigns = async () => {
        try {
            const response = await fetch(`/api/campaign`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setCampaigns(data);
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            notifications.show({
                title: 'Hata',
                message: 'Kampanyalar yüklenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!formData.title || !formData.description || !formData.slug || !formData.thank_you_message || !formData.contact_email) {
            notifications.show({
                title: 'Uyarı',
                message: 'Lütfen tüm alanları doldurun',
                color: 'yellow'
            });
            return;
        }

        if (new Date(formData.start_date) >= new Date(formData.end_date)) {
            notifications.show({
                title: 'Uyarı',
                message: 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır',
                color: 'yellow'
            });
            return;
        }

        setUploading(true);
        try {
            const response = await fetch(`/api/campaign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    start_date: new Date(formData.start_date).toISOString(),
                    end_date: new Date(formData.end_date).toISOString()
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const newCampaign = await response.json();
                setNewlyCreatedCampaign(newCampaign);
                closeCreate();
                openSuccess();
                setFormData({
                    title: '',
                    description: '',
                    slug: '',
                    start_date: '',
                    end_date: '',
                    thank_you_message: '',
                    contact_email: ''
                });
                fetchCampaigns();
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Kampanya oluşturulurken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Error creating campaign:', error);
            notifications.show({
                title: 'Hata',
                message: 'Kampanya oluşturulurken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setUploading(false);
        }
    };

    const copyCampaignUrl = async () => {
        if (!newlyCreatedCampaign) return;
        
        const campaignUrl = `${window.location.origin}/campaign/${newlyCreatedCampaign.slug}`;
        try {
            await navigator.clipboard.writeText(campaignUrl);
            setCopied(true);
            notifications.show({
                title: 'Başarılı',
                message: 'Kampanya URL\'si kopyalandı',
                color: 'green'
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            notifications.show({
                title: 'Hata',
                message: 'URL kopyalanamadı',
                color: 'red'
            });
        }
    };

    const copyExistingCampaignUrl = async (campaignSlug: string) => {
        const campaignUrl = `${window.location.origin}/campaign/${campaignSlug}`;
        try {
            await navigator.clipboard.writeText(campaignUrl);
            setCopiedCampaignId(campaignSlug);
            notifications.show({
                title: 'Başarılı',
                message: 'Kampanya URL\'si kopyalandı',
                color: 'green'
            });
            setTimeout(() => setCopiedCampaignId(null), 2000);
        } catch (error) {
            notifications.show({
                title: 'Hata',
                message: 'URL kopyalanamadı',
                color: 'red'
            });
        }
    };

    const goToQrCreation = () => {
        if (!newlyCreatedCampaign) return;
        const campaignUrl = `${window.location.origin}/campaign/${newlyCreatedCampaign.slug}`;
        router.push(`/dashboard/url?url=${encodeURIComponent(campaignUrl)}`);
    };

    const handleDelete = async (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        open();
    };

    const confirmDelete = async () => {
        if (!selectedCampaign) return;
        try {
            const response = await fetch(`/api/campaign/${selectedCampaign.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setCampaigns(campaigns.filter(campaign => campaign.id !== selectedCampaign.id));
                close();
                notifications.show({
                    title: 'Başarılı',
                    message: 'Kampanya başarıyla silindi',
                    color: 'green'
                });
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Kampanya silinirken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Campaign deletion error:', error);
            notifications.show({
                title: 'Hata',
                message: 'Kampanya silinirken bir hata oluştu',
                color: 'red'
            });
        }
    };

    const openCampaignInNewTab = (campaign: Campaign) => {
        window.open(`/campaign/${campaign.slug}`, '_blank');
    };

    const handleEdit = (campaign: Campaign) => {
        setEditFormData({
            id: campaign.id,
            title: campaign.title,
            description: campaign.description,
            slug: campaign.slug,
            start_date: campaign.start_date.split('T')[0],
            end_date: campaign.end_date.split('T')[0],
            thank_you_message: campaign.thank_you_message,
            contact_email: campaign.contact_email || ''
        });
        openEdit();
    };

    const handleUpdate = async () => {
        if (!editFormData.title || !editFormData.description || !editFormData.slug || !editFormData.thank_you_message || !editFormData.contact_email) {
            notifications.show({
                title: 'Uyarı',
                message: 'Lütfen tüm alanları doldurun',
                color: 'yellow'
            });
            return;
        }

        if (new Date(editFormData.start_date) >= new Date(editFormData.end_date)) {
            notifications.show({
                title: 'Uyarı',
                message: 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır',
                color: 'yellow'
            });
            return;
        }

        setUploading(true);
        try {
            const response = await fetch(`/api/campaign/${editFormData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editFormData,
                    start_date: new Date(editFormData.start_date).toISOString(),
                    end_date: new Date(editFormData.end_date).toISOString()
                }),
                credentials: 'include',
            });

            if (response.ok) {
                notifications.show({
                    title: 'Başarılı',
                    message: 'Kampanya başarıyla güncellendi',
                    color: 'green'
                });
                closeEdit();
                setEditFormData({
                    id: '',
                    title: '',
                    description: '',
                    slug: '',
                    start_date: '',
                    end_date: '',
                    thank_you_message: '',
                    contact_email: ''
                });
                fetchCampaigns();
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Kampanya güncellenirken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Error updating campaign:', error);
            notifications.show({
                title: 'Hata',
                message: 'Kampanya güncellenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setUploading(false);
        }
    };

    const handleViewEntries = async (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        setEntriesLoading(true);
        setSearchTerm('');
        openEntries();
        
        try {
            const response = await fetch(`/api/campaign/${campaign.id}/entries`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('API Response:', data); // Debug için
                
                // Veri yapısını kontrol et ve uygun şekilde işle
                let entries = [];
                
                if (Array.isArray(data)) {
                    // Eğer data direkt array ise, her kampanya için winner bilgisini kontrol et
                    entries = data;
                } else if (data.entries && Array.isArray(data.entries)) {
                    // Eğer data.entries array ise
                    entries = data.entries;
                } else {
                    // Diğer durumlar için
                    entries = [];
                }
                
                setEntries(entries);
            } else {
                // Response'u text olarak oku, JSON değilse hata mesajını göster
                const responseText = await response.text();
                let errorMessage = 'Katılımcılar yüklenirken bir hata oluştu';
                
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    console.error('Error parsing response:', responseText);
                    errorMessage = `Sunucu hatası: ${response.status}`;
                }
                
                notifications.show({
                    title: 'Hata',
                    message: errorMessage,
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
            notifications.show({
                title: 'Hata',
                message: 'Katılımcılar yüklenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setEntriesLoading(false);
        }
    };

    const handleSelectWinner = async (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        openWinner();
    };

    const confirmSelectWinner = async () => {
        if (!selectedCampaign) return;
        
        setWinnerLoading(true);
        try {
            const response = await fetch(`/api/campaign/${selectedCampaign.id}/winner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                const winners = data.winners || [];
                const winnerCount = winners.length;
                
                let message = '';
                if (winnerCount === 1) {
                    message = `Kazanan seçildi: ${winners[0].name} (${winners[0].email})`;
                } else if (winnerCount > 1) {
                    const winnerNames = winners.map((w: { name: string; email: string; phone?: string; rank: number }) => w.name).join(', ');
                    message = `${winnerCount} kazanan seçildi: ${winnerNames}`;
                } else {
                    message = 'Kazanan seçildi';
                }
                
                notifications.show({
                    title: 'Başarılı',
                    message: message,
                    color: 'green'
                });
                closeWinner();
                
                // Kampanya listesini güncelle
                fetchCampaigns();
                
                // Eğer entries modal açıksa, katılımcıları yeniden yükle
                if (entriesOpened) {
                    handleViewEntries(selectedCampaign!);
                }
            } else {
                // Response'u text olarak oku, JSON değilse hata mesajını göster
                const responseText = await response.text();
                let errorMessage = 'Kazanan seçilirken bir hata oluştu';
                let notificationColor = 'red';
                let notificationTitle = 'Hata';
                
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorMessage;
                    
                    // 400 status kodu için özel notification
                    if (response.status === 400 && errorData.message === 'Bu kampanya için zaten kazanan seçildi.') {
                        notificationColor = 'orange';
                        notificationTitle = 'Uyarı';
                    }
                } catch (parseError) {
                    console.error('Error parsing response:', responseText);
                    errorMessage = `Sunucu hatası: ${response.status}`;
                }
                
                notifications.show({
                    title: notificationTitle,
                    message: errorMessage,
                    color: notificationColor
                });
            }
        } catch (error) {
            console.error('Error selecting winner:', error);
            notifications.show({
                title: 'Hata',
                message: 'Kazanan seçilirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setWinnerLoading(false);
        }
    };

    const getCampaignStatus = (campaign: Campaign) => {
        // Önce is_active durumunu kontrol et
        if (!campaign.is_active) {
            return { status: 'Pasif', color: 'red' };
        }

        const now = new Date();
        const startDate = new Date(campaign.start_date);
        const endDate = new Date(campaign.end_date);

        if (now < startDate) {
            return { status: 'Yakında', color: 'blue' };
        } else if (now >= startDate && now <= endDate) {
            return { status: 'Aktif', color: 'green' };
        } else {
            return { status: 'Sona Erdi', color: 'red' };
        }
    };

    // Plan yüklenirken loading göster
    if (planLoading) {
        return (
            <Container size="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                <Center>
                    <Stack align="center" gap="md">
                        <Loader color="#e64980" size="lg" />
                        <Text c="dimmed">Yükleniyor...</Text>
                    </Stack>
                </Center>
            </Container>
        );
    }

    // Free kullanıcılar için erişim engelleme
    if (userPlan === 'free') {
        return (
            <Container size="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
                <Paper withBorder radius="lg" p="xl" style={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
                    <Stack gap="lg" align="center">
                        <ThemeIcon size={80} radius="xl" color="gray" variant="light">
                            <IconGift size={40} />
                        </ThemeIcon>
                        
                        <Title order={2} c="gray">
                            PRO Özellik
                        </Title>
                        
                        <Text size="lg" c="dimmed" ta="center">
                            Kampanya yönetimi özelliği sadece PRO kullanıcılar için mevcuttur.
                        </Text>
                        
                        <Text size="sm" c="dimmed" ta="center">
                            Müşterilerinizle etkileşimi artırmak için çekiliş ve kampanyalar oluşturabilir, 
                            katılımcıları yönetebilir ve kazananları seçebilirsiniz.
                        </Text>
                        
                        <Button 
                            size="lg" 
                            color="blue" 
                            radius="md"
                            onClick={() => router.push('/dashboard/settings')}
                        >
                            PRO'ya Yükselt
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        );
    }

    return (
        <Container size="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
            <Paper
                p="md"
                radius="md"
                withBorder
                style={{
                    background: '#fff',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    flexDirection: 'row',
                    width: '100%',
                    maxWidth: 800,
                }}
                styles={{
                    root: {
                        '@media (maxWidth: 768px)': {
                            flexDirection: 'column',
                            textAlign: 'center',
                            gap: 16,
                            padding: '20px 16px',
                        }
                    }
                }}
            >
                <ThemeIcon 
                    color="#e64980" 
                    size={36} 
                    radius="xl" 
                    variant="light"
                    style={{
                        '@media (maxWidth: 768px)': {
                            alignSelf: 'center',
                            marginBottom: 8,
                        }
                    }}
                >
                    <IconGift size={20} />
                </ThemeIcon>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Group gap="xs" align="center" wrap="nowrap">
                        <Text size="md" fw={600} c="#e64980" style={{ wordBreak: 'break-word' }}>
                            Kampanya Yönetimi nedir?
                        </Text>
                        <Popover width={300} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <ActionIcon 
                                    variant="subtle" 
                                    color="#e64980" 
                                    size="sm"
                                    style={{ cursor: 'pointer', flexShrink: 0 }}
                                >
                                    <IconInfoCircle size={16} />
                                </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Stack gap="sm">
                                    <Text size="sm" fw={600} c="#e64980">Kampanya Sistemi Nasıl Çalışır?</Text>
                                    <Text size="xs" c="dimmed">
                                        Kampanya sistemimiz otomatik olarak <strong>3 kişi seçer</strong>:
                                    </Text>
                                    <Stack gap="xs">
                                        <Group gap="xs">
                                            <Text size="xs" fw={600}>🥇 Asıl Kazanan:</Text>
                                            <Text size="xs">Otomatik olarak e-posta gönderilir</Text>
                                        </Group>
                                        <Group gap="xs">
                                            <Text size="xs" fw={600}>🥈 1. Yedek:</Text>
                                            <Text size="xs">Asıl kazanan iletişime geçmezse devreye girer</Text>
                                        </Group>
                                        <Group gap="xs">
                                            <Text size="xs" fw={600}>🥉 2. Yedek:</Text>
                                            <Text size="xs">İlk iki kişi iletişime geçmezse devreye girer</Text>
                                        </Group>
                                    </Stack>
                                    <Text size="xs" c="dimmed" mt="xs">
                                        Bu sistem sayesinde kampanyanızın başarısı garanti altına alınır!
                                    </Text>
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                    <Text size="sm" c="#e64980" style={{ wordBreak: 'break-word', lineHeight: 1.5 }}>
                        Müşterilerinizle etkileşimi artırın! Çekiliş ve kampanyalar oluşturun, katılımcıları yönetin ve <b>vunqr.com/campaign/slug</b> adresiyle paylaşın.
                    </Text>
                </div>
            </Paper>

            <Paper withBorder radius="lg" p={24} style={{ width: "100%", maxWidth: 800, marginTop: 24 }}>
                <Group justify="space-between" align="center" mb="lg">
                    <Title order={2} c="#e64980">
                        Kampanyalarım
                    </Title>
                    <Button
                        onClick={openCreate}
                        radius="md"
                        size="md"
                        color="#e64980"
                        leftSection={<IconPlus size={16} />}
                    >
                        Yeni Kampanya Oluştur
                    </Button>
                </Group>

            {/* Mevcut Kampanyalar Listesi */}
            {loading ? (
                <Center mt="xl"><Loader color="#e64980" /></Center>
            ) : campaigns.length > 0 ? (
                <Stack gap="md" mt="lg">
                    {campaigns.map(campaign => {
                        const status = getCampaignStatus(campaign);
                        return (
                            <Paper key={campaign.id} p="md" radius="md" withBorder>
                                <Stack gap="sm">
                                    <Group justify="space-between" align="flex-start">
                                        <Text fw={500} size="md" truncate style={{ flex: 1 }}>{campaign.title}</Text>
                                        <Badge color={status.color} size="sm">{status.status}</Badge>
                                    </Group>
                                                                            <Text size="sm" c="dimmed" style={{ fontFamily: 'monospace' }}>
                                            vunqr.com/campaign/{campaign.slug}
                                        </Text>
                                        <Text size="sm" c="dimmed" lineClamp={2}>
                                            {campaign.description}
                                        </Text>
                                        <Group gap="xs" c="dimmed">
                                            <IconCalendar size={14} />
                                            <Text size="sm">
                                                {new Date(campaign.start_date).toLocaleDateString('tr-TR')} - {new Date(campaign.end_date).toLocaleDateString('tr-TR')}
                                            </Text>
                                        </Group>
                                        {campaign.entries_count !== undefined && (
                                            <Group gap="xs" c="dimmed">
                                                <IconUsers size={14} />
                                                <Text size="sm">{campaign.entries_count} katılımcı</Text>
                                            </Group>
                                        )}
                                    {campaign.winners && campaign.winners.length > 0 && (
                                        <Stack gap="xs">
                                            {campaign.winners.map((winner, index) => {
                                                const getRankIcon = (rank: number) => {
                                                    switch (rank) {
                                                        case 1: return '🥇';
                                                        case 2: return '🥈';
                                                        case 3: return '🥉';
                                                        default: return `${rank}.`;
                                                    }
                                                };
                                                
                                                const getRankText = (rank: number) => {
                                                    switch (rank) {
                                                        case 1: return 'Asıl Kazanan';
                                                        case 2: return '1. Yedek';
                                                        case 3: return '2. Yedek';
                                                        default: return `${rank}. Yedek`;
                                                    }
                                                };
                                                
                                                                                                    return (
                                                        <Group key={winner.id} gap="xs">
                                                            <Text size="sm" fw={500}>
                                                                {getRankIcon(winner.rank)} {getRankText(winner.rank)}: <Text span c="green" fw={500}>{winner.name} ({winner.email})</Text>
                                                            </Text>
                                                        </Group>
                                                    );
                                            })}
                                        </Stack>
                                    )}
                                    <Stack gap="xs">
                                        <Button 
                                            component="a" 
                                            href={`/campaign/${campaign.slug}`} 
                                            target="_blank" 
                                            variant="subtle" 
                                            color="#e64980" 
                                            leftSection={<IconExternalLink size={14} />}
                                            size="sm"
                                            fullWidth
                                        >
                                            Görüntüle
                                        </Button>
                                        <Group gap="xs" justify="center">
                                            <ActionIcon 
                                                color="blue" 
                                                variant="subtle" 
                                                onClick={() => handleEdit(campaign)}
                                                size="md"
                                            >
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="purple" 
                                                variant="subtle" 
                                                onClick={() => handleViewEntries(campaign)}
                                                size="md"
                                            >
                                                <IconUsers size={16} />
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="orange" 
                                                variant="subtle" 
                                                onClick={() => copyExistingCampaignUrl(campaign.slug)}
                                                size="md"
                                            >
                                                {copiedCampaignId === campaign.slug ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="red" 
                                                variant="subtle" 
                                                onClick={() => handleDelete(campaign)}
                                                size="md"
                                            >
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Group>
                                        {status.status === 'Aktif' && campaign.is_active && (
                                            <Button
                                                variant="outline"
                                                color="green"
                                                size="sm"
                                                leftSection={<IconTrophy size={14} />}
                                                onClick={() => handleSelectWinner(campaign)}
                                                fullWidth
                                            >
                                                Kazananları Seç
                                            </Button>
                                        )}
                                    </Stack>
                                </Stack>
                            </Paper>
                        );
                    })}
                </Stack>
            ) : (
                <Center py="xl">
                    <Stack gap="md" align="center">
                        <ThemeIcon size={60} radius="xl" color="gray" variant="light">
                            <IconGift size={30} />
                        </ThemeIcon>
                        <Text ta="center" c="dimmed">
                            Henüz hiç kampanya oluşturmadınız.
                        </Text>
                        <Text size="sm" ta="center" c="dimmed">
                            İlk kampanyanızı oluşturmak için yukarıdaki butonu kullanın.
                        </Text>
                    </Stack>
                </Center>
            )}
        </Paper>

            {/* Create Campaign Modal */}
            <Modal 
                opened={createOpened} 
                onClose={closeCreate} 
                title={
                    <Group gap="sm">
                        <IconPlus size={20} />
                        <Text fw={600}>Yeni Kampanya Oluştur</Text>
                    </Group>
                } 
                centered 
                size="lg"
                styles={{ 
                    root: { '@media (maxWidth: 768px)': { width: '95%' } },
                    title: { fontSize: '1.1rem' }
                }}
            >
                <Stack gap="md">
                    <TextInput
                        label="Kampanya Başlığı"
                        placeholder="Kampanya başlığını girin"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        size="md"
                        radius="md"
                        required
                    />
                    <TextInput
                        label="Slug (URL)"
                        placeholder="kampanya-adi"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        size="md"
                        radius="md"
                        required
                    />
                    <Textarea
                        label="Açıklama"
                        placeholder="Kampanya açıklamasını girin"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        size="md"
                        radius="md"
                        required
                        minRows={3}
                    />
                    <Group gap="md" grow>
                        <TextInput
                            label="Başlangıç Tarihi"
                            placeholder="YYYY-MM-DD"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            size="md"
                            radius="md"
                            required
                            type="date"
                        />
                        <TextInput
                            label="Bitiş Tarihi"
                            placeholder="YYYY-MM-DD"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            size="md"
                            radius="md"
                            required
                            type="date"
                        />
                    </Group>
                    <Textarea
                        label="Teşekkür Mesajı"
                        placeholder="Katılım sonrası gösterilecek mesaj"
                        value={formData.thank_you_message}
                        onChange={(e) => setFormData({ ...formData, thank_you_message: e.target.value })}
                        size="md"
                        radius="md"
                        required
                        minRows={2}
                    />
                    <TextInput
                        label="İletişim E-posta"
                        placeholder="iletisim@firmaadi.com"
                        value={formData.contact_email}
                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        size="md"
                        radius="md"
                        required
                        type="email"
                    />
                    <Group justify="flex-end" mt="md" gap="xs">
                        <Button variant="default" onClick={closeCreate} size="sm">İptal</Button>
                        <Button 
                            onClick={handleCreate} 
                            disabled={!formData.title || !formData.description || !formData.slug || !formData.thank_you_message || !formData.contact_email}
                            radius="md"
                            size="sm"
                            color="#e64980"
                            leftSection={<IconPlus size={16} />}
                            loading={uploading}
                        >
                            Kampanya Oluştur
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Success Modal */}
            <Modal 
                opened={successOpened} 
                onClose={closeSuccess} 
                title={
                    <Group gap="sm">
                        <ThemeIcon color="green" size="sm" radius="xl">
                            <IconCheck size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Kampanya Başarıyla Oluşturuldu!</Text>
                    </Group>
                } 
                centered 
                size="md"
                styles={{ 
                    root: { '@media (maxWidth: 768px)': { width: '95%' } },
                    title: { fontSize: '1.1rem' }
                }}
            >
                <Stack gap="lg">
                    <Text size="sm" c="dimmed">
                        <strong>{newlyCreatedCampaign?.title}</strong> kampanyanız başarıyla oluşturuldu. 
                        Müşterilerinizle paylaşmak için aşağıdaki seçenekleri kullanabilirsiniz:
                    </Text>
                    
                    <Paper p="md" radius="md" withBorder style={{ background: '#f8f9fa' }}>
                        <Text size="xs" fw={600} c="dimmed" mb="xs">Kampanya URL'si:</Text>
                        <Text size="sm" style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {newlyCreatedCampaign ? `${window.location.origin}/campaign/${newlyCreatedCampaign.slug}` : ''}
                        </Text>
                    </Paper>

                    <Group gap="sm" justify="center">
                        <Button
                            variant="outline"
                            leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                            onClick={copyCampaignUrl}
                            size="sm"
                            color={copied ? "green" : "blue"}
                        >
                            {copied ? 'Kopyalandı!' : 'URL Kopyala'}
                        </Button>
                        <Button
                            leftSection={<IconQrcode size={16} />}
                            onClick={goToQrCreation}
                            size="sm"
                            color="#fab005"
                        >
                            QR Kod Oluştur
                        </Button>
                    </Group>

                    <Divider />

                    <Text size="xs" c="dimmed" ta="center">
                        QR kod oluşturarak kampanyanızı fiziksel olarak da paylaşabilirsiniz.
                    </Text>

                    <Group justify="center" mt="md">
                        <Button variant="default" onClick={closeSuccess} size="sm">
                            Tamam
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Edit Modal */}
            <Modal opened={editOpened} onClose={closeEdit} title="Kampanya Düzenle" centered size="md" styles={{ root: { '@media (maxWidth: 768px)': { width: '95%' } } }}>
                <Stack gap="md">
                    <TextInput
                        label="Kampanya Başlığı"
                        placeholder="Kampanya başlığını girin"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        required
                    />
                    <TextInput
                        label="Slug (URL)"
                        placeholder="kampanya-adi"
                        value={editFormData.slug}
                        onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                        required
                    />
                    <Textarea
                        label="Açıklama"
                        placeholder="Kampanya açıklamasını girin"
                        value={editFormData.description}
                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        required
                        minRows={3}
                    />
                    <Group gap="md" grow>
                        <TextInput
                            label="Başlangıç Tarihi"
                            placeholder="YYYY-MM-DD"
                            value={editFormData.start_date}
                            onChange={(e) => setEditFormData({ ...editFormData, start_date: e.target.value })}
                            required
                            type="date"
                        />
                        <TextInput
                            label="Bitiş Tarihi"
                            placeholder="YYYY-MM-DD"
                            value={editFormData.end_date}
                            onChange={(e) => setEditFormData({ ...editFormData, end_date: e.target.value })}
                            required
                            type="date"
                        />
                    </Group>
                    <Textarea
                        label="Teşekkür Mesajı"
                        placeholder="Katılım sonrası gösterilecek mesaj"
                        value={editFormData.thank_you_message}
                        onChange={(e) => setEditFormData({ ...editFormData, thank_you_message: e.target.value })}
                        required
                        minRows={2}
                    />
                    <TextInput
                        label="İletişim E-posta"
                        placeholder="iletisim@firmaadi.com"
                        value={editFormData.contact_email}
                        onChange={(e) => setEditFormData({ ...editFormData, contact_email: e.target.value })}
                        required
                        type="email"
                    />
                    <Group justify="flex-end" mt="md" gap="xs">
                        <Button variant="default" onClick={closeEdit} size="sm">İptal</Button>
                        <Button 
                            onClick={handleUpdate} 
                            loading={uploading}
                            disabled={!editFormData.title || !editFormData.description || !editFormData.slug || !editFormData.thank_you_message || !editFormData.contact_email}
                            size="sm"
                        >
                            Güncelle
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Entries Modal */}
            <Modal 
                opened={entriesOpened} 
                onClose={closeEntries} 
                title={
                    <Group gap="sm">
                        <IconUsers size={20} />
                        <Text fw={600}>Katılımcılar - {selectedCampaign?.title}</Text>
                    </Group>
                } 
                centered 
                size="xl"
                styles={{ root: { '@media (maxWidth: 768px)': { width: '95%' } } }}
            >
                {entriesLoading ? (
                    <Center py="xl"><Loader color="#e64980" /></Center>
                ) : entries.length > 0 ? (
                    <Stack gap="md">
                        <Group justify="space-between" align="center">
                            <Text size="sm" c="dimmed">Toplam {entries.length} katılımcı</Text>
                            <Badge color="blue" size="sm">
                                {new Date().toLocaleDateString('tr-TR')}
                            </Badge>
                        </Group>
                        
                        <TextInput
                            placeholder="Ad, e-posta veya telefon ile ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            leftSection={<IconSearch size={16} />}
                            size="sm"
                            radius="md"
                        />
                        
                        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                            <Table striped highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>#</Table.Th>
                                        <Table.Th>Ad Soyad</Table.Th>
                                        <Table.Th>E-posta</Table.Th>
                                        <Table.Th>Telefon</Table.Th>
                                        <Table.Th>Katılım Tarihi</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {entries
                                        .filter(entry => 
                                            entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            (entry.phone && entry.phone.includes(searchTerm))
                                        )
                                        .map((entry, index) => (
                                            <Table.Tr key={entry.id}>
                                                <Table.Td>
                                                    <Text size="sm" fw={500} c="dimmed">
                                                        {index + 1}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text size="sm" fw={600}>
                                                        {entry.name}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text size="sm" c="dimmed">
                                                        {entry.email}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text size="sm" c="dimmed">
                                                        {entry.phone || '-'}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text size="sm" c="dimmed">
                                                        {new Date(entry.created_at).toLocaleString('tr-TR', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </Text>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Stack>
                ) : (
                    <Center py="xl">
                        <Stack gap="md" align="center">
                            <ThemeIcon size={50} radius="xl" color="gray" variant="light">
                                <IconUsers size={25} />
                            </ThemeIcon>
                            <Text ta="center" c="dimmed">
                                Henüz katılımcı bulunmuyor.
                            </Text>
                            <Text size="sm" ta="center" c="dimmed">
                                {selectedCampaign && getCampaignStatus(selectedCampaign).status === 'Aktif' 
                                    ? 'Kampanya aktif durumda, katılımcılar burada görünecek.'
                                    : 'Kampanya aktif olduğunda katılımcılar burada görünecek.'
                                }
                            </Text>
                        </Stack>
                    </Center>
                )}
            </Modal>

            {/* Winner Selection Modal */}
            <Modal 
                opened={winnerOpened} 
                onClose={closeWinner} 
                title={
                    <Group gap="sm">
                        <IconTrophy size={20} />
                        <Text fw={600}>Kazanan Seç</Text>
                    </Group>
                } 
                centered 
                size="md"
                styles={{ root: { '@media (maxWidth: 768px)': { width: '95%' } } }}
            >
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        <strong>{selectedCampaign?.title}</strong> kampanyası için rastgele kazananlar seçilecek.
                        Bu işlem geri alınamaz.
                    </Text>
                    
                    <Paper p="md" radius="md" withBorder style={{ background: '#f8f9fa' }}>
                        <Stack gap="sm">
                            <Group gap="xs" align="center">
                                <IconInfoCircle size={16} color="#e64980" />
                                <Text size="sm" fw={600} c="#e64980">Kazanan Seçim Sistemi</Text>
                            </Group>
                            <Text size="xs" c="dimmed">
                                Sistem otomatik olarak <strong>3 kişi seçer</strong>:
                            </Text>
                            <Stack gap="xs">
                                <Group gap="xs">
                                    <Text size="xs" fw={600}>🥇 Asıl Kazanan:</Text>
                                    <Text size="xs">Otomatik olarak e-posta gönderilir</Text>
                                </Group>
                                <Group gap="xs">
                                    <Text size="xs" fw={600}>🥈 1. Yedek:</Text>
                                    <Text size="xs">Asıl kazanan iletişime geçmezse devreye girer</Text>
                                </Group>
                                <Group gap="xs">
                                    <Text size="xs" fw={600}>🥉 2. Yedek:</Text>
                                    <Text size="xs">İlk iki kişi iletişime geçmezse devreye girer</Text>
                                </Group>
                            </Stack>
                            <Text size="xs" c="dimmed" mt="xs">
                                Bu sistem sayesinde kampanyanızın başarısı garanti altına alınır!
                            </Text>
                        </Stack>
                    </Paper>
                    
                    {winnerLoading ? (
                        <Center py="xl">
                            <Stack gap="sm" align="center">
                                <Loader color="#e64980" />
                                <Text size="sm">Kazanan seçiliyor...</Text>
                            </Stack>
                        </Center>
                    ) : (
                        <Group justify="center" mt="md" gap="xs">
                            <Button variant="default" onClick={closeWinner} size="sm">İptal</Button>
                            <Button 
                                color="green" 
                                onClick={confirmSelectWinner}
                                size="sm"
                                leftSection={<IconTrophy size={16} />}
                                loading={winnerLoading}
                            >
                                {winnerLoading ? 'Seçiliyor...' : 'Kazananları Seç'}
                            </Button>
                        </Group>
                    )}
                </Stack>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal opened={opened} onClose={close} title="Kampanya Sil" centered size="sm" styles={{ root: { '@media (maxWidth: 768px)': { width: '95%' } } }}>
                <Text>Bu kampanyayı silmek istediğinizden emin misiniz?</Text>
                <Text size="sm" c="dimmed" mt="xs">
                    {selectedCampaign?.title}
                </Text>
                <Group justify="flex-end" mt="xl" gap="xs">
                    <Button variant="default" onClick={close} size="sm">İptal</Button>
                    <Button color="red" onClick={confirmDelete} size="sm">Sil</Button>
                </Group>
            </Modal>

            <style jsx global>{`
                @media (max-width: 600px) {
                    /* Mobil için form düzenlemeleri */
                    .mantine-Container-root {
                        padding: 0 8px !important;
                    }
                    
                    .mantine-Paper-root {
                        padding: 16px !important;
                        margin: 8px 0 !important;
                    }
                    
                    .mantine-TextInput-root,
                    .mantine-PasswordInput-root,
                    .mantine-Select-root,
                    .mantine-Textarea-root,
                    .mantine-FileInput-root,
                    .mantine-DateInput-root {
                        margin-bottom: 12px !important;
                    }
                    
                    .mantine-TextInput-label,
                    .mantine-PasswordInput-label,
                    .mantine-Select-label,
                    .mantine-Textarea-label,
                    .mantine-FileInput-label,
                    .mantine-DateInput-label {
                        font-size: 14px !important;
                        margin-bottom: 4px !important;
                    }
                    
                    .mantine-TextInput-input,
                    .mantine-PasswordInput-input,
                    .mantine-Select-input,
                    .mantine-Textarea-input,
                    .mantine-FileInput-input,
                    .mantine-DateInput-input {
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
                    
                    .mantine-Checkbox-root {
                        margin-top: 8px !important;
                    }

                    /* Campaign sayfasına özel düzenlemeler */
                    .mantine-Paper-root:first-child {
                        flex-direction: column !important;
                        gap: 16px !important;
                        text-align: center;
                        padding: 20px 16px !important;
                    }
                    
                    .mantine-Paper-root:first-child .mantine-ThemeIcon-root {
                        align-self: center !important;
                        margin-bottom: 8px !important;
                    }
                    
                    .mantine-Paper-root:first-child .mantine-Text-root {
                        font-size: 15px !important;
                        word-break: break-word !important;
                        line-height: 1.5 !important;
                    }
                    
                    .mantine-Paper-root:first-child .mantine-Group-root {
                        justify-content: center !important;
                        flex-wrap: nowrap !important;
                    }
                    
                    .mantine-Paper-root:first-child .mantine-ActionIcon-root {
                        flex-shrink: 0 !important;
                    }

                    /* SimpleGrid mobil düzenlemesi */
                    .mantine-SimpleGrid-root {
                        grid-template-columns: 1fr !important;
                    }

                    /* Card içindeki butonlar */
                    .mantine-Group-root {
                        gap: 4px !important;
                    }

                    .mantine-ActionIcon-root {
                        min-width: 36px !important;
                        min-height: 36px !important;
                    }

                    /* DateInput mobil düzenlemeleri */
                    .mantine-DateInput-root {
                        width: 100% !important;
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
                    .mantine-PasswordInput-input,
                    .mantine-Select-input,
                    .mantine-Textarea-input,
                    .mantine-FileInput-input,
                    .mantine-DateInput-input {
                        font-size: 16px !important;
                        padding: 10px 12px !important;
                    }

                    /* Modal mobil düzenlemeleri */
                    .mantine-Modal-root {
                        margin: 8px !important;
                    }

                    .mantine-Modal-content {
                        padding: 16px !important;
                    }
                }
            `}</style>
        </Container>
    );
}
