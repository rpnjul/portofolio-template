"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Projects } from "@/types/Projects";

const ProjectsManagement = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/masuk");
      return;
    }
    setToken(storedToken);
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (data.status !== false) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects?_id=${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status) {
        alert("Project deleted successfully");
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="flex justify-between items-center" style={{ margin: 0 }}>
          <h1 className="unset text-3xl" style={{ margin: 0 }}>
            Manage Projects
          </h1>
          <Link
            href="/dashboard/projects/create"
            className="card text-sm hover:bg-opacity-80 transition"
            style={{ margin: 0, padding: "8px 16px" }}
          >
            + Create New
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project._id?.toString()} className="card">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold" style={{ margin: 0, marginBottom: 8 }}>
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-400" style={{ margin: 0 }}>
                      {project.description}
                    </p>
                    {project.tech && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {project.tech.split(',').map((tech, i) => (
                          <span key={i} className="text-xs text-gray-500 card" style={{ margin: 0, padding: "2px 8px" }}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 mt-3 text-xs text-gray-500">
                      <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                      <span>Updated: {new Date(project.updated_at).toLocaleDateString()}</span>
                      {project.link && <span>Link: {project.link}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/projects/edit/${project._id?.toString()}`}
                      className="card text-sm hover:bg-opacity-80 transition"
                      style={{ margin: 0, padding: "6px 12px" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id?.toString() || "")}
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
              No projects found. Create your first project!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsManagement;
