"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TiptapEditor from "@/components/common/TiptapEditor";

const CreatePost = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    cover: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/masuk");
        return;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status) {
        alert("Post created successfully!");
        router.push("/dashboard/posts");
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
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

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center" style={{ margin: 0 }}>
          <h1 className="unset text-3xl" style={{ margin: 0 }}>
            Create New Post
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
              <TiptapEditor
                content={formData.content}
                onChange={(content) => {
                  setFormData({
                    ...formData,
                    content: content,
                  });
                }}
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
            disabled={loading}
            className="card text-sm hover:bg-opacity-80 transition disabled:opacity-50"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
