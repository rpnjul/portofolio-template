"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const EditProject = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    cover: "",
    icon: "",
    link: "",
    tech: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/masuk");
      return;
    }
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (data.status !== false) {
        const project = data.data.find((p: any) => p.project_id === Number(projectId));
        if (project) {
          setFormData({
            title: project.title || "",
            description: project.description || "",
            content: project.content || "",
            cover: project.cover?.replace(process.env.NEXT_PUBLIC_BASE_URL || "", "") || "",
            icon: project.icon?.replace(process.env.NEXT_PUBLIC_BASE_URL || "", "") || "",
            link: project.link || "",
            tech: project.tech || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error);
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

      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_id: Number(projectId),
          ...formData,
        }),
      });

      const data = await response.json();
      if (data.status) {
        alert("Project updated successfully!");
        router.push("/dashboard/projects");
      } else {
        alert(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-gray-300">
                Admin Dashboard
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/dashboard/projects" className="hover:text-gray-300">
                Projects
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">Edit #{projectId}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cover" className="block text-sm font-medium mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    id="cover"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/assets/img/project-cover.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="icon" className="block text-sm font-medium mb-2">
                    Icon URL
                  </label>
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/assets/img/icon.png"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="link" className="block text-sm font-medium mb-2">
                  Project Link
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div>
                <label htmlFor="tech" className="block text-sm font-medium mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  id="tech"
                  name="tech"
                  value={formData.tech}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React,TypeScript,Node.js,MongoDB"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Separate technologies with commas (e.g., React,TypeScript,Node.js)
                </p>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Enter project content (supports HTML)"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard/projects"
              className="px-6 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProject;
