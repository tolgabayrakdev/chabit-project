'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Button, Group, Badge, Stack, Image, Modal, Menu, Center, Loader, TextInput, FileInput, Paper, Divider, ActionIcon, Tooltip, ThemeIcon } from '@mantine/core';
import { IconFileTypePdf, IconUpload, IconTrash, IconEye, IconDownload, IconPlus, IconFile, IconEdit, IconExternalLink } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

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
    const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
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
                notifications.show({
                    title: 'Başarılı',
                    message: 'Menü başarıyla yüklendi',
                    color: 'green'
                });
                closeUpload();
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
                    <Group grow>
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
                    </Group>
                    <Button
                        onClick={openUpload}
                        disabled={!formData.name || !formData.menuPdf}
                        radius="xl"
                        size="md"
                        color="#fab005"
                        style={{ width: "100%" }}
                        leftSection={<IconPlus size={16} />}
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
                                    <Group justify="space-between">
                                        <Button 
                                            component="a" 
                                            href={`/menu/${menu.id}`} 
                                            target="_blank" 
                                            variant="subtle" 
                                            color="#fab005" 
                                            leftSection={<IconExternalLink size={14} />}
                                            size="xs"
                                        >
                                            Görüntüle
                                        </Button>
                                        <Group gap="xs">
                                            <ActionIcon 
                                                color="blue" 
                                                variant="subtle" 
                                                onClick={() => handleEdit(menu)}
                                                size="sm"
                                            >
                                                <IconEdit size={14} />
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="green" 
                                                variant="subtle" 
                                                onClick={() => handleDownload(menu)}
                                                size="sm"
                                            >
                                                <IconDownload size={14} />
                                            </ActionIcon>
                                            <ActionIcon 
                                                color="red" 
                                                variant="subtle" 
                                                onClick={() => handleDelete(menu)}
                                                size="sm"
                                            >
                                                <IconTrash size={14} />
                                            </ActionIcon>
                                        </Group>
                                    </Group>
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

            {/* Upload Modal */}
            <Modal opened={uploadOpened} onClose={closeUpload} title="Yeni Menü Ekle" centered size="md">
                <Stack gap="md">
                    <TextInput
                        label="Menü Adı"
                        placeholder="Menü adını girin"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <FileInput
                        label="PDF Dosyası"
                        placeholder="PDF dosyası seçin"
                        accept=".pdf"
                        leftSection={<IconFile size={16} />}
                        value={formData.menuPdf}
                        onChange={(file) => setFormData({ ...formData, menuPdf: file })}
                        required
                    />
                    <Group justify="flex-end" mt="md">
                        <Button variant="default" onClick={closeUpload}>İptal</Button>
                        <Button 
                            onClick={handleUpload} 
                            loading={uploading}
                            disabled={!formData.name || !formData.menuPdf}
                        >
                            Yükle
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Edit Modal */}
            <Modal opened={editOpened} onClose={closeEdit} title="Menü Düzenle" centered size="md">
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
                    <Group justify="flex-end" mt="md">
                        <Button variant="default" onClick={closeEdit}>İptal</Button>
                        <Button 
                            onClick={handleUpdate} 
                            loading={uploading}
                            disabled={!editFormData.name}
                        >
                            Güncelle
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal opened={opened} onClose={close} title="Menü Sil" centered>
                <Text>Bu menüyü silmek istediğinizden emin misiniz?</Text>
                <Text size="sm" c="dimmed" mt="xs">
                    {selectedMenu?.name}
                </Text>
                <Group justify="flex-end" mt="xl">
                    <Button variant="default" onClick={close}>İptal</Button>
                    <Button color="red" onClick={confirmDelete}>Sil</Button>
                </Group>
            </Modal>
        </Container>
    );
}

