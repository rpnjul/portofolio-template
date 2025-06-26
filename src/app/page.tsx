import ProjectCard from "@/components/ProjectCard";
import { experienceData, projectData } from "@/Data/HomeData";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaBootstrap, FaGithub, FaInstagram, FaLaravel, FaNodeJs, FaReact } from "react-icons/fa";
import { GrLocationPin, GrMysql } from "react-icons/gr";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiJavascript, SiPostgresql, SiTypescript } from "react-icons/si";

const Home = () => {
    return (
        <>
            <div className="card">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row w-full justify-between gap-2">
                        <h1 className="unset text-4xl" style={{margin: 0}}>Satria Aprilian</h1>
                        <div className="flex gap-2 justify-end" style={{margin: 0}}>
                            <Link href="mailto:satriaaprilian18@gmail.com" target="_blank" aria-label="Email">
                                <div className="card" style={{ padding: 10, lineHeight: 0, margin: 0 }}>
                                    <div className="w-[20px] h-[20px]">
                                        <AiOutlineMail />
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://github.com/rpnjul" target="_blank" aria-label="Github">
                                <div className="card" style={{ padding: 10, lineHeight: 0, margin: 0 }}>
                                    <div className="w-[20px] h-[20px]">
                                        <FaGithub />
                                    </div>
                                </div>
                            </Link>
                            <Link href="https://instagram.com/sssssatria" target="_blank" aria-label="Instagram">
                                <div className="card" style={{ padding: 10, lineHeight: 0, margin: 0 }}>
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
                 Full-Stack Developer with 5+ years of experience in building fast, responsive, and impactful web applications. I turn ideas into real, scalable products.
                </div>

            </div>
            <div className="mt-16">
                <h1 className="home-title">What i work with</h1>
                <div className="group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] [gap:var(--gap)] flex-row relative">
                    {Array(3).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
                            style={{ maxWidth: 'none' }}
                        >
                            <div className="flex gap-[1rem]" style={{ maxWidth: 'none' }}>
                                <div className="h-8 icn"><FaBootstrap /></div> Bootstrap
                                <div className="h-8 icn"><RiTailwindCssFill /></div> Tailwind
                                <div className="h-8 icn" ><SiJavascript /></div> JavaScript
                                <div className="h-8 icn" ><SiTypescript /></div> TypeScript
                                <div className="h-8 icn" ><FaReact /></div> React
                                <div className="h-8 icn" ><RiNextjsFill /></div> Nextjs
                            </div>
                        </div>
                    ))}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
                </div>
                <div className="group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] [gap:var(--gap)] flex-row relative">
                    {Array(3).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
                            style={{ maxWidth: 'none' }}
                        >
                            <div className="flex gap-[1rem]" style={{ maxWidth: 'none' }}>
                                <div className="h-8 icn"><FaLaravel /></div> Laravel
                                <div className="h-8 icn"><FaNodeJs /></div> Node.js
                                <div className="h-8 icn" ><GrMysql /></div> MySQL
                                <div className="h-8 icn" ><SiPostgresql /></div> Postgre
                                <div className="h-8 icn" ><FaReact /></div> React
                                <div className="h-8 icn" ><RiNextjsFill /></div> Nextjs
                            </div>
                        </div>
                    ))}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
                </div>
                <h1 className="home-title">Experience</h1>
                <section className="relative flex flex-col justify-center overflow-hidden">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:pb-4">
                            <div className="w-full max-w-3xl mx-auto">
                                <div className="-my-6 flex flex-col items-center">
                                    {experienceData.map((v, _) => (
                                        <div className="relative pl-8 py-6 group" style={{ marginLeft: 0 }} key={_}>
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
                                                <div className="text-sm text-slate-400" style={{ margin: 0 }}>
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
            </div>
            <div className="mt-8">
                <h1>Projects</h1>
                <div className="flex flex-col gap-4">
                    {projectData.map((v, i) => (
                        <Link href={"/projects/" + v.slug} style={{ margin: "unset" }} key={i}>
                            <ProjectCard
                                title={v.title}
                                description={v.description}
                                img={v.img}
                                stack={v.stack}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <h1>Latest blog posts</h1>
            </div>
        </>
    )
}

export default Home;