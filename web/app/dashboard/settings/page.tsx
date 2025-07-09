'use client';

import React, { useState, useEffect } from 'react';
import { Container, Title, Text, TextInput, PasswordInput, Button, Paper, Stack, Group, rem, Divider, Modal, Alert, Badge } from '@mantine/core';
import { IconLock, IconTrash, IconAlertCircle, IconAlertTriangle, IconUser, IconCrown } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmText, setConfirmText] = useState('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPlan, setUserPlan] = useState<string>('free');
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoadingUser(true);
        const response = await fetch(`/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.user.email);
          setUserPlan(data.user.plan || 'free');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

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
      const response = await fetch(`/api/auth/change-password`, {
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
      const response = await fetch(`/api/auth/delete-account`, {
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

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'gray';
      case 'basic':
        return 'blue';
      case 'pro':
        return 'violet';
      default:
        return 'gray';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'free':
        return <IconUser size={16} />;
      case 'basic':
        return <IconUser size={16} />;
      case 'pro':
        return <IconCrown size={16} />;
      default:
        return <IconUser size={16} />;
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
          <Stack gap="md">
            <Title order={3} size="h4">Hesap Bilgileri</Title>
            <Group>
              <Text size="sm" fw={500}>E-posta:</Text>
              <Text size="sm" c="dimmed">
                {isLoadingUser ? 'Yükleniyor...' : userEmail}
              </Text>
            </Group>
            <Group>
              <Text size="sm" fw={500}>Plan:</Text>
              {isLoadingUser ? (
                <Text size="sm" c="dimmed">Yükleniyor...</Text>
              ) : (
                <Badge 
                  color={getPlanColor(userPlan)} 
                  variant="light"
                  leftSection={getPlanIcon(userPlan)}
                >
                  {userPlan === 'free' ? 'Ücretsiz Plan' : userPlan === 'basic' ? 'Basit Plan' : userPlan === 'pro' ? 'Pro Plan' : 'Kullanıcı'}
                </Badge>
              )}
            </Group>
          </Stack>
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
                radius="md"
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
              radius="md"
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