import ExpComponent from "@/components/common/ExpComponent";
import PostComponent from "@/components/common/PostComponent";
import ProjectComponent from "@/components/common/ProjectComponent";
import SkillsCard from "@/components/widgets/SkillsCard";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satria Aprilian - Full Stack Developer | React, Next.js, Laravel Expert",
  description: "Full-Stack Developer with 5+ years of experience in building fast, responsive, and impactful web applications. Specializing in React, Next.js, Laravel, Node.js, and modern tech stack.",
  keywords: [
    "Satria Aprilian",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Node.js Developer",
    "Web Development",
    "Mobile Development",
    "React Native",
    "JavaScript",
    "TypeScript",
    "Indonesia Developer",
    "Jakarta Developer",
    "Software Engineer",
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
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "Satria Aprilian - Full Stack Developer | React, Next.js, Laravel Expert",
    description: "Full-Stack Developer with 5+ years of experience in building fast, responsive, and impactful web applications. Specializing in React, Next.js, Laravel, Node.js, and modern tech stack.",
    siteName: "Satria Aprilian",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`,
        width: 1200,
        height: 630,
        alt: "Satria Aprilian - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sssssatria",
    creator: "@sssssatria",
    title: "Satria Aprilian - Full Stack Developer | React, Next.js, Laravel Expert",
    description: "Full-Stack Developer with 5+ years of experience in building fast, responsive, and impactful web applications. Specializing in React, Next.js, Laravel, Node.js, and modern tech stack.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

const Home = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://satria.me";

  // WebSite structured data for homepage
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Satria Aprilian",
    description: "Full-Stack Developer Portfolio",
    url: baseUrl,
    author: {
      "@type": "Person",
      name: "Satria Aprilian",
    },
    inLanguage: "en-US",
  };

  // Person structured data for homepage
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Satria Aprilian",
    jobTitle: "Full Stack Developer",
    description: "Full-Stack Developer with 5+ years of experience in building fast, responsive, and impactful web applications",
    url: baseUrl,
    email: "satriaaprilian18@gmail.com",
    image: `${baseUrl}/assets/img/satria.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    sameAs: [
      "https://github.com/rpnjul",
      "https://instagram.com/sssssatria",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Laravel",
      "Node.js",
      "React Native",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "Tailwind CSS",
      "PHP",
      "Express.js",
      "MySQL",
      "PostgreSQL",
      "Full Stack Development",
    ],
  };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />

        <main>
          <header className="card">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row w-full justify-between gap-2">
                <h1 className="unset text-4xl" style={{ margin: 0 }}>
                  Satria Aprilian
                </h1>
                <ul
                  className="flex gap-2 justify-end"
                  style={{ margin: 0, padding: 0, listStyle: "none" }}
                  aria-label="Social media links"
                >
                  <li>
                    <Link
                      href="mailto:satriaaprilian18@gmail.com"
                      target="_blank"
                      aria-label="Email"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="card"
                        style={{ padding: 10, lineHeight: 0, margin: 0 }}
                      >
                        <div className="w-[20px] h-[20px]">
                          <AiOutlineMail />
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/rpnjul"
                      target="_blank"
                      aria-label="Github"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="card"
                        style={{ padding: 10, lineHeight: 0, margin: 0 }}
                      >
                        <div className="w-[20px] h-[20px]">
                          <FaGithub />
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://instagram.com/sssssatria"
                      target="_blank"
                      aria-label="Instagram"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="card"
                        style={{ padding: 10, lineHeight: 0, margin: 0 }}
                      >
                        <div className="w-[20px] h-[20px]">
                          <FaInstagram />
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <address
                className="flex justify-start items-center text-gray-400"
                style={{ margin: 0, fontStyle: "normal" }}
              >
                <div className="h-[20px] w-[20px] custom">
                  <GrLocationPin />
                </div>
                <span className="w-fit" style={{ margin: 0 }}>
                  Jakarta, Indonesia
                </span>
              </address>
            </div>
            <p className="mb-0 mt-4">
              Full-Stack Developer with 5+ years of experience in building fast,
              responsive, and impactful web applications. I turn ideas into
              real, scalable products.
            </p>
          </header>

          <section className="mt-16" aria-label="Skills and technologies">
            <h2 className="home-title">What i work with</h2>
            <SkillsCard
              data={[
                "bootstrap",
                "tailwind",
                "javascript",
                "typescript",
                "react",
                "rn",
                "nextjs",
              ]}
            />
            <SkillsCard
              data={[
                "laravel",
                "php",
                "express",
                "nodejs",
                "mysql",
                "postgre",
                "github",
              ]}
            />
            <ExpComponent limit={2} />
          </section>

          <section className="mt-8" aria-label="Featured projects">
            <ProjectComponent limit={2} />
          </section>

          <section className="mt-8" aria-label="Recent posts">
            <PostComponent limit={2} />
          </section>
        </main>
      </>
    );
}

export default Home;