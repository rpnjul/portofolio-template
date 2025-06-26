import type { Metadata } from "next";
import "./globals.css";
import "../styles/global.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/footer.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


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
