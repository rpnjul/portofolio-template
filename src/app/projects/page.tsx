import ProjectComponent from "@/components/common/ProjectComponent";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Satria Aprilian | Portfolio & Work Showcase",
  description: "Explore featured projects and work portfolio by Satria Aprilian. Web development projects using React, Next.js, Laravel, and modern tech stack.",
  keywords: [
    "Satria Aprilian Projects",
    "Web Development Portfolio",
    "React Projects",
    "Next.js Projects",
    "Laravel Projects",
    "Full Stack Projects",
    "Software Development Portfolio",
    "Web Applications",
    "Mobile Apps",
    "Developer Portfolio",
  ],
  authors: [{ name: "Satria Aprilian" }],
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    title: "Projects - Satria Aprilian | Portfolio & Work Showcase",
    description: "Explore featured projects and work portfolio by Satria Aprilian. Web development projects using React, Next.js, Laravel, and modern tech stack.",
    siteName: "Satria Aprilian",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`,
        width: 1200,
        height: 630,
        alt: "Satria Aprilian Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sssssatria",
    creator: "@sssssatria",
    title: "Projects - Satria Aprilian | Portfolio & Work Showcase",
    description: "Explore featured projects and work portfolio by Satria Aprilian. Web development projects using React, Next.js, Laravel, and modern tech stack.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
  },
};

const Project = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://satria.me";

  // CollectionPage structured data for projects
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Satria Aprilian Projects",
    description: "Portfolio of web development projects",
    url: `${baseUrl}/projects`,
    author: {
      "@type": "Person",
      name: "Satria Aprilian",
      url: baseUrl,
    },
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${baseUrl}/projects`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <main>
        <section className="mt-8" aria-label="Featured projects">
          <ProjectComponent customTitle="Featured Projects" />
        </section>
      </main>
    </>
  );
};

export default Project;
