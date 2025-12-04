import { Metadata } from "next";
import ProjectDetailSkeleton from "@/components/skeleton/ProjectDetailSkeleton";
import { iconMap, labelMap } from "@/constants/skills";
import { Projects } from "@/types/Projects";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MdOpenInNew } from "react-icons/md";

const getProjects = async (slug: string): Promise<Projects | null> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${slug}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjects(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const techKeywords = project.tech_map || [];

  return {
    title: project.title,
    description: project.description,
    keywords: [
      project.title,
      "Satria Aprilian",
      "Portfolio",
      "Project",
      "Web Development",
      ...techKeywords,
    ],
    authors: [{ name: "Satria Aprilian" }],
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: `${baseUrl}/projects/${slug}`,
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      publishedTime: new Date(project.created_at).toISOString(),
      modifiedTime: new Date(project.updated_at).toISOString(),
      authors: ["Satria Aprilian"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@sssssatria",
      creator: "@sssssatria",
      title: project.title,
      description: project.description,
      images: [project.cover],
    },
    alternates: {
      canonical: `${baseUrl}/projects/${slug}`,
    },
  };
}

const ProjectDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await getProjects(slug);

  if (!data) return notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Structured data for project SEO
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.title,
    description: data.description,
    image: data.cover,
    url: data.link,
    datePublished: new Date(data.created_at).toISOString(),
    dateModified: new Date(data.updated_at).toISOString(),
    author: {
      "@type": "Person",
      name: "Satria Aprilian",
      url: baseUrl,
    },
    creator: {
      "@type": "Person",
      name: "Satria Aprilian",
      url: baseUrl,
    },
    keywords: data.tech_map?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
      />
      <figure className="full-width">
        <picture>
          <Image
            src={data.cover}
            alt={data.title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[10px]"
            priority
          />
        </picture>
      </figure>
      <div className="card">
        <div className="flex gap-4 items-center">
          <Image
            alt={`${data.title} icon`}
            width={50}
            height={50}
            src={data!.icon}
            className="h-12 w-12 object-contain"
          />
          <div className="flex flex-row w-full justify-between gap-2">
            <h1 className="my-0" style={{ marginLeft: 0 }}>
              {data.title}
            </h1>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${data.title} project`}
              href={data.link}
              className="flex items-center"
              style={{ margin: 0 }}
            >
              <div
                className="card"
                style={{ padding: 10, lineHeight: 0, margin: 0 }}
              >
                <div className="w-[20px] h-[20px]">
                  <MdOpenInNew />
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="flex gap-2 mt-4 custom flex-wrap">
          {data.tech_map.map((v: string, i: number) => {
            const lower = v.toLowerCase();
            const icon = iconMap[lower];
            const label = labelMap[lower] || lower;
            return (
              <div
                className="mb-0 card p-2 flex items-center custom"
                style={{ padding: "0.5rem" }}
                key={i}
              >
                <div className="h-6 mr-2 custom icn">{icon}</div>
                <span>{label}</span>
              </div>
            );
          })}
        </div>
        <p className="mb-0 text-gray-400">{data.description}</p>
      </div>
      <div className="mt-8">
        {data.content ? (
          <div
            className="my-8"
            id="content"
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></div>
        ) : (
          <p className="my-8">No Content</p>
        )}
      </div>
    </>
  );
};

export default ProjectDetail;
