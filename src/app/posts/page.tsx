"use client";
import { PostsData } from "@/types/Posts";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const getPosts = async (): Promise<PostsData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
      throw new Error("Failed to fetch posts data");
  }
  const data = await res.json();
  return data.data;
}

const Post = () => {
  const [postData, setPostData] = useState<PostsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getPosts();
          setPostData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
  }, []);

  const LoadingSkeleton = () => {
    return (
      <div className="mx-auto flex flex-col gap-2">
        {[...Array(4)].map((_, i) => (
          <article
            key={i}
            className="flex w-full flex-col items-start justify-between"
          >
            <div className="flex items-center gap-x-4 text-sm custom mb-0">
              <time dateTime="" style={{ color: "var(--color-subtext)" }}>
                <Skeleton width={100} />
              </time>
            </div>
            <div className="group relative custom">
              <h3 className="mt-1 mb-0 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 custom">
                <div>
                  <span className="absolute inset-0"></span>
                  <Skeleton width={350} />
                </div>
              </h3>
              <p
                className="line-clamp-3 text-sm leading-6 custom mt-1"
                style={{ color: "var(--color-subtext)" }}
              >
                <Skeleton width={200} />
              </p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-0">My writing</h1>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="mx-auto flex flex-col gap-2">
          {postData.map((v, i) => (
            <article key={i} className="flex w-full flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-sm custom mb-0">
                <time style={{ color: "var(--color-subtext)" }}>
                  {new Date(v.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="group relative custom">
                <h3 className="mt-1 mb-0 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 custom">
                  <a href={`/posts/` + v.slug + "/"}>
                    <span className="absolute inset-0"></span>
                    {v.title}
                  </a>
                </h3>
                <p
                  className="line-clamp-3 text-sm leading-6 custom mt-1"
                  style={{ color: "var(--color-subtext)" }}
                >
                  {v.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default Post;
