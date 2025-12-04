"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const EditPost = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    cover: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/masuk");
      return;
    }
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      if (data.status !== false) {
        const post = data.data.find((p: { _id: string | string[] | undefined }) => p._id === postId);
        if (post) {
          setFormData({
            title: post.title || "",
            description: post.description || "",
            content: post.content || "",
            cover: post.cover?.replace(process.env.NEXT_PUBLIC_BASE_URL || "", "") || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/masuk");
        return;
      }

      const response = await fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: postId,
          ...formData,
        }),
      });

      const data = await response.json();
      if (data.status) {
        alert("Post updated successfully!");
        router.push("/dashboard/posts");
      } else {
        alert(data.message || "Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="card">
        <p style={{ margin: 0 }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center" style={{ margin: 0 }}>
          <h1 className="unset text-3xl" style={{ margin: 0 }}>
            Edit Post
          </h1>
          <Link
            href="/dashboard/posts"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            ← Back to Posts
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="card">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-400">
                Title <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-400">
                Description <span className="text-gray-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="Enter post description"
              />
            </div>

            <div>
              <label htmlFor="cover" className="block text-sm font-medium mb-2 text-gray-400">
                Cover Image URL
              </label>
              <input
                type="text"
                id="cover"
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="/assets/img/cover.jpg"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-400">
                Content <span className="text-gray-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows={15}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600 font-mono text-sm"
                style={{ margin: 0 }}
                placeholder="Enter post content (supports HTML)"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/posts"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="card text-sm hover:bg-opacity-80 transition disabled:opacity-50"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPost;
