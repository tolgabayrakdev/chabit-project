import QrRedirectClient from "./QrRedirect";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return <QrRedirectClient params={resolvedParams} />;
}
