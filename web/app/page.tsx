import React from 'react';
import { Container, Title, Text, Button, Group, Card, SimpleGrid, Box, Stack, Badge, Image, Paper, rem, ThemeIcon, Divider, Anchor } from '@mantine/core';
import { Accordion, AccordionItem, AccordionControl, AccordionPanel } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconDownload, IconClock, IconInfinity, IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram, IconLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: IconQrcode,
      title: 'QR Kod Oluşturma',
      description: 'Hızlı ve kolay bir şekilde özelleştirilebilir QR kodlar oluşturun.',
      detail: 'Kendi logonuzu, marka renklerinizi ve farklı QR kod tiplerini kullanarak, kişisel veya kurumsal ihtiyaçlarınıza uygun QR kodlar oluşturabilirsiniz. QR kodlarınızı kolayca yönetebilir, istatistiklerini takip edebilirsiniz.',
      limit: '24 saat içinde 3 QR kod',
      devices: [IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop],
      color: '#228be6'
    },
    {
      icon: IconWifi,
      title: 'WiFi Paylaşımı',
      description: 'WiFi ağlarınızı QR kod ile güvenli bir şekilde paylaşın.',
      detail: 'Misafirleriniz veya müşterileriniz için WiFi şifresini paylaşmak artık çok kolay. WiFi ağınızı QR kod ile paylaşarak, kullanıcıların tek tıkla ağa bağlanmasını sağlayabilirsiniz. Şifreyi manuel yazmaya gerek kalmaz.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile, IconDeviceLaptop],
      color: '#40c057'
    },
    {
      icon: IconMail,
      title: 'E-posta Gönderimi',
      description: 'Toplu e-posta gönderimi ve e-posta şablonları ile iletişiminizi kolaylaştırın.',
      detail: 'Hazır e-posta şablonları ile toplu veya bireysel e-posta gönderebilir, alıcı listenizi kolayca yönetebilirsiniz. Otomatik yanıtlar ve zamanlanmış gönderimler ile iletişiminizi profesyonelleştirin.',
      limit: 'Sınırsız',
      devices: [IconDeviceLaptop, IconDeviceDesktop],
      color: '#fd7e14'
    },
    {
      icon: IconMessage,
      title: 'SMS Gönderimi',
      description: 'Toplu SMS gönderimi ve otomatik mesaj şablonları ile müşterilerinizle iletişimde kalın.',
      detail: 'Kampanya, bilgilendirme veya onay mesajlarınızı hızlıca gönderebilir, SMS şablonları oluşturabilirsiniz. Gönderim raporları ile iletilerin durumunu anlık olarak takip edin.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile],
      color: '#fa5252'
    },
    {
      icon: IconAddressBook,
      title: 'vCard Yönetimi',
      description: 'Dijital kartvizitlerinizi oluşturun ve paylaşın.',
      detail: 'Kişisel veya kurumsal dijital kartvizitler oluşturabilir, iletişim bilgilerinizi, sosyal medya hesaplarınızı ve daha fazlasını ekleyebilirsiniz. QR kod ile kartvizitinizi kolayca paylaşın.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile, IconDeviceLaptop],
      color: '#7950f2'
    },
    {
      icon: IconLink,
      title: 'URL QR Kod',
      description: 'Web sitenizi, sosyal medya profilinizi veya herhangi bir bağlantıyı QR kod ile paylaşın.',
      detail: 'Her türlü web sitesi, sosyal medya profili veya özel bağlantıyı QR kod haline getirin. Ziyaretçilerinizi hızlıca istediğiniz sayfaya yönlendirin. Takip ve analiz özellikleriyle bağlantı performansını ölçün.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop],
      color: '#15aabf'
    },
    {
      icon: IconLink,
      title: 'Link in Bio',
      description: 'Tüm sosyal medya ve iletişim linklerinizi tek bir sayfada toplayın, kolayca paylaşın.',
      detail: 'Instagram, Twitter, LinkedIn gibi tüm sosyal medya ve iletişim kanallarınızı tek bir biyografi sayfasında birleştirin. Kişisel veya kurumsal profilinizi özelleştirin, takipçilerinize tek linkle tüm bağlantılarınızı sunun. Ücretsiz kullanıcılar bir adet Link in Bio oluşturabilir.',
      limit: 'Ücretsiz kullanıcılar için 1 Link in Bio',
      devices: [IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop],
      color: '#e8590c'
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
    },
    {
      question: 'Link in Bio nedir ve nasıl kullanılır?',
      answer: 'Link in Bio, tüm sosyal medya ve iletişim linklerinizi tek bir sayfada toplamanızı sağlar. Profilinizde tek bir bağlantı paylaşarak takipçilerinize tüm önemli linklerinizi sunabilirsiniz. Vunqr ile kolayca Link in Bio oluşturabilir ve özelleştirebilirsiniz.'
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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {/* Sol: Başlık ve Açıklama */}
            <Box className="hero-title-center" style={{ flex: 1, minWidth: 280, maxWidth: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
              <Title 
                order={1} 
                size={rem(48)} 
                style={{ 
                  fontWeight: 900,
                  textAlign: 'left',
                  lineHeight: 1.2
                }}
              >
                Dijital İletişim Çözümleri
              </Title>
              <Text 
                size="xl" 
                maw={rem(680)} 
                style={{ 
                  textAlign: 'left',
                  opacity: 0.9,
                  marginTop: rem(16)
                }}
              >
                QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi gibi özelliklerle
                işletmenizin dijital varlığını güçlendirin.
              </Text>
              <Group justify="flex-start" mt="xl" gap="xl">
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
            </Box>
            {/* Sağ: Dashboard Preview (Overlapping Devices) */}
            <Box style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 320, marginTop: 24, marginBottom: 24 }}>
              {/* Desktop */}
              <Box style={{
                width: 320,
                height: 200,
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                background: 'white',
                position: 'absolute',
                left: '50%',
                top: 40,
                transform: 'translateX(-50%)',
                border: '1.5px solid #e9ecef',
                zIndex: 1
              }}>
                {/* Header */}
                <Box style={{ height: 32, background: 'linear-gradient(90deg, #228be6 60%, #4dabf7 100%)', borderTopLeftRadius: 18, borderTopRightRadius: 18 }} />
                {/* Sidebar */}
                <Box style={{ position: 'absolute', left: 0, top: 32, width: 56, height: 168, background: '#f1f3f5', borderBottomLeftRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, gap: 12 }}>
                  <Box style={{ width: 28, height: 6, borderRadius: 3, background: '#228be6', marginBottom: 8 }} />
                  <Box style={{ width: 24, height: 6, borderRadius: 3, background: '#adb5bd' }} />
                  <Box style={{ width: 24, height: 6, borderRadius: 3, background: '#adb5bd' }} />
                  <Box style={{ width: 24, height: 6, borderRadius: 3, background: '#adb5bd' }} />
                </Box>
                {/* Content */}
                <Box style={{ position: 'absolute', left: 56, top: 40, width: 264, height: 152, background: '#f8f9fa', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box style={{ width: 120, height: 24, background: '#e7f5ff', borderRadius: 8 }} />
                </Box>
              </Box>
              {/* Tablet */}
              <Box style={{
                width: 170,
                height: 120,
                borderRadius: 14,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                background: 'white',
                position: 'absolute',
                left: '50%',
                top: 100,
                transform: 'translateX(-50%)',
                border: '1.5px solid #e9ecef',
                zIndex: 2
              }}>
                {/* Header */}
                <Box style={{ height: 20, background: 'linear-gradient(90deg, #228be6 60%, #4dabf7 100%)', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
                {/* Sidebar */}
                <Box style={{ position: 'absolute', left: 0, top: 20, width: 28, height: 100, background: '#f1f3f5', borderBottomLeftRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 7 }}>
                  <Box style={{ width: 12, height: 5, borderRadius: 2, background: '#228be6', marginBottom: 5 }} />
                  <Box style={{ width: 10, height: 5, borderRadius: 2, background: '#adb5bd' }} />
                  <Box style={{ width: 10, height: 5, borderRadius: 2, background: '#adb5bd' }} />
                  <Box style={{ width: 10, height: 5, borderRadius: 2, background: '#adb5bd' }} />
                </Box>
                {/* Content */}
                <Box style={{ position: 'absolute', left: 28, top: 28, width: 120, height: 80, background: '#f8f9fa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box style={{ width: 50, height: 14, background: '#e7f5ff', borderRadius: 6 }} />
                </Box>
              </Box>
              {/* Mobile */}
              <Box style={{
                width: 60,
                height: 110,
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                background: 'white',
                position: 'absolute',
                left: '50%',
                top: 170,
                transform: 'translateX(-50%)',
                border: '1.5px solid #e9ecef',
                zIndex: 3
              }}>
                {/* Header */}
                <Box style={{ height: 12, background: 'linear-gradient(90deg, #228be6 60%, #4dabf7 100%)', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                {/* Sidebar */}
                <Box style={{ position: 'absolute', left: 0, top: 12, width: 7, height: 98, background: '#f1f3f5', borderBottomLeftRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3, gap: 3 }}>
                  <Box style={{ width: 4, height: 4, borderRadius: 2, background: '#228be6', marginBottom: 2 }} />
                  <Box style={{ width: 3, height: 4, borderRadius: 2, background: '#adb5bd' }} />
                  <Box style={{ width: 3, height: 4, borderRadius: 2, background: '#adb5bd' }} />
                  <Box style={{ width: 3, height: 4, borderRadius: 2, background: '#adb5bd' }} />
                </Box>
                {/* Content */}
                <Box style={{ position: 'absolute', left: 7, top: 18, width: 45, height: 80, background: '#f8f9fa', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box style={{ width: 18, height: 7, background: '#e7f5ff', borderRadius: 3 }} />
                </Box>
              </Box>
              {/* Overlay Text */}
              <Box style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(34,139,230,0.92)', color: 'white', padding: '8px 28px', borderRadius: 16, fontWeight: 700, fontSize: 22, letterSpacing: 1, boxShadow: '0 2px 12px rgba(34,139,230,0.10)', textAlign: 'center' }}>
                VunQR
              </Box>
            </Box>
          </div>
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
                    <Text size="sm" c="dimmed">{feature.detail}</Text>
                    <Group gap="xs">
                      {feature.title !== 'Link in Bio' && (
                        <Badge leftSection={<IconDownload size={14} />} color={feature.color} variant="light">
                          PNG, JPG, SVG
                        </Badge>
                      )}
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

      {/* Tasarımlar Section */}
      <Box style={{ background: '#f3f7fa', padding: `${rem(80)} 0` }}>
        <Container size="lg">
          <Title 
            order={2} 
            ta="center" 
            mb={30}
            style={{ fontSize: rem(36), fontWeight: 800 }}
          >
            İlham Veren Tasarımlar
          </Title>
          <Text ta="center" size="lg" mb={40} c="dimmed">
            Markanıza veya işletmenize özel QR kod tasarımlarını keşfedin. Fikir almak ve ilham bulmak için örneklerimize göz atın.
          </Text>
          <Box ta="center" mb={24}>
            <Text size="md" c="dimmed" style={{ maxWidth: 600, margin: '0 auto' }}>
              Buradaki örnek QR kodları <b>vunqr</b> ile oluşturulmuş gerçek ve işlevsel kodlardır. Siz de kendi QR kodunuzu oluşturup, tasarımlarınızda kullanabilir ve markanıza özel hale getirebilirsiniz.
            </Text>
          </Box>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mb={40}>
            <Box style={{ borderRadius: 16, overflow: 'hidden', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <img src="/examples/ornek-1.png" alt="WiFi QR Tasarımı" style={{ width: '100%', height: 320, objectFit: 'cover' }} />
            </Box>
            <Box style={{ borderRadius: 16, overflow: 'hidden', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <img src="/examples/ornek-2.png" alt="VCard QR Tasarımı" style={{ width: '100%', height: 320, objectFit: 'cover' }} />
            </Box>
            <Box style={{ borderRadius: 16, overflow: 'hidden', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <img src="/examples/ornek-3.png" alt="E-posta QR Tasarımı" style={{ width: '100%', height: 320, objectFit: 'cover' }} />
            </Box>
          </SimpleGrid>
          <Box ta="center">
            <Button
              size="lg"
              radius="xl"
              component={Link}
              href="/examples"
              style={{ background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)', color: 'white', fontWeight: 600 }}
            >
              Tüm Tasarımları Gör
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Blog Section */}
      <Container size="lg" py={80}>
        <Title order={2} ta="center" mb={30} style={{ fontSize: '2.25rem', fontWeight: 800 }}>
          Blog
        </Title>
        <Text ta="center" size="lg" mb={32} c="dimmed">
          Güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri blog sayfamızda bulabilirsiniz.
        </Text>
        <Box ta="center">
          <Button
            size="lg"
            radius="xl"
            component={Link}
            href="/blogs"
            style={{ background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)', color: 'white', fontWeight: 600 }}
          >
            Blog Yazılarına Göz At
          </Button>
        </Box>
      </Container>

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
          padding: `${rem(90)} 0 ${rem(30)} 0`
        }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <Stack gap={4}>
              <Text fw={700} size="md">Hakkımızda</Text>
              <Text size="xs" c="white" opacity={0.8}>
                Dijital iletişim çözümleri sunan modern ve kullanıcı dostu bir platform.
              </Text>
              <Text size="xs" c="white" opacity={0.8}>
                İletişim: <a href="mailto:vunqrdotcom@gmail.com" style={{ color: 'white', textDecoration: 'underline' }}>vunqrdotcom@gmail.com</a>
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text fw={700} size="md">Hızlı Bağlantılar</Text>
              <Anchor component={Link} href="/login" c="white" opacity={0.8}>Giriş Yap</Anchor>
              <Anchor component={Link} href="/register" c="white" opacity={0.8}>Kayıt Ol</Anchor>
              <Anchor component={Link} href="/dashboard" c="white" opacity={0.8}>Dashboard</Anchor>
              <Anchor component={Link} href="/examples" c="white" opacity={0.8}>Tasarımlar</Anchor>
              <Anchor component={Link} href="/blogs" c="white" opacity={0.8}>Blog</Anchor>
              <Anchor component={Link} href="/terms" c="white" opacity={0.8}>Kullanım Şartları</Anchor>
              <Anchor component={Link} href="/privacy" c="white" opacity={0.8}>Gizlilik Politikası</Anchor>
            </Stack>
            <Stack gap={4}>
              <Text fw={700} size="md">Özellikler</Text>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>QR Kod Oluşturma</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>WiFi Paylaşımı</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>E-posta Gönderimi</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>SMS Gönderimi</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>vCard Yönetimi</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>URL QR Kod</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>Link in Bio</Anchor>
            </Stack>
            <Stack gap={4}>
              <Text fw={700} size="md">Bizi Takip Edin</Text>
              <Group gap={4}>
                <Anchor href="https://instagram.com/vunqrdotcom" target="_blank" c="white" opacity={0.8}>
                  <IconBrandInstagram size={20} />
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
          <Divider my={32} color="white" opacity={0.2} />
          <Text ta="center" size="xs" c="white" opacity={0.8}>
            © 2025 VunQR - Dijital İletişim Çözümleri. Tüm hakları saklıdır.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
