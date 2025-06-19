'use client';

import Image from 'next/image';

interface ExampleCard {
  title: string;
  description: string;
  useCase: string;
  image: string;
}

const examples: ExampleCard[] = [
  {
    title: 'WiFi QR Kodu',
    description: 'Şık tasarımlı QR kod ile müşterilerinizin wifi ağınıza kolayca bağlanmasını sağlayın.',
    useCase: 'Kafeler, restoranlar, oteller ve ofisler için ideal wifi paylaşım çözümü.',
    image: '/examples/ornek-1.png',
  },
  {
    title: 'VCard QR Kodu',
    description: 'Dijital kartvizitinizi QR kod ile paylaşın, iletişim bilgileriniz anında karşı tarafın rehberine eklensin.',
    useCase: 'Profesyoneller, işletmeler ve networking etkinlikleri için mükemmel çözüm.',
    image: '/examples/ornek-2.png',
  },
  {
    title: 'E-posta QR Kodu',
    description: 'Hazır e-posta şablonu ile müşterilerinizin size kolayca ulaşmasını sağlayın.',
    useCase: 'Müşteri hizmetleri, geri bildirim ve iletişim noktaları için pratik çözüm.',
    image: '/examples/ornek-3.png',
  },
  {
    title: 'SMS QR Kodu',
    description: 'Hazır SMS metni ile müşterilerinizin size hızlıca mesaj göndermesini sağlayın.',
    useCase: 'Rezervasyon, bilgi talebi ve hızlı iletişim için ideal çözüm.',
    image: '/examples/ornek-4.png',
  }
];

export default function Examples() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            İlham Verici QR Kod Tasarımları
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Özel Tasarlanmış QR Kod Örnekleri
          </p>
          <p className="text-md text-gray-500 mb-12">
            Markanıza özel QR kod tasarım örnekleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={example.image}
                      alt={example.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {example.description}
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="text-xs font-semibold text-blue-800 mb-1">Kullanım Alanı</h4>
                  <p className="text-xs text-blue-600">
                    {example.useCase}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 italic">
            * Bu tasarımlar örnek amaçlı hazırlanmıştır. Siz de markanıza özel benzer tasarımlar oluşturabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
