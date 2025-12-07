import { PostsData } from "@/types/Posts";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog - Satria Aprilian | Satria Aprilian Writing & Content",
  description: "Read articles and tutorials about web development, React, Next.js, Laravel, Node.js, and modern programming practices by Satria Aprilian.",
  keywords: [
    "Satria Aprilian Blog",
    "Web Development Blog",
    "React Tutorial",
    "Next.js Tutorial",
    "Laravel Tutorial",
    "Node.js Tutorial",
    "Programming Blog",
    "JavaScript Tutorial",
    "TypeScript Tutorial",
    "Full Stack Development",
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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
    title: "Blog - Satria Aprilian | Web Development & Programming Tutorials",
    description: "Read articles and tutorials about web development, React, Next.js, Laravel, Node.js, and modern programming practices by Satria Aprilian.",
    siteName: "Satria Aprilian",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`,
        width: 1200,
        height: 630,
        alt: "Satria Aprilian Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sssssatria",
    creator: "@sssssatria",
    title: "Blog - Satria Aprilian | Web Development & Programming Tutorials",
    description: "Read articles and tutorials about web development, React, Next.js, Laravel, Node.js, and modern programming practices by Satria Aprilian.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/satria.png`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
  },
};

const getPosts = async (): Promise<PostsData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts data");
  }
  const data = await res.json();
  return data.data;
};

const LoadingSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col gap-2">
      {[...Array(4)].map((_, i) => (
        <article
          key={i}
          className="flex w-full flex-col items-start justify-between"
        >
          <div className="flex items-center gap-x-4 text-sm custom mb-0">
            <time style={{ color: "var(--color-subtext)" }}>Loading...</time>
          </div>
          <div className="group relative custom">
            <h2 className="mt-1 mb-0 text-xl font-semibold leading-6 text-gray-900 custom">
              Loading article...
            </h2>
            <p
              className="line-clamp-3 text-sm leading-6 custom mt-1"
              style={{ color: "var(--color-subtext)" }}
            >
              Please wait...
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

async function PostsList() {
  const postData = await getPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://satria.me";

  // Blog/CollectionPage structured data
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Satria Aprilian Blog",
    description: "Web development and programming tutorials",
    url: `${baseUrl}/posts`,
    author: {
      "@type": "Person",
      name: "Satria Aprilian",
      url: baseUrl,
    },
  };

  // ItemList structured data for articles
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: postData.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        "@id": `${baseUrl}/posts/${post.slug}`,
        url: `${baseUrl}/posts/${post.slug}`,
        headline: post.title,
        description: post.description,
        datePublished: new Date(post.created_at).toISOString(),
        dateModified: new Date(post.updated_at).toISOString(),
        author: {
          "@type": "Person",
          name: "Satria Aprilian",
        },
        ...(post.cover && { image: post.cover }),
      },
    })),
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <main>
        <header>
          <h1 className="mb-0">My writing</h1>
        </header>

        <section className="mx-auto flex flex-col gap-2" aria-label="Blog posts">
          {postData.length === 0 ? (
            <p style={{ color: "var(--color-subtext)" }}>No posts yet.</p>
          ) : (
            postData.map((v) => (
              <article
                key={v.slug}
                className="flex w-full flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-sm custom mb-0">
                  <time
                    dateTime={new Date(v.created_at).toISOString()}
                    style={{ color: "var(--color-subtext)" }}
                  >
                    {new Date(v.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="group relative custom">
                  <h2 className="mt-1 mb-0 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 custom">
                    <Link href={`/posts/${v.slug}`}>
                      <span className="absolute inset-0"></span>
                      {v.title}
                    </Link>
                  </h2>
                  <p
                    className="line-clamp-3 text-sm leading-6 custom mt-1"
                    style={{ color: "var(--color-subtext)" }}
                  >
                    {v.description}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
}

const Post = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PostsList />
    </Suspense>
  );
};

export default Post;
