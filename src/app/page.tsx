import PostCard from "@/components/common/PostCard";
import ProjectCard from "@/components/common/ProjectCard";
import SkillsCard from "@/components/common/SkillsCard";
import { Experience } from "@/types/Experience";
import { PostsData } from "@/types/Posts";
import { Projects } from "@/types/Projects";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";


const getExperience = async (): Promise<Experience[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/experience`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
};

const getProjects = async (): Promise<Projects[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
}

const getPosts = async(): Promise<PostsData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, { cache: "no-store" });
  if (!res.ok) {
      throw new Error("Failed to fetch posts data");
  }
  const data = await res.json();
  return data.data;
}

const Home = async () => {
    const expData = await getExperience();
    const projectData = await getProjects();
    const postData = await getPosts();
    return (
      <>
        <div className="card">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row w-full justify-between gap-2">
              <h1 className="unset text-4xl" style={{ margin: 0 }}>
                Satria Aprilian
              </h1>
              <div className="flex gap-2 justify-end" style={{ margin: 0 }}>
                <Link
                  href="mailto:satriaaprilian18@gmail.com"
                  target="_blank"
                  aria-label="Email"
                >
                  <div
                    className="card"
                    style={{ padding: 10, lineHeight: 0, margin: 0 }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <AiOutlineMail />
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://github.com/rpnjul"
                  target="_blank"
                  aria-label="Github"
                >
                  <div
                    className="card"
                    style={{ padding: 10, lineHeight: 0, margin: 0 }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <FaGithub />
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://instagram.com/sssssatria"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <div
                    className="card"
                    style={{ padding: 10, lineHeight: 0, margin: 0 }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <FaInstagram />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="flex justify-start items-center text-gray-400"
              style={{ margin: 0 }}
            >
              <div className="h-[20px] w-[20px] custom">
                <GrLocationPin />
              </div>
              <span className="w-fit" style={{ margin: 0 }}>
                Jakarta, Indonesia
              </span>
            </div>
          </div>
          <div className="mb-0 mt-4">
            Full-Stack Developer with 5+ years of experience in building fast,
            responsive, and impactful web applications. I turn ideas into real,
            scalable products.
          </div>
        </div>
        <div className="mt-16">
          <h1 className="home-title">What i work with</h1>
          <SkillsCard
            data={[
              "bootstrap",
              "tailwind",
              "javascript",
              "typescript",
              "react",
              "rn",
              "nextjs",
            ]}
          />
          <SkillsCard
            data={[
              "laravel",
              "php",
              "express",
              "nodejs",
              "mysql",
              "postgre",
              "github",
            ]}
          />
          <h1 className="home-title">Experience</h1>
          {expData.length > 0 ? (
          <section className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:pb-4">
                <div className="w-full max-w-3xl mx-auto">
                  <div className="-my-6 flex flex-col items-center">
                    {expData.map((v, _) => (
                      <div
                        className="relative pl-8 py-6 group"
                        style={{ marginLeft: 0 }}
                        key={_}
                      >
                        <div className="font-medium text-indigo-500 mb-1 sm:mb-0">
                          <a
                            href={`${v.link}`}
                            target="_blank"
                            rel="noopener"
                            className="relative inline-block group/linkihate"
                          >
                            <span className="relative z-10">
                              {v.company}
                              <span className="absolute bottom-[0px] left-0 w-full h-0.5 bg-accent origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover/linkihate:scale-x-100" />
                            </span>
                          </a>
                        </div>
                        <div className="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[0.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-accent after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[0.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                          <div
                            className="text-xl font-bold text-slate-100"
                            style={{ margin: 0 }}
                          >
                            {v.job}
                          </div>
                          <div
                            className="text-sm text-slate-400"
                            style={{ margin: 0 }}
                          >
                            {v.date}
                          </div>
                        </div>
                        <div className="text-slate-300 timeline-content">
                          {v.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          ) : (
            <h1>NO DATA FOUND</h1>
          )}
        </div>
        <div className="mt-8">
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
                      img={v.img}
                      stack={v.tech_map}
                    />
                  </Link>
                ))}
              </div>

          ) : (
            <h1>NO DATA FOUND</h1>
          )}
        </div>
        <div className="mt-8">
          <h1>Latest blog posts</h1>
          {postData.length > 0 ? (
              <div className="flex flex-col gap-4">
                {postData.map((v, i) => (
                  <Link
                    href={"/posts/"+v.slug}
                    style={{margin: "unset"}}
                    key={i}
                  >
                    <PostCard
                        title={v.title}
                        description={v.description}
                        img={v.cover}
                    />
                  </Link>
                ))}
              </div>
          ) : (
            <h1>No posts available</h1>
          )}
        </div>
      </>
    );
}

export default Home;