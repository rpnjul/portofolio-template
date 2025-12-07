import ExpComponent from "@/components/common/ExpComponent";
import "../../styles/pages/about.css"
import EduComponent from "@/components/common/EduComponents";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Satria Aprilian - Full Stack Developer & Software Engineer",
  description: "Satria Aprilian is a full-stack software engineer specializing in React, Next.js, Laravel, and Node.js. Building scalable web and mobile applications with clean architecture.",
  keywords: [
    "Satria Aprilian",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Node.js Developer",
    "React Native",
    "Web Development",
    "Mobile Development",
    "JavaScript",
    "TypeScript",
    "Indonesia Developer",
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
    type: "profile",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    title: "About Satria Aprilian - Full Stack Developer & Software Engineer",
    description: "Satria Aprilian is a full-stack software engineer specializing in React, Next.js, Laravel, and Node.js. Building scalable web and mobile applications with clean architecture.",
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
    title: "About Satria Aprilian - Full Stack Developer & Software Engineer",
    description: "Satria Aprilian is a full-stack software engineer specializing in React, Next.js, Laravel, and Node.js. Building scalable web and mobile applications with clean architecture.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  },
};

const About = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://satria.me";

  // Person structured data for rich snippets in Google
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Satria Aprilian",
    jobTitle: "Full Stack Developer",
    description: "Full-stack software engineer specializing in React, Next.js, Laravel, and Node.js",
    image: `${baseUrl}/assets/img/satria.png`,
    url: baseUrl,
    sameAs: [
      "https://github.com/rpnjul",
      "https://instagram.com/sssssatria",
      "https://twitter.com/sssssatria",
    ],
    email: "satriaaprilian18@gmail.com",
    knowsAbout: [
      "React",
      "Next.js",
      "Laravel",
      "Node.js",
      "React Native",
      "JavaScript",
      "TypeScript",
      "Full Stack Development",
      "Web Development",
      "Mobile Development",
      "API Development",
      "E-commerce",
    ],
  };

  // ProfilePage structured data
  const profilePageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Satria Aprilian",
      alternateName: "rpnjul",
      identifier: baseUrl,
      description: "Full-stack software engineer who builds web and mobile applications",
      image: `${baseUrl}/assets/img/satria.png`,
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
        name: "About",
        item: `${baseUrl}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <main>
        <header className="flex flex-col items-center text-center mb-8">
          <figure>
            <Image
              src="/assets/img/satria.png"
              alt="Satria Aprilian"
              width={200}
              height={200}
              style={{borderRadius: '50%'}}
              className="rounded-full border-4 border-indigo-500 mb-4"
            />
          </figure>
          <nav aria-label="Social media links">
            <ul className="flex gap-2 justify-center" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <Link
                  href="mailto:satriaaprilian18@gmail.com"
                  target="_blank"
                  aria-label="Email"
                  rel="noopener noreferrer"
                >
                  <div className="card p-[10px] leading-none">
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
                  <div className="card p-[10px] leading-none">
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
                  <div className="card p-[10px] leading-none">
                    <div className="w-[20px] h-[20px]">
                      <FaInstagram />
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          <h1 className="unset text-4xl font-bold mb-2">Hey there!</h1>
        </header>

        <section aria-label="About me">
          <p className="my-8">
            I&apos;m Satria — a software engineer who&apos;s been building web and mobile apps
            for a few years now. I work mostly as a full-stack developer, which
            basically means I enjoy getting my hands dirty with both frontend and
            backend stuff. I&apos;ve built everything from scalable e-commerce platforms to
            real-time features like livestreaming and in-app purchases.
          </p>
          <p className="my-8">
            I&apos;m a big fan of clean, fast, and minimalistic websites — no unnecessary
            clutter, just stuff that works. I enjoy using tools like{" "}
            <strong>React</strong>, <strong>Next.js</strong>, <strong>Laravel</strong>
            , and <strong>Node.js</strong>, and I&apos;ve also dabbled in mobile
            development with <strong>React Native</strong>.
          </p>
          <p className="my-8">
            Lately, I&apos;ve been helping companies solve problems through smart
            architecture, smooth user experiences, and secure systems. Whether it&apos;s
            designing APIs, setting up payment gateways, or just making sure things
            don&apos;t crash — that&apos;s my jam.
          </p>
          <p className="my-8">
            When I&apos;m not coding, I&apos;m probably tweaking side projects, exploring new
            tech, or just trying to make the web a little bit better.
          </p>
          <p className="my-8">
            Last but not least, this website source-code is open-source! So if you want a site
            like this too, feel free to check out the code on my GitHub{" "}
            <a href="https://github.com/rpnjul/portofolio-template" rel="noopener noreferrer">here</a>. And if
            you get stuck while setting it up, don&apos;t worry — you can always reach out
            and ask me anything!
          </p>
        </section>

        <section className="mt-16" aria-label="Work experience">
          <ExpComponent />
        </section>

        <section className="mt-16" aria-label="Education">
          <EduComponent />
        </section>
      </main>
    </>
  );
};

export default About;