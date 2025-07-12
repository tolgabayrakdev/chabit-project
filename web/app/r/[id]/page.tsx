// app/r/[id]/page.tsx

import QrRedirectClient from "./QrRedirect";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log(params);
  
  // Next.js 15'te params zaten Promise olduğu için doğrudan geçiriyoruz
  return <QrRedirectClient params={params} />;
}
