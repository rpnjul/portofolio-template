"use client";

import ProjectDetailSkeleton from "@/components/skeleton/ProjectDetailSkeleton";
import { iconMap, labelMap } from "@/constants/skills";
import { Projects } from "@/types/Projects";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";

const getProjects = async (slug?: string): Promise<Projects> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${slug}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
};

const ProjectDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params);
    
    const [data, setData] = useState<Projects | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProjects(slug);
                setData(data);
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, [slug])
    if (isLoading) return <ProjectDetailSkeleton />;
    if (!data) return notFound();
    return (
      <>
        <figure className="full-width">
          <picture>
            <Image
              src={data.cover}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[10px]"
              loading="lazy"
            />
          </picture>
        </figure>
        <div className="card">
          <div className="flex gap-4 items-center">
            <Image
              alt="Project icon"
              width={50}
              height={50}
              src={data!.icon}
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-row w-full justify-between gap-2">
              <h1 className="my-0" style={{ marginLeft: 0 }}>
                {data.title}
              </h1>
              <a target="_blank" aria-label="Email" href={data.link} className="flex items-center" style={{margin: 0}}>
                <div
                  className="card"
                  style={{ padding: 10, lineHeight: 0, margin: 0 }}
                >
                  <div className="w-[20px] h-[20px]">
                    <MdOpenInNew />
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="flex gap-2 mt-4 custom flex-wrap">
            {data.tech_map.map((v: string, i: number) => {
              const lower = v.toLowerCase();
              const icon = iconMap[lower];
              const label = labelMap[lower] || lower;
              return (
                <div
                  className="mb-0 card p-2 flex items-center custom"
                  style={{ padding: "0.5rem" }}
                  key={i}
                >
                  <div className="h-6 mr-2 custom icn">{icon}</div>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
          <p className="mb-0 text-gray-400">{data.description}</p>
        </div>
        <div className="mt-8">
          {data.content ? (
            <div
              className="my-8"
              id="content"
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            ></div>
          ) : (
            <p className="my-8">No Content</p>
          )}
        </div>
      </>
    );
};

export default ProjectDetail;