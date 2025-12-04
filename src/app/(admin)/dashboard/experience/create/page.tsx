"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateExperience = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: "",
    job: "",
    link: "",
    description: "",
    date: "",
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

      const response = await fetch("/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status) {
        alert("Experience created successfully!");
        router.push("/dashboard/experience");
      } else {
        alert(data.message || "Failed to create experience");
      }
    } catch (error) {
      console.error("Error creating experience:", error);
      alert("Failed to create experience");
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
            Create New Experience
          </h1>
          <Link
            href="/dashboard/experience"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            ← Back to Experience
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="card">
          <div className="space-y-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-400">
                Company <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label htmlFor="job" className="block text-sm font-medium mb-2 text-gray-400">
                Job Title <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                id="job"
                name="job"
                required
                value={formData.job}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2 text-gray-400">
                Date <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="e.g., 2023 - Present or Jan 2023 - Dec 2024"
              />
            </div>

            <div>
              <label htmlFor="link" className="block text-sm font-medium mb-2 text-gray-400">
                Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-400">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 card border-0 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{ margin: 0 }}
                placeholder="Enter job description or responsibilities"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/experience"
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
            {loading ? "Creating..." : "Create Experience"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateExperience;
