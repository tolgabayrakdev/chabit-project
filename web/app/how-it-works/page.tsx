import React from 'react';
import { Container, Title, Text, Button, Group, Card, SimpleGrid, Box, Stack, Badge, Paper, rem, ThemeIcon, Divider, Anchor, List, ListItem, Grid, Image } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconDownload, IconClock, IconInfinity, IconDeviceMobile, IconDeviceLaptop, IconDeviceDesktop, IconLink, IconFileTypePdf, IconStar, IconArrowRight, IconCheck, IconUsers, IconBuilding, IconShoppingCart, IconCoffee, IconCar, IconHeart, IconTarget, IconRocket, IconShield, IconBolt, IconTrophy } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata = {
  title: "VunQR Nasıl Çalışır? | Adım Adım Rehber ve Kullanım Kılavuzu",
  description: "VunQR sistemini nasıl kullanacağınızı öğrenin. QR kod oluşturma, WiFi paylaşımı, menü yükleme, Link in Bio kurulumu ve daha fazlası için detaylı rehber. Kimin işine yarar? Hangi sektörler için ideal?",
  keywords: "VunQR nasıl kullanılır, QR kod oluşturma rehberi, WiFi QR kodu nasıl yapılır, dijital menü nasıl yüklenir, Link in Bio nasıl kurulur, vCard QR kodu, SMS QR kodu, e-posta QR kodu, Google yorum QR kodu, restoran dijital çözümleri, kafe QR kod sistemi, işletme dijitalleşme, kişisel dijital iletişim, kurumsal dijital iletişim, dijital dönüşüm, dijital rehber, QR kod avantajları, QR kod sektörleri, dijital kartvizit, müşteri etkileşimi, kampanya yönetimi",
  openGraph: {
    title: "VunQR Nasıl Çalışır? | Adım Adım Rehber ve Kullanım Kılavuzu",
    description: "VunQR sistemini nasıl kullanacağınızı öğrenin. QR kod oluşturma, WiFi paylaşımı, menü yükleme, Link in Bio kurulumu ve daha fazlası için detaylı rehber.",
    type: "article",
    images: [
      {
        url: "https://vunqr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VunQR - Dijital İletişim Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VunQR Nasıl Çalışır? | Adım Adım Rehber ve Kullanım Kılavuzu",
    description: "VunQR sistemini nasıl kullanacağınızı öğrenin. QR kod oluşturma, WiFi paylaşımı, menü yükleme, Link in Bio kurulumu ve daha fazlası için detaylı rehber.",
    images: ["https://vunqr.com/twitter-image.jpg"],
  },
  other: {
    'script:type': 'application/ld+json',
    'script:dangerouslySetInnerHTML': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'VunQR Nasıl Çalışır?',
      'description': 'VunQR ile QR kod oluşturma, WiFi paylaşımı, menü yükleme, Link in Bio kurulumu ve daha fazlası için adım adım rehber.',
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Hesap Oluşturun',
          'text': 'Ücretsiz hesabınızı oluşturun.'
        },
        {
          '@type': 'HowToStep',
          'name': 'QR Kod Türünü Seçin',
          'text': 'WiFi, vCard, URL, E-posta, SMS veya Google Yorum türlerinden birini seçin.'
        },
        {
          '@type': 'HowToStep',
          'name': 'İçeriğinizi Girin',
          'text': 'Gerekli bilgileri doldurun.'
        },
        {
          '@type': 'HowToStep',
          'name': 'QR Kodunuzu Oluşturun',
          'text': 'İndirin ve kullanmaya başlayın.'
        }
      ]
    })
  }
};

const steps = [
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
];

