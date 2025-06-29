"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import ProjectDetailSkeleton from "@/components/skeleton/ProjectDetailSkeleton";
import { PostsData } from "@/types/Posts";
import { notFound } from "next/navigation";

const getPosts = async (slug?: string): Promise<PostsData> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
};

const PostsDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const [data, setData] = useState<PostsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(slug);
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);
  if (isLoading) return <ProjectDetailSkeleton />;
  if (!data) return notFound();
  return (
    <>
      <figure className="full-width">
        <picture>
          <Image
            src={data.cover}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[10px]"
            loading="lazy"
          />
        </picture>
      </figure>
      <div className="card">
        <h1 className="m-0" style={{margin: 0}}>{data.title}</h1>
        <time className="block mt-0 text-gray-400">
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
