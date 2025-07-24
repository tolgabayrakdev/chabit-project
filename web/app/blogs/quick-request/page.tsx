import Link from "next/link";
import {
    Box,
    Container,
    Title,
    Text,
    Button,
    Image
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

function getTodayTR() {
    return new Date().toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const metadata = {
    title: "Hızlı Talep Formlarıyla Anında Müşteri Etkileşimi | VunQR Blog",
    description: "VunQR Hızlı Talep Modülü ile müşteri taleplerini toplayın, yönetin ve analiz edin. QR destekli formlar ile daha verimli iletişim sağlayın.",
    keywords: "hızlı talep formu, vunqr, müşteri talep yönetimi, qr ile form, destek formu, form yönetimi, talep analizi",
    openGraph: {
        title: "Hızlı Talep Formlarıyla Anında Müşteri Etkileşimi",
        description: "QR destekli talep formlarıyla işletmenizin müşteri iletişimini güçlendirin.",
        url: "https://vunqr.com/blogs/hizli-talep-formu",
        type: "article",
        siteName: "VunQR",
        images: [
            {
                url: "https://vunqr.com/icon.png",
                width: 600,
                height: 315,
                alt: "Hızlı Talep Formu - VunQR",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hızlı Talep Formlarıyla Müşteri İletişimini Güçlendirin",
        description: "İşletmeler için QR destekli hızlı form çözümü: Talep al, yanıtla, ölç.",
        images: ["https://vunqr.com/icon.png"],
    },
};

const bannerText = {
    title: "VunQR Blog",
    desc: "Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.",
};

export default function BlogPostQuickRequest() {
    return (
        <Box>
            <Box
                style={{
                    background: "linear-gradient(135deg, #228be6 0%, #4dabf7 100%)",
                    color: "white",
                    padding: "2.5rem 0 2rem 0",
                    textAlign: "center",
                    marginBottom: "2.5rem",
                }}
            >
                <Title order={1} style={{ fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-1px", marginBottom: 8 }}>
                    {bannerText.title}
                </Title>
                <Text size="lg" style={{ opacity: 0.92, maxWidth: 600, margin: "0 auto" }}>
                    {bannerText.desc}
                </Text>
            </Box>

            <Container size="sm" style={{ minHeight: "70vh", display: "flex", flexDirection: "column" }}>
                <Button
                    component={Link}
                    href="/blogs"
                    leftSection={<IconArrowLeft size={16} />}
                    variant="subtle"
                    size="md"
                    style={{
                        alignSelf: "flex-start",
                        marginBottom: "2rem",
                        color: "#228be6",
                        fontWeight: 600,
                    }}
                >
                    Yazılara Geri Dön
                </Button>

                <Title order={2} style={{ fontWeight: 700, fontSize: "2rem", color: "#222", marginBottom: "0.5rem" }}>
                    Hızlı Talep Formlarıyla Müşteri Etkileşimini Artırın
                </Title>
                <Text size="xs" style={{ color: "#4a5568", marginBottom: "1.5rem", fontWeight: 500 }}>
                    {getTodayTR()}
                </Text>

                <Image
                    src="https://images.unsplash.com/photo-1583969358187-29fcae5265d1?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Hızlı Talep Formu"
                    width={500}
                    height={300}
                    style={{ borderRadius: 12, margin: "0 auto 2rem auto", maxWidth: "100%" }}
                />

                <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Müşterilerinizin size hızlıca ulaşmasını istiyorsanız, artık klasik iletişim formlarını unutun! VunQR’ın yeni <strong>Hızlı Talep Modülü</strong> ile saniyeler içinde bilgi toplayabilir, talepleri panelden kolayca yönetebilirsiniz.
                </Text>

                <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
                    Hızlı Talep Modülü Nedir?
                </Title>

                <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Hızlı Talep Modülü, işletmelerin müşterilerinden kısa form aracılığıyla hızlı geri bildirim veya bilgi talebi toplamasını sağlar. Formlara özel QR kodları üretip afişlere, kartvizitlere veya sosyal medyaya yerleştirerek hızlı erişim sağlayabilirsiniz.
                </Text>

                <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
                    Öne Çıkan Özellikler
                </Title>

                <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    - <strong>QR destekli formlar:</strong> Kişiye özel form bağlantıları ve QR üretimi<br />
                    - <strong>Gerçek zamanlı bildirim:</strong> Yeni talep geldiğinde mail ve panel bildirimi<br />
                    - <strong>Panelden yönetim:</strong> Talepleri listele, oku, not al, durumunu değiştir<br />
                    - <strong>İstatistik ve analiz:</strong> Hangi form ne kadar talep aldı, kaç tanesi yanıtlandı<br />
                </Text>

                <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
                    Kimler Kullanmalı?
                </Title>

                <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
                    - <strong>Danışmanlar & Ajanslar:</strong> Web sitelerine talep formu entegre edebilir<br />
                    - <strong>Restoran & Kafeler:</strong> Menü istekleri ya da geri bildirimler toplanabilir<br />
                    - <strong>Gayrimenkul Ofisleri:</strong> QR ile daire hakkında bilgi talebi alınabilir<br />
                    - <strong>Freelancer'lar:</strong> Hızlı teklif toplama formu olarak kullanılabilir
                </Text>

                <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
                    Hızlı Talep Formu ile müşterileriniz size bir adım daha yakın!
                    <Link href="/register" style={{ textDecoration: "underline", color: "#228be6" }}>Formunu hemen oluştur</Link> ve dijital dönüşümün parçası ol.
                </Text>

                <Box style={{ flex: 1 }} />
            </Container>
        </Box>
    );
}
