"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Loader,
  ThemeIcon,
  Button,
  Table,
  Badge,
  ActionIcon,
  Modal,
  Textarea,
  Select,
  Notification,
  Divider,
  Alert,
  Card,
  Collapse,
  TextInput,
  rem,
  Box,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconUsers,
  IconEye,
  IconCheck,
  IconTrash,
  IconInfoCircle,
  IconMail,
  IconPhone,
  IconChevronUp,
  IconChevronDown,
  IconSearch,
  IconFilter,
  IconExternalLink,
  IconCalendar,
  IconMessage,
  IconUser,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";

interface QuickRequestForm {
  id: string;
  slug: string;
  title: string;
  description: string;
  created_at: string;
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

export default function QuickRequestFormDetailPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<QuickRequestForm | null>(null);
  const [formLoading, setFormLoading] = useState(true);
  const [entries, setEntries] = useState<QuickRequestEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<QuickRequestEntry | null>(null);
  const [entryModalOpened, setEntryModalOpened] = useState(false);
  const [note, setNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [readLoading, setReadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [showUnreadNotification, setShowUnreadNotification] = useState(true);

  // Formu ve talepleri getir
  useEffect(() => {
    setFormLoading(true);
    setEntriesLoading(true);
    fetch(`/api/quick-request/form/${formId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setForm(data);
          setEntries(Array.isArray(data.requests) ? data.requests : []);
        }
      })
      .catch(() => {
        setForm(null);
        setEntries([]);
      })
      .finally(() => {
        setFormLoading(false);
        setEntriesLoading(false);
      });
  }, [formId, successMsg]);

  // Talep detay modalı aç
  const openEntryDetail = (entry: QuickRequestEntry) => {
    setSelectedEntry(entry);
    setNote(entry.notes || "");
    setSuccessMsg("");
    setErrorMsg("");
    setEntryModalOpened(true);
  };

  // Okundu olarak işaretle
  const handleMarkRead = async () => {
    if (!selectedEntry) return;
    setReadLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/quick-request/requests/${selectedEntry.id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        setSuccessMsg("Talep okundu olarak işaretlendi.");
        setSelectedEntry({ ...selectedEntry, is_read: true });
        setEntries(entries.map((e) => (e.id === selectedEntry.id ? { ...e, is_read: true } : e)));
      } else {
        setErrorMsg("İşlem başarısız.");
      }
    } catch {
      setErrorMsg("İşlem başarısız.");
    } finally {
      setReadLoading(false);
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

  // Filtrelenmiş ve aranmış entry listesi
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      entry.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (entry.phone || "").toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      entry.message.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus =
      !statusFilter || statusFilter === "" || entry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unreadCount = entries.filter(e => !e.is_read).length;

  useEffect(() => {
    if (entryModalOpened && selectedEntry) {
      setNote(selectedEntry.notes || "");
      setSuccessMsg("");
      setErrorMsg("");
      setNoteOpen(!!selectedEntry.notes);
    }
  }, [entryModalOpened, selectedEntry]);

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

      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Button 
          variant="subtle" 
          leftSection={<IconArrowLeft size={18} />} 
          onClick={() => router.push('/dashboard/quick-request')}
          radius="md"
        >
          Talep Formlarına Dön
        </Button>
      </Group>

      {/* Form Bilgileri */}
      <Card withBorder radius="lg" p="xl" mb="xl" shadow="sm">
        {formLoading ? (
          <Group justify="center" py="xl">
            <Loader size="lg" />
          </Group>
        ) : !form ? (
          <Group justify="center" py="xl">
            <Stack align="center" gap="md">
              <ThemeIcon size={80} radius="lg" color="gray" variant="light">
                <IconUsers size={40} />
              </ThemeIcon>
              <Text size="lg" c="dimmed">Form bulunamadı</Text>
            </Stack>
          </Group>
        ) : (
          <Stack gap="lg">
            {/* Unread Alert */}
            {unreadCount > 0 && showUnreadNotification && (
              <Alert
                color="orange"
                title="Okunmamış Talepler"
                icon={<IconInfoCircle size={16} />}
                withCloseButton
                onClose={() => setShowUnreadNotification(false)}
                radius="lg"
              >
                {unreadCount} adet okunmamış talep bulunuyor.
              </Alert>
            )}

            <Group justify="space-between" align="start">
              <Stack gap="sm">
                <Title order={1} size="h2" c="dark">
                  {form.title}
                </Title>
                <Group gap="xs">
                  <Badge variant="light" color="blue" size="sm">
                    {form.slug}
                  </Badge>
                  <Text size="sm" c="dimmed">
                    {form.description}
                  </Text>
                </Group>
              </Stack>

              <Button
                component="a"
                href={`/request-form/${form.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                leftSection={<IconExternalLink size={16} />}
                radius="md"
              >
                Formu Görüntüle
              </Button>
            </Group>
          </Stack>
        )}
      </Card>

      {/* Talepler Bölümü */}
      <Card withBorder radius="lg" p="xl" shadow="sm">
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <Title order={2} size="h3">Talepler</Title>
              <Badge variant="filled" size="lg" color="blue">
                {filteredEntries.length}
              </Badge>
              {unreadCount > 0 && (
                <Badge variant="filled" size="sm" color="red">
                  {unreadCount} okunmamış
                </Badge>
              )}
            </Group>
          </Group>

          {/* Filters */}
          <Card withBorder p="md" radius="lg" bg="gray.0">
            <Group gap="md">
              <TextInput
                placeholder="Ad, email, telefon veya mesajda ara..."
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1 }}
                radius="md"
              />
              <Select
                placeholder="Durum Filtrele"
                leftSection={<IconFilter size={16} />}
                data={[
                  { value: "", label: "Tümü" },
                  { value: "new", label: "Yeni" },
                  { value: "in_progress", label: "İşlemde" },
                  { value: "completed", label: "Tamamlandı" },
                  { value: "closed", label: "Kapalı" },
                ]}
                value={statusFilter ?? ""}
                onChange={(value) => setStatusFilter(value)}
                clearable
                w={200}
                radius="md"
              />
            </Group>
          </Card>

          {/* Table */}
          {entriesLoading ? (
            <Group justify="center" py="xl">
              <Loader size="lg" />
            </Group>
          ) : filteredEntries.length === 0 ? (
            <Group justify="center" py="xl">
              <Stack align="center" gap="md">
                <ThemeIcon size={80} radius="lg" color="gray" variant="light">
                  <IconMessage size={40} />
                </ThemeIcon>
                <Text size="lg" c="dimmed">
                  {entries.length === 0 ? "Henüz talep yok" : "Arama kriterlerine uygun talep bulunamadı"}
                </Text>
              </Stack>
            </Group>
          ) : (
            <Box style={{ overflowX: 'auto' }}>
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
                    <Table.Th w={60}>#</Table.Th>
                    <Table.Th w={50}>
                      <Group gap={4}>
                        <IconCheck size={14} />
                      </Group>
                    </Table.Th>
                    <Table.Th>
                      <Group gap={4}>
                        <IconUser size={14} />
                        <Text size="sm">Kişi</Text>
                      </Group>
                    </Table.Th>
                    <Table.Th>
                      <Group gap={4}>
                        <IconMessage size={14} />
                        <Text size="sm">Mesaj</Text>
                      </Group>
                    </Table.Th>
                    <Table.Th w={120}>Durum</Table.Th>
                    <Table.Th w={140}>
                      <Group gap={4}>
                        <IconCalendar size={14} />
                        <Text size="sm">Tarih</Text>
                      </Group>
                    </Table.Th>
                    <Table.Th w={80}>Detay</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredEntries.map((entry, idx) => (
                    <Table.Tr 
                      key={entry.id}
                      style={{ 
                        backgroundColor: !entry.is_read ? 'var(--mantine-color-blue-0)' : undefined 
                      }}
                    >
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {idx + 1}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Group justify="center">
                          <ThemeIcon
                            size="sm"
                            variant={entry.is_read ? "filled" : "light"}
                            color={entry.is_read ? "green" : "gray"}
                          >
                            <IconCheck size={12} />
                          </ThemeIcon>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Stack gap={2}>
                          <Text size="sm" fw={entry.is_read ? 400 : 600}>
                            {entry.name}
                          </Text>
                          <Group gap={4}>
                            <IconMail size={12} color="var(--mantine-color-dimmed)" />
                            <Text size="xs" c="dimmed">
                              {entry.email}
                            </Text>
                          </Group>
                          {entry.phone && (
                            <Group gap={4}>
                              <IconPhone size={12} color="var(--mantine-color-dimmed)" />
                              <Text size="xs" c="dimmed">
                                {entry.phone}
                              </Text>
                            </Group>
                          )}
                        </Stack>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" lineClamp={2} style={{ maxWidth: 200 }}>
                          {entry.message}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={getStatusColor(entry.status)}
                          variant={entry.status === "completed" ? "filled" : "light"}
                          size="sm"
                        >
                          {getStatusLabel(entry.status)}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" c="dimmed">
                          {new Date(entry.created_at).toLocaleDateString("tr-TR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="blue"
                          variant="light"
                          onClick={() => openEntryDetail(entry)}
                          radius="md"
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>
          )}
        </Stack>
      </Card>

      {/* Talep Detay Modal */}
      <Modal
        opened={entryModalOpened}
        onClose={() => setEntryModalOpened(false)}
        title="Talep Detayı"
        centered
        size="lg"
        radius="lg"
        padding="xl"
      >
        {selectedEntry && (
          <Stack gap="lg">
            {/* Ana Bilgiler */}
            <Card withBorder radius="lg" p="lg">
              <Stack gap="md">
                <Group justify="space-between" align="start">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="lg" fw={600}>{selectedEntry.name}</Text>
                    <Group gap="xs">
                      <ThemeIcon size="sm" variant="light" color="blue">
                        <IconMail size={12} />
                      </ThemeIcon>
                      <Text size="sm" c="dimmed">{selectedEntry.email}</Text>
                    </Group>
                    {selectedEntry.phone && (
                      <Group gap="xs">
                        <ThemeIcon size="sm" variant="light" color="green">
                          <IconPhone size={12} />
                        </ThemeIcon>
                        <Text size="sm" c="dimmed">{selectedEntry.phone}</Text>
                      </Group>
                    )}
                  </Stack>

                  <Stack gap="xs" align="end">
                    <Badge
                      variant="light"
                      color={getStatusColor(selectedEntry.status)}
                      size="md"
                    >
                      {getStatusLabel(selectedEntry.status)}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      {new Date(selectedEntry.created_at).toLocaleDateString("tr-TR")}
                    </Text>
                  </Stack>
                </Group>

                <Divider />

                <Stack gap="xs">
                  <Text size="sm" fw={500} c="dimmed">Mesaj</Text>
                  <Text size="sm" style={{ whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                    {selectedEntry.message}
                  </Text>
                </Stack>
              </Stack>
            </Card>

            {/* Durum Güncelleme */}
            <Card withBorder radius="lg" p="md">
              <Stack gap="sm">
                <Text size="sm" fw={500}>Durum Güncelle</Text>
                <Select
                  data={[
                    { value: "new", label: "Yeni" },
                    { value: "in_progress", label: "İşlemde" },
                    { value: "completed", label: "Tamamlandı" },
                    { value: "closed", label: "Kapalı" },
                  ]}
                  value={selectedEntry.status}
                  onChange={async (value) => {
                    if (!value) return;
                    setStatusLoading(true);
                    setErrorMsg("");
                    try {
                      const res = await fetch(`/api/quick-request/requests/${selectedEntry.id}/status`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ status: value }),
                      });
                      if (res.ok) {
                        setSuccessMsg("Durum güncellendi.");
                        setSelectedEntry({ ...selectedEntry, status: value });
                        setEntries(entries.map((e) => (e.id === selectedEntry.id ? { ...e, status: value } : e)));
                      } else {
                        setErrorMsg("Durum güncellenemedi.");
                      }
                    } catch {
                      setErrorMsg("Durum güncellenemedi.");
                    } finally {
                      setStatusLoading(false);
                    }
                  }}
                  disabled={statusLoading}
                  radius="md"
                />
              </Stack>
            </Card>

            {/* Notlar */}
            <Card withBorder radius="lg" p="md">
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <Group gap="xs">
                    <Text size="sm" fw={500}>Notlar</Text>
                    {selectedEntry.notes && (
                      <Badge size="xs" variant="dot" color="blue">
                        Mevcut
                      </Badge>
                    )}
                  </Group>
                  <ActionIcon
                    variant="subtle"
                    size="sm"
                    onClick={() => setNoteOpen((v) => !v)}
                  >
                    {noteOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                  </ActionIcon>
                </Group>

                {!noteOpen && selectedEntry.notes && (
                  <Text size="xs" c="dimmed" fs="italic" lineClamp={2}>
                    {selectedEntry.notes}
                  </Text>
                )}

                <Collapse in={noteOpen}>
                  <Stack gap="sm" mt="sm">
                    <Textarea
                      placeholder="Not ekleyin..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      minRows={3}
                      disabled={noteLoading}
                      radius="md"
                    />
                    <Group justify="end">
                      <Button
                        size="xs"
                        onClick={handleNoteSave}
                        loading={noteLoading}
                        radius="md"
                      >
                        Kaydet
                      </Button>
                    </Group>
                  </Stack>
                </Collapse>
              </Stack>
            </Card>

            {/* Aksiyon Butonları */}
            <Group justify="space-between" pt="md">
              <Button
                variant="light"
                color="green"
                leftSection={<IconCheck size={16} />}
                onClick={handleMarkRead}
                loading={readLoading}
                disabled={selectedEntry.is_read}
                radius="md"
              >
                {selectedEntry.is_read ? 'Okundu' : 'Okundu Olarak İşaretle'}
              </Button>

              <Button
                variant="light"
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteConfirmOpen(true)}
                loading={deleteLoading}
                radius="md"
              >
                Sil
              </Button>
            </Group>

            {/* Silme Onay Modali */}
            <Modal
              opened={deleteConfirmOpen}
              onClose={() => setDeleteConfirmOpen(false)}
              title="Talebi Sil"
              centered
              size="sm"
              radius="lg"
            >
              <Stack gap="lg">
                <Text c="dimmed">
                  Bu talebi kalıcı olarak silmek istediğinizden emin misiniz?
                </Text>
                <Group justify="end" gap="sm">
                  <Button
                    variant="default"
                    onClick={() => setDeleteConfirmOpen(false)}
                    radius="md"
                  >
                    İptal
                  </Button>
                  <Button
                    color="red"
                    loading={deleteLoading}
                    radius="md"
                    onClick={async () => {
                      setDeleteLoading(true);
                      setErrorMsg("");
                      try {
                        const res = await fetch(`/api/quick-request/requests/${selectedEntry.id}`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                        });
                        if (res.ok) {
                          setSuccessMsg("Talep silindi.");
                          setEntries(entries.filter((e) => e.id !== selectedEntry.id));
                          setEntryModalOpened(false);
                          setDeleteConfirmOpen(false);
                        } else {
                          setErrorMsg("Talep silinemedi.");
                        }
                      } catch {
                        setErrorMsg("Talep silinemedi.");
                      } finally {
                        setDeleteLoading(false);
                      }
                    }}
                  >
                    Evet, Sil
                  </Button>
                </Group>
              </Stack>
            </Modal>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}