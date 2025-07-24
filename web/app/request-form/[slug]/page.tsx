'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Paper, Stack, TextInput, Textarea, Group, ThemeIcon, Center, Loader, Alert, Modal, Box, Card } from '@mantine/core';
import { IconMail, IconUser, IconMessage, IconCheck, IconAlertCircle, IconSend } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function RequestFormPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [formInfo, setFormInfo] = useState<{ title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successModalOpened, setSuccessModalOpened] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); // küfür/argo için
  const [generalError, setGeneralError] = useState<string | null>(null); // diğer hatalar için

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setFormError(null);
    setGeneralError(null);
    fetch(`/api/quick-request/public/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Form bilgisi alınamadı');
        return res.json();
      })
      .then((data) => {
        setFormInfo({ title: data.title, description: data.description });
        setGeneralError(null);
        setFormError(null);
      })
      .catch((err) => {
        setGeneralError(err.message);
        setFormInfo(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setGeneralError(null);
    try {
      const res = await fetch(`/api/quick-request/public/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.message === "Lütfen daha uygun bir dil kullanın.") {
          setFormError(errorData.message);
        } else {
          setGeneralError(errorData.message || 'Talep gönderilemedi');
        }
        return;
      }
      setSuccessModalOpened(true);
      setFormSubmitted(true); // Sadece başarılıysa
      setForm({ name: '', email: '', message: '' });
      setFormError(null);
      setGeneralError(null);
    } catch (err: any) {
      setGeneralError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container size="sm" py="xl">
        <Center style={{ minHeight: '60vh' }}>
          <Stack align="center" gap="md">
            <Loader color="#228be6" size="lg" />
            <Text c="dimmed">Form yükleniyor...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (generalError) {
    return (
      <Container size="sm" py="xl">
        <Center style={{ minHeight: '60vh' }}>
          <Alert 
            icon={<IconAlertCircle size={20} />} 
            title="Hata" 
            color="red"
            radius="md"
            variant="light"
            w="100%"
            maw={400}
          >
            {generalError}
          </Alert>
        </Center>
      </Container>
    );
  }

  if (!formInfo) {
    return (
      <Container size="sm" py="xl">
        <Center style={{ minHeight: '60vh' }}>
          <Alert 
            icon={<IconAlertCircle size={20} />} 
            title="Form Bulunamadı" 
            color="red"
            radius="md"
            variant="light"
            w="100%"
            maw={400}
          >
            Aradığınız form bulunamadı veya artık mevcut değil.
          </Alert>
        </Center>
      </Container>
    );
  }

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
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          size={36} 
          radius="md"
        >
          <IconMessage size={20} />
        </ThemeIcon>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text size="md" fw={600} c="#228be6" style={{ wordBreak: 'break-word' }}>
            {formInfo.title}
          </Text>
          <Text size="sm" c="#228be6" style={{ wordBreak: 'break-word', lineHeight: 1.5 }}>
            {formInfo.description}
          </Text>
        </div>
      </Paper>

      {/* Form Content */}
      <Paper withBorder radius="md" p="xl">
        <Stack gap="md">
          {!formSubmitted ? (
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                {generalError && (
                  <Alert 
                    icon={<IconAlertCircle size={16} />} 
                    title="Hata" 
                    color="red"
                    radius="md"
                    variant="light"
                  >
                    {generalError}
                  </Alert>
                )}
                <TextInput
                  label="Ad Soyad"
                  placeholder="Adınız ve soyadınız"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  leftSection={<IconUser size={16} />}
                  radius="md"
                />
                <TextInput
                  label="E-posta"
                  placeholder="E-posta adresiniz"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  leftSection={<IconMail size={16} />}
                  radius="md"
                  type="email"
                />
                <Textarea
                  label="Mesaj"
                  placeholder="Mesajınız"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  radius="md"
                  minRows={4}
                  error={formError}
                />
                <Button
                  type="submit"
                  radius="md"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  loading={submitting}
                  fullWidth
                  leftSection={<IconSend size={16} />}
                >
                  {submitting ? 'Gönderiliyor...' : 'Gönder'}
                </Button>
              </Stack>
            </form>
          ) : (
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
                  Talebiniz Alındı!
                </Title>
                <Text ta="center" c="dimmed" size="sm">
                  Talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçilecektir.
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
            <Text fw={600} size="sm">Talep Başarılı!</Text>
          </Group>
        }
        centered
        size="sm"
        radius="md"
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçilecektir.
          </Text>
          <Paper withBorder p="sm" radius="md" bg="gray.0">
            <Stack gap="xs">
              <Text size="xs" fw={500} c="dimmed">Form Detayları:</Text>
              <Text size="sm" fw={500}>{formInfo.title}</Text>
            </Stack>
          </Paper>
          <Button
            onClick={() => setSuccessModalOpened(false)}
            fullWidth
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
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
              style={{ color: '#228be6', textDecoration: 'none', fontWeight: 600 }}
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
