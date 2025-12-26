import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import Analytics from "@/components/Analytics";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mechanical Engineer Portfolio",
  description: "Portfolio of a Mechanical Engineer, Designer, and Researcher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        {/* Google tag (gtag.js) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
            <Analytics />
          </>
        )}
        <Navbar />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
