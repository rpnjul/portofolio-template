"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Experience } from "@/types/Experience";

const ExperienceManagement = () => {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/masuk");
      return;
    }
    setToken(storedToken);
    fetchExperiences();
  }, [router]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experience");
      const data = await response.json();
      if (data.status !== false) {
        setExperiences(data.data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (experienceId: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const response = await fetch(`/api/experience?_id=${experienceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status) {
        alert("Experience deleted successfully");
        fetchExperiences();
      } else {
        alert("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Failed to delete experience");
    }
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading experiences...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center" style={{ margin: 0 }}>
          <h1 className="unset text-3xl" style={{ margin: 0 }}>
            Manage Experience
          </h1>
          <Link
            href="/dashboard/experience/create"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            + Create New
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp._id?.toString()} className="card">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold" style={{ margin: 0, marginBottom: 8 }}>
                      {exp.job} at {exp.company}
                    </h2>
                    <p className="text-sm text-gray-400" style={{ margin: 0, marginBottom: 8 }}>
                      {exp.description}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Date: {exp.date}</span>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-300"
                        >
                          View Link
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/experience/edit/${exp._id?.toString()}`}
                      className="card text-sm hover:bg-opacity-80 transition"
                      style={{ margin: 0, padding: "6px 12px" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(exp._id?.toString() || "")}
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
              No experiences found. Create your first experience!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ExperienceManagement;
