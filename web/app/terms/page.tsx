import Link from "next/link";
import { Box, Container, Title, Text, Stack, Anchor, rem } from "@mantine/core";

export default function TermsPage() {
  return (
    <Box style={{ minHeight: "100vh", background: "#f8f9fa", padding: rem(40) }}>
      <Container size="sm">
        <Stack gap="lg">
          <Title order={1} style={{ fontWeight: 900, fontSize: rem(36), textAlign: "center" }}>
            Kullanım Şartları
          </Title>
          <Text ta="center" c="dimmed" mb="md">
            Lütfen platformumuzu kullanmadan önce bu şartları dikkatlice okuyun.
          </Text>
          <Box bg="white" p={32} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <Title order={2} size="h4" mb="sm">1. Hizmetin Kullanımı</Title>
            <Text mb="md">Platformumuzu yalnızca yasal amaçlarla ve geçerli mevzuata uygun şekilde kullanmayı kabul edersiniz.</Text>
            <Title order={2} size="h4" mb="sm">2. Hesap Güvenliği</Title>
            <Text mb="md">Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayınız.</Text>
            <Title order={2} size="h4" mb="sm">3. Sorumluluk Reddi</Title>
            <Text mb="md">Platformumuzda sunulan hizmetlerin kesintisiz veya hatasız olacağını garanti etmiyoruz.</Text>
            <Title order={2} size="h4" mb="sm">4. Değişiklikler</Title>
            <Text mb="md">Kullanım şartlarında değişiklik yapma hakkımız saklıdır. Güncellemeleri bu sayfadan takip edebilirsiniz.</Text>
          </Box>
          <Anchor component={Link} href="/" ta="center" mt="lg" c="blue">
            Ana Sayfa'ya Dön
          </Anchor>
        </Stack>
      </Container>
    </Box>
  );
} 