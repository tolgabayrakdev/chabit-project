"use client";

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

const bannerText = {
  title: "Vunqr Blog",
  desc: "Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.",
};

export default function BlogPostVunQRNedir() {
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
          VunQR Nedir? Dijital Çağın Yeni İletişim Aracıyla Tanışın
        </Title>
        <Text size="xs" style={{ color: "#4a5568", marginBottom: "1.5rem", fontWeight: 500 }}>
          {getTodayTR()}
        </Text>

       

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Dijital dünyada bağlantı kurmak artık yalnızca bir link paylaşmakla sınırlı değil. VunQR, kişisel ve kurumsal iletişimi bir üst seviyeye taşıyan, modern, sade ve işlevsel bir dijital çözüm platformudur. QR kodlar, dijital kartvizitler, link-in-bio profilleri ve daha fazlası ile her ihtiyaca yanıt verir.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR, kullanıcıların aşağıdaki ihtiyaçlarını karşılamak için geliştirilmiş kapsamlı bir dijital araçtır:
          <br /><br />
          - <strong>QR Kod Oluşturma:</strong> WiFi, SMS, e-posta, URL ve vCard gibi çok sayıda QR tipi desteği.<br />
          - <strong>Link-in-Bio Profili:</strong> Tüm sosyal medya ve iletişim linklerinizi tek bir şık sayfada toplayın.<br />
          - <strong>Dijital Kartvizit:</strong> İş dünyası için modern, kolay erişilebilir bir kimlik çözümü.<br />
          - <strong>Görsel Yönetimi:</strong> Cloudinary entegrasyonu ile hızlı ve güvenli medya yönetimi.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR, her ölçekteki kullanıcı için uygundur. Serbest çalışanlar, küçük işletmeler, ajanslar, influencer'lar ve büyük markalar VunQR'ı kullanarak dijital kimliklerini güçlendirebilir. Kullanımı kolay arayüzü sayesinde teknik bilgi gerektirmez.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          - Kullanıcı dostu ve modern tasarım.<br />
          - Hızlı ve güvenli QR üretimi.<br />
          - Özelleştirilebilir profil ve bağlantı yapısı.<br />
          - Ücretsiz başlangıç planı ve gelişmiş Pro özellikler.<br />
          - Mobil uyumlu, SEO dostu yapı.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          VunQR'ı kullanmaya başlamak için yalnızca birkaç dakikanızı ayırmanız yeterli.{" "}
          <Link href="https://vunqr.com/register" style={{ color: "#228be6", textDecoration: "underline" }}>
            Hemen üye olun
          </Link>
          , ilk QR kodunuzu oluşturun ya da Link-in-Bio profilinizi kişiselleştirin.
        </Text>

        <Text size="md" style={{ color: "#444", lineHeight: 1.7, marginBottom: "2rem" }}>
          Dijital iletişim artık hızlı, etkili ve kullanıcı dostu olmalı. VunQR, tüm bu ihtiyaçları karşılayan, sade ama güçlü bir çözümdür. İşletmenizi, markanızı ya da kişisel profilinizi dijitale taşımak için bugün VunQR ile tanışın.
        </Text>

        <Box style={{ flex: 1 }} />
      </Container>
    </Box>
  );
}
