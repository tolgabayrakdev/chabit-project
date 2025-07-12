// app/r/[id]/page.tsx

import QrRedirectClient from "./QrRedirect";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params);
  
  // Client component'e promise olarak sarmalayıp geçiriyoruz
  return <QrRedirectClient params={Promise.resolve(params)} />;
}
