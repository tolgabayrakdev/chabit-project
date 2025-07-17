"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function QrRedirectClient({ params }: { params: Promise<{ id: string }> }) {
  const paramData = React.use(params);
  const uuid = paramData?.id;

  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!uuid) return;

    const fetchQrData = async () => {
      try {
        const res = await fetch(`/api/qr-tracking/scan/${uuid}`);
        if (!res.ok) throw new Error("QR kod bulunamadı veya geçersiz.");
        const data = await res.json();

        if (data.original_content) {
          window.location.href = data.original_content;
        } else {
          setError("Yönlendirme URL'si bulunamadı.");
        }
      } catch (err: any) {
        setError(err.message || "Bilinmeyen bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchQrData();
  }, [uuid]);

  if (!uuid)
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        Geçersiz QR kodu.
      </div>
    );

  if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Yükleniyor...</div>;

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        Hata: {error}
        <br />
        <button onClick={() => router.refresh()}>Tekrar Dene</button>
      </div>
    );

  return <div style={{ textAlign: "center", marginTop: 40 }}>Yönlendirme yapılıyor...</div>;
}
