import React from 'react';
import { Container, Title, Text, Button, Group, Card, SimpleGrid, Box, Stack, Badge, Image, Paper, rem, ThemeIcon, Divider, Anchor } from '@mantine/core';
import { Accordion, AccordionItem, AccordionControl, AccordionPanel } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconDownload, IconClock, IconInfinity, IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: IconQrcode,
      title: 'QR Kod Oluşturma',
      description: 'Hızlı ve kolay bir şekilde özelleştirilebilir QR kodlar oluşturun.',
      limit: '24 saat içinde 3 QR kod',
      devices: [IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop],
      color: '#228be6'
    },
    {
      icon: IconWifi,
      title: 'WiFi Paylaşımı',
      description: 'WiFi ağlarınızı QR kod ile güvenli bir şekilde paylaşın.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile, IconDeviceLaptop],
      color: '#40c057'
    },
    {
      icon: IconMail,
      title: 'E-posta Gönderimi',
      description: 'Toplu e-posta gönderimi ve e-posta şablonları ile iletişiminizi kolaylaştırın.',
      limit: 'Sınırsız',
      devices: [IconDeviceLaptop, IconDeviceDesktop],
      color: '#fd7e14'
    },
    {
      icon: IconMessage,
      title: 'SMS Gönderimi',
      description: 'Toplu SMS gönderimi ve otomatik mesaj şablonları ile müşterilerinizle iletişimde kalın.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile],
      color: '#fa5252'
    },
    {
      icon: IconAddressBook,
      title: 'vCard Yönetimi',
      description: 'Dijital kartvizitlerinizi oluşturun ve paylaşın.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile, IconDeviceLaptop],
      color: '#7950f2'
    },
  ];

  const faqData = [
    {
      question: 'QR kod oluşturma limiti nedir?',
      answer: 'Ücretsiz kullanıcılar 24 saat içinde en fazla 3 QR kod oluşturabilir. Premium üyelik ile sınırsız QR kod oluşturabilirsiniz.'
    },
    {
      question: 'Oluşturduğum QR kodları nasıl indirebilirim?',
      answer: 'QR kodlarınızı PNG, JPG ve SVG formatlarında indirebilirsiniz. İndirme işlemi için QR kodunuzun yanındaki indirme butonunu kullanabilirsiniz.'
    },
    {
      question: 'WiFi paylaşımı güvenli mi?',
      answer: 'Evet, WiFi paylaşımı tamamen güvenlidir. QR kodlar şifrelenmiş bağlantı bilgilerini içerir ve sadece sizin belirlediğiniz süre boyunca geçerlidir.'
    },
    {
      question: 'Toplu SMS gönderimi için limit var mı?',
      answer: 'Ücretsiz kullanıcılar aylık 100 SMS gönderebilir. Premium üyelik ile sınırsız SMS gönderimi yapabilirsiniz.'
    },
    {
      question: 'vCard oluşturma özelliği nasıl çalışır?',
      answer: 'vCard özelliği ile dijital kartvizitlerinizi oluşturabilir, özelleştirebilir ve QR kod olarak paylaşabilirsiniz. Kartvizitlerinize iletişim bilgilerinizi, sosyal medya hesaplarınızı ve daha fazlasını ekleyebilirsiniz.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        style={{ 
          background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
          padding: `${rem(100)} 0`,
          color: 'white'
        }}
      >
        <Container size="lg">
          <Stack align="center" gap="xl">
            <Title 
              order={1} 
              size={rem(48)} 
              style={{ 
                fontWeight: 900,
                textAlign: 'center',
                lineHeight: 1.2
              }}
            >
              Dijital İletişim Çözümleri
            </Title>
            <Text 
              size="xl" 
              maw={rem(680)} 
              style={{ 
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi gibi özelliklerle
              işletmenizin dijital varlığını güçlendirin.
            </Text>
            <Group justify="center" mt="xl" gap="xl">
              <Button 
                size="lg" 
                radius="xl"
                component={Link} 
                href="/register"
                style={{
                  backgroundColor: 'white',
                  color: '#228be6',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Hemen Başla
              </Button>
              <Button 
                size="lg" 
                radius="xl"
                variant="outline" 
                component={Link} 
                href="/login"
                style={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Giriş Yap
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="lg" py={80}>
        <Title 
          order={2} 
          ta="center" 
          mb={50}
          style={{ 
            fontSize: rem(36),
            fontWeight: 800
          }}
        >
          Özelliklerimiz
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              padding="xl" 
              radius="lg" 
              withBorder
              style={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  borderColor: feature.color
                }
              }}
            >
              <ThemeIcon size={50} radius="md" color={feature.color}>
                <feature.icon style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
              </ThemeIcon>
              <Text size="lg" fw={700} mt="md">
                {feature.title}
              </Text>
              <Text size="sm" c="dimmed" mt="sm">
                {feature.description}
              </Text>
              <Group mt="md" gap="xs">
                {feature.limit === 'Sınırsız' ? (
                  <Badge leftSection={<IconInfinity size={14} />} color="green" variant="light">
                    Sınırsız
                  </Badge>
                ) : (
                  <Badge leftSection={<IconClock size={14} />} color="blue" variant="light">
                    {feature.limit}
                  </Badge>
                )}
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* QR Code Examples Section */}
      <Box style={{ background: '#f8f9fa', padding: `${rem(80)} 0` }}>
        <Container size="lg">
          <Title 
            order={2} 
            ta="center" 
            mb={50}
            style={{ 
              fontSize: rem(36),
              fontWeight: 800
            }}
          >
            Özellik Detayları
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {features.map((feature) => (
              <Paper 
                key={feature.title} 
                p="xl" 
                radius="lg" 
                withBorder
                style={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    borderColor: feature.color
                  }
                }}
              >
                <Group align="flex-start" wrap="nowrap">
                  <ThemeIcon size={80} radius="lg" color={feature.color} style={{ flexShrink: 0 }}>
                    <feature.icon style={{ width: rem(40), height: rem(40) }} stroke={1.5} />
                  </ThemeIcon>
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Group>
                      <Text fw={700} size="lg">{feature.title}</Text>
                    </Group>
                    <Text size="sm" c="dimmed">{feature.description}</Text>
                    <Group gap="xs">
                      <Badge leftSection={<IconDownload size={14} />} color={feature.color} variant="light">
                        PNG, JPG, SVG
                      </Badge>
                      {feature.limit === 'Sınırsız' ? (
                        <Badge leftSection={<IconInfinity size={14} />} color="green" variant="light">
                          Sınırsız
                        </Badge>
                      ) : (
                        <Badge leftSection={<IconClock size={14} />} color="blue" variant="light">
                          {feature.limit}
                        </Badge>
                      )}
                    </Group>
                    <Group gap="xs" mt="xs">
                      {feature.devices.map((Device, index) => (
                        <ThemeIcon key={index} size="sm" radius="xl" color={feature.color} variant="light">
                          <Device size={14} />
                        </ThemeIcon>
                      ))}
                    </Group>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container size="lg" py={80}>
        <Title 
          order={2} 
          ta="center" 
          mb={50}
          style={{ 
            fontSize: rem(36),
            fontWeight: 800
          }}
        >
          Sıkça Sorulan Sorular
        </Title>
        <Accordion variant="separated" radius="md">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionControl>
                <Text fw={500}>{faq.question}</Text>
              </AccordionControl>
              <AccordionPanel>
                <Text c="dimmed">{faq.answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>

      {/* Footer */}
      <Box 
        style={{ 
          background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
          color: 'white',
          padding: `${rem(60)} 0`
        }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
            <Stack gap="xs">
              <Text fw={700} size="lg">Hakkımızda</Text>
              <Text size="sm" c="white" opacity={0.8}>
                Dijital iletişim çözümleri sunan modern ve kullanıcı dostu bir platform.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Text fw={700} size="lg">Hızlı Bağlantılar</Text>
              <Anchor component={Link} href="/login" c="white" opacity={0.8}>Giriş Yap</Anchor>
              <Anchor component={Link} href="/register" c="white" opacity={0.8}>Kayıt Ol</Anchor>
              <Anchor component={Link} href="/dashboard" c="white" opacity={0.8}>Dashboard</Anchor>
              <Anchor component={Link} href="/examples" c="white" opacity={0.8}>Tasarımlar</Anchor>
            </Stack>
            <Stack gap="xs">
              <Text fw={700} size="lg">Özellikler</Text>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>QR Kod Oluşturma</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>WiFi Paylaşımı</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>E-posta Gönderimi</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>SMS Gönderimi</Anchor>
            </Stack>
            <Stack gap="xs">
              <Text fw={700} size="lg">Bizi Takip Edin</Text>
              <Group gap="xs">
                <Anchor href="https://github.com" target="_blank" c="white" opacity={0.8}>
                  <IconBrandGithub size={20} />
                </Anchor>
                <Anchor href="https://twitter.com" target="_blank" c="white" opacity={0.8}>
                  <IconBrandTwitter size={20} />
                </Anchor>
                <Anchor href="https://linkedin.com" target="_blank" c="white" opacity={0.8}>
                  <IconBrandLinkedin size={20} />
                </Anchor>
              </Group>
            </Stack>
          </SimpleGrid>
          <Divider my="xl" color="white" opacity={0.2} />
          <Text ta="center" size="sm" c="white" opacity={0.8}>
            © 2025 Dijital İletişim Çözümleri. Tüm hakları saklıdır.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
