"use client";

import React, { useEffect, useState } from "react";

interface QrRedirectClientProps {
  params: { id: string };
}

export default function QrRedirectClient({ params }: QrRedirectClientProps) {
  const uuid = params?.id;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) return;

    async function fetchQrRedirect() {
      try {
        const res = await fetch(`/api/qr-tracking/scan/${uuid}`);

        if (res.redirected) {
          // Backend 302 redirect yaptıysa, tarayıcı zaten yönlendi
          return;
        }

        if (!res.ok) {
          throw new Error("QR kod bulunamadı veya geçersiz.");
        }

        const data = await res.json();

        if (data.original_content) {
          // Özel protokol (smsto, mailto, vb.) için JS ile yönlendir
          window.location.href = data.original_content;
        } else {
          throw new Error("Yönlendirme URL'si bulunamadı.");
        }
      } catch (err: any) {
        setError(err.message || "Bilinmeyen bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchQrRedirect();
  }, [uuid]);

  if (!uuid)
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        Geçersiz QR kodu.
      </div>
    );

  if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Yönlendirme yapılıyor...</div>;

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        Hata: {error}
        <br />
        <button onClick={() => window.location.reload()}>Tekrar Dene</button>
      </div>
    );

  return null;
}
