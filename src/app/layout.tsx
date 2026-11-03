import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getBaseUrl } from "@/lib/seo";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "JDIH BLM FEB UNAIR | Jaringan Dokumentasi & Informasi Hukum",
    template: "%s | JDIH BLM FEB UNAIR",
  },
  description:
    "Portal resmi dokumentasi, publikasi, dan pencarian produk hukum Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga.",
  keywords: [
    "JDIH",
    "JDIH BLM FEB UNAIR",
    "BLM FEB UNAIR",
    "Universitas Airlangga",
    "Produk Hukum Mahasiswa",
    "Undang-Undang Ormawa",
    "Ketetapan Parlemen",
    "Surat Keputusan BLM",
    "Legislasi Mahasiswa UNAIR",
  ],
  authors: [
    {
      name: "Badan Legislatif Mahasiswa FEB UNAIR",
      url: baseUrl,
    },
  ],
  creator: "Komisi Legislasi BLM FEB UNAIR",
  publisher: "Fakultas Ekonomi dan Bisnis Universitas Airlangga",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "JDIH BLM FEB UNAIR",
    title: "JDIH BLM FEB UNAIR | Jaringan Dokumentasi & Informasi Hukum",
    description:
      "Portal resmi keterbukaan dan pangkalan data produk hukum Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JDIH BLM FEB UNAIR",
    description:
      "Portal resmi keterbukaan dan pangkalan data produk hukum Badan Legislatif Mahasiswa FEB Universitas Airlangga.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "JDIH BLM FEB UNAIR",
        description:
          "Pangkalan data naskah resmi produk hukum parlemen Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga.",
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/pencarian?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "GovernmentOrganization",
        "@id": `${baseUrl}/#organization`,
        name: "Badan Legislatif Mahasiswa FEB UNAIR",
        alternateName: "BLM FEB UNAIR",
        url: baseUrl,
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "Fakultas Ekonomi dan Bisnis Universitas Airlangga",
          url: "https://feb.unair.ac.id",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Airlangga No. 4–6, Graha Krida Mahasiswa (GKM) Lt. 1",
          addressLocality: "Surabaya",
          addressRegion: "Jawa Timur",
          postalCode: "60286",
          addressCountry: "ID",
        },
      },
    ],
  };

  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
