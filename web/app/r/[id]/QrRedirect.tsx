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
        const res = await fetch(`/api/qr-tracking/scan/${uuid}`, { redirect: "manual" });

        if (res.status === 302) {
          // Redirect varsa, fetch ile takip etme, direkt pencereyi yönlendir
          const redirectUrl = res.headers.get("Location");
          if (redirectUrl) {
            window.location.href = redirectUrl;
            return;
          }
        }

        if (!res.ok) {
          throw new Error("QR kod bulunamadı veya geçersiz.");
        }

        const data = await res.json();

        if (data.original_content) {
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
