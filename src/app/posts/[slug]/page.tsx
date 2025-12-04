import { Metadata } from "next";
import Image from "next/image";
import { PostsData } from "@/types/Posts";
import { notFound } from "next/navigation";

const getPosts = async (slug: string): Promise<PostsData | null> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`;
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
  const post = await getPosts(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: post.title,
    description: post.description,
    keywords: [
      post.title,
      "Satria Aprilian",
      "Blog",
      "Web Development",
      "Programming",
      "Tutorial",
    ],
    authors: [{ name: "Satria Aprilian" }],
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: `${baseUrl}/posts/${slug}`,
      title: post.title,
      description: post.description,
      images: post.cover ? [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
      publishedTime: new Date(post.created_at).toISOString(),
      modifiedTime: new Date(post.updated_at).toISOString(),
      authors: ["Satria Aprilian"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@sssssatria",
      creator: "@sssssatria",
      title: post.title,
      description: post.description,
      images: post.cover ? [post.cover] : [],
    },
    alternates: {
      canonical: `${baseUrl}/posts/${slug}`,
    },
  };
}

const PostsDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await getPosts(slug);

  if (!data) return notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Structured data for article SEO
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    ...(data.cover && { image: data.cover }),
    datePublished: new Date(data.created_at).toISOString(),
    dateModified: new Date(data.updated_at).toISOString(),
    author: {
      "@type": "Person",
      name: "Satria Aprilian",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Satria Aprilian",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      {data.cover && (
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
      )}
      <div className="card">
        <h1 className="m-0" style={{ margin: 0 }}>
          {data.title}
        </h1>
        <time
          className="block mt-0 text-gray-400"
          dateTime={new Date(data.created_at).toISOString()}
        >
          {new Date(data.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
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

export default PostsDetail;
