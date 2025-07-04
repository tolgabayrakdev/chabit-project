"use client";

import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  TextInput,
  Button,
  Paper,
  Stack,
  ThemeIcon,
  Loader,
} from "@mantine/core";
import { IconQrcode, IconStar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function GoogleReviewQrPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const router = useRouter();

  const form = useForm({
    initialValues: {
      label: "",
      placeId: "",
    },
    validate: {
      label: (value) => (value.length < 3 ? "QR kod ismi en az 3 karakter olmalıdır" : null),
      placeId: (value) => (value.trim().length < 4 ? "Geçerli bir Place ID giriniz" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setStatus("loading");
    try {
      const body = { ...values };
      const response = await fetch(`/api/qr/google-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setTimeout(() => {
          setStatus("success");
          setLoading(false);
          router.push("/dashboard");
        }, 5000);
      } else {
        setStatus("idle");
        const errorData = await response.json();
        notifications.show({
          title: "Hata",
          message: errorData.message || "QR kod oluşturulurken bir hata oluştu",
          color: "red",
        });
      }
    } catch (error) {
      setStatus("idle");
      notifications.show({
        title: "Hata",
        message: "QR kod oluşturulurken bir hata oluştu",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewQr = () => {
    setStatus("idle");
    form.reset();
  };

  return (
    <Container size="md" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          background: 'linear-gradient(90deg, #fffbe6 0%, #f8f9fa 100%)',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexDirection: 'row',
        }}
        className="qr-info-paper"
      >
        <ThemeIcon color="yellow" size={40} radius="xl" variant="light">
          <IconStar size={24} />
        </ThemeIcon>
        <div>
          <Text size="lg" fw={600} c="yellow.8">Google Yorum QR kodu nedir?</Text>
          <Text size="sm" c="yellow.8">
            Google Yorum QR kodu, müşterilerinizin işletmenize kolayca Google üzerinden yorum bırakmasını sağlar. QR kodu okutan kişi, doğrudan firmanızın Google yorum sayfasına yönlendirilir. Yorum sayınızı ve müşteri memnuniyetini artırmak için idealdir.
          </Text>
        </div>
      </Paper>
      <Paper withBorder radius="lg" p={32} style={{ width: "100%", maxWidth: 800, marginTop: 32, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Title order={2} mb="xl" ta="center">
          Google Yorum QR Kod Oluştur
        </Title>
        {status === "idle" && (
          <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
            <Stack gap="md" style={{ width: "100%" }}>
              <TextInput
                label="QR Kod İsmi"
                placeholder="Örn: Google Yorumum"
                required
                radius="md"
                size="md"
                style={{ width: "100%" }}
                {...form.getInputProps("label")}
              />
              <TextInput
                label="Google Place ID"
                placeholder="Google Place ID'nizi giriniz"
                required
                radius="md"
                size="md"
                style={{ width: "100%" }}
                {...form.getInputProps("placeId")}
              />
              <Paper p="sm" radius="md" withBorder style={{ background: '#fffbe6', marginTop: 4, marginBottom: 8 }}>
                <Text size="xs" c="yellow.8" fw={600} mb={4}>Google Place ID nedir?</Text>
                <Text size="xs" c="dimmed">
                  Google Place ID, işletmenizin Google Haritalar üzerindeki benzersiz kimliğidir. QR kod ile müşterilerinizin doğrudan Google yorum sayfanıza ulaşmasını sağlar.<br /><br />
                  <b>Nasıl bulabilirim?</b><br />
                  1. <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" style={{ color: '#fab005', textDecoration: 'underline' }}>Google Place ID Finder</a> sayfasını açın.<br />
                  2. Harita üzerinden işletmenizi arayın ve seçin.(Belirli bir yerin kimliğini bulma alanını kullanın)<br />
                  3. Açılan pencerede Place ID'nizi göreceksiniz.<br /><br />
                  <b>Örnek Place ID:</b> <code>ChIJN1t_tDeuEmsRUsoyG83frY4</code>
                </Text>
              </Paper>
              <Button
                type="submit"
                loading={loading}
                radius="md"
                size="md"
                leftSection={<IconQrcode size={20} />}
                style={{
                  width: "100%",
                  background: "#fab005",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)"
                  },
                }}
              >
                QR Kod Oluştur
              </Button>
            </Stack>
          </form>
        )}
        {status === "loading" && (
          <Stack align="center" gap="xl" mt="xl">
            <ThemeIcon size={120} radius="xl" color="yellow" style={{ animation: "pulse 2s infinite" }}>
              <IconQrcode size={60} />
            </ThemeIcon>
            <Title order={3} ta="center">
              QR Kodunuz Oluşturuluyor
            </Title>
            <Text c="dimmed" ta="center" size="lg">
              Google Yorum QR kodunuz hazırlanıyor...
            </Text>
            <Loader size="lg" color="yellow" />
          </Stack>
        )}
        {status === "success" && (
          <Stack align="center" gap="xl" mt="xl">
            <ThemeIcon size={120} radius="xl" color="yellow">
              <IconQrcode size={60} />
            </ThemeIcon>
            <Title order={3} ta="center">
              QR Kodunuz Başarıyla Oluşturuldu!
            </Title>
            <Button onClick={handleNewQr} radius="xl" size="md" variant="outline" color="yellow">
              Yeni QR Kod Oluştur
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}
