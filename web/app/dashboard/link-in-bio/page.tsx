"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Title, Text, Button, Stack, Paper, Group, TextInput, Modal, Badge, ActionIcon, ThemeIcon, Center, Loader } from "@mantine/core";
import { IconExternalLink, IconTrash, IconLink } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function LinkInBioDashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null);
  const [usernameCheckLoading, setUsernameCheckLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const usernameCheckTimeout = useRef<NodeJS.Timeout | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Yeni state'ler
  const [existingProfiles, setExistingProfiles] = useState<{ id: string, username: string }[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

  // Mevcut profilleri yükle
  useEffect(() => {
    const fetchProfiles = async () => {
      setProfilesLoading(true);
      try {
        const response = await fetch('/api/link-in-bio/all', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setExistingProfiles(data || []);
        } else {
          setExistingProfiles([]);
        }
      } catch (error) {
        setExistingProfiles([]);
      } finally {
        setProfilesLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleGoToProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const response = await fetch("/api/link-in-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmed }),
      });
      if (response.ok) {
        // Yeni profili listeye ekle ve yönlendir
        setExistingProfiles(prev => [...prev, { id: trimmed, username: trimmed }]);
        router.push(`/u/${trimmed}`);
      } else {
        const errorData = await response.json();
        notifications.show({
          title: "Hata",
          message: errorData.message || "Profil oluşturulamadı.",
          color: "red",
        });
      }
    } catch (err) {
      notifications.show({
        title: "Hata",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!profileToDelete) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/link-in-bio/${profileToDelete}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) {
        notifications.show({ title: "Başarılı", message: "Profil başarıyla silindi.", color: "green" });
        setExistingProfiles(prev => prev.filter(p => p.id !== profileToDelete));
        setDeleteModalOpen(false);
        setDeleteConfirmText("");
        setProfileToDelete(null);
      } else {
        const errorData = await response.json();
        notifications.show({ title: "Hata", message: errorData.message || "Profil silinemedi.", color: "red" });
      }
    } catch (err) {
      notifications.show({ title: "Hata", message: "Bir hata oluştu.", color: "red" });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Username uygunluk kontrolü (debounce)
  const checkUsernameAvailable = async (value: string) => {
    setUsernameCheckLoading(true);
    setUsernameError(null);
    setUsernameAvailable(null);
    try {
      const res = await fetch(`/api/link-in-bio/?username=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (data.available === false) {
        setUsernameAvailable(false);
        setUsernameError(data.message || "Bu kullanıcı adı alınmış.");
      } else if (data.available === true) {
        setUsernameAvailable(true);
        setUsernameError(null);
      } else {
        setUsernameAvailable(null);
        setUsernameError("Kullanıcı adı kontrolü başarısız.");
      }
    } catch (err) {
      setUsernameAvailable(null);
      setUsernameError("Kullanıcı adı kontrolü başarısız.");
    } finally {
      setUsernameCheckLoading(false);
    }
  };

  // Input değiştikçe debounce ile kontrol et
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(null);
    setUsernameAvailable(null);
    if (usernameCheckTimeout.current) clearTimeout(usernameCheckTimeout.current);
    if (value.trim().length > 2) {
      usernameCheckTimeout.current = setTimeout(() => {
        checkUsernameAvailable(value.trim());
      }, 500);
    }
  };

  const openDeleteModal = (id: string) => {
    setProfileToDelete(id);
    setDeleteModalOpen(true);
  };

  const profileToDeleteObj = existingProfiles.find(p => p.id === profileToDelete);

  return (
    <Container size="md" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          background: '#fff',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexDirection: 'row',
        }}
      >
        <ThemeIcon color="pink" size={40} radius="xl" variant="light">
          <IconLink size={24} />
        </ThemeIcon>
        <div>
          <Text size="lg" fw={600} c="pink.8">Link in Bio nedir?</Text>
          <Text size="sm" c="pink.8">
            Tüm önemli bağlantılarını tek bir sayfada topla, dijital kimliğini oluştur! Kendi <b>vunqr.com/u/kullaniciadi</b> adresinle sosyal medya, web sitesi ve iletişim bilgilerini kolayca paylaş.
          </Text>
        </div>
      </Paper>
      <Paper withBorder radius="lg" p={32} style={{ width: "100%", maxWidth: 500, marginTop: 32, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Title order={2} mb="xl" ta="center" c="pink.8">
          Link in Bio Profilini Oluştur
        </Title>
        <form onSubmit={handleGoToProfile} style={{ width: "100%" }}>
          <Stack gap="md" style={{ width: "100%" }}>
            <TextInput
              label="Kullanıcı Adı"
              placeholder="Benzersiz bir kullanıcı adı"
              value={username}
              onChange={handleUsernameChange}
              size="md"
              radius="md"
              required
              autoFocus
              error={usernameError || undefined}
              rightSection={usernameCheckLoading ? <span style={{ color: '#e64980', fontSize: 12 }}>Kontrol ediliyor...</span> : usernameAvailable === true ? <span style={{ color: 'green', fontSize: 16 }}>✓</span> : usernameAvailable === false ? <span style={{ color: 'red', fontSize: 16 }}>✗</span> : null}
            />
            <Button
              type="submit"
              disabled={!username.trim() || loading || usernameAvailable === false || usernameCheckLoading}
              radius="xl"
              size="md"
              color="pink"
              style={{ width: "100%" }}
              loading={loading}
            >
              Devam Et
            </Button>
            <Text size="sm" c="dimmed" ta="center">
              Profil adresin: <b>vunqr.com/u/{username || "kullaniciadi"}</b>
            </Text>
          </Stack>
        </form>
      </Paper>

      {/* Mevcut Profiller Listesi */}
      {profilesLoading ? (
        <Center mt="xl"><Loader color="pink" /></Center>
      ) : existingProfiles.length > 0 ? (
        <Paper withBorder radius="lg" p={32} mt="xl" style={{ width: '100%', maxWidth: 500 }}>
          <Title order={3} ta="center" mb="xl" c="pink.8">Mevcut Link in Bio Profillerin</Title>
          <Stack>
            {existingProfiles.map(profile => (
              <Paper key={profile.id} p="md" radius="md" withBorder style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text fw={500}>vunqr.com/u/{profile.username}</Text>
                <Group>
                  <Button component="a" href={`/u/${profile.username}`} target="_blank" variant="subtle" color="pink" leftSection={<IconExternalLink size={16} />}>
                    Git
                  </Button>
                  <ActionIcon color="red" variant="subtle" onClick={() => openDeleteModal(profile.id)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Paper>
      ) : (
        <Paper withBorder radius="lg" p={32} mt="xl" style={{ width: '100%', maxWidth: 500 }}>
          <Text ta="center" c="dimmed">
            Henüz hiç Link in Bio profili oluşturmadınız.
          </Text>
        </Paper>
      )}

      <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title={`Profili Sil: ${profileToDeleteObj?.username || ''}`} centered>
        <Stack gap="md">
          <Text c="red" fw={600}>
            Bu işlemi geri alamazsınız! Profiliniz ve tüm bağlantılarınız kalıcı olarak silinecek.
          </Text>
          <Text>
            Silme işlemini onaylamak için aşağıya <b>Silmek istiyorum</b> yazınız.
          </Text>
          <TextInput
            placeholder="Silmek istiyorum"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            autoFocus
          />
          <Button
            color="red"
            disabled={deleteConfirmText !== "Silmek istiyorum" || deleteLoading}
            onClick={handleDeleteProfile}
            fullWidth
            loading={deleteLoading}
          >
            Profili Kalıcı Olarak Sil
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}
