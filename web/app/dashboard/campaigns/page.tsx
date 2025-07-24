'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu, Center, Loader, TextInput, Paper, Divider, ActionIcon, Tooltip, ThemeIcon, Textarea, NumberInput, Table, Popover, Notification } from '@mantine/core';

import { IconGift, IconUpload, IconTrash, IconEye, IconDownload, IconPlus, IconFile, IconEdit, IconExternalLink, IconQrcode, IconCopy, IconCheck, IconUsers, IconTrophy, IconCalendar, IconInfoCircle, IconSearch, IconAlertCircle } from '@tabler/icons-react';
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

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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
                <Paper withBorder radius="md" p="xl" style={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
                    <Stack gap="lg" align="center">
                        <ThemeIcon size={80} radius="md" color="gray" variant="light">
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
        <Container size="xl" py="xl">
            {/* Global Notifications */}
            {(successMsg || errorMsg) && (
                <Notification
                    color={successMsg ? "green" : "red"}
                    onClose={() => { setSuccessMsg(""); setErrorMsg(""); }}
                    mb="lg"
                    icon={successMsg ? <IconCheck size={16} /> : <IconAlertCircle size={16} />}
                >
                    {successMsg || errorMsg}
                </Notification>
            )}

            {/* Header Section */}
            <Card withBorder radius="md" p="md" mb="lg" shadow="sm">
                <Group gap="lg" align="center">
                    <Group gap="md">
                        <ThemeIcon size={42} radius="md" variant="gradient" gradient={{ from: '#e64980', to: '#be4bdb' }}>
                            <IconGift size={24} />
                        </ThemeIcon>
                        <Stack gap={2}>
                            <Group gap="xs" align="center">
                                <Title order={2} size="h3">
                                    Kampanya Yönetimi
                                </Title>
                            </Group>
                            <Text size="sm" c="dimmed">
                                Müşterilerinizle etkileşimi artırın! Çekiliş ve kampanyalar oluşturun, katılımcıları yönetin.
                            </Text>
                        </Stack>
                    </Group>
                    <Button
                        onClick={openCreate}
                        leftSection={<IconPlus size={16} />}
                        size="sm"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: '#e64980', to: '#be4bdb' }}
                        ml="auto"
                    >
                        Yeni Kampanya Oluştur
                    </Button>
                </Group>
            </Card>

            {/* Campaigns Grid */}
            <Stack gap="xl">
                <Group justify="space-between" align="center">
                    <Title order={2} size="h3">
                        Kampanyalarım
                    </Title>
                    <Badge variant="light" size="lg">
                        {campaigns.length} kampanya
                    </Badge>
                </Group>

                {loading ? (
                    <Group justify="center" py="xl">
                        <Loader size="xl" />
                    </Group>
                ) : campaigns.length === 0 ? (
                    <Card withBorder radius="md" p="xl" shadow="sm">
                        <Stack align="center" gap="lg" py="xl">
                            <ThemeIcon size={100} radius="md" color="gray" variant="light">
                                <IconGift size={50} />
                            </ThemeIcon>
                            <Stack align="center" gap="sm">
                                <Title order={3} c="dimmed">
                                    Henüz hiç kampanya oluşturmadınız
                                </Title>
                                <Text size="md" c="dimmed" ta="center">
                                    İlk kampanyanızı oluşturmak için yukarıdaki butonu kullanın
                                </Text>
                            </Stack>
                            <Button
                                onClick={openCreate}
                                leftSection={<IconPlus size={18} />}
                                size="lg"
                                radius="md"
                                variant="gradient"
                                gradient={{ from: '#e64980', to: '#be4bdb' }}
                            >
                                İlk Kampanyamı Oluştur
                            </Button>
                        </Stack>
                    </Card>
                ) : (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                        {campaigns.map(campaign => {
                            const status = getCampaignStatus(campaign);
                            return (
                                <Card
                                    key={campaign.id}
                                    withBorder
                                    radius="md"
                                    p="lg"
                                    shadow="sm"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 'var(--mantine-shadow-md)'
                                        }
                                    }}
                                    onClick={() => openCampaignInNewTab(campaign)}
                                >
                                    <Stack gap="md">
                                        {/* Header */}
                                        <Group justify="space-between" align="start">
                                            <Stack gap={4} style={{ flex: 1 }}>
                                                <Group gap="xs">
                                                    <Title order={4} size="h5" lineClamp={1}>
                                                        {campaign.title}
                                                    </Title>
                                                    <Badge color={status.color} size="sm">
                                                        {status.status}
                                                    </Badge>
                                                </Group>
                                                <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                                                    vunqr.com/campaign/{campaign.slug}
                                                </Text>
                                            </Stack>
                                        </Group>

                                        {/* Description */}
                                        <Text size="sm" c="dimmed" lineClamp={2}>
                                            {campaign.description}
                                        </Text>

                                        {/* Stats */}
                                        <Group gap="xs">
                                            <Group gap={4}>
                                                <ThemeIcon size="xs" variant="light" color="blue">
                                                    <IconCalendar size={10} />
                                                </ThemeIcon>
                                                <Text size="xs" c="dimmed">
                                                    {new Date(campaign.start_date).toLocaleDateString('tr-TR')} - {new Date(campaign.end_date).toLocaleDateString('tr-TR')}
                                                </Text>
                                            </Group>
                                            {campaign.entries_count !== undefined && (
                                                <Group gap={4}>
                                                    <ThemeIcon size="xs" variant="light" color="grape">
                                                        <IconUsers size={10} />
                                                    </ThemeIcon>
                                                    <Text size="xs" c="dimmed">
                                                        {campaign.entries_count} katılımcı
                                                    </Text>
                                                </Group>
                                            )}
                                        </Group>

                                        {/* Winners */}
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
                                                            <Text size="xs" fw={500}>
                                                                {getRankIcon(winner.rank)} {getRankText(winner.rank)}: <Text span c="green" fw={500}>{winner.name}</Text>
                                                            </Text>
                                                        </Group>
                                                    );
                                                })}
                                            </Stack>
                                        )}

                                        <Divider />

                                        {/* Actions */}
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="blue"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewEntries(campaign);
                                                    }}
                                                    radius="md"
                                                >
                                                    <IconUsers size={16} />
                                                </ActionIcon>
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="gray"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(campaign);
                                                    }}
                                                    radius="md"
                                                >
                                                    <IconEdit size={16} />
                                                </ActionIcon>
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="orange"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyExistingCampaignUrl(campaign.slug);
                                                    }}
                                                    radius="md"
                                                >
                                                    {copiedCampaignId === campaign.slug ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                                </ActionIcon>
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="red"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(campaign);
                                                    }}
                                                    radius="md"
                                                >
                                                    <IconTrash size={16} />
                                                </ActionIcon>
                                            </Group>

                                            <Button
                                                variant="light"
                                                size="xs"
                                                radius="md"
                                                color="#e64980"
                                                leftSection={<IconExternalLink size={14} />}
                                                component="a"
                                                href={`/campaign/${campaign.slug}`}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Görüntüle
                                            </Button>
                                        </Group>

                                        {status.status === 'Aktif' && campaign.is_active && (
                                            <Button
                                                variant="light"
                                                color="green"
                                                size="sm"
                                                leftSection={<IconTrophy size={16} />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectWinner(campaign);
                                                }}
                                                fullWidth
                                                radius="md"
                                            >
                                                Kazananları Seç
                                            </Button>
                                        )}
                                    </Stack>
                                </Card>
                            );
                        })}
                    </SimpleGrid>
                )}
            </Stack>

            {/* Create Campaign Modal */}
            <Modal
                opened={createOpened}
                onClose={closeCreate}
                title={
                    <Group gap="sm">
                        <ThemeIcon size="sm" variant="light" color="#e64980">
                            <IconPlus size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Yeni Kampanya Oluştur</Text>
                    </Group>
                }
                centered
                size="md"
                radius="md"
            >
                <Stack gap="lg">
                    <TextInput
                        label="Slug"
                        placeholder="Benzersiz kısa ad (örn: yilbasi-cekilisi)"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                        radius="md"
                    />
                    <TextInput
                        label="Kampanya Başlığı"
                        placeholder="Yılbaşı Çekilişi"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        radius="md"
                    />
                    <Textarea
                        label="Açıklama"
                        placeholder="Kampanya açıklaması"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        minRows={3}
                        radius="md"
                    />
                    <Group grow>
                        <TextInput
                            label="Başlangıç Tarihi"
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            required
                            radius="md"
                        />
                        <TextInput
                            label="Bitiş Tarihi"
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            required
                            radius="md"
                        />
                    </Group>
                    <Textarea
                        label="Teşekkür Mesajı"
                        placeholder="Katılım sonrası gösterilecek mesaj"
                        value={formData.thank_you_message}
                        onChange={(e) => setFormData({ ...formData, thank_you_message: e.target.value })}
                        required
                        minRows={2}
                        radius="md"
                    />
                    <TextInput
                        label="İletişim E-posta"
                        placeholder="iletisim@firmaadi.com"
                        value={formData.contact_email}
                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        required
                        type="email"
                        radius="md"
                    />
                    <Group justify="end" gap="sm" mt="md">
                        <Button variant="default" onClick={closeCreate} radius="md">
                            İptal
                        </Button>
                        <Button
                            onClick={handleCreate}
                            loading={uploading}
                            leftSection={<IconPlus size={16} />}
                            radius="md"
                        >
                            Oluştur
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Edit Campaign Modal */}
            <Modal
                opened={editOpened}
                onClose={closeEdit}
                title={
                    <Group gap="sm">
                        <ThemeIcon size="sm" variant="light" color="#e64980">
                            <IconEdit size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Kampanyayı Düzenle</Text>
                    </Group>
                }
                centered
                size="md"
                radius="md"
            >
                <Stack gap="lg">
                    <TextInput
                        label="Slug"
                        value={editFormData.slug}
                        onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                        required
                        radius="md"
                    />
                    <TextInput
                        label="Kampanya Başlığı"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        required
                        radius="md"
                    />
                    <Textarea
                        label="Açıklama"
                        value={editFormData.description}
                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        required
                        minRows={3}
                        radius="md"
                    />
                    <Group grow>
                        <TextInput
                            label="Başlangıç Tarihi"
                            type="date"
                            value={editFormData.start_date}
                            onChange={(e) => setEditFormData({ ...editFormData, start_date: e.target.value })}
                            required
                            radius="md"
                        />
                        <TextInput
                            label="Bitiş Tarihi"
                            type="date"
                            value={editFormData.end_date}
                            onChange={(e) => setEditFormData({ ...editFormData, end_date: e.target.value })}
                            required
                            radius="md"
                        />
                    </Group>
                    <Textarea
                        label="Teşekkür Mesajı"
                        value={editFormData.thank_you_message}
                        onChange={(e) => setEditFormData({ ...editFormData, thank_you_message: e.target.value })}
                        required
                        minRows={2}
                        radius="md"
                    />
                    <TextInput
                        label="İletişim E-posta"
                        value={editFormData.contact_email}
                        onChange={(e) => setEditFormData({ ...editFormData, contact_email: e.target.value })}
                        required
                        type="email"
                        radius="md"
                    />
                    <Group justify="end" gap="sm" mt="md">
                        <Button variant="default" onClick={closeEdit} radius="md">
                            İptal
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            loading={uploading}
                            leftSection={<IconCheck size={16} />}
                            radius="md"
                        >
                            Güncelle
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Delete Campaign Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title={
                    <Group gap="sm">
                        <ThemeIcon size="sm" variant="light" color="red">
                            <IconTrash size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Kampanyayı Sil</Text>
                    </Group>
                }
                centered
                size="sm"
                radius="md"
            >
                <Stack gap="lg">
                    <Text>Bu kampanyayı kalıcı olarak silmek istediğinizden emin misiniz?</Text>
                    <Card withBorder p="md" radius="md" bg="red.0">
                        <Stack gap="xs">
                            <Text fw={500} c="red">
                                {selectedCampaign?.title}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {selectedCampaign?.description}
                            </Text>
                        </Stack>
                    </Card>
                    <Group justify="end" gap="sm">
                        <Button variant="default" onClick={close} radius="md">
                            İptal
                        </Button>
                        <Button
                            color="red"
                            onClick={confirmDelete}
                            loading={uploading}
                            leftSection={<IconTrash size={16} />}
                            radius="md"
                        >
                            Sil
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
                        <ThemeIcon color="green" size="sm" radius="md">
                            <IconCheck size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Kampanya Başarıyla Oluşturuldu!</Text>
                    </Group>
                }
                centered
                size="md"
                radius="md"
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
                            radius="md"
                        >
                            {copied ? 'Kopyalandı!' : 'URL Kopyala'}
                        </Button>
                        <Button
                            leftSection={<IconQrcode size={16} />}
                            onClick={goToQrCreation}
                            size="sm"
                            color="#fab005"
                            radius="md"
                        >
                            QR Kod Oluştur
                        </Button>
                    </Group>

                    <Divider />

                    <Text size="xs" c="dimmed" ta="center">
                        QR kod oluşturarak kampanyanızı fiziksel olarak da paylaşabilirsiniz.
                    </Text>

                    <Group justify="center" mt="md">
                        <Button variant="default" onClick={closeSuccess} size="sm" radius="md">
                            Tamam
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Winner Selection Modal */}
            <Modal
                opened={winnerOpened}
                onClose={closeWinner}
                title={
                    <Group gap="sm">
                        <ThemeIcon size="sm" variant="light" color="green">
                            <IconTrophy size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Kazanan Seç</Text>
                    </Group>
                }
                centered
                size="md"
                radius="md"
            >
                <Stack gap="lg">
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
                        <Group justify="center" mt="md" gap="sm">
                            <Button variant="default" onClick={closeWinner} radius="md">
                                İptal
                            </Button>
                            <Button
                                color="green"
                                onClick={confirmSelectWinner}
                                leftSection={<IconTrophy size={16} />}
                                loading={winnerLoading}
                                radius="md"
                            >
                                {winnerLoading ? 'Seçiliyor...' : 'Kazananları Seç'}
                            </Button>
                        </Group>
                    )}
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
                radius="md"
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
                            placeholder="Ad, email, telefon veya mesajda ara..."
                            leftSection={<IconSearch size={16} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            radius="md"
                        />

                        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                            <Table
                                striped
                                highlightOnHover
                                withTableBorder
                                withColumnBorders
                                verticalSpacing="sm"
                                horizontalSpacing="md"
                                style={{ minWidth: 800 }}
                            >
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
                                                    <Text size="sm" c="dimmed">
                                                        {index + 1}
                                                    </Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text size="sm" fw={500}>
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
                            <ThemeIcon size={80} radius="md" color="gray" variant="light">
                                <IconUsers size={40} />
                            </ThemeIcon>
                            <Text size="lg" c="dimmed">
                                Henüz katılımcı bulunmuyor
                            </Text>
                        </Stack>
                    </Center>
                )}
            </Modal>
        </Container>
    );
}
