import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Kayıt Ol</CardTitle>
          <CardDescription>QR kod oluşturma platformuna katılın</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="name" type="text" placeholder="Ad Soyad" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="email" type="email" placeholder="E-posta" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="password" type="password" placeholder="Şifre" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="confirmPassword" type="password" placeholder="Şifre Tekrar" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Kayıt Ol</Button>
          <p className="text-sm text-gray-500">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Giriş Yap
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
