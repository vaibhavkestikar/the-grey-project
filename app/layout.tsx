import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import {
  AuthProvider,
} from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: {
    default: "The Grey Project",
    template: "%s · The Grey Project",
  },

  description:
    "Understand AI Like You Built It. Interactive lessons, live sandboxes, zero buzzword bingo.",

  openGraph: {
    title: "The Grey Project",
    description: "Understand AI Like You Built It.",
    url: "https://thegreyproject.com",
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
        className={`${inter.className} bg-[#f8fafc] text-slate-900 antialiased`}
      >

        <AuthProvider>

          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
          />

        </AuthProvider>

        <Analytics />

      </body>

    </html>

  );
}