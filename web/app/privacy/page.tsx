import Link from "next/link";
import { Box, Container, Title, Text, Stack, Anchor, rem } from "@mantine/core";

export default function PrivacyPage() {
  return (
    <Box style={{ minHeight: "100vh", background: "#f8f9fa", padding: rem(40) }}>
      <Container size="sm">
        <Stack gap="lg">
          <Title order={1} style={{ fontWeight: 900, fontSize: rem(36), textAlign: "center" }}>
            Gizlilik Politikası
          </Title>
          <Text ta="center" c="dimmed" mb="md">
            Kişisel verilerinizin gizliliği ve güvenliği bizim için önemlidir. Lütfen bu politikayı dikkatlice okuyun.
          </Text>
          <Box bg="white" p={32} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <Title order={2} size="h4" mb="sm">1. Toplanan Bilgiler</Title>
            <Text mb="md">Kayıt sırasında ve hizmetlerimizi kullanırken sizden bazı kişisel bilgiler talep edebiliriz (ör. email adresi).</Text>
            <Title order={2} size="h4" mb="sm">2. Bilgilerin Kullanımı</Title>
            <Text mb="md">Toplanan bilgiler yalnızca hizmetlerimizi sunmak, geliştirmek ve sizinle iletişime geçmek için kullanılır.</Text>
            <Title order={2} size="h4" mb="sm">3. Üçüncü Taraflarla Paylaşım</Title>
            <Text mb="md">Kişisel bilgileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.</Text>
            <Title order={2} size="h4" mb="sm">4. Güvenlik</Title>
            <Text mb="md">Verilerinizin güvenliği için gerekli tüm teknik ve idari önlemler alınmaktadır.</Text>
          </Box>
          <Anchor component={Link} href="/" ta="center" mt="lg" c="blue">
            Ana Sayfa'ya Dön
          </Anchor>
        </Stack>
      </Container>
    </Box>
  );
} 