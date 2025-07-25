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
      <Stack gap="md">
        <div>
          <Title order={2} size="h3" mb="xs">Ayarlar</Title>
          <Text c="dimmed" size="sm">Hesap ayarlarınızı buradan yönetebilirsiniz.</Text>
        </div>

        <Paper
          p="md"
          radius="md"
          withBorder
          style={{
            background: 'white',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
            }
          }}
        >
          <Stack gap="sm">
            <Title order={3} size="h5">Hesap Bilgileri</Title>
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
                  size="sm"
                  leftSection={getPlanIcon(userPlan)}
                >
                  {userPlan === 'free' ? 'Ücretsiz Plan' : userPlan === 'basic' ? 'Basit Plan' : userPlan === 'pro' ? 'Pro Plan' : 'Kullanıcı'}
                </Badge>
              )}
            </Group>
          </Stack>
        </Paper>

        <Paper
          p="md"
          radius="md"
          withBorder
          style={{
            background: 'white',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
            }
          }}
        >
          <form onSubmit={form.onSubmit(handlePasswordChange)}>
            <Stack gap="sm">
              <Title order={3} size="h5">Şifre Değiştir</Title>
              <PasswordInput
                label="Mevcut Şifre"
                placeholder="Mevcut şifrenizi girin"
                required
                radius="md"
                size="sm"
                {...form.getInputProps('currentPassword')}
              />
              <PasswordInput
                label="Yeni Şifre"
                placeholder="Yeni şifrenizi girin"
                required
                radius="md"
                size="sm"
                {...form.getInputProps('newPassword')}
              />
              <PasswordInput
                label="Yeni Şifre Tekrar"
                placeholder="Yeni şifrenizi tekrar girin"
                required
                radius="md"
                size="sm"
                {...form.getInputProps('confirmPassword')}
              />
              <Button
                type="submit"
                loading={loading}
                radius="md"
                size="sm"
                leftSection={<IconLock size={16} />}
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
          p="md"
          radius="md"
          withBorder
          style={{
            background: 'white',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
            }
          }}
        >
          <Stack gap="sm">
            <Title order={3} size="h5">Hesabı Sil</Title>
            <Text c="dimmed" size="sm">
              Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
            </Text>
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              radius="md"
              size="sm"
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

      <Modal opened={opened} onClose={close} title="Hesabı Sil" centered size="md">
        <Stack gap="sm">
          <Alert
            icon={<IconAlertTriangle size={20} />}
            title="Dikkat!"
            color="red"
            variant="filled"
          >
            Bu işlem geri alınamaz. Hesabınızı sildiğinizde:
          </Alert>

          <Stack gap="xs" pl="sm">
            <Text size="sm">• Tüm QR kodlarınız kalıcı olarak silinecek</Text>
            <Text size="sm">• Tüm kişisel verileriniz silinecek</Text>
            <Text size="sm">• Hesabınıza ait tüm bilgiler silinecek</Text>
            <Text size="sm">• Bu işlem geri alınamaz</Text>
          </Stack>

          <Alert
            icon={<IconAlertCircle size={20} />}
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
            size="sm"
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={close} size="sm">İptal</Button>
            <Button
              color="red"
              loading={deleteLoading}
              onClick={handleDeleteAccount}
              disabled={confirmText !== 'HESABIMI SİL'}
              size="sm"
            >
              Hesabı Sil
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
} 