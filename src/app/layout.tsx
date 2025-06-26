import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/global.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/footer.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satria Aprilian",
  description: "Full-Stack Web Developer - Satria Aprilian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" dir="ltr">
      <body>
        <Header />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
