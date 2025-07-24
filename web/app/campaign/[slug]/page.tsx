'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Paper, Stack, TextInput, Group, Badge, ThemeIcon, Center, Loader, Alert, Modal, Box } from '@mantine/core';
import { IconGift, IconCalendar, IconUser, IconMail, IconPhone, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';

interface Campaign {
    id: string;
    user_id: string;
    title: string;
    description: string;
    slug: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    thank_you_message: string;
    created_at: string;
    updated_at: string;
}

export default function CampaignPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [successModalOpened, setSuccessModalOpened] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (slug) {
            fetchCampaign();
        }
    }, [slug]);

    const fetchCampaign = async () => {
        try {
            const response = await fetch(`/api/campaign/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCampaign(data);
            }
        } catch (error) {
            console.error('Error fetching campaign:', error);
            notifications.show({
                title: 'Hata',
                message: 'Kampanya yüklenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email) {
            notifications.show({
                title: 'Uyarı',
                message: 'Lütfen ad ve e-posta alanlarını doldurun',
                color: 'yellow'
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            notifications.show({
                title: 'Uyarı',
                message: 'Lütfen geçerli bir e-posta adresi girin',
                color: 'yellow'
            });
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(`/api/campaign/${slug}/entry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessModalOpened(true);
                setFormSubmitted(true);
                setFormData({ name: '', email: '', phone: '' });
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Katılım gönderilirken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Error submitting entry:', error);
            notifications.show({
                title: 'Hata',
                message: 'Katılım gönderilirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const getCampaignStatus = () => {
        if (!campaign) return { status: 'Yükleniyor', color: 'gray' };
        
        const now = new Date();
        const startDate = new Date(campaign.start_date);
        const endDate = new Date(campaign.end_date);

        if (!campaign.is_active) {
            return { status: 'Pasif', color: 'red' };
        } else if (now < startDate) {
            return { status: 'Yakında', color: 'blue' };
        } else if (now >= startDate && now <= endDate) {
            return { status: 'Aktif', color: 'green' };
        } else {
            return { status: 'Sona Erdi', color: 'red' };
        }
    };

    const canParticipate = () => {
        if (!campaign) return false;
        
        const status = getCampaignStatus();
        return status.status === 'Aktif';
    };

    if (loading) {
        return (
            <Container size="sm" py="xl">
                <Center style={{ minHeight: '60vh' }}>
                    <Stack align="center" gap="md">
                        <Loader color="#e64980" size="lg" />
                        <Text c="dimmed">Kampanya yükleniyor...</Text>
                    </Stack>
                </Center>
            </Container>
        );
    }

    if (!campaign) {
        return (
            <Container size="sm" py="xl">
                <Center style={{ minHeight: '60vh' }}>
                    <Alert 
                        icon={<IconAlertCircle size={20} />} 
                        title="Kampanya Bulunamadı" 
                        color="red"
                        radius="md"
                        variant="light"
                        w="100%"
                        maw={400}
                    >
                        Aradığınız kampanya bulunamadı veya artık mevcut değil.
                    </Alert>
                </Center>
            </Container>
        );
    }

    const status = getCampaignStatus();

    return (
        <Container size="sm" py="xl">
            {/* Header */}
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
                }}
            >
                <ThemeIcon 
                    color="#e64980" 
                    size={36} 
                    radius="md" 
                    variant="light"
                >
                    <IconGift size={20} />
                </ThemeIcon>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Group gap="xs" align="center" wrap="nowrap">
                        <Text size="md" fw={600} c="#e64980" style={{ wordBreak: 'break-word' }}>
                            {campaign.title}
                        </Text>
                        <Badge color={status.color} size="sm">
                            {status.status}
                        </Badge>
                    </Group>
                    <Text size="sm" c="#e64980" style={{ wordBreak: 'break-word', lineHeight: 1.5 }}>
                        {campaign.description}
                    </Text>
                    <Group gap="xs" mt="xs">
                        <IconCalendar size={14} color="var(--mantine-color-dimmed)" />
                        <Text size="xs" c="dimmed">
                            {new Date(campaign.start_date).toLocaleDateString('tr-TR')} - {new Date(campaign.end_date).toLocaleDateString('tr-TR')}
                        </Text>
                    </Group>
                </div>
            </Paper>

            {/* Form Content */}
            <Paper withBorder radius="md" p="xl">
                <Stack gap="lg">
                    {canParticipate() && !formSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <Stack gap="md">
                                <TextInput
                                    label="Ad Soyad"
                                    placeholder="Adınızı ve soyadınızı girin"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    leftSection={<IconUser size={16} />}
                                    radius="md"
                                />
                                
                                <TextInput
                                    label="E-posta"
                                    placeholder="E-posta adresinizi girin"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    leftSection={<IconMail size={16} />}
                                    radius="md"
                                    type="email"
                                />
                                
                                <TextInput
                                    label="Telefon (Opsiyonel)"
                                    placeholder="Telefon numaranızı girin"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    leftSection={<IconPhone size={16} />}
                                    radius="md"
                                />
                                
                                <Button
                                    type="submit"
                                    radius="md"
                                    color="#e64980"
                                    loading={submitting}
                                    fullWidth
                                    leftSection={<IconGift size={16} />}
                                >
                                    {submitting ? 'Gönderiliyor...' : 'Çekilişe Katıl'}
                                </Button>
                            </Stack>
                        </form>
                    ) : canParticipate() && formSubmitted ? (
                        <Stack gap="md" align="center">
                            <ThemeIcon 
                                size={40} 
                                radius="md" 
                                color="green" 
                                variant="light"
                            >
                                <IconCheck size={20} />
                            </ThemeIcon>
                            <Stack gap="xs" align="center">
                                <Title order={3} ta="center" c="green" size="h5">
                                    Katılımınız Alındı!
                                </Title>
                                <Text ta="center" c="dimmed" size="sm">
                                    Çekilişe başarıyla katıldınız. Kazananlar e-posta ile bilgilendirilecektir.
                                </Text>
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack gap="md" align="center">
                            <ThemeIcon 
                                size={40} 
                                radius="md" 
                                color={status.color} 
                                variant="light"
                            >
                                <IconAlertCircle size={20} />
                            </ThemeIcon>
                            <Stack gap="xs" align="center">
                                <Title order={3} ta="center" c={status.color} size="h5">
                                    {status.status === 'Yakında' ? 'Kampanya Henüz Başlamadı' : 
                                     status.status === 'Sona Erdi' ? 'Kampanya Sona Erdi' : 
                                     'Kampanya Şu Anda Aktif Değil'}
                                </Title>
                                <Text ta="center" c="dimmed" size="sm">
                                    {status.status === 'Yakında' ? 
                                        `Kampanya ${new Date(campaign.start_date).toLocaleDateString('tr-TR')} tarihinde başlayacak.` :
                                     status.status === 'Sona Erdi' ? 
                                        `Kampanya ${new Date(campaign.end_date).toLocaleDateString('tr-TR')} tarihinde sona erdi.` :
                                        'Bu kampanya şu anda katılıma kapalı.'
                                    }
                                </Text>
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Paper>

            {/* Success Modal */}
            <Modal
                opened={successModalOpened}
                onClose={() => setSuccessModalOpened(false)}
                title={
                    <Group gap="xs">
                        <ThemeIcon 
                            color="green" 
                            size="sm" 
                            radius="md"
                            variant="light"
                        >
                            <IconCheck size={14} />
                        </ThemeIcon>
                        <Text fw={600} size="sm">Katılım Başarılı!</Text>
                    </Group>
                }
                centered
                size="sm"
                radius="md"
            >
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        {campaign.thank_you_message}
                    </Text>
                    
                    <Paper withBorder p="sm" radius="md" bg="gray.0">
                        <Stack gap="xs">
                            <Text size="xs" fw={500} c="dimmed">Kampanya Detayları:</Text>
                            <Text size="sm" fw={500}>{campaign.title}</Text>
                            <Text size="xs" c="dimmed">
                                Bitiş: {new Date(campaign.end_date).toLocaleDateString('tr-TR')}
                            </Text>
                        </Stack>
                    </Paper>

                    <Button
                        onClick={() => setSuccessModalOpened(false)}
                        fullWidth
                        color="#e64980"
                        radius="md"
                    >
                        Tamam
                    </Button>
                </Stack>
            </Modal>

            {/* Footer */}
            <Paper withBorder radius="md" p="sm" mt="xl">
                <Stack gap="xs" align="center">
                    <Text size="xs" c="dimmed" ta="center">
                        Bu sayfa VunQR tarafından oluşturuldu
                    </Text>
                    <Text size="xs" ta="center">
                        <Text component="span" c="dimmed">Dijital iletişim çözümleri için </Text>
                        <Text 
                            component="a" 
                            href="https://vunqr.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: '#e64980', textDecoration: 'none', fontWeight: 600 }}
                        >
                            vunqr.com
                        </Text>
                        <Text component="span" c="dimmed"> u ziyaret edin</Text>
                    </Text>
                </Stack>
            </Paper>

            <style jsx global>{`
                @media (max-width: 600px) {
                    .mantine-Container-root {
                        padding: 16px !important;
                    }
                    .mantine-Paper-root {
                        padding: 16px !important;
                    }
                    .mantine-TextInput-root,
                    .mantine-Textarea-root {
                        margin-bottom: 0 !important;
                    }
                    .mantine-TextInput-label,
                    .mantine-Textarea-label {
                        font-size: 14px !important;
                        margin-bottom: 4px !important;
                    }
                    .mantine-TextInput-input,
                    .mantine-Textarea-input {
                        font-size: 14px !important;
                        padding: 8px 12px !important;
                        min-height: 36px !important;
                    }
                    .mantine-Button-root {
                        height: 36px !important;
                        font-size: 14px !important;
                    }
                    .mantine-Title-root {
                        font-size: 16px !important;
                    }
                    .mantine-Text-root {
                        font-size: 13px !important;
                    }
                }
            `}</style>
        </Container>
    );
}
