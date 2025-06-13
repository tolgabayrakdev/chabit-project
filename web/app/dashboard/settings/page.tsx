'use client';

import React, { useState } from 'react';
import { Container, Title, Text, TextInput, PasswordInput, Button, Paper, Stack, Group, rem, Divider, Modal, Alert } from '@mantine/core';
import { IconLock, IconTrash, IconAlertCircle, IconAlertTriangle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmText, setConfirmText] = useState('');
  const router = useRouter();

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: (value) => (value.length < 6 ? 'Mevcut şifre en az 6 karakter olmalıdır' : null),
      newPassword: (value) => (value.length < 6 ? 'Yeni şifre en az 6 karakter olmalıdır' : null),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Şifreler eşleşmiyor' : null,
    },
  });

  const handlePasswordChange = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:1234/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      if (response.ok) {
        notifications.show({
          title: 'Başarılı',
          message: 'Şifreniz başarıyla değiştirildi',
          color: 'green',
        });
        form.reset();
      } else {
        const errorData = await response.json();
        notifications.show({
          title: 'Hata',
          message: errorData.message || 'Şifre değiştirilirken bir hata oluştu',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Hata',
        message: 'Şifre değiştirilirken bir hata oluştu',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== 'HESABIMI SİL') {
      notifications.show({
        title: 'Hata',
        message: 'Lütfen onay metnini doğru şekilde yazın',
        color: 'red',
      });
      return;
    }

    setDeleteLoading(true);
    try {
      const response = await fetch('http://localhost:1234/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        notifications.show({
          title: 'Başarılı',
          message: 'Hesabınız başarıyla silindi',
          color: 'green',
        });
        router.push('/login');
      } else {
        const errorData = await response.json();
        notifications.show({
          title: 'Hata',
          message: errorData.message || 'Hesap silinirken bir hata oluştu',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Hata',
        message: 'Hesap silinirken bir hata oluştu',
        color: 'red',
      });
    } finally {
      setDeleteLoading(false);
      close();
    }
  };

  return (
    <Container size="sm">
      <Stack gap="xl">
        <div>
          <Title order={2} mb="md">Ayarlar</Title>
          <Text c="dimmed">Hesap ayarlarınızı buradan yönetebilirsiniz.</Text>
        </div>

        <Paper 
          p="xl" 
          radius="lg" 
          withBorder
          style={{
            background: 'white',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            }
          }}
        >
          <form onSubmit={form.onSubmit(handlePasswordChange)}>
            <Stack gap="md">
              <Title order={3} size="h4">Şifre Değiştir</Title>
              <PasswordInput
                label="Mevcut Şifre"
                placeholder="Mevcut şifrenizi girin"
                required
                radius="md"
                size="md"
                {...form.getInputProps('currentPassword')}
              />
              <PasswordInput
                label="Yeni Şifre"
                placeholder="Yeni şifrenizi girin"
                required
                radius="md"
                size="md"
                {...form.getInputProps('newPassword')}
              />
              <PasswordInput
                label="Yeni Şifre Tekrar"
                placeholder="Yeni şifrenizi tekrar girin"
                required
                radius="md"
                size="md"
                {...form.getInputProps('confirmPassword')}
              />
              <Button 
                type="submit" 
                loading={loading}
                radius="xl"
                size="md"
                leftSection={<IconLock size={20} />}
                style={{
                  background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Şifreyi Değiştir
              </Button>
            </Stack>
          </form>
        </Paper>

        <Paper 
          p="xl" 
          radius="lg" 
          withBorder
          style={{
            background: 'white',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            }
          }}
        >
          <Stack gap="md">
            <Title order={3} size="h4">Hesabı Sil</Title>
            <Text c="dimmed" size="sm">
              Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
            </Text>
            <Button 
              variant="light"
              color="red"
              leftSection={<IconTrash size={20} />}
              radius="xl"
              size="md"
              onClick={open}
              style={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Hesabı Sil
            </Button>
          </Stack>
        </Paper>
      </Stack>

      <Modal opened={opened} onClose={close} title="Hesabı Sil" centered size="lg">
        <Stack>
          <Alert 
            icon={<IconAlertTriangle size={24} />} 
            title="Dikkat!" 
            color="red"
            variant="filled"
          >
            Bu işlem geri alınamaz. Hesabınızı sildiğinizde:
          </Alert>

          <Stack gap="xs" pl="md">
            <Text size="sm">• Tüm QR kodlarınız kalıcı olarak silinecek</Text>
            <Text size="sm">• Tüm kişisel verileriniz silinecek</Text>
            <Text size="sm">• Hesabınıza ait tüm bilgiler silinecek</Text>
            <Text size="sm">• Bu işlem geri alınamaz</Text>
          </Stack>

          <Alert 
            icon={<IconAlertCircle size={24} />} 
            title="Onay" 
            color="yellow"
            variant="light"
          >
            Hesabınızı silmek için aşağıdaki metni yazın:
            <Text fw={700} mt="xs">HESABIMI SİL</Text>
          </Alert>

          <TextInput
            placeholder="HESABIMI SİL"
            value={confirmText}
            onChange={(event) => setConfirmText(event.currentTarget.value)}
            error={confirmText !== '' && confirmText !== 'HESABIMI SİL' ? 'Metni doğru yazın' : null}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={close}>İptal</Button>
            <Button 
              color="red" 
              loading={deleteLoading}
              onClick={handleDeleteAccount}
              disabled={confirmText !== 'HESABIMI SİL'}
            >
              Hesabı Sil
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
} 