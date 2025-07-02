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
  title: "Google Yorumları Artırmanın En Kolay Yolu: VunQR ile QR Kodlu Yorumlar",
  description:
    "VunQR’ın yeni özelliği sayesinde işletmenizin Google yorum sayfasına doğrudan yönlendiren QR kodları oluşturabilirsiniz. Müşterileriniz tek dokunuşla yorum bırakır, puanınızı yükseltirsiniz.",
  keywords:
    "Google Yorum, QR Kod, Google Review, Müşteri Geri Bildirimi, Dijital Pazarlama, VunQR",
  openGraph: {
    title: "VunQR ile Google Yorumlarınızı Artırın",
    description:
      "QR kod ile müşterilerinizi doğrudan Google yorum bırakmaya yönlendirin. Kolay, hızlı ve etkili.",
    url: "https://vunqr.com/blogs/google-review",
    type: "article",
    siteName: "VunQR",
    images: [
      {
        url: "https://vunqr.com/icon.png",
        width: 600,
        height: 315,
        alt: "VunQR Google Yorum QR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Yorum QR Kod Özelliği Yayında!",
    description:
      "İşletmenizin Google yorumlarını artırmak için VunQR’dan QR kodlu kolay erişim.",
    images: ["https://vunqr.com/icon.png"],
  },
};

const bannerText = {
  title: "VunQR Blog",
  desc: "Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.",
};

export default function BlogPostGoogleReview() {
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
          Google Yorumlarınızı Artırmanın En Kolay Yolu: VunQR QR Kodlar
        </Title>
        <Text size="xs" style={{ color: "#4a5568", marginBottom: "1.5rem", fontWeight: 500 }}>
          {getTodayTR()}
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Günümüzde işletmeler için müşteri yorumları, dijital itibar ve pazarlama stratejisinin önemli bir parçası haline geldi. VunQR’ın yeni özelliği sayesinde artık Google yorum sayfanıza müşterileri doğrudan yönlendiren QR kodları oluşturmak çok kolay.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Müşterileriniz masadaki veya işletmenizdeki QR kodu okuttuğunda doğrudan Google yorum yazma ekranına yönlendirilir. Bu da yorum bırakmayı pratik hale getirerek, işletmenizin puanını ve görünürlüğünü artırmanıza yardımcı olur.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          <strong>Öne Çıkan Özellikler:</strong><br /><br />
          - QR kod ile hızlı ve kolay Google yorum erişimi<br />
          - Place ID tabanlı doğrudan yorum kutusu açma<br />
          - Kullanıcı dostu panel üzerinden kolay QR yönetimi<br />
          - Cloudinary ile güvenli ve hızlı görsel barındırma<br />
          - Müşteri memnuniyetini artırmaya yönelik modern dijital çözüm
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR olarak işletmelerin dijitalleşme yolculuğunda yanında olmaya devam ediyoruz. Google yorumlarını artırmak ve müşteri geri bildirimlerini kolaylaştırmak için geliştirdiğimiz bu QR kod çözümünü hemen deneyin.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
          Hemen başlayın ve işletmenizin Google’da daha görünür olmasını sağlayın!{" "}
          <Link href="https://vunqr.com/register" style={{ color: "#228be6", textDecoration: "underline" }}>
            Ücretsiz hesabınızı oluşturun
          </Link>{" "}
          ve ilk Google yorum QR kodunuzu oluşturun.
        </Text>

        <Box style={{ flex: 1 }} />
      </Container>
    </Box>
  );
}
