"use client";

import React, { useState } from "react";
import { TextInput, Button, Stack, Group, ColorInput, Select, Paper, Text } from "@mantine/core";
import { IconStar, IconQrcode } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { QrFormLayout } from "@/components/QrFormLayout";

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

            const response = await fetch("/api/qr/google-review", {
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
        <QrFormLayout
            title="Google Yorum QR Kod Oluştur"
            description="Google Yorum QR kodu, müşterilerinizin işletmenize kolayca Google üzerinden yorum bırakmasını sağlar. QR kodu okutan kişi, doğrudan firmanızın Google yorum sayfasına yönlendirilir. Yorum sayınızı ve müşteri memnuniyetini artırmak için idealdir."
            icon={<IconStar size={24} />}
            themeColor="yellow"
            gradientFrom="#fffbe6"
            gradientTo="#f8f9fa"
            status={status}
            qrValue={qrValue}
            logoUrl={logoUrl}
            designOptions={designOptions}
            onNewQr={handleNewQr}
        >
            <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }} encType="multipart/form-data">
                <Stack gap="xs">
                    <TextInput
                        label="QR Kod İsmi"
                        placeholder="Örn: Google Yorumum"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps("label")}
                    />
                    <TextInput
                        label="Google Place ID"
                        placeholder="Google Place ID'nizi giriniz"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps("placeId")}
                    />
                    <Group grow gap="xs">
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
                            size="sm"
                            radius="sm"
                            styles={{
                                label: { fontSize: '13px', marginBottom: 4 },
                                input: { minHeight: '34px', lineHeight: '34px' }
                            }}
                        />
                        <ColorInput
                            label="QR Renk"
                            value={designOptions.darkColor}
                            onChange={(color) => setDesignOptions((prev) => ({ ...prev, darkColor: color }))}
                            required
                            size="sm"
                            radius="sm"
                            styles={{
                                label: { fontSize: '13px', marginBottom: 4 },
                                input: { minHeight: '34px', lineHeight: '34px' }
                            }}
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
                        size="sm"
                        radius="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                    />
                    <Paper p="sm" radius="md" withBorder style={{ background: '#fffbe6', marginTop: 4, marginBottom: 8 }}>
                        <Text size="xs" fw={600} c="yellow.8" mb={4}>Google Place ID nedir?</Text>
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
                        radius="sm"
                        size="sm"
                        leftSection={<IconQrcode size={16} />}
                        mt={4}
                        style={{
                            background: "#fab005",
                            transition: "transform 0.2s",
                            height: '34px',
                            "&:hover": {
                                transform: "translateY(-2px)"
                            },
                        }}
                    >
                        QR Kod Oluştur
                    </Button>
                </Stack>
            </form>
        </QrFormLayout>
    );
}
