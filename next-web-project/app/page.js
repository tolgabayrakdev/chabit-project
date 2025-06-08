import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Contact, Wifi, MessageSquare, Mail } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6">
              QR Kod Oluşturma Platformu
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              vCard, WiFi bağlantısı, SMS ve e-posta gönderimi için özel QR kodlar oluşturun.
              Hızlı, kolay ve profesyonel çözümler.
            </p>
            <div className="flex gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Hemen Başla
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Giriş Yap
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-violet-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-violet-900">Özellikler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                  <Contact className="w-6 h-6 text-violet-600" />
                </div>
                <CardTitle className="text-xl font-semibold mb-3 text-gray-800">vCard QR</CardTitle>
                <CardDescription className="text-gray-600 space-y-2">
                  <p>• İsim ve soyisim</p>
                  <p>• Telefon numaraları</p>
                  <p>• E-posta adresleri</p>
                  <p>• Adres bilgileri</p>
                  <p>• Sosyal medya hesapları</p>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                  <Wifi className="w-6 h-6 text-violet-600" />
                </div>
                <CardTitle className="text-xl font-semibold mb-3 text-gray-800">WiFi QR</CardTitle>
                <CardDescription className="text-gray-600 space-y-2">
                  <p>• Ağ adı (SSID)</p>
                  <p>• Şifre koruması</p>
                  <p>• Şifreleme türü</p>
                  <p>• Gizli ağ desteği</p>
                  <p>• Otomatik bağlantı</p>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-violet-600" />
                </div>
                <CardTitle className="text-xl font-semibold mb-3 text-gray-800">SMS QR</CardTitle>
                <CardDescription className="text-gray-600 space-y-2">
                  <p>• Önceden hazırlanmış mesaj</p>
                  <p>• Alıcı numarası</p>
                  <p>• Mesaj şablonları</p>
                  <p>• Çoklu alıcı desteği</p>
                  <p>• Özel mesaj formatları</p>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-violet-600" />
                </div>
                <CardTitle className="text-xl font-semibold mb-3 text-gray-800">E-posta QR</CardTitle>
                <CardDescription className="text-gray-600 space-y-2">
                  <p>• Alıcı e-posta adresi</p>
                  <p>• Konu satırı</p>
                  <p>• Mesaj içeriği</p>
                  <p>• CC ve BCC desteği</p>
                  <p>• Özel şablonlar</p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-violet-900">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">QR Kodunuzu Oluşturun</h3>
              <p className="text-gray-600">
                İhtiyacınıza uygun QR kod tipini seçin ve bilgilerinizi girin. 
                Sistem otomatik olarak QR kodunuzu oluşturacak.
              </p>
              <div className="flex gap-4">
                <div className="bg-violet-100 p-4 rounded-lg">
                  <p className="text-violet-800 font-medium">1. QR Tipini Seçin</p>
                </div>
                <div className="bg-violet-100 p-4 rounded-lg">
                  <p className="text-violet-800 font-medium">2. Bilgileri Girin</p>
                </div>
                <div className="bg-violet-100 p-4 rounded-lg">
                  <p className="text-violet-800 font-medium">3. QR Kodu İndirin</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-violet-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-violet-200 rounded-full opacity-50"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-violet-100">
                  <div className="aspect-square w-full bg-violet-50 rounded-lg flex items-center justify-center">
                    <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-full h-full bg-violet-100 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-sm">QR Kod Önizleme</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples Section */}
      <div className="py-20 bg-violet-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-violet-900">Kullanım Örnekleri</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">vCard QR</h3>
                <div className="relative aspect-[9/16] bg-gray-100 rounded-lg mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-full h-full bg-violet-100 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-xs">QR Kod</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Kişi bilgileri otomatik olarak kaydedilir</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">WiFi QR</h3>
                <div className="relative aspect-[9/16] bg-gray-100 rounded-lg mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-full h-full bg-violet-100 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-xs">QR Kod</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm text-gray-600">WiFi ağına otomatik bağlanır</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">SMS QR</h3>
                <div className="relative aspect-[9/16] bg-gray-100 rounded-lg mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-full h-full bg-violet-100 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-xs">QR Kod</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Mesaj uygulaması otomatik açılır</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">E-posta QR</h3>
                <div className="relative aspect-[9/16] bg-gray-100 rounded-lg mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-inner">
                      <div className="w-full h-full bg-violet-100 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-xs">QR Kod</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm text-gray-600">E-posta uygulaması otomatik açılır</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-violet-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Hemen QR Kodlarınızı Oluşturmaya Başlayın
          </h2>
          <p className="text-xl mb-8">
            Ücretsiz hesap oluşturun ve tüm özelliklere erişin.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Ücretsiz Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
