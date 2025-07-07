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
                <Center>
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
                <Alert icon={<IconAlertCircle size={16} />} title="Kampanya Bulunamadı" color="red">
                    Aradığınız kampanya bulunamadı veya artık mevcut değil.
                </Alert>
            </Container>
        );
    }

    const status = getCampaignStatus();

    return (
        <Container size="sm" py="xl">
            {/* Kampanya Başlığı ve Durum */}
            <Paper withBorder radius="lg" p="xl" mb="lg">
                <Stack gap="lg" align="center">
                    <ThemeIcon size={60} radius="xl" color="#e64980" variant="light">
                        <IconGift size={30} />
                    </ThemeIcon>
                    
                    <Stack gap="xs" align="center">
                        <Title order={1} ta="center" c="#e64980">
                            {campaign.title}
                        </Title>
                        <Badge size="lg" color={status.color}>
                            {status.status}
                        </Badge>
                    </Stack>

                    <Text size="lg" ta="center" c="dimmed" style={{ lineHeight: 1.6 }}>
                        {campaign.description}
                    </Text>

                    <Group gap="lg" c="dimmed">
                        <Group gap="xs">
                            <IconCalendar size={16} />
                            <Text size="sm">
                                {new Date(campaign.start_date).toLocaleDateString('tr-TR')} - {new Date(campaign.end_date).toLocaleDateString('tr-TR')}
                            </Text>
                        </Group>
                    </Group>
                </Stack>
            </Paper>

            {/* Katılım Formu */}
            {canParticipate() && !formSubmitted ? (
                <Paper withBorder radius="lg" p="xl">
                    <Stack gap="lg">
                        <Title order={2} ta="center" c="#e64980">
                            Çekilişe Katıl
                        </Title>
                        
                        <form onSubmit={handleSubmit}>
                            <Stack gap="md">
                                <TextInput
                                    label="Ad Soyad"
                                    placeholder="Adınızı ve soyadınızı girin"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    leftSection={<IconUser size={16} />}
                                    size="md"
                                    radius="md"
                                />
                                
                                <TextInput
                                    label="E-posta"
                                    placeholder="E-posta adresinizi girin"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    leftSection={<IconMail size={16} />}
                                    size="md"
                                    radius="md"
                                    type="email"
                                />
                                
                                <TextInput
                                    label="Telefon (Opsiyonel)"
                                    placeholder="Telefon numaranızı girin"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    leftSection={<IconPhone size={16} />}
                                    size="md"
                                    radius="md"
                                />
                                
                                <Button
                                    type="submit"
                                    size="lg"
                                    radius="md"
                                    color="#e64980"
                                    loading={submitting}
                                    fullWidth
                                    leftSection={<IconGift size={20} />}
                                >
                                    {submitting ? 'Gönderiliyor...' : 'Çekilişe Katıl'}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            ) : canParticipate() && formSubmitted ? (
                <Paper withBorder radius="lg" p="xl">
                    <Stack gap="md" align="center">
                        <ThemeIcon size={50} radius="xl" color="green" variant="light">
                            <IconCheck size={25} />
                        </ThemeIcon>
                        
                        <Title order={3} ta="center" c="green">
                            Katılımınız Alındı!
                        </Title>
                        
                        <Text ta="center" c="dimmed">
                            Çekilişe başarıyla katıldınız. Kazananlar e-posta ile bilgilendirilecektir.
                        </Text>
                    </Stack>
                </Paper>
            ) : (
                <Paper withBorder radius="lg" p="xl">
                    <Stack gap="md" align="center">
                        <ThemeIcon size={50} radius="xl" color={status.color} variant="light">
                            <IconAlertCircle size={25} />
                        </ThemeIcon>
                        
                        <Title order={3} ta="center" c={status.color}>
                            {status.status === 'Yakında' ? 'Kampanya Henüz Başlamadı' : 
                             status.status === 'Sona Erdi' ? 'Kampanya Sona Erdi' : 
                             'Kampanya Şu Anda Aktif Değil'}
                        </Title>
                        
                        <Text ta="center" c="dimmed">
                            {status.status === 'Yakında' ? 
                                `Kampanya ${new Date(campaign.start_date).toLocaleDateString('tr-TR')} tarihinde başlayacak.` :
                             status.status === 'Sona Erdi' ? 
                                `Kampanya ${new Date(campaign.end_date).toLocaleDateString('tr-TR')} tarihinde sona erdi.` :
                                'Bu kampanya şu anda katılıma kapalı.'
                            }
                        </Text>
                    </Stack>
                </Paper>
            )}

            {/* Başarı Modal */}
            <Modal 
                opened={successModalOpened} 
                onClose={() => setSuccessModalOpened(false)} 
                title={
                    <Group gap="sm">
                        <ThemeIcon color="green" size="sm" radius="xl">
                            <IconCheck size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Katılım Başarılı!</Text>
                    </Group>
                } 
                centered 
                size="md"
            >
                <Stack gap="lg">
                    <Text size="sm" c="dimmed">
                        {campaign.thank_you_message}
                    </Text>
                    
                    <Box p="md" style={{ background: '#f8f9fa' }}>
                        <Text size="xs" fw={600} c="dimmed" mb="xs">Kampanya Detayları:</Text>
                        <Text size="sm" fw={500}>{campaign.title}</Text>
                        <Text size="xs" c="dimmed">
                            Bitiş: {new Date(campaign.end_date).toLocaleDateString('tr-TR')}
                        </Text>
                    </Box>

                    <Button 
                        onClick={() => setSuccessModalOpened(false)} 
                        fullWidth
                        color="#e64980"
                    >
                        Tamam
                    </Button>
                </Stack>
            </Modal>

            {/* Footer */}
            <Paper withBorder radius="lg" p="md" mt="xl">
                <Stack gap="xs" align="center">
                    <Text size="sm" c="dimmed" ta="center">
                        Bu sayfa VunQR tarafından oluşturuldu
                    </Text>
                    <Text size="sm" ta="center">
                        <Text component="span" c="dimmed">Dijital iletişim çözümleri için </Text>
                        <Text component="a" href="https://vunqr.com" target="_blank" rel="noopener noreferrer" 
                              style={{ color: '#e64980', textDecoration: 'none', fontWeight: 600 }}>
                            vunqr.com
                        </Text>
                        <Text component="span" c="dimmed"> u ziyaret edin</Text>
                    </Text>
                </Stack>
            </Paper>

            <style jsx global>{`
                @media (max-width: 600px) {
                    .mantine-Container-root {
                        padding: 0 16px !important;
                    }
                    
                    .mantine-Paper-root {
                        padding: 20px !important;
                    }
                    
                    .mantine-Title-root {
                        font-size: 24px !important;
                    }
                    
                    .mantine-TextInput-root {
                        margin-bottom: 12px !important;
                    }
                    
                    .mantine-TextInput-label {
                        font-size: 14px !important;
                        margin-bottom: 4px !important;
                    }
                    
                    .mantine-TextInput-input {
                        font-size: 16px !important;
                        padding: 12px !important;
                        min-height: 48px !important;
                        padding-left: 40px !important;
                    }
                    
                    .mantine-TextInput-section {
                        width: 40px !important;
                        left: 0 !important;
                    }
                    
                    .mantine-TextInput-section svg {
                        width: 18px !important;
                        height: 18px !important;
                    }
                    
                    .mantine-Button-root {
                        min-height: 48px !important;
                        font-size: 16px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .mantine-Container-root {
                        padding: 0 12px !important;
                    }
                    
                    .mantine-Paper-root {
                        padding: 16px !important;
                    }
                    
                    .mantine-Title-root {
                        font-size: 20px !important;
                    }
                    
                    .mantine-TextInput-input {
                        padding-left: 36px !important;
                    }
                    
                    .mantine-TextInput-section {
                        width: 36px !important;
                    }
                    
                    .mantine-TextInput-section svg {
                        width: 16px !important;
                        height: 16px !important;
                    }
                }
            `}</style>
        </Container>
    );
}
