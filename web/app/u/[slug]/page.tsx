import LinkInBioPage from "./LinkInBioClient";

export const metadata = {
  title: "Link In Bio | VunQR",
  description: "Tüm sosyal medya, iletişim ve tanıtım linklerinizi sade, şık ve etkili bir sayfada birleştirin.",
  openGraph: {
    title: "Link In Bio | VunQR",
    description: "Tüm sosyal medya, iletişim ve tanıtım linklerinizi sade, şık ve etkili bir sayfada birleştirin.",
    url: "https://vunqr.com/u",
    images: [
      {
        url: "https://vunqr.com/examples/icon.png",
        width: 400,
        height: 400,
        alt: "VunQR Link In Bio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Link In Bio | VunQR",
    description: "Tüm sosyal medya, iletişim ve tanıtım linklerinizi sade, şık ve etkili bir sayfada birleştirin.",
    images: ["https://vunqr.com/examples/icon.png"],
  },
};

export default function RegisterPage() {
  return <LinkInBioPage />;
}