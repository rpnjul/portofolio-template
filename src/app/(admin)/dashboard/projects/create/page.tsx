"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TiptapEditor from "@/components/common/TiptapEditor";

const CreateProject = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    cover: "",
    icon: "",
    link: "",
    tech: "",
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

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status) {
        alert("Project created successfully!");
        router.push("/dashboard/projects");
      } else {
        alert(data.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
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
        <div
          className="flex justify-between items-center"
          style={{ margin: 0 }}
        >
          <h1 className="unset text-3xl" style={{ margin: 0 }}>
            Create New Project
          </h1>
          <Link
            href="/dashboard/projects"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            ← Back to Projects
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="card">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-2 text-gray-400"
              >
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
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2 text-gray-400"
              >
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
                placeholder="Enter project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label
                  htmlFor="cover"
                  className="block text-sm font-medium mb-2 text-gray-400"
                >
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
                  placeholder="/assets/img/project-cover.jpg"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="icon"
                  className="block text-sm font-medium mb-2 text-gray-400"
                >
                  Icon URL
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                  style={{ margin: 0 }}
                  placeholder="/assets/img/icon.png"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium mb-2 text-gray-400"
              >
                Project Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div>
              <label
                htmlFor="tech"
                className="block text-sm font-medium mb-2 text-gray-400"
              >
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                id="tech"
                name="tech"
                value={formData.tech}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="React,TypeScript,Node.js,MongoDB"
              />
              <p
                className="text-xs text-gray-500 mt-1"
                style={{ margin: "4px 0 0 0" }}
              >
                Separate technologies with commas (e.g.,
                React,TypeScript,Node.js)
              </p>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-2 text-gray-400"
              >
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
            href="/dashboard/projects"
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
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProject;
