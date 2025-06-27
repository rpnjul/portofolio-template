import { PostsData } from "@/types/Posts";
import Link from "next/link";
import PostCard from "../widgets/PostCard";

const getPosts = async(): Promise<PostsData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, { cache: "no-store" });
  if (!res.ok) {
      throw new Error("Failed to fetch posts data");
  }
  const data = await res.json();
  return data.data;
}

const PostComponent = async () => {
  const postData = await getPosts();

  return (
    <>
      <h1>Latest blog posts</h1>
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
    </>
  );
}

export default PostComponent;