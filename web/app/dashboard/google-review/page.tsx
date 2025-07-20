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
import { QrPreview } from "../sms/QrPreview";
import { ColorInput, Select, Group } from "@mantine/core";

export default function GoogleReviewQrPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const router = useRouter();
  const [logo, setLogo] = useState<File | null>(null);
  const [designOptions, setDesignOptions] = useState({ style: "dot", darkColor: "#fab005" });
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  React.useEffect(() => {
    if (logo) {
      const url = URL.createObjectURL(logo);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl(null);
    }
  }, [logo]);

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
      let placeIdValue = values.placeId;
      const formData = new FormData();
      formData.append("label", values.label);
      formData.append("placeId", placeIdValue);
      formData.append("designOptions", JSON.stringify(designOptions));
      if (logo) {
        formData.append("logo", logo);
      }
      const response = await fetch(`/api/qr/google-review`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        setTimeout(() => {
          setStatus("success");
          setLoading(false);
          router.push("/dashboard/qr-codes");
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

  const qrValue = form.values.placeId && form.values.placeId.trim().length > 0
    ? `https://search.google.com/local/writereview?placeid=${form.values.placeId}`
    : "https://search.google.com/local/writereview?placeid=";

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
          <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }} encType="multipart/form-data">
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
              <Group grow>
                <Select
                  label="QR Stil"
                  data={[
                    { value: "dot", label: "Nokta" },
                    { value: "square", label: "Kare" },
                    { value: "rounded", label: "Yuvarlak" },
                    { value: "diamond", label: "Elmas" },
                    { value: "triangle", label: "Üçgen" },
                  ]}
                  value={designOptions.style}
                  onChange={(value) => setDesignOptions((prev) => ({ ...prev, style: value || "dot" }))}
                  required
                />
                <ColorInput
                  label="QR Renk"
                  value={designOptions.darkColor}
                  onChange={(color) => setDesignOptions((prev) => ({ ...prev, darkColor: color }))}
                  required
                />
              </Group>
              <TextInput
                label="Logo (PNG/JPG/SVG)"
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setLogo(e.target.files[0]);
                  } else {
                    setLogo(null);
                  }
                }}
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
        {/* QR Kod Önizleme */}
        {status === "idle" && (
          <Stack align="center" mt="xl" gap={4}>
            <Text fw={600} size="md">QR Kod Önizleme</Text>
            <div style={{ position: "relative", display: "inline-block", background: "#fff", padding: 16, borderRadius: 16, boxShadow: "0 2px 8px #0001" }}>
              <QrPreview
                value={qrValue}
                size={180}
                style={designOptions.style}
                darkColor={designOptions.darkColor}
                lightColor="#fff"
                logoUrl={logoUrl}
              />
            </div>
          </Stack>
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

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @media (max-width: 600px) {
          .qr-info-paper {
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center;
            padding: 12px !important;
          }
          .qr-info-paper .mantine-ThemeIcon-root {
            margin-bottom: 4px;
          }
          .qr-info-paper .mantine-Text-root {
            font-size: 15px !important;
          }
          
          /* Mobil için form düzenlemeleri */
          .mantine-Container-root {
            padding: 0 8px !important;
          }
          
          .mantine-Paper-root {
            padding: 16px !important;
            margin: 8px 0 !important;
          }
          
          .mantine-TextInput-root,
          .mantine-PasswordInput-root,
          .mantine-Select-root,
          .mantine-Textarea-root {
            margin-bottom: 12px !important;
          }
          
          .mantine-TextInput-label,
          .mantine-PasswordInput-label,
          .mantine-Select-label,
          .mantine-Textarea-label {
            font-size: 14px !important;
            margin-bottom: 4px !important;
          }
          
          .mantine-TextInput-input,
          .mantine-PasswordInput-input,
          .mantine-Select-input,
          .mantine-Textarea-input {
            font-size: 16px !important;
            padding: 8px 12px !important;
            min-height: 44px !important;
          }
          
          .mantine-Stack-root {
            gap: 8px !important;
          }
          
          .mantine-Button-root {
            min-height: 44px !important;
            font-size: 16px !important;
          }
          
          .mantine-Title-root {
            font-size: 20px !important;
            margin-bottom: 16px !important;
          }
          
          .mantine-Checkbox-root {
            margin-top: 8px !important;
          }
        }
        
        @media (max-width: 480px) {
          .mantine-Container-root {
            padding: 0 4px !important;
          }
          
          .mantine-Paper-root {
            padding: 12px !important;
          }
          
          .mantine-TextInput-input,
          .mantine-PasswordInput-input,
          .mantine-Select-input,
          .mantine-Textarea-input {
            font-size: 16px !important;
            padding: 10px 12px !important;
          }
        }
      `}</style>
    </Container>
  );
}
