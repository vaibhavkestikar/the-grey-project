import "./globals.css";

import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { Suspense } from "react";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import {
  AuthProvider,
} from "@/components/providers/auth-provider";
import AuthSessionHandler from "@/components/auth/auth-session-handler";
import SiteChrome from "@/components/layout/site-chrome";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {

  title: {
    default: "The Grey Project",
    template: "%s · The Grey Project",
  },

  description:
    "Paid, live AI workshops for engineering colleges. Industry landscape plus a hands-on agentic project. Flat fee. Certificate of completion.",

  openGraph: {
    title: "The Grey Project: Live AI workshops for engineering colleges",
    description:
      "Hands-on AI education delivered live to campus. Book a workshop for your college.",
    url: "https://www.thegreyproject.com",
    siteName: "The Grey Project",
    type: "website",
  },

  icons: {

    icon: "/favicon.png",

    shortcut: "/favicon.png",

    apple: "/favicon.png",

  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >

      <body
        className={`${poppins.variable} ${poppins.className} site-theme antialiased`}
      >
        <SiteChrome />

        <AuthProvider>
          <Suspense fallback={null}>
            <AuthSessionHandler />
          </Suspense>

          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
          />

        </AuthProvider>

        <Analytics />
        <SpeedInsights />

      </body>

    </html>

  );
}