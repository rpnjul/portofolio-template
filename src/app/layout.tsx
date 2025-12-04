import type { Metadata } from "next";
import "./globals.css";
import "../styles/global.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/footer.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Slide, ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";


export const metadata: Metadata = {
  title: {
    default: "Satria Aprilian - Fullstack Developer",
    template: "%s | Satria Aprilian",
  },
  description: "Satria Aprilian - Experienced Fullstack Web Developer specializing in modern web technologies, React, Next.js, Node.js, and MongoDB. Building scalable web applications.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  creator: "Satria Aprilian",
  authors: [{ name: "Satria Aprilian" }],
  keywords: [
    "Satria Aprilian",
    "Satria",
    "Fullstack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio",
    "Indonesia Developer"
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "Satria Aprilian",
    title: "Satria Aprilian - Fullstack Developer",
    description: "Experienced Fullstack Web Developer specializing in modern web technologies. Building scalable web applications with React, Next.js, and Node.js.",
    images: [
      {
        url: "/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Satria Aprilian - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sssssatria",
    creator: "@sssssatria",
    title: "Satria Aprilian - Fullstack Developer",
    description: "Experienced Fullstack Web Developer specializing in modern web technologies.",
    images: ["/assets/img/og-image.jpg"],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  },
  verification: {
    google: "your-google-verification-code", // Ganti dengan Google Search Console verification code
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
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_WEB_URL || "https://www.satria.me"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Satria Aprilian",
              url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
              image: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/og-image.jpg`,
              jobTitle: "Fullstack Web Developer",
              description: "Experienced Fullstack Web Developer specializing in modern web technologies",
              sameAs: [
                "https://twitter.com/sssssatria",
                "https://instagram.com/sssssatria",
                "https://github.com/satriaaprilian"
              ],
              knowsAbout: [
                "Web Development",
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "MongoDB",
                "Fullstack Development"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Satria Aprilian Portfolio",
              url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
              description: "Portfolio and blog of Satria Aprilian - Fullstack Web Developer",
              author: {
                "@type": "Person",
                name: "Satria Aprilian"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/posts?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Satria Aprilian - Fullstack Developer",
              url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: [
                  {
                    "@type": "SiteNavigationElement",
                    position: 1,
                    name: "About",
                    description: "Learn more about Satria Aprilian",
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    position: 2,
                    name: "Projects",
                    description: "View portfolio projects",
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    position: 3,
                    name: "Posts",
                    description: "Read blog posts and articles",
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    position: 4,
                    name: "Contact",
                    description: "Get in touch",
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`
                  }
                ]
              }
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main className="content">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {children}
          </SkeletonTheme>
        </main>
        <Footer />
        <ToastContainer theme="dark" transition={Slide} />
      </body>
    </html>
  );
}
