import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "The Templar Archive: Knight Templar Magazine",
    template: "%s — The Templar Archive",
  },
  description:
    "A searchable archive of Knight Templar Magazine, the quarterly publication of the Grand Encampment of Knights Templar of the United States of America.",
  openGraph: {
    title: "The Templar Archive: Knight Templar Magazine",
    description:
      "Read, search, and cite every issue of Knight Templar Magazine in one searchable archive.",
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
      {/* Inline script runs before paint to set data-theme and avoid flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('templar-theme');if(t==='night'){document.documentElement.setAttribute('data-theme','night');}else if(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','night');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="flex min-h-screen flex-col"
        style={{
          backgroundColor: "var(--color-vellum)",
          color: "var(--color-iron-gall)",
          fontFamily: "var(--font-body)",
        }}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
