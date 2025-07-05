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
  title: "WiFi QR Kod ile Misafir Deneyimini Geliştirin | VunQR Blog",
  description: "WiFi QR kodları ile müşterilere hızlı internet erişimi sağlayın. Kafe, restoran ve ofislerde kolay bağlantı çözümleri bu yazıda!",
  keywords: "wifi qr kod, qr ile wifi paylaşımı, müşteri deneyimi, vunqr, kablosuz internet paylaşımı, restoran wifi çözümü, qr ile wifi",
  openGraph: {
    title: "WiFi QR Kod ile Kolay İnternet Paylaşımı",
    description: "Müşterileriniz WiFi şifresi sormasın! VunQR ile pratik QR kod çözümünü keşfedin.",
    url: "https://vunqr.com/blogs/wifi-qr-kod",
    type: "article",
    siteName: "VunQR",
    images: [
      {
        url: "https://vunqr.com/icon.png",
        width: 600,
        height: 315,
        alt: "WiFi QR Kod - VunQR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiFi QR Kod ile Misafir Deneyimini Geliştirin",
    description: "İşletmeler için akıllı internet paylaşımı: QR ile WiFi bağlantısı sağlama rehberi.",
    images: ["https://vunqr.com/icon.png"],
  },
};

const bannerText = {
  title: "Vunqr Blog",
  desc: "Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.",
};

export default function BlogPostWifiQr() {
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
          WiFi QR Kod ile Kolay İnternet Paylaşımı: Modern Müşteri Deneyimi
        </Title>
        <Text size="xs" style={{ color: "#4a5568", marginBottom: "1.5rem", fontWeight: 500 }}>
          {getTodayTR()}
        </Text>

        <Image
          src="https://images.unsplash.com/photo-1615014816663-7b4e95d518ce?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="WiFi QR Kod"
          width={500}
          height={300}
          style={{ borderRadius: 12, margin: "0 auto 2rem auto", maxWidth: "100%" }}
        />

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Kafenizde ya da ofisinizde her gün onlarca kişi WiFi şifresini soruyor olabilir. Aynı şifreyi tekrar tekrar yazmak hem yorucu hem de zaman kaybı. VunQR’ın WiFi QR Kod özelliği sayesinde müşterileriniz tek bir tarama ile ağa bağlanabilir.
        </Text>

        <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
          WiFi QR Kod Nerelerde Kullanılır?
        </Title>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          - <strong>Kafeler ve Restoranlar:</strong> Masalara koyulan QR kodlarla misafirler hızlıca internete bağlanabilir.<br />
          - <strong>Ofisler:</strong> Ziyaretçilere kolay ve güvenli internet erişimi sunulur.<br />
          - <strong>Oteller:</strong> Odalara özel QR kodlarla check-in sonrası kolay bağlantı sağlanır.<br />
          - <strong>Etkinlikler:</strong> Toplantı, seminer ve fuarlarda internet paylaşımı hızlı ve sorunsuz olur.
        </Text>

        <Title order={3} style={{ color: "#228be6", marginTop: "2rem", marginBottom: "1rem" }}>
          Neden VunQR ile WiFi QR Kod?
        </Title>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR ile WiFi ağ adınızı ve şifrenizi kolayca tanımlayabilir, saniyeler içinde QR kodunuzu oluşturabilirsiniz. Üstelik farklı ağlar için birden fazla QR kod üretip yönlendirmelerinizi analiz edebilirsiniz.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
          Müşteri memnuniyetini artırmak artık küçük bir detayla mümkün: Şifre sormaya son! <Link href="/wifi" style={{ textDecoration: "underline", color: "#228be6" }}>WiFi QR kodunuzu hemen oluşturun</Link> ve dijital kolaylığı yaşayın.
        </Text>

        <Box style={{ flex: 1 }} />
      </Container>
    </Box>
  );
}
