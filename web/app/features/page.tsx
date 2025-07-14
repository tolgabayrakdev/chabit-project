import React from 'react';
import { Container, Title, Text, Box, Stack, Group, ThemeIcon, Divider, Button } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconLink, IconFileTypePdf, IconStar, IconChartBar, IconArrowLeft, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata = {
  title: 'VunQR Özellikler | QR Kod, Dijital Menü, vCard, İstatistik ve Daha Fazlası',
  description: 'VunQR ile QR kod oluşturma, WiFi paylaşımı, e-posta ve SMS gönderimi, vCard yönetimi, PDF menü, Link in Bio, Google Yorum ve gelişmiş istatistik özelliklerini keşfedin.',
  openGraph: {
    title: 'VunQR Özellikler',
    description: 'VunQR ile dijital iletişimde fark yaratın. Tüm QR kod ve dijital kartvizit özelliklerini detaylıca inceleyin.',
    type: 'website',
  },
};

export default function FeaturesPage() {
  return (
    <>
      <Container size="lg" py={60}>
        <Box ta="left" mb={32}>
          <Button
            component={Link}
            href="/"
            leftSection={<IconArrowLeft size={18} />}
            variant="outline"
            color="blue"
            size="md"
          >
            Ana Sayfaya Dön
          </Button>
        </Box>
        <Title order={1} ta="center" mb={32} style={{ fontWeight: 900, fontSize: 40 }}>
          VunQR Özellikleri
        </Title>
        <Text ta="center" size="lg" mb={48} c="dimmed">
          Dijital iletişimde fark yaratan tüm özelliklerimizi detaylıca keşfedin. QR kod teknolojisinden dijital menüye, istatistik analizlerinden vCard yönetimine kadar her şey burada!
        </Text>
        <Stack gap={48}>
          {/* QR Kod Oluşturma */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#228be6"><IconQrcode size={28} /></ThemeIcon>
              <Title order={2} size={28}>QR Kod Oluşturma</Title>
            </Group>
            <Text size="md" mb={8}>
              VunQR ile saniyeler içinde özelleştirilebilir QR kodlar oluşturabilirsiniz. Kendi logonuzu ekleyin, marka renklerinizi seçin ve farklı QR kod tipleriyle (WiFi, vCard, URL, e-posta, SMS, Google Yorum) dijital varlığınızı güçlendirin. QR kodlarınızı kolayca yönetin ve paylaşın. QR kodlarınızı dilediğiniz zaman güncelleyebilir, farklı kampanyalar için yeni kodlar oluşturabilirsiniz.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Avantajları:</b> Kolay kullanım, marka uyumu, çoklu format desteği, hızlı paylaşım, dinamik güncellenebilirlik.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir restoran, menüsünü dijitalleştirmek için her masaya özel QR kodlar yerleştirir. Müşteriler telefonlarıyla bu kodları okutarak menüyü görüntüler ve sipariş verir. Ayrıca bir etkinlik organizatörü, katılımcıların girişte QR kodlarını okutarak hızlıca kayıt olmasını sağlar.</Text>
          </Box>
          {/* WiFi Paylaşımı */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#40c057"><IconWifi size={28} /></ThemeIcon>
              <Title order={2} size={28}>WiFi Paylaşımı</Title>
            </Group>
            <Text size="md" mb={8}>
              WiFi ağınızı güvenli ve pratik bir şekilde paylaşmak için QR kod oluşturun. Misafirleriniz veya müşterileriniz, şifreyi manuel girmeden tek tarama ile ağa bağlanabilir. Özellikle kafe, restoran ve ofisler için idealdir. Şifre değişse bile yeni QR kod oluşturmak çok kolaydır.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Kullanım Alanları:</b> Kafeler, restoranlar, oteller, ofisler, etkinlikler, evler.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir kafe sahibi, WiFi şifresini müşterileriyle paylaşmak için her masaya QR kodlu kartlar yerleştirir. Müşteriler, garsona sormadan ve şifreyi yanlış yazma derdi olmadan internete bağlanır.</Text>
          </Box>
          {/* E-posta Gönderimi */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#fd7e14"><IconMail size={28} /></ThemeIcon>
              <Title order={2} size={28}>E-posta Gönderimi</Title>
            </Group>
            <Text size="md" mb={8}>
              Hazır e-posta şablonları ile toplu veya bireysel e-posta gönderebilir, alıcı listenizi kolayca yönetebilirsiniz. Otomatik yanıtlar ve zamanlanmış gönderimler ile iletişiminizi profesyonelleştirin. Gönderim geçmişinizi ve açılma oranlarını takip ederek kampanyalarınızı optimize edin.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Avantajları:</b> Toplu gönderim, otomasyon, şablon desteği, raporlama.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir güzellik salonu, yeni kampanyasını tüm müşterilerine tek tıkla e-posta olarak gönderir. Ayrıca doğum günü olan müşterilere otomatik kutlama e-postaları iletir.</Text>
          </Box>
          {/* SMS Gönderimi */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#fa5252"><IconMessage size={28} /></ThemeIcon>
              <Title order={2} size={28}>SMS Gönderimi</Title>
            </Group>
            <Text size="md" mb={8}>
              Kampanya, bilgilendirme veya onay mesajlarınızı hızlıca gönderebilir, SMS şablonları oluşturabilirsiniz. Gönderim raporları ile iletilerin durumunu anlık olarak takip edin. Acil bilgilendirmeler ve hatırlatmalar için idealdir.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Kullanım Alanları:</b> Kampanyalar, müşteri bilgilendirme, onay süreçleri, randevu hatırlatmaları.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir diş kliniği, hastalarına randevu gününden bir gün önce otomatik SMS hatırlatması gönderir. Bir mağaza, indirim kampanyasını SMS ile duyurur.</Text>
          </Box>
          {/* vCard Yönetimi */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#7950f2"><IconAddressBook size={28} /></ThemeIcon>
              <Title order={2} size={28}>vCard Yönetimi</Title>
            </Group>
            <Text size="md" mb={8}>
              Dijital kartvizitlerinizi oluşturun, iletişim bilgilerinizi ve sosyal medya hesaplarınızı ekleyin. QR kod ile kartvizitinizi kolayca paylaşın, güncelleyin ve modern bir imaj sergileyin. Kartvizitinizdeki bilgileri dilediğiniz zaman güncelleyebilirsiniz.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Avantajları:</b> Modern görünüm, kolay paylaşım, güncellenebilirlik, çevre dostu.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir danışman, toplantıda karşılaştığı kişilere kağıt kartvizit yerine QR kodunu gösterir. Karşı taraf, danışmanın iletişim bilgilerini anında telefonuna kaydeder.</Text>
          </Box>
          {/* URL QR Kod */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#15aabf"><IconLink size={28} /></ThemeIcon>
              <Title order={2} size={28}>URL QR Kod</Title>
            </Group>
            <Text size="md" mb={8}>
              Web sitenizi, sosyal medya profilinizi veya herhangi bir bağlantıyı QR kod ile paylaşın. Takip ve analiz özellikleriyle bağlantı performansını ölçün. QR kodunuzu broşür, afiş veya kartvizitlere ekleyerek dijital erişimi artırın.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Kullanım Alanları:</b> Sosyal medya, promosyonlar, web siteleri, etkinlikler.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir emlakçı, ilan afişlerine QR kod ekleyerek potansiyel müşterilerin ilan detaylarına anında ulaşmasını sağlar. Bir sanatçı, konser afişine eklediği QR kod ile dinleyicilerini Spotify hesabına yönlendirir.</Text>
          </Box>
          {/* PDF Menü Yönetimi */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#fab005"><IconFileTypePdf size={28} /></ThemeIcon>
              <Title order={2} size={28}>PDF Menü Yönetimi</Title>
            </Group>
            <Text size="md" mb={8}>
              Restoran menülerinizi dijital ortamda yönetin ve müşterilerinizle paylaşın. PDF menülerinizi kolayca yükleyin, güncelleyin ve QR kod ile erişime açın. Menü değişikliklerinde anında güncelleme yapabilirsiniz. <b>Ücretsiz kullanıcılar yalnızca 1 adet PDF menü oluşturabilir.</b>
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Kullanım Alanları:</b> Restoranlar, kafeler, oteller, catering firmaları.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir otel, odalara yerleştirdiği QR kodlar ile misafirlerin güncel menüye ulaşmasını sağlar. Menüde değişiklik olduğunda yeni baskı almaya gerek kalmaz.</Text>
          </Box>
          {/* Link in Bio */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#e8590c"><IconLink size={28} /></ThemeIcon>
              <Title order={2} size={28}>Link in Bio</Title>
            </Group>
            <Text size="md" mb={8}>
              Tüm sosyal medya ve iletişim linklerinizi tek bir sayfada toplayın, kolayca paylaşın. Kişisel veya kurumsal profilinizi özelleştirin, takipçilerinize tek linkle tüm bağlantılarınızı sunun. Profilinizi dilediğiniz gibi güncelleyebilirsiniz. <b>Ücretsiz kullanıcılar yalnızca 1 adet Link in Bio oluşturabilir.</b>
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Avantajları:</b> Tek linkte tüm bağlantılar, özelleştirilebilir profil, kolay paylaşım.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir influencer, Instagram biyografisine eklediği tek bir link ile takipçilerini YouTube, TikTok ve iletişim formuna yönlendirir. Bir şirket, tüm iletişim kanallarını tek bir sayfada toplar.</Text>
          </Box>
          {/* Google Yorumlar */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#fab005"><IconStar size={28} /></ThemeIcon>
              <Title order={2} size={28}>Google Yorumlar QR</Title>
            </Group>
            <Text size="md" mb={8}>
              Müşterilerinizin işletmenize kolayca Google üzerinden yorum bırakmasını sağlayan QR kodlar oluşturun. Yorum sayınızı ve müşteri memnuniyetinizi artırın. Yorum linkinizi paylaşarak daha fazla geri bildirim toplayın.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Kullanım Alanları:</b> İşletmeler, restoranlar, hizmet sektörü, mağazalar.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir kuaför, kasanın yanına yerleştirdiği QR kod ile müşterilerinin kolayca Google yorumu bırakmasını sağlar. Böylece Google'da daha görünür ve güvenilir olur.</Text>
          </Box>
          {/* QR Kod İstatistikleri */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#20c997"><IconChartBar size={28} /></ThemeIcon>
              <Title order={2} size={28}>QR Kod İstatistikleri</Title>
            </Group>
            <Text size="md" mb={8}>
              QR kodlarınızın kaç kez, nerede ve hangi cihazdan tarandığını detaylıca analiz edin. Tüm tarama geçmişini, lokasyon ve cihaz bilgileriyle birlikte görüntüleyin. Müşteri davranışlarını daha iyi anlayın ve kampanyalarınızı optimize edin. Hangi kampanyanın daha çok ilgi gördüğünü kolayca tespit edin.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Avantajları:</b> Detaylı analiz, lokasyon ve cihaz bazlı raporlama, performans takibi, kampanya optimizasyonu.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir zincir restoran, farklı şubelerdeki QR kodların hangi şehirde ve hangi saatlerde daha çok tarandığını analiz ederek pazarlama stratejisini geliştirir.</Text>
          </Box>
          {/* Kampanya Yönetimi (PRO) */}
          <Box>
            <Group align="flex-start" gap={16} mb={8}>
              <ThemeIcon size={48} radius="md" color="#ff922b"><IconRocket size={28} /></ThemeIcon>
              <Title order={2} size={28}>Kampanya Yönetimi (PRO)</Title>
            </Group>
            <Text size="md" mb={8}>
              Çekiliş ve kampanyalarınızı kolayca oluşturun, katılımcıları yönetin ve kazananları otomatik olarak belirleyin. Her kampanya için özel QR kodlar oluşturabilir, katılım ve etkileşim istatistiklerini anlık olarak takip edebilirsiniz. Kampanyalarınızı sosyal medya ve diğer dijital kanallarda paylaşarak müşteri etkileşimini artırın.
            </Text>
            <Text size="sm" c="dimmed" mb={4}>
              <b>Avantajları:</b> Otomatik çekiliş, katılımcı yönetimi, anlık istatistikler, sosyal medya entegrasyonu, müşteri etkileşimi artışı.
            </Text>
            <Text size="sm" c="gray.7" mb={8}><b>Örnek Senaryo:</b> Bir kafe, yeni açılışını duyurmak için QR kodlu bir çekiliş kampanyası başlatır. Müşteriler QR kodu okutarak kampanyaya katılır, sistem otomatik olarak kazananları belirler ve sonuçları anında paylaşır. Böylece hem müşteri datası toplanır hem de sosyal medyada etkileşim artar.</Text>
          </Box>
        </Stack>
        <Divider my={48} />
        <Text ta="center" size="sm" c="dimmed">
          Tüm özelliklerimiz hakkında daha fazla bilgi almak için <b>VunQR</b> ile iletişime geçebilirsiniz.<br />
          Daha fazla bilgi almak için <a href="mailto:vunqrdotcom@gmail.com" style={{ color: '#228be6', textDecoration: 'underline' }}>vunqrdotcom@gmail.com</a> adresine e-posta gönderebilirsiniz.
        </Text>
      </Container>
    </>
  );
} 