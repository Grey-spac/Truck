import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${site.name} | Truck Repair & Truck Parts in Jhansi`,
    template: `%s | ${site.name}`,
  },

  description:
    "Deepchand Mechanic in Jhansi provides truck repair, truck mechanic service, truck parts, heavy vehicle repair and commercial truck maintenance.",

  keywords: site.seoKeywords,

  alternates: {
    canonical: "/",
  },

  // Google Search Console verification
  verification: {
    google: "uBYJHR41QrGiVQ1VR-iXbrfdO_dIfCRmfxrDdmcrdKQ",
  },

  openGraph: {
    title: `${site.name} | Truck Repair & Truck Parts in Jhansi`,
    description:
      "Truck repair, truck mechanic service, truck parts, heavy vehicle repair and truck service in Jhansi.",
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    images: [
      {
        url: "/images/truck-care-hero.png",
        width: 1671,
        height: 941,
        alt: "Deepchand Mechanic truck repair workshop",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Truck Repair in Jhansi`,
    description:
      "Truck repair, truck parts and heavy vehicle service in Jhansi.",
    images: ["/images/truck-care-hero.png"],
  },

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05080d",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("truck-care-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}})()`,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
