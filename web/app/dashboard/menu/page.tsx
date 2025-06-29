'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu, Center, Loader, TextInput, FileInput, Paper, Divider, ActionIcon, Tooltip, ThemeIcon } from '@mantine/core';
import { IconFileTypePdf, IconUpload, IconTrash, IconEye, IconDownload, IconPlus, IconFile, IconEdit, IconExternalLink, IconQrcode, IconCopy, IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

interface Menu {
    id: string;
    user_id: string;
    name: string;
    url: string;
    public_id: string;
    created_at: string;
}

export default function MenusPage() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [successOpened, { open: openSuccess, close: closeSuccess }] = useDisclosure(false);
    const [newlyCreatedMenu, setNewlyCreatedMenu] = useState<Menu | null>(null);
    const [copied, setCopied] = useState(false);
    const [copiedMenuId, setCopiedMenuId] = useState<string | null>(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        menuPdf: null as File | null
    });
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        menuPdf: null as File | null
    });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await fetch(`/api/menu`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setMenus(data);
            }
        } catch (error) {
            console.error('Error fetching menus:', error);
            notifications.show({
                title: 'Hata',
                message: 'Menüler yüklenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!formData.name || !formData.menuPdf) {
            notifications.show({
                title: 'Uyarı',
                message: 'Lütfen tüm alanları doldurun',
                color: 'yellow'
            });
            return;
        }

        setUploading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('menuPdf', formData.menuPdf);

            const response = await fetch(`/api/menu`, {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include',
            });

            if (response.ok) {
                const newMenu = await response.json();
                setNewlyCreatedMenu(newMenu);
                openSuccess();
                setFormData({ name: '', menuPdf: null });
                fetchMenus();
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Menü yüklenirken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Error uploading menu:', error);
            notifications.show({
                title: 'Hata',
                message: 'Menü yüklenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setUploading(false);
        }
    };

    const copyMenuUrl = async () => {
        if (!newlyCreatedMenu) return;
        
        const menuUrl = `${window.location.origin}/menu/${newlyCreatedMenu.id}`;
        try {
            await navigator.clipboard.writeText(menuUrl);
            setCopied(true);
            notifications.show({
                title: 'Başarılı',
                message: 'Menü URL\'si kopyalandı',
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

    const copyExistingMenuUrl = async (menuId: string) => {
        const menuUrl = `${window.location.origin}/menu/${menuId}`;
        try {
            await navigator.clipboard.writeText(menuUrl);
            setCopiedMenuId(menuId);
            notifications.show({
                title: 'Başarılı',
                message: 'Menü URL\'si kopyalandı',
                color: 'green'
            });
            setTimeout(() => setCopiedMenuId(null), 2000);
        } catch (error) {
            notifications.show({
                title: 'Hata',
                message: 'URL kopyalanamadı',
                color: 'red'
            });
        }
    };

    const goToQrCreation = () => {
        if (!newlyCreatedMenu) return;
        const menuUrl = `${window.location.origin}/menu/${newlyCreatedMenu.id}`;
        router.push(`/dashboard/url?url=${encodeURIComponent(menuUrl)}`);
    };

    const handleDelete = async (menu: Menu) => {
        setSelectedMenu(menu);
        open();
    };

    const confirmDelete = async () => {
        if (!selectedMenu) return;
        try {
            const response = await fetch(`/api/menu/${selectedMenu.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setMenus(menus.filter(menu => menu.id !== selectedMenu.id));
                close();
                notifications.show({
                    title: 'Başarılı',
                    message: 'Menü başarıyla silindi',
                    color: 'green'
                });
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Menü silinirken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Menu deletion error:', error);
            notifications.show({
                title: 'Hata',
                message: 'Menü silinirken bir hata oluştu',
                color: 'red'
            });
        }
    };

    const handleDownload = async (menu: Menu) => {
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
            notifications.show({
                title: 'Hata',
                message: 'Dosya indirilemedi',
                color: 'red'
            });
        }
    };

    const openMenuInNewTab = (menu: Menu) => {
        window.open(`/menu/${menu.id}`, '_blank');
    };

    const handleEdit = (menu: Menu) => {
        setEditFormData({
            id: menu.id,
            name: menu.name,
            menuPdf: null
        });
        openEdit();
    };

    const handleUpdate = async () => {
        if (!editFormData.name) {
            notifications.show({
                title: 'Uyarı',
                message: 'Lütfen menü adını girin',
                color: 'yellow'
            });
            return;
        }

        setUploading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', editFormData.name);
            if (editFormData.menuPdf) {
                formDataToSend.append('menuPdf', editFormData.menuPdf);
            }

            const response = await fetch(`/api/menu/${editFormData.id}`, {
                method: 'PUT',
                body: formDataToSend,
                credentials: 'include',
            });

            if (response.ok) {
                notifications.show({
                    title: 'Başarılı',
                    message: 'Menü başarıyla güncellendi',
                    color: 'green'
                });
                closeEdit();
                setEditFormData({ id: '', name: '', menuPdf: null });
                fetchMenus();
            } else {
                const errorData = await response.json();
                notifications.show({
                    title: 'Hata',
                    message: errorData.message || 'Menü güncellenirken bir hata oluştu',
                    color: 'red'
                });
            }
        } catch (error) {
            console.error('Error updating menu:', error);
            notifications.show({
                title: 'Hata',
                message: 'Menü güncellenirken bir hata oluştu',
                color: 'red'
            });
        } finally {
            setUploading(false);
        }
    };

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
                    alignItems: 'center',
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
                            gap: 12,
                        }
                    }
                }}
            >
                <ThemeIcon color="#fab005" size={36} radius="xl" variant="light">
                    <IconFileTypePdf size={20} />
                </ThemeIcon>
                <div>
                    <Text size="md" fw={600} c="#fab005">Menü Yönetimi nedir?</Text>
                    <Text size="sm" c="#fab005">
                        Restoran menülerinizi dijital ortamda yönetin! PDF menülerinizi yükleyin ve <b>vunqr.com/menu/menu-id</b> adresiyle müşterilerinizle paylaşın.
                    </Text>
                </div>
            </Paper>

            <Paper withBorder radius="lg" p={24} style={{ width: "100%", maxWidth: 800, marginTop: 24, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Title order={2} mb="lg" ta="center" c="#fab005">
                    Yeni Menü Ekle
                </Title>
                <Stack gap="md" style={{ width: "100%" }}>
                    <Stack gap="md">
                        <TextInput
                            label="Menü Adı"
                            placeholder="Menü adını girin"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            size="md"
                            radius="md"
                            required
                        />
                        <FileInput
                            label="PDF Dosyası"
                            placeholder="PDF dosyası seçin"
                            accept=".pdf"
                            leftSection={<IconFile size={16} />}
                            value={formData.menuPdf}
                            onChange={(file) => setFormData({ ...formData, menuPdf: file })}
                            size="md"
                            radius="md"
                            required
                        />
                    </Stack>
                    <Button
                        onClick={handleUpload}
                        disabled={!formData.name || !formData.menuPdf}
                        radius="xl"
                        size="md"
                        color="#fab005"
                        style={{ width: "100%" }}
                        leftSection={<IconPlus size={16} />}
                        loading={uploading}
                    >
                        Menü Ekle
                    </Button>
                </Stack>
            </Paper>

            {/* Mevcut Menüler Listesi */}
            {loading ? (
                <Center mt="xl"><Loader color="#fab005" /></Center>
            ) : menus.length > 0 ? (
                <Paper withBorder radius="lg" p={24} mt="xl" style={{ width: '100%', maxWidth: 800 }}>
                    <Title order={3} ta="center" mb="lg" c="#fab005">Mevcut Menülerim</Title>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                        {menus.map(menu => (
                            <Paper key={menu.id} p="md" radius="md" withBorder>
                                <Stack gap="sm">
                                    <Text fw={500} size="md" truncate>{menu.name}</Text>
                                    <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                                        vunqr.com/menu/{menu.id}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {new Date(menu.created_at).toLocaleDateString('tr-TR', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </Text>
                                    <Stack gap="xs">
                                        <Button 
                                            component="a" 
                                            href={`/menu/${menu.id}`} 
                                            target="_blank" 
                                            variant="subtle" 
                                            color="#fab005" 
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
                                                onClick={() => handleEdit(menu)}
                                                size="md"
                                            >
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="green" 
                                                variant="subtle" 
                                                onClick={() => handleDownload(menu)}
                                                size="md"
                                            >
                                                <IconDownload size={16} />
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="orange" 
                                                variant="subtle" 
                                                onClick={() => copyExistingMenuUrl(menu.id)}
                                                size="md"
                                            >
                                                {copiedMenuId === menu.id ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="red" 
                                                variant="subtle" 
                                                onClick={() => handleDelete(menu)}
                                                size="md"
                                            >
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Group>
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Paper>
            ) : (
                <Paper withBorder radius="lg" p={24} mt="xl" style={{ width: '100%', maxWidth: 800 }}>
                    <Text ta="center" c="dimmed">
                        Henüz hiç menü yüklemediniz.
                    </Text>
                </Paper>
            )}

            {/* Success Modal */}
            <Modal 
                opened={successOpened} 
                onClose={closeSuccess} 
                title={
                    <Group gap="sm">
                        <ThemeIcon color="green" size="sm" radius="xl">
                            <IconCheck size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Menü Başarıyla Oluşturuldu!</Text>
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
                        <strong>{newlyCreatedMenu?.name}</strong> menünüz başarıyla yüklendi. 
                        Müşterilerinizle paylaşmak için aşağıdaki seçenekleri kullanabilirsiniz:
                    </Text>
                    
                    <Paper p="md" radius="md" withBorder style={{ background: '#f8f9fa' }}>
                        <Text size="xs" fw={600} c="dimmed" mb="xs">Menü URL'si:</Text>
                        <Text size="sm" style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {newlyCreatedMenu ? `${window.location.origin}/menu/${newlyCreatedMenu.id}` : ''}
                        </Text>
                    </Paper>

                    <Group gap="sm" justify="center">
                        <Button
                            variant="outline"
                            leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                            onClick={copyMenuUrl}
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
                        QR kod oluşturarak menünüzü fiziksel olarak da paylaşabilirsiniz.
                    </Text>

                    <Group justify="center" mt="md">
                        <Button variant="default" onClick={closeSuccess} size="sm">
                            Tamam
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Edit Modal */}
            <Modal opened={editOpened} onClose={closeEdit} title="Menü Düzenle" centered size="md" styles={{ root: { '@media (maxWidth: 768px)': { width: '95%' } } }}>
                <Stack gap="md">
                    <TextInput
                        label="Menü Adı"
                        placeholder="Menü adını girin"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        required
                    />
                    <FileInput
                        label="PDF Dosyası (Opsiyonel)"
                        placeholder="Yeni PDF dosyası seçin"
                        accept=".pdf"
                        leftSection={<IconFile size={16} />}
                        value={editFormData.menuPdf}
                        onChange={(file) => setEditFormData({ ...editFormData, menuPdf: file })}
                    />
                    <Text size="xs" c="dimmed">
                        * PDF dosyası seçmezseniz mevcut dosya korunacaktır
                    </Text>
                    <Group justify="flex-end" mt="md" gap="xs">
                        <Button variant="default" onClick={closeEdit} size="sm">İptal</Button>
                        <Button 
                            onClick={handleUpdate} 
                            loading={uploading}
                            disabled={!editFormData.name}
                            size="sm"
                        >
                            Güncelle
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal opened={opened} onClose={close} title="Menü Sil" centered size="sm" styles={{ root: { '@media (maxWidth: 768px)': { width: '95%' } } }}>
                <Text>Bu menüyü silmek istediğinizden emin misiniz?</Text>
                <Text size="sm" c="dimmed" mt="xs">
                    {selectedMenu?.name}
                </Text>
                <Group justify="flex-end" mt="xl" gap="xs">
                    <Button variant="default" onClick={close} size="sm">İptal</Button>
                    <Button color="red" onClick={confirmDelete} size="sm">Sil</Button>
                </Group>
            </Modal>
        </Container>
    );
}

