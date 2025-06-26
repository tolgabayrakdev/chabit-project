import LinkInBioPage from "./LinkInBioClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const awaitedParams = await params;
  const username = awaitedParams.slug;
  return {
    title: `${username} | VunQR`,
    description:
      "Tüm sosyal medya, iletişim ve tanıtım linklerinizi sade, şık ve etkili bir sayfada birleştirin.",
    openGraph: {
      title: `${username} | VunQR`,
      description:
        "Tüm sosyal medya, iletişim ve tanıtım linklerinizi sade, şık ve etkili bir sayfada birleştirin.",
      url: `https://vunqr.com/u/${username}`,
      images: [
        {
          url: "https://vunqr.com/icon.png",
          width: 400,
          height: 400,
          alt: "VunQR Link In Bio",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${username} | VunQR`,
      description:
        "Tüm sosyal medya, iletişim ve tanıtım linklerinizi sade, şık ve etkili bir sayfada birleştirin.",
      images: ["https://vunqr.com/icon.png"],
    },
  };
}

export default function RegisterPage() {
  return <LinkInBioPage />;
}
