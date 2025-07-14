import React from 'react';
import { Container, Title, Text, Button, Group, Card, SimpleGrid, Box, Stack, Badge, Image, Paper, rem, ThemeIcon, Divider, Anchor } from '@mantine/core';
import { Accordion, AccordionItem, AccordionControl, AccordionPanel } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconDownload, IconClock, IconInfinity, IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram, IconLink, IconFileTypePdf, IconStar, IconRocket, IconTarget, IconBolt } from '@tabler/icons-react';
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
      icon: IconFileTypePdf,
      title: 'PDF Menü Yönetimi',
      description: 'Restoran menülerinizi dijital ortamda yönetin ve müşterilerinizle paylaşın.',
      detail: 'PDF menülerinizi kolayca yükleyin ve vunqr.com/menu/menu-id adresiyle müşterilerinizle paylaşın. Menülerinizi güncelleyebilir, indirebilir ve yönetebilirsiniz. Müşterileriniz menülerinize her yerden erişebilir.',
      limit: 'Ücretsiz kullanıcılar için 1 menü',
      devices: [IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop],
      color: '#fab005'
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
    {
      icon: IconStar,
      title: 'Google Yorumlar',
      description: 'Müşterilerinizin işletmenize kolayca Google üzerinden yorum bırakmasını sağlayan QR kodlar oluşturun.',
      detail: 'Google Review QR kodu ile müşterileriniz, QR kodu okutarak doğrudan firmanızın Google yorum sayfasına yönlendirilir. Yorum sayınızı ve müşteri memnuniyetinizi artırmak için idealdir.',
      limit: 'Sınırsız',
      devices: [IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop],
      color: '#fab005'
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
      question: 'vCard oluşturma özelliği nasıl çalışır?',
      answer: 'vCard özelliği ile dijital kartvizitlerinizi oluşturabilir, özelleştirebilir ve QR kod olarak paylaşabilirsiniz. Kartvizitlerinize iletişim bilgilerinizi, sosyal medya hesaplarınızı ve daha fazlasını ekleyebilirsiniz.'
    },
    {
      question: 'PDF menü yönetimi nasıl çalışır?',
      answer: 'PDF menü yönetimi ile restoran menülerinizi dijital ortamda yönetebilirsiniz. PDF dosyanızı yükleyin ve vunqr.com/menu/menu-id adresiyle müşterilerinizle paylaşın. Menülerinizi güncelleyebilir, indirebilir ve kolayca yönetebilirsiniz.'
    },
    {
      question: 'Link in Bio nedir ve nasıl kullanılır?',
      answer: 'Link in Bio, tüm sosyal medya ve iletişim linklerinizi tek bir sayfada toplamanızı sağlar. Profilinizde tek bir bağlantı paylaşarak takipçilerinize tüm önemli linklerinizi sunabilirsiniz. Vunqr ile kolayca Link in Bio oluşturabilir ve özelleştirebilirsiniz.'
    },
    {
      question: 'Google Yorumlar QR kodu nedir ve nasıl çalışır?',
      answer: "Google Yorumlar QR kodu, müşterilerinizin QR kodu okutarak doğrudan firmanızın Google yorum sayfasına ulaşmasını sağlar. Böylece müşterileriniz kolayca işletmenize yorum bırakabilir ve Google puanınızı artırabilirsiniz. QR kodu oluşturmak için Google Place ID'nizi girmeniz yeterlidir."
    },
    {
      question: 'Kampanya yönetimi özelliği nedir ve nasıl çalışır?',
      answer: 'Kampanya yönetimi (PRO özellik) ile çekiliş ve kampanyalar oluşturabilir, katılımcıları yönetebilir ve kazananları seçebilirsiniz. vunqr.com/campaign/slug adresiyle kampanyalarınızı paylaşabilir, müşteri etkileşimini artırabilirsiniz. Bu özellik sadece PRO kullanıcılar için mevcuttur.'
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
          padding: `${rem(100)} 0`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorations */}
        <Box style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
        }} />

        {/* Floating QR code icons */}
        <Box style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          opacity: 0.1,
          transform: 'rotate(-15deg)',
        }}>
          <IconQrcode size={60} color="white" />
        </Box>
        <Box style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          opacity: 0.1,
          transform: 'rotate(15deg)',
        }}>
          <IconQrcode size={80} color="white" />
        </Box>
        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
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
                QR kodlar, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio ve Google Yorum gibi gelişmiş özelliklerle
                işletmenizin dijital varlığını güçlendirin.
              </Text>
              <Group justify="flex-start" mt="xl" gap="xl">
                <Button
                  size="lg"
                  radius="md"
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
                  radius="md"
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
              radius="md"
              component={Link}
              href="/examples"
              style={{ background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)', color: 'white', fontWeight: 600 }}
            >
              Tüm Tasarımları Gör
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box style={{ background: '#f8f9fa', padding: `${rem(80)} 0` }}>
        <Container size="lg">
          <Title
            order={2}
            ta="center"
            mb={30}
            style={{ fontSize: rem(36), fontWeight: 800 }}
          >
            VunQR Nasıl Çalışır?
          </Title>
          <Text ta="center" size="lg" mb={50} c="dimmed" style={{ maxWidth: 600, margin: '0 auto' }}>
            4 basit adımda profesyonel QR kodlarınızı oluşturun. VunQR ile dijital dönüşümünüzü başlatın.
          </Text>

          <div style={{ position: 'relative', marginBottom: rem(60) }}>
            {/* Bağlantı çizgileri için arka plan */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, #228be6, #40c057, #fd7e14, #7950f2)',
              zIndex: 0,
              transform: 'translateY(-50%)'
            }} />

            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
              {[
                {
                  step: 1,
                  title: "Hesap Oluşturun",
                  description: "Ücretsiz hesabınızı oluşturun",
                  icon: IconRocket,
                  color: "#228be6"
                },
                {
                  step: 2,
                  title: "QR Kod Türünü Seçin",
                  description: "WiFi, vCard, URL, E-posta, SMS veya Google Yorum",
                  icon: IconTarget,
                  color: "#40c057"
                },
                {
                  step: 3,
                  title: "İçeriğinizi Girin",
                  description: "Gerekli bilgileri doldurun",
                  icon: IconBolt,
                  color: "#fd7e14"
                },
                {
                  step: 4,
                  title: "QR Kodunuzu Oluşturun",
                  description: "İndirin ve kullanmaya başlayın",
                  icon: IconQrcode,
                  color: "#7950f2"
                }
              ].map((step, index) => (
                <Card
                  key={index}
                  shadow="lg"
                  radius="xl"
                  padding="xl"
                  withBorder
                  style={{
                    position: 'relative',
                    zIndex: 5,
                    background: 'white',
                    border: `2px solid ${step.color}20`,
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${step.color}20`,
                      borderColor: step.color
                    }
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: rem(24) }}>
                    {/* Adım numarası */}
                    <div style={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '20px',
                      boxShadow: `0 6px 16px ${step.color}50`,
                      zIndex: 10,
                      border: '3px solid white'
                    }}>
                      {step.step}
                    </div>

                    {/* İkon */}
                    <ThemeIcon
                      size={rem(70)}
                      radius="xl"
                      style={{
                        backgroundColor: `${step.color}15`,
                        color: step.color,
                        marginBottom: rem(16),
                        border: `3px solid ${step.color}30`
                      }}
                    >
                      <step.icon size={rem(35)} />
                    </ThemeIcon>
                  </div>

                  <Title order={3} size="h4" style={{
                    marginBottom: rem(12),
                    textAlign: 'center',
                    color: step.color,
                    fontWeight: 700
                  }}>
                    {step.title}
                  </Title>

                  <Text
                    size="sm"
                    color="dimmed"
                    style={{
                      textAlign: 'center',
                      lineHeight: 1.6
                    }}
                  >
                    {step.description}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </div>

          <Box ta="center">
            <Button
              size="lg"
              radius="md"
              component={Link}
              href="/how-it-works"
              style={{
                background: 'linear-gradient(45deg, #228be6 0%, #4dabf7 100%)',
                color: 'white',
                fontWeight: 600,
                padding: '12px 32px'
              }}
            >
              Detaylı Rehberi İncele
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
            radius="md"
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
          padding: `${rem(90)} 0 ${rem(30)} 0`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorations */}
        <Box style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
        }} />

        {/* Floating QR code icons */}
        <Box style={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          opacity: 0.1,
          transform: 'rotate(-15deg)',
        }}>
          <IconQrcode size={50} color="white" />
        </Box>
        <Box style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          opacity: 0.1,
          transform: 'rotate(15deg)',
        }}>
          <IconQrcode size={60} color="white" />
        </Box>
        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
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
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>PDF Menü Yönetimi</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>Google Yorumlar</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>Link in Bio</Anchor>
              <Anchor component={Link} href="#features" c="white" opacity={0.8}>Kampanya Yönetimi (PRO)</Anchor>
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
