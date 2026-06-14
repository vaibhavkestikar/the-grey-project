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
    "Interactive AI learning with browser Python sandboxes. Learn LLMs, ML, and production AI. Free Curious Builders path. Earn Grey Points and skill badges.",

  openGraph: {
    title: "The Grey Project: Learn How AI Actually Works",
    description:
      "Interactive AI courses with live sandboxes. Start free with Curious Builders.",
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