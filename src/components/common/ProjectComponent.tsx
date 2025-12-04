"use client";

import Link from "next/link";
import ProjectCard from "../widgets/ProjectCard";
import { Projects } from "@/types/Projects";
import { useEffect, useState } from "react";
import ProjectSkeleton from "../skeleton/ProjectSkeleton";

const getProjects = async (limit?: number): Promise<Projects[]> => {
    const url = limit
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?limit=${limit}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
}

interface ProjPropsInt {
  limit?: number;
  customTitle ?: string;
}

const ProjectComponent = ({ limit, customTitle }: ProjPropsInt) => {
  const [projectData, setProjectData] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects(limit);
        setProjectData(data);
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [limit]);
  return (
    <>
      <h1>{customTitle ? customTitle : "Projects"}</h1>
      {isLoading ? (
        <ProjectSkeleton />
      ) : (
          <>
            {projectData.length > 0 ? (
              <div className="flex flex-col gap-4">
                {projectData.map((v, i) => (
                  <Link
                    href={"/projects/" + v.slug}
                    style={{ margin: "unset" }}
                    key={i}
                  >
                    <ProjectCard
                      title={v.title}
                      description={v.description}
                      cover={v.cover || ""}
                      icon={v.icon || ""}
                      stack={v.tech_map || []}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <h1>NO DATA FOUND</h1>
            )}
          </>
      )}
    </>
  );
};

export default ProjectComponent;