const featureGuides = [
  {
    title: "WiFi QR Kodu",
    description: "Misafirlerinizin WiFi ağınıza tek tıkla bağlanmasını sağlayın. Şifre yazmaya gerek kalmadan hızlı ve güvenli bağlantı.",
    icon: IconWifi,
    color: "#40c057",
    useCase: "Kafeler, restoranlar, oteller, ofisler"
  },
  {
    title: "Dijital Menü",
    description: "PDF menülerinizi yükleyin ve vunqr.com/menu/menu-id adresiyle paylaşın. Güncel menülerinizi her yerden erişilebilir yapın.",
    icon: IconFileTypePdf,
    color: "#fab005",
    useCase: "Restoranlar, kafeler, barlar, catering"
  },
  {
    title: "Link in Bio",
    description: "Instagram, Twitter, LinkedIn gibi tüm sosyal medya linklerinizi tek sayfada toplayın. Profilinizde tek link paylaşın.",
    icon: IconLink,
    color: "#e8590c",
    useCase: "İçerik üreticileri, influencerlar, işletmeler"
  },
  {
    title: "vCard QR Kodu",
    description: "Dijital kartvizitinizi QR kod ile paylaşın. İletişim bilgileriniz anında karşı tarafın rehberine eklensin.",
    icon: IconAddressBook,
    color: "#7950f2",
    useCase: "Profesyoneller, işletmeler, networking"
  },
  {
    title: "Google Yorum QR Kodu",
    description: "Müşterilerinizin QR kodu okutarak doğrudan Google yorum sayfanıza ulaşmasını sağlayın. Yorum sayınızı artırın.",
    icon: IconStar,
    color: "#fab005",
    useCase: "Tüm işletmeler, restoranlar, hizmet sağlayıcıları"
  },
  {
    title: "SMS/E-posta QR Kodu",
    description: "Hazır mesaj şablonları ile müşterilerinizin size kolayca ulaşmasını sağlayın. Rezervasyon ve iletişim için ideal.",
    icon: IconMessage,
    color: "#fa5252",
    useCase: "Müşteri hizmetleri, rezervasyon, iletişim"
  },
  {
    title: "Kampanya Yönetimi (PRO)",
    description: "Çekiliş ve kampanyalar oluşturun, katılımcıları yönetin ve kazananları seçin. Müşteri etkileşimini artırın.",
    icon: IconTrophy,
    color: "#fab005",
    useCase: "PRO kullanıcılar için: Restoranlar, e-ticaret, etkinlikler"
  }
];

const targetAudience = [
  {
    category: "Restoran ve Kafeler",
    icon: IconCoffee,
    color: "#40c057",
    description: "Dijital menü yönetimi, WiFi paylaşımı, müşteri yorumları ve rezervasyon sistemi ile müşteri deneyimini iyileştirin."
  },
  {
    category: "Küçük ve Orta Ölçekli İşletmeler",
    icon: IconBuilding,
    color: "#228be6",
    description: "Profesyonel dijital kartvizit, Google yorumları ve sosyal medya entegrasyonu ile marka görünürlüğünüzü artırın."
  },
  {
    category: "Profesyoneller ve Freelancerlar",
    icon: IconUsers,
    color: "#7950f2",
    description: "Link in Bio profili, dijital kartvizit ve portfolio paylaşımı ile kişisel markanızı güçlendirin."
  },
  {
    category: "E-ticaret ve Online İşletmeler",
    icon: IconShoppingCart,
    color: "#fd7e14",
    description: "Ürün QR kodları, sosyal medya entegrasyonu ve kampanya yönetimi ile satışlarınızı artırın."
  },
  {
    category: "Hizmet Sektörü",
    icon: IconHeart,
    color: "#fa5252",
    description: "Randevu sistemi, müşteri iletişimi ve hizmet bilgilendirmesi ile iş süreçlerinizi kolaylaştırın."
  }
];

const benefits = [
  {
    icon: IconBolt,
    title: "Hızlı ve Kolay",
    description: "3 adımda QR kodunuzu oluşturun ve hemen kullanmaya başlayın"
  },
  {
    icon: IconShield,
    title: "Güvenli",
    description: "SSL şifreleme ile güvenli veri transferi ve gizlilik koruması"
  },
  {
    icon: IconUsers,
    title: "Analitik",
    description: "Detaylı istatistikler ve kullanım raporları ile performans takibi"
  },
  {
    icon: IconDeviceMobile,
    title: "Mobil Uyumlu",
    description: "Tüm cihazlarda mükemmel çalışan responsive tasarım"
  },
  {
    icon: IconInfinity,
    title: "Sınırsız",
    description: "Premium üyelik ile sınırsız QR kod oluşturma ve kullanım"
  }
];

