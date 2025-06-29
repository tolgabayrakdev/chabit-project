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
  title: "Dijital Menü ile Tanışın: QR Kod ile Menü Paylaşımı | VunQR Blog",
  description:
    "VunQR’ın yeni dijital menü özelliğiyle restoranlar, kafeler ve işletmeler PDF menülerini kolayca yükleyip QR kodla paylaşabilir. Hızlı, pratik ve temassız menü deneyimi!",
  keywords:
    "Dijital Menü, QR Menü, PDF Menü Paylaşımı, Restoran Menü QR, VunQR Menü, Menü QR Kod, Cloudinary Menü",
  openGraph: {
    title: "VunQR Dijital Menü: Temassız ve Kolay Menü Deneyimi",
    description:
      "VunQR ile PDF menünüzü yükleyin, QR kod oluşturun, müşterilerinize modern bir deneyim sunun.",
    url: "https://vunqr.com/blogs/dijital-menu",
    type: "article",
    siteName: "VunQR",
    images: [
      {
        url: "https://vunqr.com/icon.png",
        width: 600,
        height: 315,
        alt: "VunQR Dijital Menü",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VunQR Dijital Menü Özelliği Yayında!",
    description:
      "PDF menülerinizi QR kodla kolayca paylaşın. Restoran ve kafeler için temassız dijital menü çözümü.",
    images: ["https://vunqr.com/icon.png"],
  },
};


const bannerText = {
  title: "Vunqr Blog",
  desc: "Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.",
};

export default function BlogPostDijitalMenu() {
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
        <Title
          order={1}
          style={{
            fontWeight: 900,
            fontSize: "2.2rem",
            letterSpacing: "-1px",
            marginBottom: 8,
          }}
        >
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
          Dijital Menü Özelliğimiz Yayında! Menülerinizi QR Kod ile Paylaşın
        </Title>
        <Text size="xs" style={{ color: "#4a5568", marginBottom: "1.5rem", fontWeight: 500 }}>
          {getTodayTR()}
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Restoranlar, kafeler ve diğer yeme-içme işletmeleri için artık menü paylaşımı çok daha kolay. VunQR’ın yeni <strong>dijital menü</strong> özelliği sayesinde PDF formatındaki menünüzü birkaç adımda yükleyebilir, anında QR kod oluşturarak müşterilerinizle paylaşabilirsiniz.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Bu özellik özellikle <strong>temassız menü ihtiyacını</strong> karşılamak isteyen işletmeler için büyük kolaylık sağlıyor. Müşterileriniz masada yer alan QR kodu okutarak doğrudan dijital menünüze ulaşabilir.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          <strong>Öne Çıkan Özellikler:</strong><br /><br />
          - PDF menü dosyasını doğrudan yükleme<br />
          - Cloudinary üzerinden güvenli ve hızlı barındırma<br />
          - Otomatik QR kod üretimi<br />
          - QR üzerinden anında menü erişimi<br />
          - Mobil uyumlu ve şık görünüm
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR olarak dijitalleşen dünyada işletmelerin en güncel ihtiyaçlarına çözüm üretmeye devam ediyoruz. <strong>Dijital Menü</strong> özelliğimiz, menülerinizin güncellenmesini, paylaşılmasını ve erişimini son derece pratik hale getiriyor.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Henüz denemediniz mi?{" "}
          <Link href="https://vunqr.com/register" style={{ color: "#228be6", textDecoration: "underline" }}>
            Hemen ücretsiz hesabınızı oluşturun
          </Link>{" "}
          ve ilk dijital menünüzü yayınlayın.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
          Dijitalleşmeye ayak uydurmak artık zor değil. VunQR ile menülerinizi modernleştirin, müşterilerinize konforlu ve hızlı bir deneyim sunun.
        </Text>

        <Box style={{ flex: 1 }} />
      </Container>
    </Box>
  );
}
