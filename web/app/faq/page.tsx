import React from 'react';
import { Box, Container, Title, Text, Accordion, AccordionItem, AccordionControl, AccordionPanel, Paper } from '@mantine/core';
import Footer from '../components/Footer';

const faqData = [
  {
    question: 'VunQR nedir?',
    answer: 'VunQR, işletmeler ve bireyler için gelişmiş QR kod çözümleri sunan, dijital iletişim ve bağlantı platformudur.'
  },
  {
    question: 'VunQR ile hangi tür QR kodlar oluşturabilirim?',
    answer: 'WiFi, vCard, URL, e-posta, SMS, Google Yorum, PDF menü, Link in Bio ve daha birçok farklı QR kod türünü kolayca oluşturabilirsiniz.'
  },
  {
    question: 'VunQR ücretsiz mi?',
    answer: 'VunQR temel özellikleriyle ücretsizdir. Sınırsız QR kod, kampanya yönetimi gibi gelişmiş özellikler için PRO üyelik sunulmaktadır.'
  },
  {
    question: 'Oluşturduğum QR kodlar ne kadar süreyle geçerli?',
    answer: 'Oluşturduğunuz QR kodlar süresiz olarak geçerlidir ve istediğiniz zaman yönetebilirsiniz.'
  },
  {
    question: 'VunQR ile QR kodlarımın hangi cihazdan ve konumdan kaç kere tarandığını görebilir miyim?',
    answer: 'Evet, VunQR ile oluşturduğunuz her QR kodun kaç kez, hangi şehirden ve hangi cihaz (mobil, tablet, masaüstü) üzerinden tarandığını detaylı olarak analiz edebilirsiniz. Böylece kampanyalarınızın ve paylaşımlarınızın performansını kolayca ölçebilirsiniz.'
  },
  {
    question: 'QR kodlarımı nasıl özelleştirebilirim? Logo ve tasarım ekleyebilir miyim?',
    answer: 'VunQR ile QR kodlarınızı markanıza uygun şekilde özelleştirebilirsiniz. Kendi logonuzu ekleyebilir, renkleri ve çerçeve tasarımını değiştirebilir, farklı QR kod stilleriyle dikkat çekici ve profesyonel görünümler oluşturabilirsiniz.'
  },
  {
    question: 'QR kod istatistikleri sunuyor musunuz?',
    answer: 'Evet, QR kodlarınızın kaç kez, nerede ve hangi cihazdan tarandığını detaylı olarak takip edebilirsiniz.'
  },
  {
    question: 'VunQR ile Google Yorum QR kodu nasıl oluşturulur?',
    answer: 'Google Place ID’nizi girerek, müşterilerinizin doğrudan Google işletme sayfanıza yorum bırakmasını sağlayan QR kodlar oluşturabilirsiniz.'
  },
  {
    question: 'PDF menü özelliği nedir?',
    answer: 'Restoran ve kafeler için PDF menülerinizi yükleyip, QR kod ile müşterilerinizle kolayca paylaşabilirsiniz.'
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'VunQR, kullanıcı verilerini gizlilik ve güvenlik standartlarına uygun şekilde korur. Verileriniz üçüncü kişilerle paylaşılmaz.'
  }
];

export const metadata = {
  title: 'Sıkça Sorulan Sorular | VunQR',
  description: 'VunQR hakkında en çok merak edilen soruların cevaplarını burada bulabilirsiniz. QR kod, dijital menü, Google yorum, vCard ve daha fazlası hakkında detaylı bilgi alın.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Sıkça Sorulan Sorular | VunQR',
    description: 'VunQR hakkında en çok merak edilen soruların cevaplarını burada bulabilirsiniz. QR kod, dijital menü, Google yorum, vCard ve daha fazlası hakkında detaylı bilgi alın.',
    url: '/faq',
    type: 'website',
  },
  other: {
    'script:type': 'application/ld+json',
    'script:dangerouslySetInnerHTML': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqData.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    })
  }
};

export default function FAQPage() {
  return (
    <>
      {/* Mavi Banner */}
      <Box style={{ background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)', color: 'white', padding: '2.5rem 0 2rem 0', textAlign: 'center', marginBottom: '2.5rem' }}>
        <Title order={1} style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1px', marginBottom: 8 }}>
          Sıkça Sorulan Sorular
        </Title>
        <Text size="lg" style={{ opacity: 0.92, maxWidth: 600, margin: '0 auto' }}>
          VunQR hakkında en çok merak edilen soruların cevaplarını burada bulabilirsiniz. Dijital iletişim, QR kod, menü, Google yorum ve daha fazlası için detaylı bilgi alın.
        </Text>
      </Box>
      <Container size="sm" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '36px' }}>
        <Paper shadow="xs" radius="md" p="md" style={{ width: '100%', maxWidth: 600 }}>
          <Accordion variant="separated" radius="md">
            {faqData.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionControl>
                  <Text fw={500}>{faq.question}</Text>
                </AccordionControl>
                <AccordionPanel>
                  <Text c="dimmed">{faq.answer}</Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