export default function HowItWorks() {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        style={{ 
          background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
          padding: `${rem(80)} 0`,
          color: 'white'
        }}
      >
        <Container size="lg">
          <div style={{ textAlign: 'center' }}>
            <Title 
              order={1} 
              size={rem(48)} 
              style={{ 
                fontWeight: 900,
                marginBottom: rem(16)
              }}
            >
              VunQR Nasıl Çalışır?
            </Title>
            <Text 
              size="xl" 
              style={{ 
                opacity: 0.9,
                maxWidth: rem(800),
                margin: '0 auto',
                marginBottom: rem(32)
              }}
            >
              Adım adım rehber ile VunQR sistemini nasıl kullanacağınızı öğrenin. 
              QR kod oluşturma, WiFi paylaşımı, dijital menü yönetimi ve daha fazlası için detaylı kılavuz.
            </Text>
            <Group justify="center" gap="xl">
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
                href="/examples"
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
                Örnekleri İncele
              </Button>
            </Group>
          </div>
        </Container>
      </Box>

      {/* Ana Akış Şeması */}
      <Container size="lg" py={rem(80)}>
        <div style={{ textAlign: 'center', marginBottom: rem(60) }}>
          <Title order={2} size={rem(36)} style={{ marginBottom: rem(16) }}>
            4 Adımda QR Kodunuzu Oluşturun
          </Title>
          <Text size="lg" color="dimmed" style={{ maxWidth: rem(600), margin: '0 auto' }}>
            VunQR ile QR kod oluşturmak çok kolay. 4 basit adımda 
            profesyonel QR kodlarınızı oluşturabilirsiniz.
          </Text>
        </div>

                <div style={{ position: 'relative' }}>
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
            {steps.map((step, index) => (
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
      </Container>

      {/* Özellik Rehberleri */}
      <Box style={{ backgroundColor: '#f8f9fa', padding: `${rem(80)} 0` }}>
        <Container size="lg">
          <div style={{ textAlign: 'center', marginBottom: rem(60) }}>
            <Title order={2} size={rem(36)} style={{ marginBottom: rem(16) }}>
              VunQR Özellikleri
            </Title>
            <Text size="lg" color="dimmed" style={{ maxWidth: rem(600), margin: '0 auto' }}>
              İhtiyacınıza uygun QR kod türünü seçin ve hemen kullanmaya başlayın.
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            {featureGuides.map((guide, index) => (
              <Card key={index} shadow="md" radius="lg" padding="xl" withBorder>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: rem(24) }}>
                  <ThemeIcon 
                    size={rem(50)} 
                    radius="xl" 
                    style={{ backgroundColor: guide.color, marginRight: rem(16) }}
                  >
                    <guide.icon size={rem(25)} />
                  </ThemeIcon>
                  <div>
                    <Title order={3} size="h4">
                      {guide.title}
                    </Title>
                    <Text color="dimmed" size="sm">
                      {guide.description}
                    </Text>
                  </div>
                </div>



                <Paper p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: rem(8) }}>
                  <Text size="sm" fw={600} style={{ color: guide.color, marginBottom: rem(4) }}>
                    İdeal Kullanım Alanları:
                  </Text>
                  <Text size="sm" color="dimmed">
                    {guide.useCase}
                  </Text>
                </Paper>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Kimin İşine Yarar? */}
      <Container size="lg" py={rem(80)}>
        <div style={{ textAlign: 'center', marginBottom: rem(60) }}>
          <Title order={2} size={rem(36)} style={{ marginBottom: rem(16) }}>
            VunQR Kimin İşine Yarar?
          </Title>
          <Text size="lg" color="dimmed" style={{ maxWidth: rem(600), margin: '0 auto' }}>
            Farklı sektörlerden işletmeler ve profesyoneller için özel çözümler. 
            İşletmenizin ihtiyaçlarına uygun özellikleri keşfedin.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
          {targetAudience.map((audience, index) => (
            <Card key={index} shadow="md" radius="lg" padding="xl" withBorder>
              <div style={{ textAlign: 'center', marginBottom: rem(24) }}>
                <ThemeIcon 
                  size={rem(60)} 
                  radius="xl" 
                  style={{ backgroundColor: audience.color, marginBottom: rem(16) }}
                >
                  <audience.icon size={rem(30)} />
                </ThemeIcon>
                <Title order={3} size="h4">
                  {audience.category}
                </Title>
              </div>

              <Text size="sm" color="dimmed" style={{ textAlign: 'center' }}>
                {audience.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

            {/* PRO Özellikler */}
      <Container size="lg" py={rem(80)}>
        <div style={{ textAlign: 'center', marginBottom: rem(60) }}>
          <Title order={2} size={rem(36)} style={{ marginBottom: rem(16) }}>
            PRO Kullanıcılar İçin Özel Özellikler
          </Title>
          <Text size="lg" color="dimmed" style={{ maxWidth: rem(600), margin: '0 auto' }}>
            PRO üyelik ile kampanya yönetimi ve gelişmiş özelliklere erişim kazanın.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
          <Card shadow="lg" radius="xl" padding="xl" withBorder style={{ 
            background: 'linear-gradient(135deg, #fab005 0%, #f59e0b 100%)', 
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: -20, 
              right: -20, 
              width: 100, 
              height: 100, 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '50%',
              zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: rem(24) }}>
                <ThemeIcon 
                  size={rem(60)} 
                  radius="xl" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: rem(16) }}
                >
                  <IconTrophy size={rem(30)} />
                </ThemeIcon>
                <Title order={3} size="h3" style={{ marginBottom: rem(12), color: 'white' }}>
                  Kampanya Yönetimi
                </Title>
                <Text size="sm" style={{ opacity: 0.9 }}>
                  Müşterilerinizle etkileşimi artırmak için çekiliş ve kampanyalar oluşturun
                </Text>
              </div>

              <List spacing="sm" style={{ color: 'white' }}>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>Özel kampanya sayfaları oluşturun</Text>
                </ListItem>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>Başlangıç ve bitiş tarihleri belirleyin</Text>
                </ListItem>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>Teşekkür mesajları özelleştirin</Text>
                </ListItem>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>vunqr.com/campaign/slug adresiyle paylaşın</Text>
                </ListItem>
              </List>
            </div>
          </Card>

          <Card shadow="lg" radius="xl" padding="xl" withBorder style={{ 
            background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)', 
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: -20, 
              right: -20, 
              width: 100, 
              height: 100, 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '50%',
              zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: rem(24) }}>
                <ThemeIcon 
                  size={rem(60)} 
                  radius="xl" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: rem(16) }}
                >
                  <IconUsers size={rem(30)} />
                </ThemeIcon>
                <Title order={3} size="h3" style={{ marginBottom: rem(12), color: 'white' }}>
                  Katılımcı Yönetimi
                </Title>
                <Text size="sm" style={{ opacity: 0.9 }}>
                  Kampanya katılımcılarını yönetin ve kazananları seçin
                </Text>
              </div>

              <List spacing="sm" style={{ color: 'white' }}>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>Katılımcı listesini görüntüleyin</Text>
                </ListItem>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>İletişim bilgilerini toplayın</Text>
                </ListItem>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>Rastgele kazanan seçin</Text>
                </ListItem>
                <ListItem icon={<IconCheck size={16} color="white" />}>
                  <Text size="sm" style={{ color: 'white' }}>Kampanya istatistiklerini takip edin</Text>
                </ListItem>
              </List>
            </div>
          </Card>
        </SimpleGrid>
      </Container>

      {/* Avantajlar */}
      <Box style={{ backgroundColor: '#f8f9fa', padding: `${rem(80)} 0` }}>
        <Container size="lg">
          <div style={{ textAlign: 'center', marginBottom: rem(60) }}>
            <Title order={2} size={rem(36)} style={{ marginBottom: rem(16) }}>
              VunQR'nin Avantajları
            </Title>
            <Text size="lg" color="dimmed" style={{ maxWidth: rem(600), margin: '0 auto' }}>
              Neden VunQR'yi tercih etmelisiniz? İşte size sunduğumuz avantajlar.
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
            {benefits.map((benefit, index) => (
              <Card key={index} shadow="md" radius="lg" padding="xl" withBorder>
                <div style={{ textAlign: 'center' }}>
                  <ThemeIcon 
                    size={rem(50)} 
                    radius="xl" 
                    style={{ backgroundColor: '#228be6', marginBottom: rem(16) }}
                  >
                    <benefit.icon size={rem(25)} />
                  </ThemeIcon>
                  <Title order={3} size="h4" style={{ marginBottom: rem(12) }}>
                    {benefit.title}
                  </Title>
                  <Text color="dimmed">
                    {benefit.description}
                  </Text>
                </div>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="lg" py={rem(80)}>
        <Card 
          shadow="xl" 
          radius="xl" 
          padding="xl" 
          style={{ 
            background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Title order={2} size={rem(36)} style={{ marginBottom: rem(16) }}>
            Hemen Başlayın!
          </Title>
          <Text size="lg" style={{ marginBottom: rem(32), opacity: 0.9 }}>
            VunQR ile dijital dönüşümünüzü başlatın. Ücretsiz hesap oluşturun ve 
            ilk QR kodunuzu dakikalar içinde oluşturun.
          </Text>
          <Group justify="center" gap="xl">
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
              Ücretsiz Hesap Oluştur
            </Button>
            <Button 
              size="lg" 
              radius="md"
              variant="outline" 
              component={Link} 
              href="/examples"
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
              Örnekleri İncele
            </Button>
          </Group>
        </Card>
      </Container>
    </Box>
  );
}
