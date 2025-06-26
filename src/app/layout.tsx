import type { Metadata } from "next";
import "./globals.css";
import "../styles/global.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/footer.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: {
    default: "Satria Aprilian Profile",
    template: "%s | Satria Aprilian Profile",
  },
  description: "Full-Stack Web Developer - Satria Aprilian",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  creator: "Satria Aprilian",
  keywords:
    "Satria Aprilian, Satria, Aprilian, Fullstack, Full-stack, Web Developer",
  manifest: "/manifest.json",
  openGraph: {
    title: "Satria Aprilian Profile",
    description: "HFull-Stack Web Developer - Satria Aprilian",
    url: `${process.env.URL}`,
    images: [
      {
        url: `${process.env.URL}/assets/img/favicon/favicon.ico`,
        width: 500,
        height: 500,
        alt: "Satria Aprilian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satria Aprilian",
    description: "Full-Stack Web Developer - Satria Aprilian",
    images: [`${process.env.URL}/assets/img/favicon.ico`],
  },
  robots: "index, follow",
  alternates: {
    canonical: `${process.env.URL}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/apple-touch-icon.png" sizes="32x32" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Hitztar",
              url: `${process.env.URL}`,
              logo: `${process.env.URL}/assets/img/favicon.ico`,
              sameAs: [
                "https://twitter.com/sssssatria",
                "https://instagram.com/sssssatria",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: `${process.env.NEXT_PUBLIC_WEB_URL}/posts?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              description: "Full-Stack Web Developer - Satria Aprilian",
            }),
          }}
        />
      </head>
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
