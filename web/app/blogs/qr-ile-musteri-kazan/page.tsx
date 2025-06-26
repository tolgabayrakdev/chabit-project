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
  title: "QR Kod ile Müşteri Kazanma Yolları | VunQR Blog",
  description: "QR kod ile nasıl müşteri kazanılır? Etkili dijital pazarlama tüyoları ve VunQR ile örnek kullanımlar bu yazıda!",
  keywords: "QR kod pazarlama, müşteri kazanma, VunQR, dijital tanıtım, QR ile promosyon, link in bio, küçük işletme dijitalleşme",
  openGraph: {
    title: "QR Kod ile Nasıl Müşteri Kazanılır?",
    description: "VunQR ile QR kodları pazarlamada kullanarak müşterilere nasıl ulaşabileceğinizi öğrenin.",
    url: "https://vunqr.com/blogs/qr-ile-musteri-kazan",
    type: "article",
    siteName: "VunQR",
    images: [
      {
        url: "https://vunqr.com/icon.png",
        width: 600,
        height: 315,
        alt: "QR ile Müşteri Kazanma - VunQR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Kod ile Müşteri Kazanma Yolları",
    description: "Dijital dünyada müşterilere ulaşmanın akıllı yolu: QR kodlar ve VunQR çözümleri.",
    images: ["https://vunqr.com/icon.png"],
  },
};

const bannerText = {
  title: "Vunqr Blog",
  desc: "Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.",
};

export default function BlogPostQrMusteri() {
  return (
    <Box>
      {/* Üst Banner */}
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

      {/* İçerik */}
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
          QR Kod ile Nasıl Müşteri Çekilir? Dijital Dünyada Akıllı Pazarlama
        </Title>
        <Text size="xs" style={{ color: "#4a5568", marginBottom: "1.5rem", fontWeight: 500 }}>
          {getTodayTR()}
        </Text>

        <Image
          src="https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="QR Kod ile Pazarlama"
          width={500}
          height={300}
          style={{ borderRadius: 12, margin: "0 auto 2rem auto", maxWidth: "100%" }}
        />

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Günümüzde dijitalleşme yalnızca büyük firmaların değil, küçük işletmelerin de güçlü bir silahı haline geldi. QR kodlar bu dönüşümün en pratik ve etkili araçlarından biri. Müşteriye kolay erişim sağlarken markanızı hatırlanabilir kılar.
        </Text>

        <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
          QR Kod ile Müşteri Kazanmanın Yolları
        </Title>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          - <strong>Fiziksel Alanlarda QR Kullanımı:</strong> Menü, broşür, vitrin gibi yerlerde QR kod ile müşteriyi promosyon sayfasına yönlendirin.<br />
          - <strong>Sosyal Medya Entegrasyonu:</strong> Instagram, TikTok ve YouTube içeriklerinize QR ile bağlantı sağlayın.<br />
          - <strong>Sadakat Programları:</strong> Her QR taramasında puan kazandıran sistemlerle müşteri sadakati yaratın.<br />
          - <strong>Etkinlik ve Lansmanlar:</strong> Katılımcılara özel teklifler veya hızlı kayıt bağlantıları sunun.
        </Text>

        <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
          VunQR ile Fark Yaratın
        </Title>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR ile QR kodlarınızı saniyeler içinde oluşturabilir, kullanıcı dostu panellerden linklerinizi yönetebilir ve gelişmiş analizlerle performans takibi yapabilirsiniz. Sınırsız bağlantı ekleyebileceğiniz <Link href="/link-in-bio" style={{ textDecoration: "underline", color: "#228be6" }}>Link-in-Bio</Link> özelliği sayesinde sosyal medya gücünüzü artırabilirsiniz.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
          QR teknolojisi yalnızca barkodun dijital versiyonu değil, aynı zamanda modern çağın hızlı iletişim çözümüdür. VunQR ile bu gücü kolayca elinize alın.
        </Text>

        <Box style={{ flex: 1 }} />
      </Container>
    </Box>
  );
}
