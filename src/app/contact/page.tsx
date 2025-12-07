import Link from "next/link";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Satria Aprilian - Hire Full Stack Developer",
  description: "Get in touch with Satria Aprilian, a full-stack developer based in Jakarta, Indonesia. Available for hire for web and mobile development projects. Contact via email, WhatsApp, or LinkedIn.",
  keywords: [
    "Contact Satria Aprilian",
    "Hire Full Stack Developer",
    "Hire React Developer",
    "Hire Next.js Developer",
    "Web Developer Jakarta",
    "Freelance Developer Indonesia",
    "Full Stack Developer for Hire",
    "Contact Developer",
    "Satria Aprilian Email",
    "Satria Aprilian WhatsApp",
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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    title: "Contact Satria Aprilian - Hire Full Stack Developer",
    description: "Get in touch with Satria Aprilian, a full-stack developer based in Jakarta, Indonesia. Available for hire for web and mobile development projects.",
    siteName: "Satria Aprilian",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`,
        width: 1200,
        height: 630,
        alt: "Contact Satria Aprilian",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sssssatria",
    creator: "@sssssatria",
    title: "Contact Satria Aprilian - Hire Full Stack Developer",
    description: "Get in touch with Satria Aprilian, a full-stack developer based in Jakarta, Indonesia. Available for hire for web and mobile development projects.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
  },
};

const Contact = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://satria.me";
    const contact = [
      {
        link: "https://github.com/rpnjul",
        icon: <FaGithub />,
        label: "Github",
      },
      {
        link: "https://www.linkedin.com/in/satriaaprilian18/",
        icon: <FaLinkedin />,
        label: "Linkedin",
      },
      {
        link: "https://discord.com/users/471581847227203594",
        icon: <FaDiscord />,
        label: "Discord",
      },
    ];
    const contactLink = [
      {
        type: "address" as const,
        icon: <GrLocationPin />,
        label: "Jakarta, Indonesia",
      },
      {
        type: "link" as const,
        link: "mailto:satriaaprilian18@gmail.com",
        icon: <IoMailOutline />,
        label: "satriaaprilian18@gmail.com",
      },
      {
        type: "link" as const,
        link: "https://wa.me/62895371529602",
        icon: <FaWhatsapp />,
        label: "+62 8953 7152 9602",
      },
      {
        type: "link" as const,
        link: "https://instagram.com/sssssatria",
        icon: <FaInstagram />,
        label: "@sssssatria",
      },
    ];

    // Person with ContactPoint structured data
    const personStructuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Satria Aprilian",
      jobTitle: "Full Stack Developer",
      url: baseUrl,
      email: "satriaaprilian18@gmail.com",
      telephone: "+62-895-371-529-602",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
      sameAs: [
        "https://github.com/rpnjul",
        "https://www.linkedin.com/in/satriaaprilian18/",
        "https://instagram.com/sssssatria",
        "https://discord.com/users/471581847227203594",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-895-371-529-602",
        contactType: "Customer Service",
        availableLanguage: ["English", "Indonesian"],
      },
    };

    // ContactPage structured data
    const contactPageStructuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Satria Aprilian",
      description: "Get in touch with Satria Aprilian for web and mobile development projects",
      url: `${baseUrl}/contact`,
      mainEntity: {
        "@type": "Person",
        name: "Satria Aprilian",
        jobTitle: "Full Stack Developer",
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
          name: "Contact",
          item: `${baseUrl}/contact`,
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
            __html: JSON.stringify(contactPageStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
        <main>
          <div className="card">
            <header className="flex flex-col gap-1">
              <div className="flex flex-row w-full justify-between gap-2">
                <h1 className="unset text-4xl" style={{ margin: 0 }}>
                  Satria Aprilian
                </h1>
                <ul
                  aria-label="Social media links"
                  className="flex gap-2 justify-end"
                  style={{ margin: 0, padding: 0, listStyle: "none" }}
                >
                  {contact.map((v, i) => (
                    <li key={i}>
                      <Link
                        href={v.link}
                        target="_blank"
                        aria-label={v.label}
                        rel="noopener noreferrer"
                        title={v.label}
                      >
                        <div
                          className="card"
                          style={{ padding: 10, lineHeight: 0, margin: 0 }}
                        >
                          <div className="w-[20px] h-[20px]">{v.icon}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </header>
            <address className="mb-0 mt-4" style={{ fontStyle: "normal" }}>
              {contactLink.map((v, i) => {
                if (v.type === "address") {
                  return (
                    <div
                      className="flex justify-start items-center mt-4"
                      key={i}
                    >
                      <div className="h-[20px] w-[20px] custom mr-2">
                        {v.icon}
                      </div>
                      <span className="w-fit" style={{ margin: 0 }}>
                        {v.label}
                      </span>
                    </div>
                  );
                }
                return (
                  <Link
                    className="flex justify-start items-center mt-4"
                    key={i}
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#fff" }}
                  >
                    <div className="h-[20px] w-[20px] custom mr-2">
                      {v.icon}
                    </div>
                    <span className="w-fit" style={{ margin: 0 }}>
                      {v.label}
                    </span>
                  </Link>
                );
              })}
            </address>
          </div>
          <div className="mt-8">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/cv.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover-gray-500 hover:border-transparent rounded-lg w-full text-center"
            >
              Hire Me
            </Link>
          </div>
        </main>
      </>
    );
}

export default Contact;