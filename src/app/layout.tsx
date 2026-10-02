import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalHeader, ConditionalFooter } from "@/components/layout/conditional-layout";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://zirveakbas.com.tr"),
  title: {
    default: "Zirve Akbaş İnşaat | Kentsel Dönüşüm ve Mimari Çözümler",
    template: "%s | Zirve Akbaş İnşaat",
  },
  description: "Zirve Akbaş İnşaat olarak kentsel dönüşümde güvenin ve yenilikçi mimarinin adresiyiz. Modern ve sağlam yaşam alanları inşa ediyoruz.",
  keywords: ["kentsel dönüşüm", "inşaat", "mimari", "müteahhit", "istanbul kentsel dönüşüm", "zirve akbaş", "zirve akbaş inşaat"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    title: "Zirve Akbaş İnşaat | Kentsel Dönüşüm ve Mimari Çözümler",
    description: "Zirve Akbaş İnşaat olarak kentsel dönüşümde güvenin ve yenilikçi mimarinin adresiyiz.",
    siteName: "Zirve Akbaş İnşaat",
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
  return (
    <html lang="tr" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-foreground">
        <ConditionalHeader />
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
