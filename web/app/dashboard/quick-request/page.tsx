"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  Textarea,
  Button,
  Stack,
  Text,
  Group,
  Loader,
  Notification,
  Table,
  Badge,
  ActionIcon,
  Modal,
  Select,
  ThemeIcon,
  Divider,
  Card,
  Grid,
  SimpleGrid,
  Box,
  Collapse,
  rem,
  Indicator,
  Avatar,
} from "@mantine/core";
import {
  IconEye,
  IconTrash,
  IconCheck,
  IconPlus,
  IconEdit,
  IconUsers,
  IconInfoCircle,
  IconBell,
  IconMail,
  IconPhone,
  IconChevronUp,
  IconChevronDown,
  IconExternalLink,
  IconCalendar,
  IconMessage,
  IconUser,
  IconSettings,
  IconAlertCircle,
  IconClipboardList,
  IconDots,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface QuickRequestForm {
  id: string;
  slug: string;
  title: string;
  description: string;
  created_at: string;
  requests?: QuickRequestEntry[];
}

interface QuickRequestEntry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  is_read: boolean;
  created_at: string;
  notes?: string;
}

export default function QuickRequestPage() {
  // Form states
  const [forms, setForms] = useState<QuickRequestForm[]>([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<QuickRequestForm | null>(null);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [formData, setFormData] = useState({ slug: "", title: "", description: "" });
  const [slugError, setSlugError] = useState("");
  const [editFormData, setEditFormData] = useState({ id: "", slug: "", title: "", description: "" });
  const [uploading, setUploading] = useState(false);
  const [selectedDeleteForm, setSelectedDeleteForm] = useState<QuickRequestForm | null>(null);
  const router = useRouter();
  const [unreadCounts, setUnreadCounts] = useState<{ [slug: string]: number }>({});

  // Entry states
  const [entries, setEntries] = useState<QuickRequestEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [entriesModalOpened, setEntriesModalOpened] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<QuickRequestEntry | null>(null);
  const [entryModalOpened, setEntryModalOpened] = useState(false);
  const [note, setNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [readLoading, setReadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  // Formları getir
  useEffect(() => {
    setFormsLoading(true);
    fetch("/api/quick-request/form", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setForms(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => setForms([]))
      .finally(() => setFormsLoading(false));
  }, []);

  // Okunmamış sayıları topluca güncelleyen fonksiyon
  const fetchUnreadCounts = (formsList: QuickRequestForm[]) => {
    if (!formsList || formsList.length === 0) return;
    formsList.forEach(form => {
      fetch(`/api/quick-request/form/${form.slug}/unread-count`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          setUnreadCounts(prev => ({
            ...prev,
            [form.slug]: typeof data.unreadCount === 'number' ? data.unreadCount : 0
          }));
        })
        .catch(() => {
          setUnreadCounts(prev => ({ ...prev, [form.slug]: 0 }));
        });
    });
  };

  useEffect(() => {
    fetchUnreadCounts(forms);
  }, [forms]);

  useEffect(() => {
    if (forms.length === 0) return;
    const interval = setInterval(() => {
      fetchUnreadCounts(forms);
    }, 20000);
    return () => clearInterval(interval);
  }, [forms]);

  // Yeni form oluştur
  const handleCreate = async () => {
    setSlugError("");
    if (!formData.slug || !formData.title || !formData.description) {
      notifications.show({ title: "Uyarı", message: "Tüm alanları doldurun", color: "yellow" });
      return;
    }
    setUploading(true);
    try {
      const res = await fetch("/api/quick-request/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ slug: "", title: "", description: "" });
        setSlugError("");
        closeCreate();
        notifications.show({ title: "Başarılı", message: "Form oluşturuldu", color: "green" });
        
        setFormsLoading(true);
        fetch("/api/quick-request/form", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              setForms(Array.isArray(data) ? data : []);
            }
          })
          .catch(() => setForms([]))
          .finally(() => setFormsLoading(false));
      } else if (res.status === 409) {
        setSlugError("Bu slug kullanılıyor, lütfen başka bir slug seçin.");
      } else {
        const data = await res.json();
        notifications.show({ title: "Hata", message: data.message || "Bir hata oluştu", color: "red" });
      }
    } catch {
      notifications.show({ title: "Hata", message: "Bir hata oluştu", color: "red" });
    } finally {
      setUploading(false);
    }
  };

  // Formu düzenle
  const handleEdit = (form: QuickRequestForm) => {
    setEditFormData({ id: form.id, slug: form.slug, title: form.title, description: form.description });
    openEdit();
  };

  const handleUpdate = async () => {
    if (!editFormData.slug || !editFormData.title || !editFormData.description) {
      notifications.show({ title: "Uyarı", message: "Tüm alanları doldurun", color: "yellow" });
      return;
    }
    setUploading(true);
    try {
      const res = await fetch(`/api/quick-request/form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editFormData),
      });
      if (res.ok) {
        notifications.show({ title: "Başarılı", message: "Form güncellendi", color: "green" });
        closeEdit();
        setEditFormData({ id: "", slug: "", title: "", description: "" });
        
        setFormsLoading(true);
        fetch("/api/quick-request/form", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              setForms(Array.isArray(data) ? data : []);
            }
          })
          .catch(() => setForms([]))
          .finally(() => setFormsLoading(false));
      } else {
        const data = await res.json();
        notifications.show({ title: "Hata", message: data.message || "Bir hata oluştu", color: "red" });
      }
    } catch {
      notifications.show({ title: "Hata", message: "Bir hata oluştu", color: "red" });
    } finally {
      setUploading(false);
    }
  };

  // Form sil
  const handleDelete = (form: QuickRequestForm) => {
    setSelectedDeleteForm(form);
    openDelete();
  };

  const confirmDelete = async () => {
    if (!selectedDeleteForm) return;
    setUploading(true);
    try {
      const res = await fetch(`/api/quick-request/forms/${selectedDeleteForm.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        notifications.show({ title: "Başarılı", message: "Form silindi", color: "green" });
        closeDelete();
        setSelectedDeleteForm(null);
        setForms(forms.filter((f) => f.id !== selectedDeleteForm.id));
      } else {
        notifications.show({ title: "Hata", message: "Form silinemedi", color: "red" });
      }
    } catch {
      notifications.show({ title: "Hata", message: "Form silinemedi", color: "red" });
    } finally {
      setUploading(false);
    }
  };

  // Detay sayfasına yönlendir
  const handleGoToDetail = (form: QuickRequestForm) => {
    router.push(`/dashboard/quick-request/${form.id}`);
  };

  // Talep detay modalı aç
  const openEntryDetail = (entry: QuickRequestEntry) => {
    setSelectedEntry(entry);
    setNote(entry.notes || "");
    setStatusValue(entry.status);
    setSuccessMsg("");
    setErrorMsg("");
    setNoteOpen(!!entry.notes);
    setEntryModalOpened(true);
  };

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'blue';
      case 'in_progress': return 'yellow';
      case 'completed': return 'green';
      case 'closed': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Yeni';
      case 'in_progress': return 'İşlemde';
      case 'completed': return 'Tamamlandı';
      case 'closed': return 'Kapalı';
      default: return status;
    }
  };

  // Not kaydet
  const handleNoteSave = async () => {
    if (!selectedEntry) return;
    setNoteLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/quick-request/requests/${selectedEntry.id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ notes: note }),
      });
      if (res.ok) {
        setSuccessMsg("Not kaydedildi.");
        setSelectedEntry({ ...selectedEntry, notes: note });
      } else {
        setErrorMsg("Not kaydedilemedi.");
      }
    } catch {
      setErrorMsg("Not kaydedilemedi.");
    } finally {
      setNoteLoading(false);
    }
  };

  const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);

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
            <ThemeIcon size={42} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              <IconClipboardList size={24} />
            </ThemeIcon>
            <Stack gap={2}>
              <Group gap="xs" align="center">
                <Title order={2} size="h3">
                  Talep Formları Yönetimi
                </Title>
                {totalUnread > 0 && (
                  <Badge variant="light" color="red">
                    {totalUnread} okunmamış talep
                  </Badge>
                )}
              </Group>
              <Text size="sm" c="dimmed">
                Müşterilerinizden hızlıca talep toplayabileceğiniz formlar oluşturun ve yönetin
              </Text>
            </Stack>
          </Group>
          <Button
            onClick={openCreate}
            leftSection={<IconPlus size={16} />}
            size="sm"
            radius="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            ml="auto"
          >
            Yeni Form Oluştur
          </Button>
        </Group>
      </Card>

      {/* Forms Grid */}
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={2} size="h3">
            Formlarım
          </Title>
          <Badge variant="light" size="lg">
            {forms.length} form
          </Badge>
        </Group>

        {formsLoading ? (
          <Group justify="center" py="xl">
            <Loader size="xl" />
          </Group>
        ) : forms.length === 0 ? (
          <Card withBorder radius="md" p="xl" shadow="sm">
            <Stack align="center" gap="lg" py="xl">
              <ThemeIcon size={100} radius="md" color="gray" variant="light">
                <IconClipboardList size={50} />
              </ThemeIcon>
              <Stack align="center" gap="sm">
                <Title order={3} c="dimmed">
                  Henüz hiç form oluşturmadınız
                </Title>
                <Text size="md" c="dimmed" ta="center">
                  İlk formunuzu oluşturmak için yukarıdaki butonu kullanın
                </Text>
              </Stack>
              <Button
                onClick={openCreate}
                leftSection={<IconPlus size={18} />}
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                İlk Formumu Oluştur
              </Button>
            </Stack>
          </Card>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {forms.map((form) => (
              <Card
                key={form.id}
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
              >
                <Stack gap="md">
                  {/* Header */}
                  <Group justify="space-between" align="start">
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Group gap="xs">
                        <Title order={4} size="h5" lineClamp={1}>
                          {form.title}
                        </Title>
                        {(unreadCounts[form.slug] ?? 0) > 0 && (
                          <Indicator
                            color="red"
                            size={16}
                            label={unreadCounts[form.slug]}
                            inline
                          >
                            <ThemeIcon size="sm" variant="light" color="red">
                              <IconBell size={12} />
                            </ThemeIcon>
                          </Indicator>
                        )}
                      </Group>
                      <Badge variant="light" size="sm" color="gray">
                        /{form.slug}
                      </Badge>
                    </Stack>
                  </Group>

                  {/* Description */}
                  <Text size="sm" c="dimmed" lineClamp={2} style={{ minHeight: rem(36) }}>
                    {form.description}
                  </Text>

                  {/* Stats */}
                  <Group gap="xs">
                    <Group gap={4}>
                      <ThemeIcon size="xs" variant="light" color="blue">
                        <IconCalendar size={10} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">
                        {new Date(form.created_at).toLocaleDateString("tr-TR")}
                      </Text>
                    </Group>
                  </Group>

                  <Divider />

                  {/* Actions */}
                  <Group justify="space-between">
                    <Button
                      variant="light"
                      size="sm"
                      radius="md"
                      leftSection={<IconEye size={16} />}
                      onClick={() => handleGoToDetail(form)}
                    >
                      Yönet
                    </Button>
                    
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/request-form/${form.slug}`, '_blank');
                        }}
                        radius="md"
                      >
                        <IconExternalLink size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(form);
                        }}
                        radius="md"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(form);
                        }}
                        radius="md"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      {/* Create Form Modal */}
      <Modal
        opened={createOpened}
        onClose={closeCreate}
        title={
          <Group gap="sm">
            <ThemeIcon size="sm" variant="light" color="blue">
              <IconPlus size={16} />
            </ThemeIcon>
            <Text fw={600}>Yeni Talep Formu Oluştur</Text>
          </Group>
        }
        centered
        size="md"
        radius="md"
      >
        <Stack gap="lg">
          <TextInput
            label="Slug"
            placeholder="Benzersiz kısa ad (örn: iletisim-formu)"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value });
              setSlugError("");
            }}
            required
            error={slugError}
            radius="md"
          />
          <TextInput
            label="Form Başlığı"
            placeholder="İletişim Formu"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            radius="md"
          />
          <Textarea
            label="Açıklama"
            placeholder="Bu form müşteri talepleri için kullanılacaktır"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            minRows={3}
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

      {/* Edit Form Modal */}
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title={
          <Group gap="sm">
            <ThemeIcon size="sm" variant="light" color="blue">
              <IconEdit size={16} />
            </ThemeIcon>
            <Text fw={600}>Formu Düzenle</Text>
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
            label="Form Başlığı"
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

      {/* Delete Form Modal */}
      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title="Formu Sil"
        centered
        size="sm"
        radius="md"
      >
        <Stack gap="lg">
          <Text>Bu formu kalıcı olarak silmek istediğinizden emin misiniz?</Text>
          <Card withBorder p="md" radius="md" bg="red.0">
            <Stack gap="xs">
              <Text fw={500} c="red">
                {selectedDeleteForm?.title}
              </Text>
              <Text size="sm" c="dimmed">
                {selectedDeleteForm?.description}
              </Text>
            </Stack>
          </Card>
          <Group justify="end" gap="sm">
            <Button variant="default" onClick={closeDelete} radius="md">
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
    </Container>
  );
}