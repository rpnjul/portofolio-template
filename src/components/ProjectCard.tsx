// components/ProjectCard.tsx
import Image from "next/image";
import { IconType } from "react-icons";
import { MdArrowRightAlt } from "react-icons/md";

interface ProjectCardProps {
  title: string;
  description: string;
  img: string;
  stack: { icon: IconType; name: string }[];
  link?: string;
}

const ProjectCard = ({ title, description, img, stack, link }: ProjectCardProps) => {
  return (
    <div className="group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl transform-gpu bg-background [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] transition-[filter,opacity] duration-500 ease">
        {/* Background image */}
        <div>
            <Image
                width={0}
                height={0}
                src={img}
                alt={title}
                className="absolute left-0 top-0 h-full w-full border-none transition-all duration-300 ease-out opacity-70 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105 object-cover"
            />
        </div>
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 custom">
            <Image 
                  alt="Icon" src="https://klindos.jzitnik.dev/favicon.png"
                  className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 custom"
                  width={0}
                  height={0}
            />
            <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 m-0 custom">
                {title}
            </h2>
            <div className="flex gap-2 mt-1 custom flex-wrap">
                {stack.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                        <div key={idx} className="mb-0 card p-2 flex items-center custom" style={{marginBottom: 0, padding: "0.5rem"}}>
                            <div className="h-6 mr-2 custom icn">
                                <Icon/>
                            </div>
                            <span>{tech.name}</span>
                        </div>
                    );
                })}
                
            </div>
            <p className="max-w-lg text-neutral-400 m-0 custom">
                {description}
            </p>
        </div>

          {/* Hover Footer */}
        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 custom ml-2">
            <div className="pointer-events-auto custom bg-white rounded-lg py-1 px-2 text-xs text-black flex gap-2 items-center cursor-pointer hover:bg-white/80 transition-colors">
                Learn more
                <div className="ml-2 h-4 w-4 icn">
                    <MdArrowRightAlt />
                </div>
            </div>
        </div>


        {/* Overlay hover effect */}
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"></div>
    </div>
  );
};

export default ProjectCard;
