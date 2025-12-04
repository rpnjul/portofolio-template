"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PostsData } from "@/types/Posts";

const PostsManagement = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/masuk");
      return;
    }
    setToken(storedToken);
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      if (data.status !== false) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts?_id=${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status) {
        alert("Post deleted successfully");
        fetchPosts();
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center" style={{ margin: 0 }}>
          <h1 className="unset text-3xl" style={{ margin: 0 }}>
            Manage Posts
          </h1>
          <Link
            href="/dashboard/posts/create"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            + Create New
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id?.toString()} className="card">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold" style={{ margin: 0, marginBottom: 8 }}>
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400" style={{ margin: 0 }}>
                      {post.description}
                    </p>
                    <div className="flex gap-4 mt-3 text-xs text-gray-500">
                      <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                      <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/posts/edit/${post._id?.toString()}`}
                      className="card text-sm hover:bg-opacity-80 transition"
                      style={{ margin: 0, padding: "6px 12px" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id?.toString() || "")}
                      className="card text-sm hover:bg-opacity-60 transition text-gray-400"
                      style={{ margin: 0, padding: "6px 12px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <p className="text-gray-400 text-center" style={{ margin: 0 }}>
              No posts found. Create your first post!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostsManagement;
