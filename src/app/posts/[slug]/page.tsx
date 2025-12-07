import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

// Calculate reading time based on word count
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Count words in HTML content
const countWords = (content: string): number => {
  const text = content.replace(/<[^>]*>/g, "");
  return text.trim().split(/\s+/).length;
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
      type: "article",
      locale: "id_ID",
      url: `${baseUrl}/posts/${slug}`,
      title: post.title,
      description: post.description,
      siteName: "Satria Aprilian",
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://satria.me";
  const wordCount = data.content ? countWords(data.content) : 0;
  const readingTime = data.content ? calculateReadingTime(data.content) : 0;

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
      "@type": "Organization",
      name: "Satria Aprilian",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/posts/${slug}`,
    },
    wordCount,
    articleSection: "Blog",
    inLanguage: "id-ID",
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
        name: "Posts",
        item: `${baseUrl}/posts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `${baseUrl}/posts/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/posts" className="hover:text-white transition-colors">
              Posts
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-white">
            {data.title}
          </li>
        </ol>
      </nav>

      <article lang="id">
        {data.cover && (
          <figure className="full-width">
            <Image
              src={data.cover}
              alt={data.title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[10px]"
              priority
            />
          </figure>
        )}

        <header className="card">
          <h1 className="m-0" style={{ margin: 0 }}>
            {data.title}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
            <time
              className="block"
              dateTime={new Date(data.created_at).toISOString()}
            >
              {new Date(data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">•</span>
            <span>{readingTime} min read</span>
            <span aria-hidden="true">•</span>
            <span>{wordCount} words</span>
          </div>
          <Link
            href="/"
            rel="author"
            className="text-sm text-gray-400 hover:text-white transition-colors mt-2 inline-block"
          >
            By Satria Aprilian
          </Link>
        </header>

        <section className="mt-8">
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
        </section>
      </article>
    </>
  );
};

export default PostsDetail;
