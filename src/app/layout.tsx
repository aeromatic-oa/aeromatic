import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Outfit, Manrope } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// ====== SEO METADATA ======
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aeromatic-oa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aeromatic | Ventilación Inteligente y Automatizada",
    template: "%s | Aeromatic",
  },
  description:
    "Aeromatic automatiza la climatización de tus espacios con ventanas inteligentes que responden a factores ambientales. Control remoto, sensores de lluvia y programación horaria.",
  keywords: [
    "ventilación inteligente",
    "ventanas automatizadas",
    "domótica",
    "climatización natural",
    "smart home",
    "IoT",
    "control remoto ventanas",
    "ahorro energético",
    "Guatemala",
    "Aeromatic",
  ],
  authors: [{ name: "Aeromatic", url: siteUrl }],
  creator: "Aeromatic",
  publisher: "Aeromatic",
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
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: siteUrl,
    siteName: "Aeromatic",
    title: "Aeromatic | Ventilación Inteligente y Automatizada",
    description:
      "Automatizamos la climatización de tus espacios con ventanas inteligentes. Control desde tu smartphone, sensores ambientales y ahorro energético.",
    images: [
      {
        url: "/Logo aeromatic negro updated.png",
        width: 1200,
        height: 630,
        alt: "Aeromatic - Ventilación Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aeromatic | Ventilación Inteligente",
    description:
      "Ventanas automatizadas con control remoto, sensores de lluvia y programación horaria. El futuro de la ventilación natural.",
    images: ["/Logo aeromatic negro updated.png"],
    creator: "@aeromatic_oa",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/iconoM.png", sizes: "32x32", type: "image/png" },
      { url: "/iconoM.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/iconoM.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/iconoM.png",
  },
  verification: {
    google: "S_jPdi-C0dVV85tKfy9wJUrEswHn0ImVj2xw3QCx3Fc",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-white text-black">
        {children}
      </body>
    </html>
  );
}
