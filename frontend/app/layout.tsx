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

// Get site URL from environment or use default
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://rjexpressinc.io");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RJ EXPRESS INC — Driven by Trust. Powered by Opportunity.",
    template: "%s | RJ EXPRESS INC",
  },
  description: "American trucking company providing reliable routes across Eastern and Central USA. Join our team of professional drivers. Competitive pay, home time opportunities, and safe routes.",
  keywords: [
    "trucking",
    "logistics",
    "drivers",
    "Eastern USA",
    "Central USA",
    "RJ Express",
    "trucking jobs",
    "CDL jobs",
    "truck driver jobs",
    "freight transportation",
    "trucking company",
    "driver recruitment",
  ],
  authors: [{ name: "RJ Express Inc" }],
  creator: "RJ Express Inc",
  publisher: "RJ Express Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RJ EXPRESS INC",
    title: "RJ EXPRESS INC — Drive with Confidence. Earn More.",
    description:
      "Reliable transportation across Eastern & Central USA. Join our professional team of drivers. Competitive pay, home time opportunities, and safe routes.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "RJ Express — Drive with Confidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RJ EXPRESS INC — Drive with Confidence. Earn More.",
    description:
      "Reliable transportation across Eastern & Central USA. Join our professional team of drivers.",
    images: ["/images/logo.png"],
    creator: "@rjexpressinc",
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
  verification: {
    // Google Search Console verification code will be added here
     google: "iU-ZrxYqbWTk-GqRX-Bclr_b2i5qeG0Uw5lG6OnmjIY",
  },
  alternates: {
    canonical: siteUrl,
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
