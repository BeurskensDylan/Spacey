import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spacey",
  description: "NASA API wrapper",
  icons: {
    icon: "/images/spacey.jpg",
  },
  openGraph: {
    title: "Spacey",
    description: "NASA API wrapper",
    url: "https://spacey.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="p-2 min-h-full min-w-full flex flex-col">{children}</body>
    </html>
  );
}
