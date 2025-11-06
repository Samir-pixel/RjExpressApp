import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import ProvidersWrapper from "./layout.client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rjexpressinc.io"),
  title: "RJ EXPRESS INC — Driven by Trust. Powered by Opportunity.",
  description: "American trucking company providing reliable routes across Eastern and Central USA. Join our team of professional drivers.",
  keywords: [
    "trucking",
    "logistics",
    "drivers",
    "Eastern USA",
    "Central USA",
    "RJ Express",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "RJ EXPRESS INC — Drive with Confidence. Earn More.",
    description:
      "Reliable transportation across Eastern & Central USA. Join our professional team of drivers.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://rjexpressinc.io",
    siteName: "RJ EXPRESS INC",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "RJ Express — Drive with Confidence",
      },
    ],
    locale: "en_US",
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
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {/* i18n provider */}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div suppressHydrationWarning>
          {/* Providers wraps children with I18nextProvider */}
          {/* @ts-expect-error Server Component boundary */}
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </div>
      </body>
    </html>
  );
}
