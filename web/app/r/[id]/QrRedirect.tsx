"use client";
import React from "react";
import { useEffect } from "react";

export default function QrRedirectClient({ params }: { params: Promise<{ id: string }> }) {
  const paramData = React.use(params);
  const uuid = paramData?.id;

  useEffect(() => {
    if (uuid) {
      window.location.href = `/api/qr-tracking/scan/${uuid}`;
    }
  }, [uuid]);

  if (!uuid)
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        Geçersiz QR kodu.
      </div>
    );

  return <div style={{ textAlign: "center", marginTop: 40 }}>Yönlendirme yapılıyor...</div>;
}
