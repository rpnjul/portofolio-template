import Link from "next/link";
import ProjectCard from "../widgets/ProjectCard";
import { Projects } from "@/types/Projects";

const getProjects = async (): Promise<Projects[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
}

const ProjectComponent = async () => {

  const projectData = await getProjects();
  return (
    <>
      <h1>Projects</h1>
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
                cover={v.cover}
                icon={v.icon}
                stack={v.tech_map}
              />
            </Link>
          ))}
        </div>
      ) : (
        <h1>NO DATA FOUND</h1>
      )}
    </>
  );
}

export default ProjectComponent;