"use client";

import React, { useState } from "react";
import { TextInput, Button, Stack, Group, ColorInput, Select } from "@mantine/core";
import { IconLink, IconQrcode } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { QrFormLayout } from "@/components/QrFormLayout";

export default function UrlPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const router = useRouter();
    const [logo, setLogo] = useState<File | null>(null);
    const [designOptions, setDesignOptions] = useState({ style: "dot", darkColor: "#15aabf" });
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
            url: "",
        },
        validate: {
            label: (value) => (value.length < 3 ? "QR kod ismi en az 3 karakter olmalıdır" : null),
            url: (value) => (value.trim().length < 4 ? "Geçerli bir URL giriniz" : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setStatus("loading");
        try {
            let urlValue = values.url;
            if (!/^https?:\/\//.test(urlValue)) {
                urlValue = `https://${urlValue}`;
            }
            const formData = new FormData();
            formData.append("label", values.label);
            formData.append("url", urlValue);
            formData.append("designOptions", JSON.stringify(designOptions));
            if (logo) {
                formData.append("logo", logo);
            }

            const response = await fetch("/api/qr/url", {
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

    const qrValue = form.values.url && form.values.url.trim().length > 0 
        ? (/^https?:\/\//.test(form.values.url) ? form.values.url : `https://${form.values.url}`) 
        : "https://";

    return (
        <QrFormLayout
            title="URL QR Kod Oluştur"
            description="Oluşturduğunuz bu QR kodunu okutan kişi, belirttiğiniz bağlantıya yönlendirilir. Web sitenizi, sosyal medya profilinizi veya herhangi bir linki hızlıca paylaşmak için idealdir."
            icon={<IconLink size={24} />}
            themeColor="cyan"
            gradientFrom="#e3fafc"
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
                        placeholder="Örn: Websitem"
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
                        label="URL"
                        placeholder="www.example.com"
                        required
                        radius="sm"
                        size="sm"
                        styles={{
                            label: { fontSize: '13px', marginBottom: 4 },
                            input: { minHeight: '34px', lineHeight: '34px' }
                        }}
                        {...form.getInputProps("url")}
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
                    <Button
                        type="submit"
                        loading={loading}
                        radius="sm"
                        size="sm"
                        leftSection={<IconQrcode size={16} />}
                        mt={4}
                        style={{
                            background: "#15aabf",
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
