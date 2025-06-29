"use client";

import { PostsData } from "@/types/Posts";
import Link from "next/link";
import PostCard from "../widgets/PostCard";
import { useEffect, useState } from "react";
import PostSkeleton from "../skeleton/PostSkeleton";

const getPosts = async (limit?: number): Promise<PostsData[]> => {
  const url = limit
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?limit=${limit}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
      throw new Error("Failed to fetch posts data");
  }
  const data = await res.json();
  return data.data;
}
interface PropPostInt {
  limit?: number;
  customTitle?: string;
}

const PostComponent = ({ limit, customTitle }: PropPostInt) => {
  const [postData, setPostData] = useState<PostsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(limit);
        setPostData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  return (
    <>
      <h1>{customTitle ? customTitle : "Latest blog posts"}</h1>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {postData.map((v, i) => (
            <Link href={"/posts/" + v.slug} style={{ margin: "unset" }} key={i}>
              <PostCard
                title={v.title}
                description={v.description}
                img={v.cover}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default PostComponent;