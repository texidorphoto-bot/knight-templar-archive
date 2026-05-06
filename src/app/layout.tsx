import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Knight's Templar Magazine — Digital Archive",
    template: "%s — Knight's Templar Digital Archive",
  },
  description:
    "A searchable digital archive of Knight Templar, the quarterly publication of the Grand Encampment of Knights Templar of the United States of America.",
  openGraph: {
    title: "Knight's Templar Magazine — Digital Archive",
    description:
      "Browse, search, and read every issue of Knight Templar in one searchable archive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-stone-50 text-stone-900 antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
