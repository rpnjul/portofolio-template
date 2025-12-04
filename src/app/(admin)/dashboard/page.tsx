"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  total_posts: number;
  total_projects: number;
  total_users: number;
  recent_posts: Array<{ post_id: number; title: string; created_at: string }>;
  recent_projects: Array<{ project_id: number; title: string; created_at: string }>;
}

const DashboardHome = () => {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/masuk");
      return;
    }

    fetchStats(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async (token: string) => {
    try {
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/masuk");
        return;
      }

      const data = await response.json();
      if (data.status) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <h1 className="unset text-3xl" style={{ margin: 0, marginBottom: 16 }}>
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card" style={{ margin: 0 }}>
            <h3 className="text-gray-400 text-sm font-medium" style={{ margin: 0 }}>Total Posts</h3>
            <p className="text-3xl font-bold mt-2" style={{ margin: 0, marginTop: 8 }}>{stats?.total_posts || 0}</p>
          </div>
          <div className="card" style={{ margin: 0 }}>
            <h3 className="text-gray-400 text-sm font-medium" style={{ margin: 0 }}>Total Projects</h3>
            <p className="text-3xl font-bold mt-2" style={{ margin: 0, marginTop: 8 }}>{stats?.total_projects || 0}</p>
          </div>
          <div className="card" style={{ margin: 0 }}>
            <h3 className="text-gray-400 text-sm font-medium" style={{ margin: 0 }}>Total Users</h3>
            <p className="text-3xl font-bold mt-2" style={{ margin: 0, marginTop: 8 }}>{stats?.total_users || 0}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="home-title">Recent Posts</h1>
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold" style={{ margin: 0 }}>Latest Posts</h2>
            <Link
              href="/dashboard/posts"
              className="text-gray-400 hover:text-white text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recent_posts && stats.recent_posts.length > 0 ? (
              stats.recent_posts.map((post) => (
                <div
                  key={post.post_id}
                  className="card hover:bg-opacity-80 transition"
                  style={{ margin: 0, marginBottom: 12, cursor: "pointer" }}
                  onClick={() => router.push(`/dashboard/posts/edit/${post.post_id}`)}
                >
                  <h3 className="font-medium" style={{ margin: 0 }}>{post.title}</h3>
                  <p className="text-sm text-gray-400 mt-1" style={{ margin: 0, marginTop: 4 }}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400" style={{ margin: 0 }}>No posts yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="home-title">Recent Projects</h1>
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold" style={{ margin: 0 }}>Latest Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-gray-400 hover:text-white text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recent_projects && stats.recent_projects.length > 0 ? (
              stats.recent_projects.map((project) => (
                <div
                  key={project.project_id}
                  className="card hover:bg-opacity-80 transition"
                  style={{ margin: 0, marginBottom: 12, cursor: "pointer" }}
                  onClick={() => router.push(`/dashboard/projects/edit/${project.project_id}`)}
                >
                  <h3 className="font-medium" style={{ margin: 0 }}>{project.title}</h3>
                  <p className="text-sm text-gray-400 mt-1" style={{ margin: 0, marginTop: 4 }}>
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400" style={{ margin: 0 }}>No projects yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
